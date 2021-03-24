//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Debugger.
 *
 * @constructor
 * @extends {rune.display.DisplayObjectContainer}
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * @param {number} [width] ...
 * @param {number} [height] ...
 * 
 * @class
 * @classdesc
 * 
 * Represents a debugger for performance testing and troubleshooting.
 */
rune.ui.Debugger = function(x, y, width, height) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.ui.Framerate}
     * @private
     */
    this.m_framerate = null;

    /**
     * ...
     *
     * @type {rune.ui.FramerateHistogram}
     * @private
     */
    this.m_framerateHistogram = null;

    /**
     * ...
     *
     * @type {rune.ui.UpdateBudget}
     * @private
     */
    this.m_updateBudget = null;

    /**
     * ...
     *
     * @type {rune.ui.RenderBudget}
     * @private
     */
    this.m_renderBudget = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObjectContainer.call(this, x, y, width, height, "");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.Debugger.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.ui.Debugger.prototype.constructor = rune.ui.Debugger;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Debugger.prototype.update = function(step) {
    rune.display.DisplayObjectContainer.prototype.update.call(this, step);
    this.m_updateInput();
};

/**
 * @inheritDoc
 */
rune.ui.Debugger.prototype.dispose = function() {
    this.m_disposeMemory();
    this.m_disposeRenderBudget();
    this.m_disposeUpdateBudget();
    this.m_disposeFramerateHistogram();
    this.m_disposeFramerate();
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Debugger.prototype.m_construct = function() {
    rune.display.DisplayObjectContainer.prototype.m_construct.call(this);
    this.m_constructFramerate();
    this.m_constructFramerateHistogram();
    this.m_constructUpdateBudget();
    this.m_constructRenderBudget();
    this.m_constructMemory();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the tool that visualizes the current image refresh rate.
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_constructFramerate = function() {
	this.m_disposeFramerate();
    if (this.m_framerate == null) {
    	this.m_framerate = new rune.ui.Framerate();
    	this.addChild(this.m_framerate);
    } else throw new Error();
};

/**
 * Creates a histogram of the application's image refresh rate.
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_constructFramerateHistogram = function() {
    this.m_disposeFramerateHistogram();
    if (this.m_framerateHistogram == null) {
        this.m_framerateHistogram = new rune.ui.FramerateHistogram(28, 0, 40, 10);
        this.addChild(this.m_framerateHistogram);
    } else throw new Error();
};

/**
 * Creates the tool that shows how much time is spent in the update loop.
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_constructUpdateBudget = function() {
    this.m_disposeUpdateBudget();
    if (this.m_updateBudget == null) {
        this.m_updateBudget = new rune.ui.UpdateBudget();
        this.m_updateBudget.x = 72;
        this.addChild(this.m_updateBudget);
    } else throw new Error();
};

/**
 * Creates the tool that shows how much time is spent in the rendering loop.
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_constructRenderBudget = function() {
    this.m_disposeRenderBudget();
    if (this.m_renderBudget == null) {
        this.m_renderBudget = new rune.ui.RenderBudget();
        this.m_renderBudget.x = 100;
        this.addChild(this.m_renderBudget);
    } else throw new Error("@todo: ...");
};

/**
 * Creates the tool that visualizes the application's memory consumption.
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_constructMemory = function() {
    this.m_disposeMemory();
    if (this.m_memory == null) {
        this.m_memory = new rune.ui.Memory();
        this.m_memory.x = 128;
        this.addChild(this.m_memory);
    } else throw new Error();
};

/**
 * Checks whether the debugger should be displayed or hidden.
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_updateInput = function() {
    if (this['keyboard'].pressed("SHIFT")) {
        if (this['keyboard'].justPressed("D")) {
            this['visible'] = !this['visible'];
        }
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_disposeMemory = function() {
    if (this.m_memory != null) {
        this.m_memory.dispose();
        this.m_memory = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_disposeRenderBudget = function() {
    if (this.m_renderBudget != null) {
        this.m_renderBudget.dispose();
        this.m_renderBudget = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_disposeUpdateBudget = function() {
    if (this.m_updateBudget != null) {
        this.m_updateBudget.dispose();
        this.m_updateBudget = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_disposeFramerateHistogram = function() {
    if (this.m_framerateHistogram != null) {
        this.m_framerateHistogram.dispose();
        this.m_framerateHistogram = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Debugger.prototype.m_disposeFramerate = function() {
    if (this.m_framerate != null) {
        this.m_framerate.dispose();
        this.m_framerate = null;
    }
};