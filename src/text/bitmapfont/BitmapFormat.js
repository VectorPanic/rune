//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new BitmapFormat.
 *
 * @constructor
 *
 * @param {string} [texture] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bitmap-based text format. The format retrieves individual 
 * characters based on a texture. A texture can contain up to 96 possible 
 * characters identified by their unicode character code.
 */
rune.text.BitmapFormat = function(texture) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {Array.<rune.geom.Rectangle>}
     * @private
     */
    this.m_chars = null;

    /**
     * ...
     *
     * @type {HTMLImageElement}
     * @private
     */
    this.m_texture = this.getTexture(texture || rune.text.BitmapFormat.DEFAULT_TEXTURE);

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * The bitmap texture used to represent the default font. In this font, each 
 * individual character is represented by 6 x 10 pixels. 
 *
 * @const {string}
 * @default "rune_font_small_192x30"
 */
rune.text.BitmapFormat.DEFAULT_TEXTURE = "rune_font_small_192x30";

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * The width of a character.
 *
 * @member {number} charWidth
 * @memberof rune.text.BitmapFormat
 * @instance
 * @readonly
 */
Object.defineProperty(rune.text.BitmapFormat.prototype, "charWidth", {
    /**
     * @this rune.text.BitmapFormat
     * @ignore
     */
    get : function() {
        return ~~(this.m_texture.width / 32); //@note: Magic
    }
});

/**
 * The height of a character. 
 *
 * @member {number} charWidth
 * @memberof rune.text.BitmapFormat
 * @instance
 * @readonly
 */
Object.defineProperty(rune.text.BitmapFormat.prototype, "charHeight", {
    /**
     * @this rune.text.BitmapFormat
     * @ignore
     */
    get : function() {
        return ~~(this.m_texture.height / 3); //@note: Magic
    }
});

/**
 * Reference to the bitmap texture used to represent the font.
 *
 * @member {HTMLImageElement} texture
 * @memberof rune.text.BitmapFormat
 * @instance
 * @readonly
 */
Object.defineProperty(rune.text.BitmapFormat.prototype, "texture", {
    /**
     * @this rune.text.BitmapFormat
     * @ignore
     */
    get : function() {
        return this.m_texture;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Retrieves a rectangle that describes the part of the texture that represents 
 * a specific character. The selection of character is specified via a unicode 
 * character code.
 *
 * @param {number} charCode Unicode character code of requested character.
 *
 * @return {rune.geom.Rectangle}
 */
rune.text.BitmapFormat.prototype.getCharRect = function(charCode) {
    return this.m_chars[charCode];
};

/**
 * Deletes the current object.
 *
 * @return {undefined}
 */
rune.text.BitmapFormat.prototype.dispose = function() {
    this.m_disposeChars();
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
rune.text.BitmapFormat.prototype.m_construct = function() {
    this.m_constructChars();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates all characters. 
 *
 * @return {undefined}
 * @private
 */
rune.text.BitmapFormat.prototype.m_constructChars = function() {
    this.m_disposeChars();
    if (this.m_chars == null) {
        this.m_chars = new Array(256);
        
        var x = 0;
        var y = 0;
        var w = this.m_texture.width / 32; //@note: Magic
        var h = this.m_texture.height / 3; //@note: Magic
        
        var charCode = 32;
        for (y = 0; y < this.m_texture.height; y += h) {
            for (x = 0; x < this.m_texture.width; x += w) {
                this.m_chars[charCode] = new rune.geom.Rectangle(x, y, w, h);
                charCode++;
            }
        }
    }
};

/**
 * Removes all characters.
 *
 * @return {undefined}
 * @private
 */
rune.text.BitmapFormat.prototype.m_disposeChars = function() {
    if (Array.isArray(this.m_chars)) {
        this.m_chars.length = 0;
    }
    
    this.m_chars = null;
};

/**
 * Retrieves a reference to a texture based on resource name.
 *
 * @param {string} [resource] Name of resource.
 *
 * @return {HTMLImageElement}
 * @private
 */
rune.text.BitmapFormat.prototype.getTexture = function(resource) {
    return rune.system.Main['instance']['resources'].get(resource);
};