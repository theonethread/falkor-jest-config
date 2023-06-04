import { access, mkdir, writeFile } from "node:fs/promises";
import { join as joinPath, normalize as normalizePath } from "node:path";

// side-effect: adds chromedriver to node process' environment
import "chromedriver";
import NodeEnvironment from "jest-environment-node";
import { Builder, Browser, By, until, Key } from "selenium-webdriver";
import { Options, Driver } from "selenium-webdriver/chrome";

// import type { Context } from "vm";
import type { EnvironmentContext, JestEnvironmentConfig } from "@jest/environment";

export type ChromeDriver = {
    // 'selenium-webdriver' re-exports
    By: typeof By;
    until: typeof until;
    Key: typeof Key;
    // custom exports
    /** Quits the driver, and creates a new one, so stored references will not work any more. */
    resetDriver: () => Promise<void>;
    /** Default: "./.debug/screenshot-{n}.png" */
    takeScreenshot: (fileName?: string | null, dirName?: string | null) => Promise<void>;
    driver: Driver;
};

const enum HandleTestEventName {
    TestStart = "test_start",
    RunDescribeStart = "run_describe_start"
}

const enum DescribeBlockName {
    RootDescribeBlok = "ROOT_DESCRIBE_BLOCK"
}

const enum TestBlockType {
    DescribeBlock = "describeBlock"
}

export default class CustomEnvironment extends NodeEnvironment {
    private readonly globalName: string = "@chromedriver";
    private readonly chromeExcludeSwitches: string[] = [
        // disable all logging in Chromedriver, so it will
        // not mess up Jest's interactive logging
        "enable-logging"
    ];
    private readonly chromeArgs: string[] = [
        "--no-sandbox",
        "--disable-gpu",
        "--ignore-certificate-errors",
        "--ignore-ssl-errors=yes",
        // taken from VSCode
        "--disable-background-networking",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-client-side-phishing-detection",
        "--disable-default-apps",
        "--disable-dev-shm-usage",
        "--disable-renderer-backgrounding",
        "--disable-sync",
        "--metrics-recording-only",
        "--no-first-run",
        "--no-default-browser-check",
        "--auto-open-devtools-for-tabs"
    ];
    private driver: Driver;
    private options: Options;
    private usedTestPrefixes: string[] = [];
    private screenshotPrefix: string = "screenshot";
    private screenshotCounter: number = 0;

    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context);
        this.options = new Options()
            .headless()
            .windowSize({ width: 1024, height: 768 })
            .excludeSwitches(...this.chromeExcludeSwitches)
            .addArguments(...this.chromeArgs);
    }

    public async setup(): Promise<void> {
        await super.setup();

        this.global[this.globalName] = {
            By,
            until,
            Key,
            resetDriver: async (): Promise<void> => await this.resetDriver(),
            takeScreenshot: async (fileName: string | null = null, dirName: string | null = null): Promise<void> =>
                await this.takeScreenshot(fileName, dirName),
            driver: undefined
        };
    }

    public async teardown(): Promise<void> {
        await this.teardownChromeDriver();
        await super.teardown();
    }

    public async handleTestEvent(event: any, _state: any): Promise<void> {
        switch (event.name) {
            case HandleTestEventName.TestStart:
                const testName = event.test.name;
                const parentName = event.test?.parent.type === TestBlockType.DescribeBlock && event.test.parent.name;
                this.screenshotPrefix = this.getScreenshotPrefix(testName, parentName);
                this.screenshotCounter = 0;
                return;
            case HandleTestEventName.RunDescribeStart:
                // Creates new 'driver' instance at each user defined 'describe()' block's start
                if (event.describeBlock.name !== DescribeBlockName.RootDescribeBlok) {
                    await this.resetDriver();
                }
                return;
        }
    }

    private async setupChromeDriver(): Promise<void> {
        this.driver = (await new Builder().forBrowser(Browser.CHROME).setChromeOptions(this.options).build()) as Driver;
        (this.global[this.globalName] as ChromeDriver).driver = this.driver;
    }

    private async teardownChromeDriver(): Promise<void> {
        if (this.driver) {
            await this.driver.quit();
        }
    }

    private async resetDriver(): Promise<void> {
        await this.teardownChromeDriver();
        await this.setupChromeDriver();
    }

    private async takeScreenshot(fileName: string | null, dirName: string | null): Promise<void> {
        fileName = fileName || this.screenshotPrefix + "-" + ++this.screenshotCounter + ".png";
        dirName = normalizePath(dirName || "./.debug/");
        try {
            await access(dirName);
        } catch (err) {
            if (err.code === "ENOENT") {
                mkdir(dirName, { recursive: true });
            } else {
                throw err;
            }
        }
        const screenshotPath = joinPath(dirName, fileName);
        const pngBase64Data = await this.driver.takeScreenshot();
        await writeFile(screenshotPath, pngBase64Data, "base64");
    }

    /** Convert test's name to screenshot prefix using Markdown heading rules. */
    private getScreenshotPrefix(testName: string, _parentName: string): string {
        const testPrefix = testName
            .replace(/\s+|[^a-zA-Z0-9]/g, "-")
            .replace(/([a-z])([A-Z])([a-z])/g, "$1-$2$3")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

        let unusedTestPrefix = testPrefix;
        let counter = 0;
        while (this.usedTestPrefixes.includes(unusedTestPrefix)) {
            unusedTestPrefix = testPrefix + "-" + ++counter;
        }

        this.usedTestPrefixes.push(unusedTestPrefix);
        return unusedTestPrefix;
    }
}
