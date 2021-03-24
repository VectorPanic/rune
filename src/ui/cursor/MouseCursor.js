//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new mouse cursor.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} [x=0] Current x position.
 * @param {number} [y=0] Current y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents a mouse cursor.
 */
rune.ui.MouseCursor = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.Sprite.call(this, x || 0, y || 0, 16, 16, "", "rune_image_mouse_cursor_16x16");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.MouseCursor.prototype = Object.create(rune.display.Sprite.prototype);
rune.ui.MouseCursor.prototype.constructor = rune.ui.MouseCursor;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.ui.MouseCursor.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updatePosition(step);
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Updates the current position of the mouse pointer. The position is adjusted 
 * according to the current resolution and scaling. 
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @ignore
 */
rune.ui.MouseCursor.prototype.m_updatePosition = function(step) {
    /*
    var nw = this['application']['screen']['width'];
    var nh = this['application']['screen']['height'];
    var sw = this['application']['screen']['canvas']['element'].offsetWidth;
    var sh = this['application']['screen']['canvas']['element'].offsetHeight;
    
    var sx = sw / nw;
    var sy = sh / nh;
    
    this.x = this['mouse']['x'] / sx;
    this.y = this['mouse']['y'] / sy;
    */
    
    this.x = this['mouse']['x'];
    this.y = this['mouse']['y'];
};