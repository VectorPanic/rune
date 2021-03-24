//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.geom.Rectangle
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * @param {number} [width] ...
 * @param {number} [height] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bar of the current frame rate.
 */
rune.ui.FramerateHistogramBar = function(x, y, width, height) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Current color.
     *
     * @type {string}
     */
    this.color = rune.ui.FramerateHistogramBar.COLOR_RED;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.geom.Rectangle.call(this, x, y, width, height);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rune.ui.FramerateHistogramBar.prototype = Object.create(rune.geom.Rectangle.prototype);
rune.ui.FramerateHistogramBar.prototype.constructor = rune.ui.FramerateHistogramBar;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * Green color; indicates good frame rate per second (FPS).
 *
 * @const {string}
 */
rune.ui.FramerateHistogramBar.COLOR_GREEN = "#00e232";

/**
 * Orange color; indicates choppy frame rate per second (FPS).
 *
 * @const {string}
 */
rune.ui.FramerateHistogramBar.COLOR_ORANGE = "#ffa300";

/**
 * Red color; indicates poor frame rate per second (FPS).
 *
 * @const {string}
 */
rune.ui.FramerateHistogramBar.COLOR_RED = "#ff004d";

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the current bar. This includes changes in height and color.
 *
 * @param {number} value Current framerate.
 * @param {number} [max=60] Maximum framerate.
 *
 * @return {undefined}
 */
rune.ui.FramerateHistogramBar.prototype.update = function(value, max) {
    max = max || 60.0;
    this.m_updateHeight(value, max);
    this.color = this.m_getColor(value, max);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Updates the bar height to represent the current frame rate. 
 *
 * @param {number} value Current framerate.
 * @param {number} [max=60] Maximum framerate.
 *
 * @return {undefined}
 * @private
 */
rune.ui.FramerateHistogramBar.prototype.m_updateHeight = function(value, max) {
    max = max || 60.0;
    this.height = ~~((value / max) * this.height);
};

/**
 * Retrieves the color that represents the current frame rate.
 *
 * @param {number} value Current framerate.
 * @param {number} [max=60] Maximum framerate.
 *
 * @return {string} Color in hex string.
 * @private
 */
rune.ui.FramerateHistogramBar.prototype.m_getColor = function(value, max) {
    max = max || 60.0;
    value = (value / max) * 100;
    if (value < 60) return rune.ui.FramerateHistogramBar.COLOR_RED;
    if (value < 80) return rune.ui.FramerateHistogramBar.COLOR_ORANGE;
    return rune.ui.FramerateHistogramBar.COLOR_GREEN;    
};