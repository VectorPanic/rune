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
rune.tween.Expo = function() {
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
rune.tween.Expo.easeIn = function(t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
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
rune.tween.Expo.easeOut = function(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
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
rune.tween.Expo.easeInOut = function(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d * 0.5) < 1) return c * 0.5 * Math.pow(2, 10 * (t - 1)) + b;
    return c * 0.5 * (-Math.pow(2, -10 * --t) + 2) + b;
};