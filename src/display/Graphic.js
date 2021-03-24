//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 * @param {number} [width=0] ...
 * @param {number} [height=0] ...
 * @param {string} [fillColor=""] ...
 * @param {string|HTMLImageElement} [resource] ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.display.Graphic = function(x, y, width, height, fillColor, resource) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.display.Texture}
     * @protected
     * @ignore
     */
    this.m_texture = this.m_getTexture(resource, width, height);
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend DisplayObjectContainer.
     */
    rune.display.DisplayObjectContainer.call(this, x, y, width, height, fillColor);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.Graphic.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.display.Graphic.prototype.constructor = rune.display.Graphic;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.display.Texture} texture
 * @memberof rune.display.Graphic
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Graphic.prototype, "texture", {
    /**
     * @this rune.display.Graphic
     * @ignore
     */
    get : function() {
        return this.m_texture;
    }
});

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.display.Graphic.prototype.render = function() {
    this.m_renderFillColor();
    this.m_renderTexture();
    this.m_renderChildren();
    this.m_renderGraphics();
    this.m_renderStates();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.Graphic.prototype.m_renderTexture = function() {
    this.m_canvas.drawImage(
        this.m_texture["data"],
        0,
        0,
        this.m_texture["data"].width,
        this.m_texture["data"].height
    );
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {string|HTMLImageElement} [resource] ...
 * @param {number} [w] ...
 * @param {number} [h] ...
 *
 * @throws {Error} ...
 *
 * @return {rune.display.Texture}
 * @private
 */
rune.display.Graphic.prototype.m_getTexture = function(resource, w, h) {
    var data = null;
    if(typeof resource === "string") {
        data = this['resources'].get(resource);
    } else if(resource instanceof HTMLImageElement) {
        data = resource;
    } else {
        data = new Image(w || 1, h || 1);
    }
    
    return new rune.display.Texture(this, data);
};