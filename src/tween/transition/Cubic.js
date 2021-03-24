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
rune.tween.Cubic = function() {
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
rune.tween.Cubic.easeIn = function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
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
rune.tween.Cubic.easeOut = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
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
rune.tween.Cubic.easeInOut = function(t, b, c, d) {
    if ((t /= d * 0.5) < 1) return c * 0.5 * t * t * t + b;
    return c * 0.5 * ((t -= 2) * t * t + 2) + b;
};