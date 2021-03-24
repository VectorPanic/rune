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
rune.tween.Sine = function() {
    console.warn("This class is not meant to be instantiated; all content is static.");
};

//------------------------------------------------------------------------------
// Private static constants
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @const {number}
 * @private
 */
rune.tween.Sine.HALF_PI = Math.PI * 0.5;

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
rune.tween.Sine.easeIn = function(t, b, c, d) {
    return -c * Math.cos(t / d * rune.tween.Sine.HALF_PI) + c + b;
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
rune.tween.Sine.easeOut = function(t, b, c, d) {
    return c * Math.sin(t / d * rune.tween.Sine.HALF_PI) + b;
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
rune.tween.Sine.easeInOut = function(t, b, c, d) {
    return -c * 0.5 * (Math.cos(Math.PI * t / d) - 1) + b;
};