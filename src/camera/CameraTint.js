//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.camera.CameraTint = function() {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.color.Color24}
     * @protected
     * @ignore
     */
    this.m_color = null;
    
    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_opacity = 0.0;
    
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
 * @member {rune.color.Color24} color
 * @memberof rune.camera.CameraTint
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.CameraTint.prototype, "color", {
    /**
     * @this rune.camera.CameraTint
     * @ignore
     */
    get : function() {
        return this.m_color;
    },
});

/**
 * ...
 *
 * @member {rune.color.Color24} opacity
 * @memberof rune.camera.CameraTint
 * @instance
 */
Object.defineProperty(rune.camera.CameraTint.prototype, "opacity", {
    /**
     * @this rune.camera.CameraTint
     * @ignore
     */
    get : function() {
        return this.m_opacity;
    },
    
    /**
     * @this rune.camera.CameraTint
     * @ignore
     */
    set : function(value) {
        this.m_opacity = rune.util.Math.clamp(value, 0.0, 1.0);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {string}
 */
rune.camera.CameraTint.prototype.toString = function() {
    var r = this.m_color['r']['value'];
    var g = this.m_color['g']['value'];
    var b = this.m_color['b']['value'];
    var a = this.m_opacity;
    
    return "rgba(" + r + "," + g + "," + b + "," + a +")";
}

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
rune.camera.CameraTint.prototype.update = function(step) {
    
}

/**
 * ...
 *
 * @return {undefined}
 */
rune.camera.CameraTint.prototype.dispose = function() {
    this.m_disposeColor();
}

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Class constructor.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.CameraTint.prototype.m_construct = function() {
    this.m_constructColor();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.CameraTint.prototype.m_constructColor = function() {
    this.m_disposeColor();
    if (this.m_color == null) {
        this.m_color = new rune.color.Color24();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.CameraTint.prototype.m_disposeColor = function() {
    if (this.m_color instanceof rune.color.Color24) {
        this.m_color.dispose();
        this.m_color = null;
    }
};