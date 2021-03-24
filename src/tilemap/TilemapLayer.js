//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 *
 * @param {rune.tilemap.Tilemap} tilemap ...
 * @param {Array} data ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.tilemap.TilemapLayer = function(tilemap, data) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {Array.<Array>}
     * @private
     */
    this.m_data = data;
    
    /**
     * ...
     *
     * @type {rune.tilemap.Tilemap}
     * @private
     */
    this.m_tilemap = tilemap;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {number}
 */
rune.tilemap.TilemapLayer.prototype.getTileIndexAtPosition = function(x, y) {
    if (x < 0) return 0;
    if (y < 0) return 0;
    
    var xi = ~~(x / this.m_tilemap['tileWidth']);
    var yi = ~~(y / this.m_tilemap['tileHeight']);
    
    if (this.m_data[yi]) {
        var r = this.m_data[yi][xi];
        if (r) {
            return r;
        }
        
        return 0;
    }
    
    return 0;
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.tilemap.TilemapLayer.prototype.setTileIndexAtPosition = function(x, y, i) {
    x = ~~(x / this.m_tilemap['tileWidth']);
    y = ~~(y / this.m_tilemap['tileHeight']);
    
    if (this.m_data[y] == null) {
        this.m_data[y] = [];
    }
    
    this.m_data[y][x] = i;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.tilemap.TilemapLayer.prototype.dispose = function() {
    console.warn("@TODO: ...");
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * The class constructor.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.tilemap.TilemapLayer.prototype.m_construct = function() {
    
};