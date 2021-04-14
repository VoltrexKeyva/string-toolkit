class Functions {
  constructor() {
    this.version = require('./package.json').version;
  }

  /**
   * Proper cases a string.
   * @param {string} string String to proper case
   * @param {boolean?} [lowerCaseBoolean] Whether or not to cast the string into lowercase before proper casing it
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
    let res = '';
    const len = string.length;
    for (let i = 0; i < len; i++) res += (i + 1) % 2 === 0 ? string[i].toUpperCase() : string[i];
    return res;
  }

  /**
   * Emojifies a string.
   * @param {string} string String to emojify
   * @returns {string}
   */
  emojify(string) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');

    let specialObj = {
      0: ':zero:',
      1: ':one:',
      2: ':two:',
      3: ':three:',
      4: ':four:',
      5: ':five:',
      6: ':six:',
      7: ':seven:',
      8: ':eight:',
      9: ':nine:',
      10: ':keycap_ten:',
      ' ': ' ',
      '!': ':exclamation:',
      '?': ':question:'
    };

    return string.toLowerCase().split('').reduce((acc, current) => acc + (specialObj[current] || (/\w/.test(current) ? `:regional_indicator_${current}:` : undefined) || current), '');
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
   * @typedef {Object} progressBarOptions
   * @property {string} elapsedChar Character to fill the elapsed portion of the progress bar
   * @property {string} progressChar Character for the current progress
   * @property {string} emptyChar Character to fill the empty portion of the progress bar or in other words, the unreached portion
   * @property {number} barLength Length of the progress bar in chars
   * @param {progressBarOptions?} [options] Options for the progress bar
   * @returns {string}
   */
  createProgressBar(inTotal, Total, options = {}) {
    if (!Number.isInteger(inTotal) || !Number.isInteger(Total)) throw new TypeError('the first and the second parameters are required and must be a type of number.');

    if (inTotal > Total) throw new RangeError('First parameter must be lesser than the second parameter');

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

    return string.includes(' ') ? string.trim().split(' ').map(element => element[0]).join('') : string;
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
   * @param {string?} [placeholder] The string to concatenate to be shortened string
   * @returns {string}
   */
  shorten(string, length, placeholder) {
    if (typeof string !== 'string') throw new TypeError('First parameter must be a type of string');
    if (!Number.isInteger(length)) throw new TypeError('Second parameter must be a type of number');
    return string.length > length ? string.slice(0, length) + (placeholder ? placeholder.toString() : '...') : string;
  }

  /**
   * Parses options and flags from an array of strings.
   * @param {string[]} args Array of strings to parse options and flags from.
   * @typedef {Object} OptionsAndFlagsObject
   * @property {Object} OptionsAndFlagsObject.options All the parsed options.
   * @property {string[]} OptionsAndFlagsObject.flags All the parsed flags.
   * @property {string} OptionsAndFlagsObject.contentNoOptions All the provided strings in the array concatenated without the options.
   * @property {string} OptionsAndFlagsObject.contentNoFlags All the provided strings in the array concatenated without the flags.
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
       if (s.length) {
          output.options[match.slice(2)] = s.join(' ');
       } else {
          output.flags.push(match.slice(2));
       }
    }
    let x = joined.indexOf(matches[0]);
    output.contentNoOptions = x <= 0 ? '' : joined.slice(0, x - 1);
    output.contentNoFlags = x === -1 ? '' : args.filter(arg => !arg.startsWith('--')).join(' ');
    return output;
}

  // By Voltrex Master
}

module.exports = Functions;