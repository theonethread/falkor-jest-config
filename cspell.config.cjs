/** @type { import("cspell").CSpellSettings } */
const baseConfig = require("@falkor/falkor-cspell-config");
baseConfig.words.push("typeahead", "testname", "chromedriver", "backgrounding", "breakpad");
module.exports = baseConfig;
