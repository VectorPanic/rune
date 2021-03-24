//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 * @param {number} [width=0] ...
 * @param {number} [height=0] ...
 * @param {string} [texture=""] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a rectangle with a repeated bitmap texture.
 */
rune.display.RepeatedGraphic = function(x, y, width, height, texture) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * The offset of the texture in x and y values.
     *
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_offset = new rune.geom.Point(0, 0);
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend Graphics.
     */
    rune.display.Graphic.call(this, x, y, width, height, "", texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.RepeatedGraphic.prototype = Object.create(rune.display.Graphic.prototype);
rune.display.RepeatedGraphic.prototype.constructor = rune.display.RepeatedGraphic;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * The displacement of the texture in the x-direction. Can be used to scroll
 * the texture seamlessly.
 *
 * @member {number} textureOffsetX
 * @memberof rune.display.RepeatedGraphic
 * @instance
 */
Object.defineProperty(rune.display.RepeatedGraphic.prototype, "offsetX", {
    /**
     * @this rune.display.RepeatedGraphic
     * @ignore
     */
    get : function() {
        return this.m_offset.x;
    },
    
    /**
     * @this rune.display.RepeatedGraphic
     * @ignore
     */
    set : function(value) {
        if (this.m_offset.x != value) {
            this.m_offset.x  = value;
            
            this.breakCache();
        }
    }
});

/**
 * The displacement of the texture in the y-direction. Can be used to scroll 
 * the texture seamlessly.
 *
 * @member {number} textureOffsetY
 * @memberof rune.display.RepeatedGraphic
 * @instance
 */
Object.defineProperty(rune.display.RepeatedGraphic.prototype, "offsetY", {
    /**
     * @this rune.display.RepeatedGraphic
     * @ignore
     */
    get : function() {
        return this.m_offset.y;
    },
    
    /**
     * @this rune.display.RepeatedGraphic
     * @ignore
     */
    set : function(value) {
        if (this.m_offset.y != value) {
            this.m_offset.y  = value;
            
            this.breakCache();
        }
    }
});

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.display.RepeatedGraphic.prototype.m_renderTexture = function() {
    this.m_canvas.drawImageFill(
        this.m_texture["data"],
        this.m_offset.x,
        this.m_offset.y,
        this.m_texture["data"].width,
        this.m_texture["data"].height
    );
};