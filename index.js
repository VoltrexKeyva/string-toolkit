const addon = require("./build/Release/string-toolkit");
const decancerFunc = require('decancer');

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
  toProperCase = addon.toProperCase;

  /**
   * Chunks a string to the specified amount of chars.
   * @param {string} string String to chunk
   * @param {number} ChunkBy Amount of chars to chunk by
   * @returns {string[]}
   */
  toChunks = addon.toChunks;

  /**
   * Scrambles a string.
   * @param {string} string String to scramble
   * @returns {string}
   */
  scramble = addon.scramble;

  /**
   * Mocks a string.
   * @param {string} string String to mock
   * @returns {string}
   */
  mock = addon.mock;

  /**
   * Emojifies a string.
   * @param {string} string String to emojify
   * @returns {string}
   */
  emojify = addon.emojify;

  /**
   * This function is related to discord, checks if the string contains a custom emoji.
   * @param {string} string String to check whether or not it has a custom emoji
   * @returns {boolean}
   */
  hasCustomEmoji = addon.hasCustomEmoji;

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
  toAbbreviation = addon.toAbbreviation;

  /**
   * This function is related to discord bot's tokens, generating a fake token.
   * @returns {string}
   */
  fakeToken = addon.fakeToken;

  /**
   * Shortens a string by a specified amount
   * @param {string} string String to shorten
   * @param {number} length Amount of chars to shorten by
   * @param {string} [placeholder] The string to concatenate to be shortened string
   * @returns {string}
   */
  shorten = addon.shorten;

  /**
   * Decancers a string. Reduces everything from zalgos, fancy characters, cyrillic symbols, fullwidth characters, etc. to alphanumeric characters.
   * NOTE: The string returned will ALWAYS be in lowercase.
   * @param {string} text The cancerous string to decancer.
   * @returns {string} The cleaned string. This may break certain things like special characters. Only use for certain purposes like filtering/censoring.
   */
  decancer = decancerFunc;

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
