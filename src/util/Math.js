//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the class.
 *
 * @constructor
 *
 * @class
 * @classdesc
 *
 * TODO: ...
 */
rune.util.Math = function() {
    console.warn("This class is not meant to be instantiated; all content is static.");
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constant {number}
 * @default 0.01745329251
 */
rune.util.Math.DEG_TO_RAD = Math.PI / 180.0;

/**
 * ...
 *
 * @constant {number}
 */
rune.util.Math.RAD_TO_DEG = 180.0 / Math.PI;

//------------------------------------------------------------------------------
// Public static methods
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @param {number} n ...
 * 
 * @returns {number} ...
 */
rune.util.Math.abs = function(n) {
    return (n > 0) ? n : -n;
};

/**
 * ...
 *
 * @param {number} n ...
 * 
 * @returns {number} ...
 */
rune.util.Math.avg = function(n) {
    var sum = 0;
    var i = n;
    while (i--) {
        sum += (n[i]);
    }
    
    return sum / n;
};

/**
 * ...
 *
 * @param {number} n ...
 * 
 * @returns {number} ...
 */
rune.util.Math.ceil = function(n) {
    var t = ~~n;
    return (t === n) ? n : (n > 0) ? (t + 1) : (t - 1);
};

/**
 * ...
 *
 * @param {number} n ...
 * 
 * @returns {boolean} ...
 */
rune.util.Math.chance = function(n) {
    n = n || 50;
    n = Math.min(n, 100);
    n = Math.max(n,   0);

    return n >= Math.random() * 100;
};

/**
 * TODO: ...
 *
 * @param {number} num ...
 * @param {number} min ...
 * @param {number} max ...
 * 
 * @return {number} ...
 */
rune.util.Math.clamp = function(num, min, max) {
    return Math.min(Math.max(num, min), max);
};

/**
 * ...
 *
 * @param {number} n ...
 * 
 * @returns {number} ...
 */
rune.util.Math.cos = function(n) {
    return rune.util.Math.sin(n + 1.570796327);
};

/**
 * ...
 *
 * @param {number} angle ...
 * 
 * @returns {number} ...
 */
rune.util.Math.degreesToRadians = function(angle) {
    return angle * rune.util.Math.DEG_TO_RAD;
};

/**
 * ...
 * 
 * @param {number} a ...
 * @param {number} b ...
 * 
 * @returns {number} ...
 */
rune.util.Math.diff = function(a, b) {
    return Math.abs(a - b);
};

/**
 * ...
 * 
 * @param {number} x1 ...
 * @param {number} y1 ...
 * @param {number} x2 ...
 * @param {number} y2 ...
 * 
 * @returns {number} ...
 */
rune.util.Math.distance = function(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt(a * a + b * b);
};

/**
 * ...
 *
 * @param {number} n ...
 * 
 * @returns {number} ...
 */
rune.util.Math.floor = function(n) {
    return ~~n;
};

/**
 * ...
 *
 * @param {number} bytes ...
 * @param {number} decimals ...
 * 
 * @returns {string} ...
 */
rune.util.Math.formatBytes = function(bytes, decimals) {
    decimals = decimals || 2;

    if (bytes === 0) return "0 Bytes";

    var k     = 1024;
    var dm    = decimals < 0 ? 0 : decimals;
    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i     = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * TODO: ...
 * 
 * @param {number} num ...
 * @param {number} max ...
 * 
 * @return {number} ...
 */
rune.util.Math.percentDec = function(num, max) {
    return rune.util.Math.clamp(1 - (num / max), 0, 1);
};

/**
 * ...
 * 
 * @param {number} num ...
 * @param {number} max ...
 * 
 * @returns {number} ...
 */
rune.util.Math.percentInc = function(num, max) {
    return rune.util.Math.clamp((num / max), 0, 1);
};

/**
 * ...
 * 
 * @param {number} n ...
 * 
 * @returns {boolean} ...
 */
rune.util.Math.isEven = function(n) {
    return (parseInt(n, 10) & 1) === 0;
};

/**
 * ...
 *
 * @param {number} n ...
 * 
 * @returns {boolean} ...
 */
rune.util.Math.isOdd = function(n) {
    return (parseInt(n, 10) & 1) !== 0;
};

/**
 * ...
 * 
 * @param {number} n ...
 * 
 * @returns {boolean} ...
 */
rune.util.Math.isPowerOfTwo = function(n) {
    return (n & (n - 1)) === 0;
};

/**
 * ...
 *
 * @param {number} min ...
 * @param {number} max ...
 * 
 * @returns {number} ...
 */
rune.util.Math.random = function(min, max) {
    min = (typeof min === "number") ? min : Number.MIN_VALUE;
    max = (typeof max === "number") ? max : Number.MAX_VALUE;
    
    return Math.random() * (max - min) + min;
};

/**
 * ...
 *
 * @param {number} min ...
 * @param {number} max ...
 * 
 * @returns {number} ...
 */
rune.util.Math.randomInt = function(min, max) {
    min = (typeof min === "number") ? min : Number.MIN_VALUE;
    max = (typeof max === "number") ? max : Number.MAX_VALUE;

    return Math.round((Math.random() * (max - min)) + min);
};

/**
 * ...
 *
 * @param {number} radians ...
 * 
 * @return {number} ...
 */
rune.util.Math.radiansToDegrees = function(radians) {
    return radians * rune.util.Math.RAD_TO_DEG;
};

/**
 * ...
 * 
 * @param {number} n ...
 * 
 * @return {number} ...
 */
rune.util.Math.sin = function(n) {
    n *= 0.3183098862;

    if (n > 1) {
        n -= (Math.ceil( n) >> 1) << 1;
    } else if (n < -1) {
        n += (Math.ceil(-n) >> 1) << 1;
    }

    if (n > 0) {
        return n * (3.1 + n * (0.5 + n * (-7.2 + n * 3.6)));
    } else {
        return n * (3.1 - n * (0.5 + n * ( 7.2 + n * 3.6)));
    }
};

/**
 * TODO: ...
 *
 * @param {number} num ...
 * @param {number} min ...
 * @param {number} max ...
 * 
 * @returns {number} ...
 */
rune.util.Math.wrap = function(num, min, max) {
    var range = max - min + 1;

    if (num < min) {
        num += range * parseInt(((min - num) / range + 1), 10);
    }

    return min + (num - min) % range;
};