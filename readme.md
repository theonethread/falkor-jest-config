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

##

---

_©2020-2023 Barnabas Bucsy - All rights reserved._
