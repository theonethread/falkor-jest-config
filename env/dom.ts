import JSDOMEnvironment from "jest-environment-jsdom";

// import type { Context } from "vm";
import type { EnvironmentContext, JestEnvironmentConfig } from "@jest/environment";

export default class CustomEnvironment extends JSDOMEnvironment {
    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context);
    }

    public async setup(): Promise<void> {
        await super.setup();
    }

    public async teardown(): Promise<void> {
        await super.teardown();
    }

    // private ctxLogged = false;
    // public getVmContext(): Context | null {
    //     const ctx = super.getVmContext();
    //     if (!this.ctxLogged) {
    //         console.log("getVmContext:", ctx?._globalObject);
    //         this.ctxLogged = true;
    //     }
    //     return ctx;
    // }

    // public async handleTestEvent(event: any, state: any): Promise<void> {
    //     console.log("handleTestEvent:", event.name /*, state.rootDescribeBlock*/);
    // }
}
