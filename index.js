class Functions {
  constructor() {
    this.version = require("./package.json").version;
  }
  
  /**
   * Proper cases a string.
   * @param {string} string
   * @param {?boolean} lowerCaseBoolean
   */
  toProperCase(string, lowerCaseBoolean) {
    if (!string) {
      throw new TypeError("Expected a string");
    }
    
    return !lowerCaseBoolean || lowerCaseBoolean === false || lowerCaseBoolean !== true ? string.toString().replace(/(\b\w)/gi, w => w.toUpperCase()) : string.toString().toLowerCase().replace(/(\b\w)/gi, w => w.toUpperCase());
  }
  
  /**
   * Chunks a string to the specified amount of chars.
   * @param {string} string
   * @param {number} ChunkBy
   */
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
  
      let chunksNum = Math.ceil(stringToChunk.length / parseInt(ChunkBy));
      let chunks = new Array(chunksNum);
      for (let i = 0, o = 0; i < parseInt(chunksNum); ++i, o += parseInt(ChunkBy)) {
        chunks[i] = stringToChunk.substr(o, parseInt(ChunkBy));
      }
      
      return chunks;
  }
  
  /**
   * Scrambles a string.
   * @param {string} string
   */
  scramble(string) {
    if (!string) {
      throw new TypeError("Expected a string");
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
   * @param {string} string
   */
  mock(string) {
    if (!string) {
      throw new TypeError("Expected  string.");
    }
    
    let chunksFunction = this.toChunks;
    
    return chunksFunction(string.toString().toLowerCase(), 2).map(e => e.slice(0, 1) + e.slice(1).toUpperCase()).join("");
  }
  
  /**
   * Emojifies a string.
   * @param {string} string
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
   * @param {string} string
   */
  hasCustomEmoji(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
     return string.toString().match(/<a?:(\w{2,32}):(\d{17,19})>/) ? string.toString().match(/<a?:(\w{2,32}):(\d{17,19})>/gi).length : "No custom emoji detected";
  }
  
  /**
   * Creates a progress bar.
   * @param {number} inTotal
   * @param {number} Total
   * @param {?Object} options
   */
  createProgressBar(inTotal, Total, options = {}) {
    if (!Number.isInteger(inTotal) || !Number.isInteger(Total)) {
      throw new TypeError("Both the first and the second parameters are required and must be typeof number.");
    }
    
    if (parseInt(inTotal) > parseInt(Total)) {
      throw new RangeError("First parameter must be lesser than the second parameter.");
    }

    options = {
      elapsedChar: options.elapsedChar || "=",
      progressChar: options.progressChar || ">",
      emptyChar: options.emptyChar || "-"
    };
    
    let progressBar = "", fillLine;
    
    for (fillLine = 0; fillLine < (parseInt(inTotal) / parseInt(Total)) * 50; fillLine++) {
      progressBar += options.elapsedChar.toString();
    }
    
    progressBar += options.progressChar.toString();
    
    for (let emptyLine = 0; emptyLine < 50 - fillLine - 1; emptyLine++) {
      progressBar += options.emptyChar.toString();
    }
    
     if (progressBar.length > 50) progressBar = progressBar.slice(0, -2) + options.progressChar;
     
    return progressBar;
  }
  
  /**
   * Gets the abbreviation of a string.
   * @param {string} string
   */
  toAbbreviation(string) {
    if (!string) {
      throw new TypeError("Expected a string.");
    }
    
     return string.toString().includes(" ") ? string.toString().trim().split(" ").map(element => element.charAt(0)).join("") : string.toString();
  }
  
  /**
   * This function is related to discord bot's tokens, generating a fake token.
   */
  fakeToken() {
let allC = "qwertyuiopasdfghjklzxcbnm1234567890";
let arrayAll = [...allC];
let ids = [17, 18, 19];
let idLength = ids[Math.floor(Math.random() * ids.length)];
let numArr = arrayAll.filter(e => e.match(/\d/));
let charArr = arrayAll.filter(e => e.match(/\w/));

let tokenString = "";
for (let i = 0; i < idLength; i++) {
tokenString += numArr[Math.floor(Math.random() * numArr.length)];
}

tokenString = Buffer.from(tokenString).toString("base64") + ".";

let mtp = "";
for (let j = 0; j < 6; j++) {
mtp += charArr[Math.floor(Math.random() * charArr.length)];
}

mtp = [...mtp].map(e => {
let op = [0, 1];
let ro = op[Math.floor(Math.random() * op.length)];

if (ro === 1) {
return e.toUpperCase();
} else {
return e;
}
}).join("");

tokenString += mtp + ".";

let uidr = "";
for (let v = 0; v < 26; v++) {
uidr += arrayAll[Math.floor(Math.random() * arrayAll.length)];
}

uidr = [...uidr].map(e => {
let opuid = [0, 1];
let rouid = opuid[Math.floor(Math.random() * opuid.length)];

if (rouid === 1) {
return e.toUpperCase();
} else {
return e;
}
}).join("");

tokenString += uidr;

return tokenString;
}
  // By Voltrex Master
}

module.exports = Functions;