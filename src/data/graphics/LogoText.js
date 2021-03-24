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
rune.data.LogoText = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.Graphic.call(this, x || 0, y || 0, 64, 32, "", "rune_image_logo_text_64x32");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.data.LogoText.prototype = Object.create(rune.display.Graphic.prototype);
rune.data.LogoText.prototype.constructor = rune.data.LogoText;