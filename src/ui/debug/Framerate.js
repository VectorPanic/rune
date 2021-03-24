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
 * Represents a tool that visualizes the application's image refresh rate per 
 * second (FPS). 
 */
rune.ui.Framerate = function() {

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

rune.ui.Framerate.prototype = Object.create(rune.text.BitmapField.prototype);
rune.ui.Framerate.prototype.constructor = rune.ui.Framerate;

//------------------------------------------------------------------------------
// Override protected methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Framerate.prototype.init = function() {
    rune.text.BitmapField.prototype.init.call(this);
    this.text = " 00 ";
    this.width = 24;
    this.fillColor = "#252525";
};

/**
 * @inheritDoc
 */
rune.ui.Framerate.prototype.update = function(step) {
    rune.text.BitmapField.prototype.update.call(this, step);
    this.text = " " + this['application']['time']['currentFramerate'] + " ";
};