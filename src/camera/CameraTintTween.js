//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.camera.CameraTint
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.camera.CameraTintTween = function() {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.tween.Tweens}
     * @protected
     * @ignore
     */
    this.m_tweens = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend CameraTint.
     */
    rune.camera.CameraTint.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.camera.CameraTintTween.prototype = Object.create(rune.camera.CameraTint.prototype);
rune.camera.CameraTintTween.prototype.constructor = rune.camera.CameraTintTween;

//------------------------------------------------------------------------------
// Override public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} opacity
 * @memberof rune.camera.CameraTintTween
 * @instance
 */
Object.defineProperty(rune.camera.CameraTintTween.prototype, "opacity", {
    /**
     * @this rune.camera.CameraTintTween
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_opacity;
    },
    
    /**
     * @this rune.camera.CameraTintTween
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_tweens.clear();
        this.m_opacity = rune.util.Math.clamp(value, 0.0, 1.0);
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.camera.CameraTintTween.prototype.update = function(step) {
    rune.camera.CameraTint.prototype.update.call(this, step);
    this.m_tweens.update(step);
}

/**
 * ...
 *
 * @return {undefined}
 * @ignore
 */
rune.camera.CameraTintTween.prototype.dispose = function() {
    this.m_disposeTweens();
    rune.camera.CameraTint.prototype.dispose.call(this);
}

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * Class constructor.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.CameraTintTween.prototype.m_construct = function() {
    rune.camera.CameraTint.prototype.m_construct.call(this);
    this.m_constructTweens();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.CameraTintTween.prototype.m_constructTweens = function() {
    this.m_disposeTweens();
    if (this.m_tweens == null) {
        this.m_tweens = new rune.tween.Tweens();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.CameraTintTween.prototype.m_disposeTweens = function() {
    if (this.m_tweens instanceof rune.tween.Tweens) {
        this.m_tweens.dispose();
        this.m_tweens = null;
    }
};