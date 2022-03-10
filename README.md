<p align="center">
<img src="https://repository-images.githubusercontent.com/286936061/a246689e-2e63-400f-bc8b-ab2f7393635e" width="320px" length="160px">
</p>
<p align="center"> Just a package containing tools to manipulate a string. </p>
</br>

[![npm](https://img.shields.io/npm/dm/string-toolkit.svg)](https://www.npmjs.com/package/string-toolkit)

## Installation

```bash
npm i string-toolkit
```

## Usage

```js
// Creating a new instance.
const stringTools = new (require('string-toolkit'))();

// Can also be used without a new instance.
const stringTools = require('string-toolkit');
```

## Example

```js
const stringTools = require('string-toolkit');

console.log(stringTools.toProperCase('hey there!'));
```

# Available functions

### `toProperCase(string[, boolean])`

```js
const output = stringTools.toProperCase('hey there!', true);

console.log(output); // 'Hey There!'
```

### `toChunks(string, number)`

```js
const output = stringTools.toChunks('hey there!', 3);

console.log(output); // [ 'hey', ' th', 'ere', '!' ]
```

### `scramble(string)`

```js
const output = stringTools.scramble('hey there!');

console.log(output); // 'rte! ehyhe'
```

### `mock(string)`

```js
const output = stringTools.mock('hey there!');

console.log(output); // 'hEy tHeRe!'
```

### `emojify(string)`

```js
const output = stringTools.emojify('hey there!');

console.log(output);
// '🇭🇪🇾 🇹🇭🇪🇷🇪❗'
```

### `hasCustomEmoji(string)`

```js
const output = stringTools.hasCustomEmoji('hey there!');

console.log(output); // false
```

### `createProgressBar(number, number[, object])`

```js
const output = stringTools.createProgressBar(57, 100, {
  elapsedChar: '+',
  progressChar: '@',
  emptyChar: '~',
  barLength: 10
});

console.log(output); // '++++++@~~'
```

### `toAbbreviation(string)`

```js
const output = stringTools.toAbbreviation('hey there!');

console.log(output); // 'ht'
```

### `fakeToken()`

```js
const output = stringTools.fakeToken();

console.log(output);
// 'NDI0NTYyNzY1NTMzNzQ0MjY3MA==.Cz0j0.Zf6Tfo17wN27N8tnkoG164Q9'
```

### `decancer(string)`

```js
const output = stringTools.decancer('𝓱𝓮𝔂 𝓽𝓱𝓮𝓻𝓮!');

console.log(output); // 'hey there!'
```

### `shorten(string, number[, string])`

```js
const output = stringTools.shorten('bruh moment', 4, 'end');

console.log(output); // 'bruhend'
```

### `parseOptions(string[])`

```js
const str = 'bruh --moment what bro --search --big bruh moment';

const output = stringTools.parseOptions(str.split(' '));

console.log(output);
/*
  {
    options: {
      moment: 'what bro',
      big: 'bruh moment'
    },
    flags: [ 'search' ],
    contentNoOptions: 'bruh',
    contentNoFlags: 'bruh what bro bruh moment'
  }
 */
```
