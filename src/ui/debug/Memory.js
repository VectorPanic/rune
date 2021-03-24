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
 * Represents a tool that visualizes memory consumption.
 */
rune.ui.Memory = function() {

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.text.BitmapField.call(this, " 16.0 MB ");
}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.Memory.prototype = Object.create(rune.text.BitmapField.prototype);
rune.ui.Memory.prototype.constructor = rune.ui.Memory;

//------------------------------------------------------------------------------
// Override protected methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Memory.prototype.init = function() {
    rune.text.BitmapField.prototype.init.call(this);
    this.text = " 16.0 MB ";
    this.width = 54;
    this.fillColor = "#252525";
};

/**
 * @inheritDoc
 */
rune.ui.Memory.prototype.update = function(step) {
    rune.text.BitmapField.prototype.update.call(this, step);
    this.text = " " + rune.util.Math.formatBytes(window.performance.memory.usedJSHeapSize, 1) + " ";
};