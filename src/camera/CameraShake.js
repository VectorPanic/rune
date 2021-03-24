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
rune.camera.CameraShake = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.geom.Point}
     * @private
     */
    this.m_ammount = new rune.geom.Point(0, 0);

    /**
     * ...
     *
     * @type {Function}
     * @private
     */
    this.m_callback = null;

    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_duration = 0.0;

    /**
     * ...
     *
     * @type {boolean}
     * @private
     */
    this.m_easing = false;

    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_elapsed = 0.0;

    /**
     * ...
     *
     * @type {rune.geom.Point}
     * @private
     */
    this.m_offset = new rune.geom.Point();

    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_remaining = 0;

    /**
     * ...
     *
     * @type {Object}
     * @private
     */
    this.m_scope = null;
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} x
 * @memberof rune.camera.CameraShake
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.CameraShake.prototype, "x", {
    /**
     * ...
     * 
     * @this rune.camera.CameraShake
     * @ignore
     */
    get : function() {
        return this.m_offset.x;
    }
});

/**
 * ...
 *
 * @member {number} x
 * @memberof rune.camera.CameraShake
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.CameraShake.prototype, "y", {
    /**
     * ...
     * 
     * @this rune.camera.CameraShake
     * @ignore
     */
    get : function() {
        return this.m_offset.y;
    }
});

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @return {undefined}
 */
rune.camera.CameraShake.prototype.start = function(duration, ammountX, ammountY, easing, callback, scope) {
    this.m_elapsed = 0.0;
    this.m_duration = duration;
    this.m_remaining = this.m_duration;
    this.m_ammount.x = parseInt(ammountX, 10) || 5;
    this.m_ammount.y = parseInt(ammountY, 10) || 5;
    this.m_easing = Boolean(easing);
    this.m_callback = callback;
    this.m_scope = scope || window;
};

/**
 * ...
 * 
 * @return {undefined}
 */
rune.camera.CameraShake.prototype.stop = function(triggerCallback) {
    this.m_active = false;
    this.m_ammount.x = 0.0;
    this.m_ammount.y = 0.0;
    this.m_offset.x  = 0.0;
    this.m_offset.y  = 0.0;

    if (triggerCallback === true && typeof this.m_callback === "function") {
        this.m_callback.call(this.m_scope);
    }
};

/**
 * ...
 * 
 * @return {undefined}
 */
rune.camera.CameraShake.prototype.update = function(step) {
    if (this.m_remaining > 0) {
        this.m_remaining -= step;
        
        var e = (this.m_easing) ? this.m_remaining / this.m_duration : 1.0;
        var x = this.m_ammount.x * e;
        var y = this.m_ammount.y * e;
        
        this.m_offset.x = rune.util.Math.random(-x, x);
        this.m_offset.y = rune.util.Math.random(-y, y);
        
        if (this.m_remaining <= 0) {
            this.stop(true);
        }
    }
};

/**
 * ...
 * 
 * @return {undefined}
 */
rune.camera.CameraShake.prototype.dispose = function() {
    this.m_offset = null;
    this.m_ammount = null;
    this.m_callback = null;
};