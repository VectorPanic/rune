//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.data.LogoIcon = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.Graphic.call(this, x || 0, y || 0, 64, 64, "", "rune_image_logo_icon_64x64");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.data.LogoIcon.prototype = Object.create(rune.display.Graphic.prototype);
rune.data.LogoIcon.prototype.constructor = rune.data.LogoIcon;