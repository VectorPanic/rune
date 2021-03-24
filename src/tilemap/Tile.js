//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 * @extends rune.physics.Body
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.tilemap.Tile = function(width, height) {
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend Body
     */
    rune.physics.Body.call(this, 0, 0, width, height);
    
    this.immovable = true;
    this.autoMove = false;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.tilemap.Tile.prototype = Object.create(rune.physics.Body.prototype);
rune.tilemap.Tile.prototype.constructor = rune.tilemap.Tile;