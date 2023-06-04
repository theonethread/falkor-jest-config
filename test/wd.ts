/** @jest-environment @falkor/falkor-jest-config/env/wd.ts */

import { access } from "node:fs/promises";

import type { ChromeDriver } from "../env/wd";

const $chrome = global["@chromedriver"] as ChromeDriver;

describe("[S] chrome driver", () => {
    test("[T] driver", () => {
        expect($chrome.driver).toBeDefined();
    });

    test("[T] resetDriver()", async () => {
        expect(typeof $chrome.resetDriver).toBe("function");
        const oldDriver = $chrome.driver;
        await $chrome.resetDriver();
        expect($chrome.driver).not.toEqual(oldDriver);
    });

    test("[T] driver.get()", async () => {
        await $chrome.driver.get("https://www.google.com/");
        const title = await $chrome.driver.getTitle();
        expect(title).toEqual("Google");
    });

    test("[T] takeScreenshot()", async () => {
        expect(typeof $chrome.takeScreenshot).toBe("function");
        await $chrome.takeScreenshot();
        await access("./.debug/t-take-screenshot-1.png");
    });

    test("[T] takeScreenshot()", async () => {
        await $chrome.takeScreenshot();
        await access("./.debug/t-take-screenshot-1-1.png");
    });
});
