import assert from 'node:assert';
import test from 'fast-fail';

let stringTools;

test('importing the string-toolkit module', async () => {
  stringTools = await import('./index.js');
  stringTools = stringTools?.default; // this is stupid but at least it fixes the problemo
  assert.notEqual(stringTools, null);
});

test('toProperCase', () => {
  assert.strict.equal(stringTools.toProperCase('hey there!'), 'Hey There!');
});

test('toChunks', () => {
  assert.deepEqual(stringTools.toChunks('hey there!', 3), [ 'hey', ' th', 'ere', '!' ]);
});

test('mock', () => {
  assert.strict.equal(stringTools.mock('hey there!'), 'HeY ThErE!');
});

test('emojify', () => {
  assert.strict.equal(stringTools.emojify('hey there!'), '🇭🇪🇾 🇹🇭🇪🇷🇪❗');
});

test('createProgressBar', () => {
  assert.strict.equal(stringTools.createProgressBar(57, 100, {
    elapsedChar: '+',
    progressChar: '@',
    emptyChar: '~',
    barLength: 10
  }), '+++++@~~~~');
});

test('toAbbreviation', () => {
  assert.strict.equal(stringTools.toAbbreviation('hey there!'), 'ht');
});

test('hasCustomEmoji', () => {
  assert.strict.equal(stringTools.hasCustomEmoji('hey there!'), false);
  assert.strict.equal(stringTools.hasCustomEmoji('<:hello:12345678987654321>'), true);
  assert.strict.equal(stringTools.hasCustomEmoji('<a:hello:12345678987654321>'), true);
});

test('decancer', () => {
  assert.strict.equal(stringTools.decancer('𝓱𝓮𝔂 𝓽𝓱𝓮𝓻𝓮!'), 'hey there!');
});

test('shorten', () => {
  assert.strict.equal(stringTools.shorten('bruh moment', 4, 'end'), 'bruhend');
});

test('parseOptions', () => {
  assert.deepEqual(stringTools.parseOptions('bruh --moment what bro --search --big bruh moment'.split(' ')), {
    options: {
      moment: 'what bro',
      big: 'bruh moment'
    },
    flags: [ 'search' ],
    contentNoOptions: 'bruh',
    contentNoFlags: 'bruh what bro bruh moment'
  });
});