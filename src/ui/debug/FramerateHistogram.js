//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayObject
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * @param {number} [width] ...
 * @param {number} [height] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a tool that visualizes image refresh rate per second over time.
 */
rune.ui.FramerateHistogram = function(x, y, width, height) {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * List containing bars.
     *
     * @type {Array.<rune.ui.FramerateHistogramBar>}
     * @protected
     * @ignore
     */
    this.m_bars = [];

    /**
     * Width of individual bar. 
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_barWidth = 1;

    /**
     * Total number of bars.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_numBars = 0;

    /**
     * Interval counter.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_updateDelay = 0.0;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObject.call(this, x, y, width, height, "#252525");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.FramerateHistogram.prototype = Object.create(rune.display.DisplayObject.prototype);
rune.ui.FramerateHistogram.prototype.constructor = rune.ui.FramerateHistogram;

//------------------------------------------------------------------------------
// Override protected methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.FramerateHistogram.prototype.init = function() {
    rune.display.DisplayObject.prototype.init.call(this);
    this.m_initBars();
};

/**
 * @inheritDoc
 */
rune.ui.FramerateHistogram.prototype.update = function(step) {
    rune.display.DisplayObject.prototype.update.call(this, step);
    this.m_updateInterval(step);
};

/**
 * @inheritDoc
 */
rune.ui.FramerateHistogram.prototype.render = function() {
    rune.display.DisplayObject.prototype.render.call(this);
    this.m_renderBars();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Creates bars.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.FramerateHistogram.prototype.m_initBars = function() {
    this.m_numBars = ~~(this.width / this.m_barWidth);
    for (var i = 0; i < this.m_numBars; i++) {
        this.m_bars.push(this.m_getBar(0));
    }
};

/**
 * Updates update interval.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.FramerateHistogram.prototype.m_updateInterval = function(step) {
    this.m_updateDelay += step;
    if (this.m_updateDelay >= 1000) {
        this.m_updateDelay  = 0;
        this.m_updateBars();
        this.breakCache();
    }
};

/**
 * Updates bars.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.FramerateHistogram.prototype.m_updateBars = function() {
    this.m_bars.unshift(this.m_getBar(this['application']['time']['currentFramerate']));
    if (this.m_bars.length >= this.m_numBars) {
        this.m_bars.splice(this.m_bars.length - 1, 1);
    }
};

/**
 * Renders bars.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.FramerateHistogram.prototype.m_renderBars = function() {
    for (var i = 0, len = this.m_bars.length; i < len; i++) {
        this.m_bars[i].y = this.height - this.m_bars[i].height;
        this.m_bars[i].x = i  * this.m_bars[i].width;
        
        this.m_canvas.drawRectFill(
            this.m_bars[i].x,
            this.m_bars[i].y,
            this.m_bars[i].width,
            this.m_bars[i].height,
            this.m_bars[i].color
        );
    }
};

/**
 * Configure bar.
 *
 * @param {number} value Current framerate.
 *
 * @return {rune.ui.FramerateHistogramBar}
 * @protected
 * @ignore
 */
rune.ui.FramerateHistogram.prototype.m_getBar = function(value) {
    var bar = new rune.ui.FramerateHistogramBar(0, 0, this.m_barWidth, this.height);
        bar.update(value, (this['application']['time']) ? this['application']['time']['targetFramerate'] : 60);

    return bar;
};