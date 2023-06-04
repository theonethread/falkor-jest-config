// import { defaultsESM as defaultConfig } from "ts-jest/presets";

import type { JestConfigWithTsJest } from "ts-jest";

const customConfig: JestConfigWithTsJest = {
    // project name prefix to display in console
    displayName: { name: "Falkor", color: "yellow" },

    // preset containing TypeScript extension settings
    preset: "ts-jest/presets/default-esm",
    // preset above handles these
    // extensionsToTreatAsEsm: [".ts"],
    // transform: { "^.+\\.ts$": ["ts-jest", { useESM: true }] },

    // we commonly use 'node_modules/.cache/<module-name>/' for caching
    cacheDirectory: "node_modules/.cache/jest/",

    // filter tests by file- or test name in '--watch' mode
    watchPlugins: [
        "jest-watch-typeahead/filename",
        // ["jest-watch-typeahead/filename" , { key: "", prompt: "" }],
        "jest-watch-typeahead/testname"
        // ["jest-watch-typeahead/testname", { key: "", prompt: "" }]
    ],

    // either provide 'testRegex', or 'testMatch', but not both
    testRegex: [
        // default:
        // "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"
        // we look for '.ts' files in the root 'test' folder for now
        "/test/.*\\.ts$"
    ]

    // [ future reference ]
    // errorOnDeprecated: true,
    // globals: {},
    // globalSetup: undefined,
    // globalTeardown: undefined,
    // setupFiles: [],
    // setupFilesAfterEnv: [],
    // testTimeout: 5000,
};

export default customConfig;
