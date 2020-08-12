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

Function | Example usage | Params
--- | --- | ---
toProperCase(String, Boolean) | `toProperCase("hey there!", true)` | 1- String (Required)<br>2- Boolean (Optional)
toChunks(String, Number) | `toChunks("hey there!", 3)`| 1- String (Required)<br>2- Number (Required)
scramble(String) | `scramble("hey there!")` | 1- String (Required)
mock(String) | `mock("hey there!")` | 1- String (Required)
emojify(String) | `emojify("hey there!")` | 1- String (Required)
hasCustomEmoji(String) | `hasCustomEmoji("hey there!")` | 1- String (Required)
createProgressBar(Elapsed, Total, Options) | `createProgressBar(57, 100, { elapsedChar: "+", progressChar: "@", emptyChar: "~" })` | 1- Elapsed (Required)<br>2- Total (Required)<br>3- Options (Optional)
toAbbreviation(String) | `toAbbreviation("hey there!")` | 1- String (Required)

### More functions coming soon.