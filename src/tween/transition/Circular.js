//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * TODO: ...
 * 
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.tween.Circular = function() {
    console.warn("This class is not meant to be instantiated; all content is static.");
};

//------------------------------------------------------------------------------
// Public static methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} t ...
 * @param {number} b ...
 * @param {number} c ...
 * @param {number} d ...
 *
 * @return {number}
 */
rune.tween.Circular.easeIn = function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};

/**
 * TODO: ...
 *
 * @param {number} t ...
 * @param {number} b ...
 * @param {number} c ...
 * @param {number} d ...
 *
 * @return {number}
 */
rune.tween.Circular.easeOut = function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};

/**
 * TODO: ...
 *
 * @param {number} t ...
 * @param {number} b ...
 * @param {number} c ...
 * @param {number} d ...
 *
 * @return {number}
 */
rune.tween.Circular.easeInOut = function(t, b, c, d) {
    if ((t /= d * 0.5) < 1) return -c * 0.5 * (Math.sqrt(1 - t * t) - 1) + b;
    return c * 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};