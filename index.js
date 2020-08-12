class Functions {
  constructor() {
    this.version = require("./package.json").version;
  }
  
  toProperCase(string, lowerCaseBoolean) {
    if (!string) {
      throw new TypeError("Expected a string");
    }
    
    /**Check to see if the second parameter {Boolean} exists or true to convert the string to lower case to return a perfect proper cased string
     * @type {String}
     */
    return !lowerCaseBoolean || lowerCaseBoolean === false || lowerCaseBoolean !== true ? string.toString().replace(/(\b\w)/gi, w => w.toUpperCase()) : string.toString().toLowerCase().replace(/(\b\w)/gi, w => w.toUpperCase());
  }
  
  toChunks(string, ChunkBy) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    if (!ChunkBy || isNaN(ChunkBy)) {
      throw new TypeError("Expected a char split position in the string as the second parameter, and it must be a number.");
    }
    
    let stringToChunk;
    if (typeof string !== "string") { stringToChunk = string.toString();
  } else {
      stringToChunk = string;
  }
  
  /**
   * Checks how many chars exists in the provided string's length with {ChunkBy} and creates a new array according to that number given from the check, the loop through and define every element of the array by the substringed string and it's left overs.
   * @type {String}
   */
      let chunksNum = Math.ceil(stringToChunk.length / parseInt(ChunkBy));
      let chunks = new Array(chunksNum);
      for (let i = 0, o = 0; i < parseInt(chunksNum); ++i, o += parseInt(ChunkBy)) {
        chunks[i] = stringToChunk.substr(o, parseInt(ChunkBy));
      }
      
      return chunks;
  }
  
  scramble(string) {
    if (!string) {
      throw new TypeError("Expected a string");
    }
    
    // Before we continue, we implement a new function to shuffle the elements of an array as this will be required
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
    
    /**
     * Now we use the spread operator {...} in an array with the string included to make the entire string and array so we can shuffle it and return the scrambled string.
     * @type {String}
     */
     return shuffle([...string.toString()]).join("");
  }
  
  mock(string) {
    if (!string) {
      throw new TypeError("Expected  string.");
    }
    
    // We require the chunks function because it's needed here.
    let chunksFunction = this.toChunks;
    
    /**
     * Chunking the string by 2 elements and mapping them to convert it's second char of every element to an upper case char, so it comes out as a mocked string.
     * @type {String}
     */
    return chunksFunction(string.toString().toLowerCase(), 2).map(e => e.slice(0, 1) + e.slice(1).toUpperCase()).join("");
  }
  
  emojify(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    // We create an object containing our special characters to identify correct emojis of the numbers and some other characters
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
    
    /**
     * We use the spread operator {...} to turn the string into a perfect single element array and map it's elements to see if it matches a alphabetical character, if so lower case the element and get the emoji, if not we pick it from the special object.
     * @type {String}
     */
    return [...string.toString()].map(e => e.match(/\w/) ? `:regional_indicator_${e.toLowerCase()}:` : specialObj[e] || e).join("");
  }
  
  // This function is related to discord
  hasCustomEmoji(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    /**
     * Here we check if the string matches a custom emoji regex, if so return it's amount of how many it did match, if not then return No custom emoji detected.
     * @type {String}
     */
     return string.toString().match(/<a?:(\w{2,32}):(\d{17,19})>/) ? string.toString().match(/<a?:(\w{2,32}):(\d{17,19})>/gi).length : "No custom emoji detected";
  }
  
  createProgressBar(inTotal, Total, options = {}) {
    if (!Number.isInteger(inTotal) || !Number.isInteger(Total)) {
      throw new TypeError("Both the first and the second parameters are required and must be typeof number.");
    }
    
    if (parseInt(inTotal) > parseInt(Total)) {
      throw new RangeError("First parameter must be lesser than the second parameter.");
    }
    
    // We turn options that was an empty object in the parameter to a useful object but if options were included in the parameter it will be used in this object.
    options = {
      elapsedChar: options.elapsedChar || "=",
      progressChar: options.progressChar || ">",
      emptyChar: options.emptyChar || "-"
    };
    
    let progressBar = "", fillLine;
    
    // Here we loop through the progressBar string and add the {options.elpasedChar} to it while there's {inTotal} left in the {Total}.
    for (fillLine = 0; fillLine < (parseInt(inTotal) / parseInt(Total)) * 50; fillLine++) {
      progressBar += options.elapsedChar.toString();
    }
    
    // Add the {options.progressChar} to the progress bar after the first loop.
    progressBar += options.progressChar.toString();
    
    // Here we loop through the progressBar again but this time we add {options.emptyChar} to the progressBar while we subtract the amount of {options.elapsedChar} we added to the string from 50 and finally return {progressBar}.
    for (let emptyLine = 0; emptyLine < 50 - fillLine - 1; emptyLine++) {
      progressBar += options.emptyChar.toString();
    }
    
    /**
     * After all that loop we finally return the perfect progress bar depending on the parameters given.
     * @type {String}
     */
    return progressBar;
  }
  
  toAbbreviation(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
    /**
     * We first trim to get rid of the trailing spaces then split up the string by spaces and map them to get the first char of every element if any spaces exist in the provided string.
     * @type {String}
     */
     return string.toString().includes(" ") ? string.toString().trim().split(" ").map(element => element.charAt(0)).join("") : string.toString();
  }
  // By Voltrex Master
}

module.exports = Functions;