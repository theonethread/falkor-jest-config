# **Falkor Jest Config**

## **Usage**

### **Configuration**

Use Falkor Jest Config in your `jest.config.ts`:

```ts
import jestConfig from "@falkor/falkor-jest-config";

// …

export default jestConfig;
```

### **Environments**

Falkor Jest Config comes with predefined DOM -, and Selenium Chrome Webdriver environments. To use them in your test files use the `@jest-environment` docblock at the top of the file:

```ts
/** @jest-environment @falkor/falkor-jest-config/env/dom.ts */

// side-effect: extend global 'expect' with custom DOM matchers
import "@testing-library/jest-dom";

// …
```

```ts
/** @jest-environment @falkor/falkor-jest-config/env/wd.ts */

import type { ChromeDriver } from "@falkor/falkor-jest-config/env/wd";

const $chrome = global["@chromedriver"] as ChromeDriver;

// …
```

`// TODO`

## **Further Development**

### **Linting**

The project uses [`prettier`](https://www.npmjs.com/package/prettier "Visit") for code formatting and [`cspell`](https://www.npmjs.com/package/cspell "Visit") to avoid general typos in both sources and documentation - it is advised to install these packages as extensions in your IDE to prevent CI errors beforehand. To lint the project run:

```
$ npm run lint
```

> _**SEE:** [`.prettierrc.cjs`](https://github.com/theonethread/falkor-plugin-example/blob/develop/.prettierrc.cjs "Open") and [`cspell.config.cjs`](https://github.com/theonethread/falkor-plugin-example/blob/develop/cspell.config.cjs "Open") for further reference._

- To fix formatting issues run `$ npx prettier --write <path-to-file>`. This will overwrite the file with the default formatting applied locally, so then you can review the changes in `git` and **ensure those did not affect production artifacts**.
- To fix spelling errors run `$ npx cspell lint --wordsOnly --unique --gitignore --exclude .git ** .*` for details, and either make the fixes in the sources listed, add `cspell` favored comments, or extend the project-wide `cspell.config.cjs` accordingly.

### **Versioning and Branching Strategy**

Release sources can be found on the `master` branch, this one always points to the latest tagged release. Previous sources of releases can be found using `git` version tags (or browsing GitHub releases). Released packages can be found on [npmjs](https://www.npmjs.com/package/@falkor/falkor-jest-config "Visit").

The repository's main branch is `develop` (due to technical reasons), this holds all developments that are already decided to be included in the next release. Usually this branch is ahead of `master` one patch version (but based on upcoming features to include this can become minor, or major), so prepared external links may yet be broken.

The `feature/*` branches usually hold ideas and POC code, these will only be merged into `develop` once their impact measured and quality meets release requirements.

> _The project uses [SemVer](https://semver.org "Visit"), `git` tags are prefixed with a `v` character._

### **Free and Open Source**

The latest sources can always be found on [GitHub](https://github.com/theonethread/falkor-jest-config "Visit").

#### **Getting Involved**

We believe - and we hope you do too - that learning how to code, how to think, and how to contribute to free- and open source software can empower the next generation of coders and creators. We **value** first time contributors just the same as rock stars of the OSS world, so if you're interested in getting involved, just head over to our [Contribution Guidelines](https://github.com/theonethread/.github/blob/master/.github/contributing.md "Open") for a quick heads-up!

#### **License**

[MIT](https://github.com/theonethread/falkor-jest-config/blob/master/license.txt "Open")

_©2020-2023 Barnabas Bucsy - All rights reserved._
