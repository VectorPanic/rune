//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.display.Graphic
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
rune.display.Sprite = function(x, y, width, height, fillColor, resource) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.animation.Animations}
     * @protected
     * @ignore
     */
    this.m_animations = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend Graphics.
     */
    rune.display.Graphic.call(this, x, y, width, height, fillColor, resource);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.Sprite.prototype = Object.create(rune.display.Graphic.prototype);
rune.display.Sprite.prototype.constructor = rune.display.Sprite;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.animation.Animations} animations
 * @memberof rune.display.Sprite
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Sprite.prototype, "animations", {
    /**
     * @this rune.display.Sprite
     * @ignore
     */
    get : function() {
        return this.m_animations;
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.display.Sprite.prototype.update = function(step) {
    rune.display.Graphic.prototype.update.call(this, step);
    this.m_updateAnimation(step);
};

/**
 * @override
 */
rune.display.Sprite.prototype.dispose = function() {
    this.m_disposeAnimation();
    rune.display.Graphic.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.display.Sprite.prototype.m_construct = function() {
    rune.display.Graphic.prototype.m_construct.call(this);
    this.m_constructAnimations();
};

/**
 * @override
 */
rune.display.Sprite.prototype.m_renderTexture = function() {
    this.m_canvas.drawImage(
        this.m_texture["data"],
        0,
        0,
        this.m_canvas.width,
        this.m_canvas.height,
        this.m_animations['frame']['x'],
        this.m_animations['frame']['y'],
        this.m_canvas.width,
        this.m_canvas.height
        //@TODO: ANIMATION FRAME SKALL VARA EN PUNKT (W OCH H ANVÄNDS INTE)
    );
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Sprite.prototype.m_constructAnimations = function() {
    this.m_disposeAnimation();
    if (this.m_animations == null) {
        this.m_animations = new rune.animation.Animations(this);
    } else throw new Error();
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Sprite.prototype.m_updateAnimation = function(step) {
    if (this.m_animations != null) {
        this.m_animations.update(step)
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Sprite.prototype.m_disposeAnimation = function() {
    if (this.m_animations != null) {
        this.m_animations.dispose();
        this.m_animations = null;
    }
};