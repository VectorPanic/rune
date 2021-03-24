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
rune.tilemap.TilemapLayers = function(tilemap) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {Array.<rune.tilemap.TilemapLayer>}
     * @private
     */
    this.m_layers = [];

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
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} length
 * @memberof rune.tilemap.TilemapLayers
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tilemap.TilemapLayers.prototype, "length", {
    /**
     * @this rune.tilemap.TilemapLayers
     * @ignore
     */
    get : function() {
        return this.m_layers.length || 0;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.tilemap.TilemapLayers.prototype.add = function(data) {
    if (Array.isArray(data)) {
        this.m_layers.push(new rune.tilemap.TilemapLayer(this.m_tilemap, data));
    } else throw new TypeError();
};

/**
 * The class constructor.
 *
 * @return {undefined}
 */
rune.tilemap.TilemapLayers.prototype.clear = function() {
    while(this.m_layers.length) {
        this.m_layers[0].dispose();
        this.m_layers[0] = null;
        this.m_layers.splice(0, 1);
    }
};

/**
 * The class constructor.
 *
 * @return {number}
 */
rune.tilemap.TilemapLayers.prototype.getTileIndexAtPosition = function(x, y) {
    if (this.m_layers != null && this.m_layers.length > 0) {
        var i = this.m_layers.length;
        while (i--) {
            var r = this.m_layers[i].getTileIndexAtPosition(x, y);
            if (r > 0) {
                return r;
            }
        }
    }
    
    return 0;
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
rune.tilemap.TilemapLayers.prototype.m_construct = function() {
    
};