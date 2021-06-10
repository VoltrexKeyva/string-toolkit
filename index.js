// constants.
const azCodes = [
    120094, 120068, 120198, 120172,
    120042, 120016, 119990, 119964,
    120146, 120120,  65345,  65313,
    127280,   9424,   9398, 119834,
    119808, 120302, 120276, 120354,
    120328, 120406, 120380, 120458,
    120432, 127344
];

const numericalCodes = [
    120802, 120792,
     65296,   8320,
      8304,   9450,
    120782, 120812,
    120822
];

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
const numbers = [..."0123456789"];
const cleanerRegex = /[\uD800-\uDB7F\u030d\u030e\u0304\u0305\u033f\u0311\u0306\u0310\u0352\u0357\u0351\u0307\u0308\u030a\u0342\u0343\u0344\u034a\u034b\u034c\u0303\u0302\u030c\u0350\u0300\u0301\u030b\u030f\u0312\u0313\u0314\u033d\u0309\u0363\u0364\u0365\u0366\u0367\u0368\u0369\u036a\u036b\u036c\u036d\u036e\u036f\u033e\u035b\u0346\u031a\u0315\u031b\u0340\u0341\u0358\u0321\u0322\u0327\u0328\u0334\u0335\u0336\u034f\u035c\u035d\u035e\u035f\u0360\u0362\u0338\u0337\u0361\u0489\u0316\u0317\u0318\u0319\u031c\u031d\u031e\u031f\u0320\u0324\u0325\u0326\u0329\u032a\u032b\u032c\u032d\u032e\u032f\u0330\u0331\u0332\u0333\u0339\u033a\u033b\u033c\u0345\u0347\u0348\u0349\u034d\u034e\u0353\u0354\u0355\u0356\u0359\u035a\u0323]/g;

const extraAlphabetRegexes = [
    "\u0250-\u0252\u0101\u0103\u0105\u00c0-\u00c5\u039B\u20b3\u20b3\u5342\u4e39\u1D00\u1D2C\u1D43\u1D44", // a
    "\u0299\u0253\u0180\u0183\u0185\u0e3f\u0e3f\u0299\u4e43\u65e5\u1D03\u1D2E\u1D2F\u1D47\u1D5D\u1D66\u1D6C", // b
    "\u0297\u0255\u0188\u023c\u0107\u0109\u010b\u010d\u00c7\u00e7\u1103\u20b5\u1D9C\u531a\u4ea1\u1D04", // c
    "\u018c\u0110\u0110\u15ea\u53e5\u1D05\u1D30\u1D48\u1D5F\u1D6D\u1D06", // d
    "\u0256\u0257\u021d\u01dd\u018e\u01a9\u01b9\u01ba\u01ef\u0205\u0207\u0229\u0247\u0113\u0221\u0115\u0117\u0119\u011b\u00e8-\u00eb\u00c8-\u00cb\u03A3\u0246\u4e47\u30e8\u1D07\u1D08\u1D23\u1D31\u1D32\u1D49\u1D4B\u1D4C", // e
    "\u0258-\u025e\u010f\u0111\u20a3\u0493\u5343\u4e4d\u1D6E\u1DA0\u0192", // f
    "\u029b\u0265-\u0267\u0260-\u0262\u01e5\u01e7\u01f5\u011d\u011f\u0121\u0123\u20b2\u0262\u13b6\u5442\u1D33\u1D4D\u1D77\u1D79\u1D4D", // g
    "\u029c\u0195\u021f\u0125\u0127\u0389\u2c67\u029c\u5344\u5efe\u1D34\u02B0", // h
    "\u0268-\u026a\u01d0\u0209\u020b\u0129\u012b\u012d\u012f\u0131\u00ec-\u00ef\u00cc-\u00cf\u0142\u026a\u4e28\u5de5\u1D4E\u1D35\u1D09\u1D62\u1D7B\u1D7C\u1DA6", // i
    "\u029d\u025f\u01f0\u0249\u0237\u0135\u004a\uff8c\u52f9\u1D36\u1D0A\u02B2\u0279-\u027b", // j
    "\u029e\u0137\u0138\u0199\u01e9\u20ad\u049c\u7247\u1D0B\u1D37\u1D4F", // k
    "\u029f\u026b-\u026d\u01c0\u01c1\u0234\u019a\u013a\u013c\u013e\u0140\u0142\u017f\u1102\u2c60\u029f\u3125\u3057\u1D0C\u1D38\u02E1", // l
    "\u20a5\u722a\u518a\u1D5A\u1D0D\u1D1F\u1D39\u1D50\u0271", // m
    "\u0272-\u0274\u019e\u01f9\u0235\u0144\u0146\u0148\u0149\u014d\u014f\u0151\u014a\u014b\u041F\u20a6\u0274\u51e0\u1D0E\u1D3A\u1D3B\u1D70\u207F\u00f1", // n
    "\u0298\u0275-\u0278\u018d\u01a1\u01a3\u01d2\u01eb\u01ed\u01ff\u020d\u020f\u0223\u022b\u022d\u022f\u0231\u00d0\u00f2-\u00f6\u00f8\u04E8\u3116\u56de\u1D0F\u1D10\u1D11\u1D12\u1D13\u1D16\u1D17\u1D3C\u1D52\u1D53\u1D54\u1D55", // o
    "\u01a5\u20b1\u5369\u5c38\u1D18\u1D3E\u1D56\u1D71\u1D7D\u01bf", // p
    "\u02a0\u01eb\u024a\u7532\u1D60\u0239\u024b", // q
    "\u027c-\u0281\u024d\u0211\u0213\u0155\u0157\u0159\u042F\u2c64\u0280\u5c3a\u1D19\u1D1A\u1D3F\u1D63\u1D72\u1D73\u02B3", // r
    "\u015b\u015d\u015f\u0161\u01A7\u20b4\u4e02\u5df1\u1D74\u02E2\u0219\u023f\u01a8\u01bd\u0282", // s
    "\u0287\u0288\u0163\u0165\u0167\u01AC\u20ae\u3112\u535e\u1D1B\u1D40\u1D57\u01ab\u01ad\u021b\u0236", // t
    "\u0289-\u028b\u0215\u0217\u01d4\u01d6\u01d8\u01da\u01dc\u0169\u016b\u016d\u016f\u0171\u0173\u00f9-\u00fc\u0426\u0244\u3129\u51f5\u1D1C\u1D1D\u1D1E\u1D41\u1D58\u1D59\u1D64\u1D7E\u1D7F\u01b0", // u
    "\u142f\u30ec\u1D20\u1D5B\u1D65\u028c", // v
    "\u0175\u0429\u20a9\u5c71\u1D21\u1D42\u02B7\u019c\u026f\u0270\u028d\u02ac", // w
    "\u04fe\u4e42\u30e1\u02E3\u00d7", // x
    "\u0177\u024e\u028f\u311a\u3068\u02B8\u00fd\u00ff\u01b4\u0233\u024f\u0263\u0264\u028e\u028f", // y
    "\u017a\u017c\u017e\u2c6b\u4e59\u1D22\u1D76\u1DBB\u01b6\u0225\u0240\u0290\u0291" // z
];

const emojiObject = {
  0: '\u0030\u20E3', 1: '\u0031\u20E3',
  2: '\u0032\u20E3', 3: '\u0033\u20E3',
  4: '\u0034\u20E3', 5: '\u0035\u20E3',
  6: '\u0036\u20E3', 7: '\u0037\u20E3',
  8: '\u0038\u20E3', 9: '\u0039\u20E3',
  10: '\ud83d\udd1f', a: '\ud83c\udde6',
  b: '\ud83c\udde7', c: '\ud83c\udde8',
  d: '\ud83c\udde9', e: '\ud83c\uddea',
  f: '\ud83c\uddeb', g: '\ud83c\uddec',
  h: '\ud83c\udded', i: '\ud83c\uddee',
  j: '\ud83c\uddef', k: '\ud83c\uddf0',
  l: '\ud83c\uddf1', m: '\ud83c\uddf2',
  n: '\ud83c\uddf3', o: '\ud83c\uddf4',
  p: '\ud83c\uddf5', q: '\ud83c\uddf6',
  r: '\ud83c\uddf7', s: '\ud83c\uddf8',
  t: '\ud83c\uddf9', u: '\ud83c\uddfa',
  v: '\ud83c\uddfb', w: '\ud83c\uddfc',
  x: '\ud83c\uddfd', y: '\ud83c\uddfe',
  z: '\ud83c\uddff', ' ': ' ',
  '!': '\u2757', '?': '\u2753',
  '#': '\u0023\ufe0f\u20e3','*': '\u002a\ufe0f\u20e3'
};

/**
 * @typedef {Object} OptionsAndFlagsObject
 * @property {Object} options All the parsed options.
 * @property {string[]} flags All the parsed flags.
 * @property {string} contentNoOptions All the provided strings in the array concatenated without the options.
 * @property {string} contentNoFlags All the provided strings in the array concatenated without the flags.
 */

/**
 * @typedef {Object} progressBarOptions
 * @property {string} elapsedChar Character to fill the elapsed portion of the progress bar
 * @property {string} progressChar Character for the current progress
 * @property {string} emptyChar Character to fill the empty portion of the progress bar or in other words, the unreached portion
 * @property {number} barLength Length of the progress bar in chars
 */

class Functions {
  constructor() {
    this.version = require('./package.json').version;
  }

  /**
   * Proper cases a string.
   * @param {string} string String to proper case
   * @param {boolean} [lowerCaseBoolean] Whether or not to cast the string into lowercase before proper casing it
   * @returns {string}
   */
  toProperCase(string, lowerCaseBoolean) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');

    return (lowerCaseBoolean !== true ? string : string.toLowerCase()).replace(/(\b\w)/gi, w => w.toUpperCase());
  }

  /**
   * Chunks a string to the specified amount of chars.
   * @param {string} string String to chunk
   * @param {number} ChunkBy Amount of chars to chunk by
   * @returns {string[]}
   */
  toChunks(string, ChunkBy) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');

    if (!Number.isInteger(ChunkBy)) throw new TypeError('Second parameter must be a type of number');
    
    return Array.from({
      length: Math.ceil(string.length / ChunkBy)
    }, (_, i) => string.slice(i * ChunkBy, i * ChunkBy + ChunkBy));
  }

  /**
   * Scrambles a string.
   * @param {string} string String to scramble
   * @returns {string}
   */
  scramble(string) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');

    function shuffle(array) {
      let currentIndex, randomIndex, tempIndex;

      for (currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));

        tempIndex = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempIndex;
      }

      return array;
    }

    return shuffle(string.split('')).join('');
  }

  /**
   * Mocks a string.
   * @param {string} string String to mock
   * @returns {string}
   */
  mock(string) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');
    let str = string.split('');
    for (let i = 0; i < string.length; i += 2) str[i] = str[i].toUpperCase();
    return str.join('');
  }

  /**
   * Emojifies a string.
   * @param {string} string String to emojify
   * @returns {string}
   */
  emojify(string) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');
    return string.toLowerCase().split('').map(x => emojiObject[x] || x).join('');
  }

  /**
   * This function is related to discord, checks if the string contains a custom emoji.
   * @param {string} string String to check whether or not it has a custom emoji
   * @returns {boolean}
   */
  hasCustomEmoji(string) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');
    return /<a?:(\w{2,32}):(\d{17,19})>/.test(string);
  }

  /**
   * Creates a progress bar.
   * @param {number} inTotal Elapsed
   * @param {number} Total Goal
   * @param {progressBarOptions} [options] Options for the progress bar
   * @returns {string}
   */
  createProgressBar(inTotal, Total, options = {}) {
    if (!Number.isInteger(inTotal) || !Number.isInteger(Total)) throw new TypeError('the first and the second parameters are required and must be a type of number.');
    if (inTotal > Total) throw new RangeError('First parameter must be less than the second parameter');

    options = {
      elapsedChar: typeof options.elapsedChar === 'string' ? options.elapsedChar : '=',
      progressChar: typeof options.progressChar === 'string' ? options.progressChar : '>',
      emptyChar: typeof options.emptyChar === 'string' ? options.emptyChar : '-',
      barLength: Number.isInteger(options.barLength) ? options.barLength : 50
    };

    let available = (inTotal / Total) * options.barLength;
    let progressBar = options.elapsedChar.repeat(available) + options.progressChar + options.emptyChar.repeat(options.barLength - (available + (inTotal === Total ? 0 : 1)));
    return progressBar.length > options.barLength ? progressBar.slice(0, options.barLength) : progressBar;
  }

  /**
   * Gets the abbreviation of a string.
   * @param {string} string String to get an abbreviation of
   * @returns {string}
   */
  toAbbreviation(string) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');
    return string.trim().split(' ').map(element => element[0]).join('');
  }

  /**
   * This function is related to discord bot's tokens, generating a fake token.
   * @returns {string}
   */
  fakeToken() {
    let IDs = [17, 18, 19],
      chars = [...'abcdefghijklmnopqrstuvwxyz1234567890'],
      options = [0, 1];
    return (Buffer.from(Array.from({
      length: IDs[Math.floor(Math.random() * IDs.length)]
    }, () => {
      let nums = Array.from({
        length: 10
      }, (a, r) => r);
      return nums[Math.floor(Math.random() * nums.length)];
    }).join('')).toString('base64') + '.' + Array.from({
      length: 50
    }, (a, r) => r === 5 ? '.' : chars[Math.floor(Math.random() * chars.length)]).reduce((acc, current) => (acc += options[Math.floor(Math.random() * options.length)] === 1 ? current.toUpperCase() : current, acc), '')).slice(0, 59);
  }

  /**
   * Shortens a string by a specified amount
   * @param {string} string String to shorten
   * @param {number} length Amount of chars to shorten by
   * @param {string} [placeholder] The string to concatenate to be shortened string
   * @returns {string}
   */
  shorten(string, length, placeholder) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');
    if (!Number.isInteger(length)) throw new TypeError('Second parameter must be a type of number');
    return string.length > length ? string.slice(0, length) + (placeholder ? placeholder.toString() : '...') : string;
  }

  /**
   * Decancers a string. Reduces everything from zalgos, fancy characters, etc. to alphanumeric characters.
   * NOTE: The string returned will ALWAYS be in lowercase.
   * @param {string} text The cancerous string to decancer.
   * @returns {string} The cleaned string. This may break certain things like special characters. Only use for certain purposes like filtering/censoring.
   */
  decancer(text) => {
    text = text
      .toLowerCase()
      .replace(cleanerRegex, "");

    for (let i = 0; i < 10; i++)
        text = text.replace(new RegExp(`[${numericalCodes.map(x => String.fromCodePoint(x + i)).join("")}]`, "gi"), numbers[i]);

    for (let i = 0; i < 26; i++)
        text = text.replace(new RegExp(`[${azCodes.map(x => String.fromCodePoint(x + i)).join("")}${extraAlphabetRegexes[i]}]`, "gi"), alphabet[i]);

    return text;
  }

  /**
   * Parses options and flags from an array of strings.
   * @param {string[]} args Array of strings to parse options and flags from.
   * @returns {OptionsAndFlagsObject}
   */
  parseOptions(args) {
    if (!Array.isArray(args) || !args.every(argument => typeof argument === 'string')) throw new TypeError('First parameter must be an array and every element must be a type of string');

    let matches = args.filter(a => a.startsWith('--')),
    joined = args.join(' '),
    output = {
       options: {},
       flags: [],
       contentNoOptions: joined,
       contentNoFlags: joined
    };
    if (!matches.length) return output;
    for (let match of matches) {
       let m = args.slice(args.indexOf(match) + 1),
       s = [];
       for (let index of m) {
          if (index.startsWith('--')) break;
          s.push(index);
       }
       if (s.length)
          output.options[match.slice(2)] = s.join(' ');
       else
          output.flags.push(match.slice(2));
    }
    let x = joined.indexOf(matches[0]);
    output.contentNoOptions = x <= 0 ? '' : joined.slice(0, x - 1);
    output.contentNoFlags = x === -1 ? '' : args.filter(arg => !arg.startsWith('--')).join(' ');
    return output;
  }
}

const instance = new Functions();
for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(k => k !== 'constructor')) {
  Functions[key] = instance[key];
}

module.exports = Functions;
