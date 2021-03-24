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
rune.tween.Back = function() {
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
 * @param {number} s ...
 *
 * @return {number}
 */
rune.tween.Back.easeIn = function(t, b, c, d, s) {
    s = s || 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

/**
 * TODO: ...
 *
 * @param {number} t ...
 * @param {number} b ...
 * @param {number} c ...
 * @param {number} d ...
 * @param {number} s ...
 *
 * @return {number}
 */
rune.tween.Back.easeOut = function(t, b, c, d, s) {
    s = s || 1.70158;
    if ((t /= d * 0.5) < 1) {
        return c * 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    }

    return c / 2 * ((t -= 2) * t * ((( s*= (1.525)) + 1) * t + s) + 2) + b;
};

/**
 * TODO: ...
 *
 * @param {number} t ...
 * @param {number} b ...
 * @param {number} c ...
 * @param {number} d ...
 * @param {number} s ...
 *
 * @return {number}
 */
rune.tween.Back.easeInOut = function(t, b, c, d, s) {
    s = s || 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};