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
rune.tilemap.Tilemap = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.tilemap.TilemapLayers}
     * @private
     */
    this.m_layers = new rune.tilemap.TilemapLayers(this);
    
    /**
     * ...
     *
     * @type {HTMLImageElement}
     * @private
     */
    this.m_texture = null;
    
    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_tileHeight = 16;
    
    /**
     * ...
     *
     * @type {rune.tilemap.Tiles}
     * @private
     */
    this.m_tiles = new rune.tilemap.Tiles(this);
    
    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_tileWidth = 16;
    
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
 * ...
 *
 * @member {rune.tilemap.TilemapLayers} layers
 * @memberof rune.tilemap.Tilemap
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tilemap.Tilemap.prototype, "layers", {
    /**
     * @this rune.tilemap.Tilemap
     * @ignore
     */
    get : function() {
        return this.m_layers;
    }
});

/**
 * ...
 *
 * @member {HTMLImageElement} texture
 * @memberof rune.tilemap.Tilemap
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tilemap.Tilemap.prototype, "texture", {
    /**
     * @this rune.tilemap.Tilemap
     * @ignore
     */
    get : function() {
        return this.m_texture;
    }
});

/**
 * ...
 *
 * @member {number} tileHeight
 * @memberof rune.tilemap.Tilemap
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tilemap.Tilemap.prototype, "tileHeight", {
    /**
     * @this rune.tilemap.Tilemap
     * @ignore
     */
    get : function() {
        return this.m_tileHeight;
    }
});

/**
 * ...
 *
 * @member {number} tileHeight
 * @memberof rune.tilemap.Tilemap
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tilemap.Tilemap.prototype, "tileWidth", {
    /**
     * @this rune.tilemap.Tilemap
     * @ignore
     */
    get : function() {
        return this.m_tileWidth;
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
rune.tilemap.Tilemap.prototype.clear = function() {
    if (this.m_layers != null) {
        this.m_layers.clear();
    }
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.tilemap.Tilemap.prototype.collideObject = function(body) {
    /*
    var tiles = this.getTilesInRectangle(
        body.hitbox.x,
        body.hitbox.y,
        body.hitbox.width,
        body.hitbox.height
    );
    */
    
    var tiles = [];
    tiles.push(this.getTileAtPosition(body['hitbox'].x, body['hitbox'].y));
    tiles.push(this.getTileAtPosition(body['hitbox'].x + body['hitbox'].width, body['hitbox'].y));
    tiles.push(this.getTileAtPosition(body['hitbox'].x, body['hitbox'].y + body['hitbox'].height));
    tiles.push(this.getTileAtPosition(body['hitbox'].x + body['hitbox'].width, body['hitbox'].y + body['hitbox'].height));
    
    
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].tile.allowCollisions) {
            
            //tiles[i].x = ~~(body.hitbox.x / 16) * 16;
            //tiles[i].y = ~~(body.hitbox.y / 16) * 16;
            //tiles[i].x = tiles[i].x;
            //tiles[i].y = tiles[i].y;
            
            tiles[i].tile.x = tiles[i].x;
            tiles[i].tile.y = tiles[i].y;
            tiles[i].tile.x = tiles[i].x;
            tiles[i].tile.y = tiles[i].y;
            
            body.collide(tiles[i].tile);            
        }
    }
};

/**
 * ...
 *
 * @return {number}
 */
rune.tilemap.Tilemap.prototype.getTileIndexAtPosition = function(x, y) {
    if (this.m_layers != null) {
        return this.m_layers.getTileIndexAtPosition(
            x,
            y
        );
    }
    
    return 0;
};

/**
 * ...
 *
 * @return {Object}
 */
rune.tilemap.Tilemap.prototype.getTileAtPosition = function(x, y) {
    var data = [];
    var index = this.getTileIndexAtPosition(x, y);
    
    return {
        x: ~~(x / 16) * 16,
        y: ~~(y / 16) * 16,
        tile: this.m_tiles.get(index)
    };
};

/**
 * ...
 *
 * @return {Array}
 */
rune.tilemap.Tilemap.prototype.getTileIndexesInRectangle = function(x, y, w, h) {
    var tw = this.m_tileWidth;
    var th = this.m_tileHeight;
    
    var cols = Math.ceil(w / tw) + 1; //@note: +1 for buffer tile.
    var rows = Math.ceil(h / th) + 1; //@note: +1 for buffer tile.
    var data = [];
    
    for (var r = 0; r < rows; r++) {
        data[r] = [];
        for (var c = 0; c < cols; c++) {
            data[r][c] = this.getTileIndexAtPosition(
                x + (c * tw),
                y + (r * th)
            );
        }
    }
    
    return data;
};

/**
 * ...
 *
 * @return {Array}
 */
rune.tilemap.Tilemap.prototype.getTilesInRectangle = function(x, y, w, h) {
    var data = [];
    var indexes = this.getTileIndexesInRectangle(x, y, w, h);
    
    for (var r = 0; r < indexes.length; r++) {
        for (var c = 0; c < indexes[r].length; c++) {
            data.push(this.m_tiles.get(indexes[r][c]));
        }
    }
    
    return data;
};

/**
 * ...
 *
 * @param {HTMLImageElement} texture ...
 * @param {Array} map ...
 * @param {number} [tileWidth=16] ...
 * @param {number} [tileHeight=16] ...
 *
 * @return {undefined}
 */
rune.tilemap.Tilemap.prototype.load = function(texture, map, tileWidth, tileHeight) {
    this.m_tileWidth  = tileWidth  || 16;
    this.m_tileHeight = tileHeight || 16;
    if (texture instanceof HTMLImageElement) {
        this.m_texture = texture;
        if (Array.isArray(map)) {
            this.clear();
            for (var i = 0; i < map.length; i++) {
                this.m_layers.add(map[i]);
            }
        } else throw new TypeError();
    } else throw new TypeError();
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.tilemap.Tilemap.prototype.dispose = function() {
    
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
rune.tilemap.Tilemap.prototype.m_construct = function() {
    
};