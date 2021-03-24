//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.text.BitmapField
 *
 * @class
 * @classdesc
 * 
 * Represents a tool that visualizes the time (in milliseconds) it takes to 
 * update a frame. The tool is updated at one second intervals and visualizes 
 * the longest update time for the previous interval.
 */
rune.ui.UpdateBudget = function() {

	//--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Interval counter.
     *
     * @type {number}
     * @private
     */
    this.m_interval = 0.0;

    /**
     * Peak value.
     *
     * @type {number}
     * @private
     */
    this.m_peak = 0.0;

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.text.BitmapField.call(this, " 00 ");
}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.UpdateBudget.prototype = Object.create(rune.text.BitmapField.prototype);
rune.ui.UpdateBudget.prototype.constructor = rune.ui.UpdateBudget;

//------------------------------------------------------------------------------
// Override protected methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.UpdateBudget.prototype.init = function() {
    rune.text.BitmapField.prototype.init.call(this);
    this.text = " 00 ";
    this.width = 24;
    this.fillColor = "#252525";
};

/**
 * @inheritDoc
 */
rune.ui.UpdateBudget.prototype.update = function(step) {
    rune.text.BitmapField.prototype.update.call(this, step);
    
    this.m_peak = Math.max(
        Math.round(this['application'].time.update.duration),
        this.m_peak
    );

    this.m_interval += this['application']['time']['step'];
    if (this.m_interval >= 1000) {
        this.m_interval  = 0;
        
        this.text = " " + this.m_peak + " ";
        this.m_peak = 0.0;
    }
};