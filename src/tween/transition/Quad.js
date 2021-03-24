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
rune.tween.Quad = function() {
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
rune.tween.Quad.easeIn = function(t, b, c, d) {
    return c * (t /= d) * t + b;
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
rune.tween.Quad.easeOut = function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
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
rune.tween.Quad.easeInOut = function(t, b, c, d) {
    if ((t /= d * 0.5) < 1) return c * 0.5 * t * t + b;
    return -c * 0.5 * ((--t) * (t - 2) - 1) + b;
};