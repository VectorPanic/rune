//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.display.DisplayObject
 *
 * @param {number} [width] ...
 * @param {number} [height] ...
 * @param {string} [primary] ...
 * @param {string} [secondary] ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.ui.Progressbar = function(width, height, primary, secondary) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {string}
     */
    this.secondary = secondary || "#ff004d";

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_progress = 0.0;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     *  TODO: ...
     */
    rune.display.DisplayObject.call(this, 0, 0, width, height, primary);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.Progressbar.prototype = Object.create(rune.display.DisplayObject.prototype);
rune.ui.Progressbar.prototype.constructor = rune.ui.Progressbar;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {string} primary
 * @memberof rune.ui.Progressbar
 * @instance
 */
Object.defineProperty(rune.ui.Progressbar.prototype, "primary", {
    /**
     * @this rune.ui.Progressbar
     * @ignore
     */
    get : function() {
        return this.fillColor;
    },
    
    /**
     * @this rune.ui.Progressbar
     * @ignore
     */
    set : function(value) {
        this.fillColor = value;
    }
});

/**
 * TODO: ...
 *
 * @member {number} progress
 * @memberof rune.ui.Progressbar
 * @instance
 */
Object.defineProperty(rune.ui.Progressbar.prototype, "progress", {
    /**
     * @this rune.ui.Progressbar
     * @ignore
     */
    get : function() {
        return this.m_progress;
    },
    
    /**
     * @this rune.ui.Progressbar
     * @ignore
     */
    set : function(value) {
        if (this.m_progress !== value) {
            this.m_progress   = value;

            this.breakCache();
        }
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Progressbar.prototype.render = function() {
    rune.display.DisplayObject.prototype.render.call(this);
    this.m_renderProgress();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.ui.Progressbar.prototype.m_renderProgress = function() {
    this["canvas"].drawRectFill(
        0,
        0,
        this.m_canvas.width * this.progress,
        this.m_canvas.height,
        this.secondary
    );
};