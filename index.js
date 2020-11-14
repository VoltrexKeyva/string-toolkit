class Functions {
  constructor() {
    this.version = require("./package.json").version;
  }
  
  /**
   * Proper cases a string.
   * @param {string} string - String to proper case
   * @param {?boolean} lowerCaseBoolean - Whether or not to cast the string into lowercase before proper casing it
   * @returns {string}
   */
  toProperCase(string, lowerCaseBoolean) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    return ((!lowerCaseBoolean || lowerCaseBoolean === false || lowerCaseBoolean !== true) ? string.toString() : string.toString().toLowerCase()).replace(/(\b\w)/gi, w => w.toUpperCase());
  }
  
  /**
   * Chunks a string to the specified amount of chars.
   * @param {string} string - String to chunk
   * @param {number} ChunkBy - Amount of chars to chunk by
   * @returns {string[]}
   */
  toChunks(string, ChunkBy) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    if (!ChunkBy || !Number.isInteger(ChunkBy)) {
      throw new TypeError("Expected a char split position in the string as the second parameter, and it must be a number.");
    }
    
    let stringToChunk = string.toString();
  
      let chunksNum = Math.ceil(stringToChunk.length / parseInt(ChunkBy));
      let chunks = new Array(chunksNum);
      for (let i = 0, o = 0; i < parseInt(chunksNum); ++i, o += parseInt(ChunkBy)) {
        chunks[i] = stringToChunk.substr(o, parseInt(ChunkBy));
      }
      
      return chunks;
  }
  
  /**
   * Scrambles a string.
   * @param {string} string - String to scramble
   * @returns {string}
   */
  scramble(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
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
    
     return shuffle([...string.toString()]).join("");
  }
  
  /**
   * Mocks a string.
   * @param {string} string - String to mock
   * @returns {string}
   */
  mock(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    let chunksFunction = this.toChunks;
    
    return chunksFunction(string.toString().toLowerCase(), 2).map(e => e.slice(0, 1) + e.slice(1).toUpperCase()).join("");
  }
  
  /**
   * Emojifies a string.
   * @param {string} string - String to emojify
   * @returns {string}
   */
  emojify(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    let specialObj = {
      0: ":zero:",
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
      " ": " ",
      "!": ":exclamation:",
      "?": ":question:"
    };
    
    return [...string.toString()].map(e => {
      if (e.match(/\W/) || e.match(/\d/)) {
        return specialObj[e] || e;
        } else if (e.match(/\w/)) {
          return `:regional_indicator_${e.toLowerCase()}:`;
        }
          }).join("");
  }
  
  /**
   * This function is related to discord, checks if the string contains a custom emoji.
   * @param {string} string - String to check whether or not it has a custom emoji
   * @returns {(number|"No custom emoji detected")}
   */
  hasCustomEmoji(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
     return string.toString().match(/<a?:(\w{2,32}):(\d{17,19})>/) ? string.toString().match(/<a?:(\w{2,32}):(\d{17,19})>/gi).length : "No custom emoji detected";
  }
  
  /**
   * Creates a progress bar.
   * @param {number} inTotal - Elapsed
   * @param {number} Total - Goal
   * @typedef {Object} progressBarOptions
   * @property {string} elapsedChar - Character to fill the elapsed portion of the progress bar
   * @property {string} progressChar - Character for the current progress
   * @property {string} emptyChar - Character to fill the empty portion of the progress bar or in other words, the unreached portion
   * @param {?progressBarOptions} options - Options for the progress bar
   * @returns {string}
   */
  createProgressBar(inTotal, Total, options = {}) {
    if (!Number.isInteger(inTotal) || !Number.isInteger(Total)) {
        throw new TypeError("Both the first and the second parameters are required and must be typeof number.");
    }

    if (parseInt(inTotal) > parseInt(Total)) {
        throw new RangeError("First parameter must be lesser than the second parameter");
    }

    options = {
        elapsedChar: options.elapsedChar || "=",
        progressChar: options.progressChar || ">",
        emptyChar: options.emptyChar || "-"
    }, available = (inTotal / Total) * 100;

    let progressBar = options.elapsedChar.toString().repeat(available) + options.progressChar.toString() + options.emptyChar.toString().repeat(100 - (available + (inTotal === Total ? 0 : 1)));
    return progressBar.length > 100 ? progressBar.slice(1) : progressBar;
}
  
  /**
   * Gets the abbreviation of a string.
   * @param {string} string - String to get an abbreviation of
   * @returns {string}
   */
  toAbbreviation(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
     return string.toString().includes(" ") ? string.toString().trim().split(" ").map(element => element.charAt(0)).join("") : string.toString();
  }
  
  /**
   * This function is related to discord bot's tokens, generating a fake token.
   * @returns {string}
   */
  fakeToken() {
    let IDs = [17, 18, 19],
        chars = [..."abcdefghijklmnopqrstuvwxyz1234567890"],
        options = [0, 1];
    return (Buffer.from(Array.from({
        length: IDs[Math.floor(Math.random() * IDs.length)]
    }, () => {
        let nums = Array.from({
            length: 10
        }, (a, r) => r);
        return nums[Math.floor(Math.random() * nums.length)];
    }).join("")).toString("base64") + "." + Array.from({
        length: 33
    }, (a, r) => r === 5 ? "." : chars[Math.floor(Math.random() * chars.length)]).reduce((acc, current) => (acc += options[Math.floor(Math.random() * options.length)] === 1 ? current.toUpperCase() : current, acc), "")).slice(0, 59);
}

  /**
   * Shortens a string by a specified amount
   * @param {string} string - String to shorten
   * @param {number} length - Amount of chars to shorten by
   * @param {?string} placeholder - The string to concatenate to be shortened string
   * @returns {string}
   */
  shorten(string, length, placeholder) {
      if (typeof string !== "string") throw new TypeError("First parameter must be a type of string");
      if (!Number.isInteger(length)) throw new TypeError("Second parameter must be a type of number");
      return string.slice(0, length) + (placeholder ? placeholder.toString() : "...");
  }

  // By Voltrex Master
}

module.exports = Functions;