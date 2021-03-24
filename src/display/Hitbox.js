//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 *
 * @param {rune.display.DisplayObject} obj ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.display.Hitbox = function(obj) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.display.DisplayObject}
     * @protected
     * @ignore
     */
    this.m_displayObject = obj;
    
    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_height = obj['height'];
    
    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_width = obj['width'];
    
    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_x = 0.0;

    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_y = 0.0;
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} height
 * @memberof rune.display.Hitbox
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Hitbox.prototype, "height", {
    /**
     * @this rune.display.Hitbox
     * @ignore
     */
    get : function() {
        return this.m_height * this.m_displayObject['scaleY'];
    }
});

/**
 * ...
 *
 * @member {number} width
 * @memberof rune.display.Hitbox
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Hitbox.prototype, "width", {
    /**
     * @this rune.display.Hitbox
     * @ignore
     */
    get : function() {
        return this.m_width * this.m_displayObject['scaleX'];
    }
});

/**
 * ...
 *
 * @member {number} x
 * @memberof rune.display.Hitbox
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Hitbox.prototype, "x", {
    /**
     * @this rune.display.Hitbox
     * @ignore
     */
    get : function() {
        return this.m_displayObject['x'] + (this.m_displayObject['scaleX'] * this.m_x);
    }
});

/**
 * ...
 *
 * @member {number} x
 * @memberof rune.display.Hitbox
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Hitbox.prototype, "previousX", {
    /**
     * @this rune.display.Hitbox
     * @ignore
     */
    get : function() {
        return this.m_displayObject['previousX'] + (this.m_displayObject['scaleX'] * this.m_x);
    }
});

/**
 * ...
 *
 * @member {number} y
 * @memberof rune.display.Hitbox
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Hitbox.prototype, "y", {
    /**
     * @this rune.display.Hitbox
     * @ignore
     */
    get : function() {
        return this.m_displayObject['y'] + (this.m_displayObject['scaleY'] * this.m_y);
    }
});

/**
 * ...
 *
 * @member {number} x
 * @memberof rune.display.Hitbox
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Hitbox.prototype, "previousY", {
    /**
     * @this rune.display.Hitbox
     * @ignore
     */
    get : function() {
        return this.m_displayObject['previousY'] + (this.m_displayObject['scaleY'] * this.m_y);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} width ...
 * @param {number} height ...
 *
 * @return {undefined}
 */
rune.display.Hitbox.prototype.set = function(x, y, width, height) {
    this.m_x = x;
    this.m_y = y;
    this.m_width = width;
    this.m_height = height;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.display.Hitbox.prototype.dispose = function() {
    
};