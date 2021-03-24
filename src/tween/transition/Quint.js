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
rune.tween.Quint = function() {
    console.warn("This class is not meant to be instantiated.");
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
rune.tween.Quint.easeIn = function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
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
rune.tween.Quint.easeOut = function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
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
rune.tween.Quint.easeInOut = function(t, b, c, d) {
    if ((t /= d * 0.5) < 1) return c * 0.5 * t * t * t * t * t + b;
    return c * 0.5 * ((t -= 2) * t * t * t * t + 2) + b;
};