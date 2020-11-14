# string-toolkit
[![npm](https://img.shields.io/npm/dm/string-toolkit.svg)](https://www.npmjs.com/package/string-toolkit)

## Installation

```bash
npm i string-toolkit --save
```

## Usage

```js
const stringToolsRequire = require("string-toolkit");
const stringTools = new stringToolsRequire();
```

## Example

```js
const stringToolsRequire = require("string-toolkit");
const stringTools = new stringToolsRequire();

console.log(stringTools.toProperCase("hey there!"));
```

# Available functions

Function | Example usage | Params | Output
--- | --- | --- | ---
toProperCase(String, Boolean) | `toProperCase("hey there!", true)` | 1- String (Required)<br>2- Boolean (Optional) | `"Hey There!"`
toChunks(String, Number) | `toChunks("hey there!", 3)`| 1- String (Required)<br>2- Number (Required) | `[ 'hey', ' th', 'ere', '!' ]`
scramble(String) | `scramble("hey there!")` | 1- String (Required) | `"rte! ehyhe"`
mock(String) | `mock("hey there!")` | 1- String (Required) | `"hEy tHeRe!"`
emojify(String) | `emojify("hey there!")` | 1- String (Required) | `":regional_indicator_h::regional_indicator_e::regional_indicator_y: :regional_indicator_t::regional_indicator_h::regional_indicator_e::regional_indicator_r::regional_indicator_e::exclamation:"`
hasCustomEmoji(String) | `hasCustomEmoji("hey there!")` | 1- String (Required) | `"No custom emoji detected"`
createProgressBar(Number, Number, Object) | `createProgressBar(57, 100, { elapsedChar: "+", progressChar: "@", emptyChar: "~" })` | 1- Number (Required)<br>2- Number (Required)<br>3- Object (Optional) | `"+++++++++++++++++++++++++++++@~~~~~~~~~~~~~~~~~~~~"`
toAbbreviation(String) | `toAbbreviation("hey there!")` | 1- String (Required) | `"ht"`
fakeToken() | `fakeToken()` | No parameters | `"NDI0NTYyNzY1NTMzNzQ0MjY3MA==.Cz0j0.Zf6Tfo17wN27N8tnkoG164Q9"`
shorten(String, Number, String) | `shorten("bruh moment", 4, "end")` | 1- String (Required)<br>2- Number (Required)<br>3- String (Optional) | `"bruhend"`

### More functions coming soon.