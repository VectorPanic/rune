//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.tilemap.Tiles = function(tilemap) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.tilemap.Tilemap}
     * @private
     */
    this.m_tilemap = tilemap;

    /**
     * ...
     *
     * @type {Array.<rune.tilemap.Tile>}
     * @private
     */
    this.m_tiles = [];
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} index ...
 * @param {number} allowCollisions ...
 *
 * @return {undefined}
 */
rune.tilemap.Tiles.prototype.create = function(index, allowCollisions) {
    this.m_tiles[index] = new rune.tilemap.Tile(
        this.m_tilemap['tileWidth'],
        this.m_tilemap['tileHeight']
    );
    
    this.m_tiles[index].allowCollisions = allowCollisions || rune.physics.Space.NONE;
};

/**
 * ...
 *
 * @param {number} index ...
 *
 * @return {rune.tilemap.Tile}
 */
rune.tilemap.Tiles.prototype.get = function(index) {
    return this.m_tiles[index];
};