//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.camera.CameraTintTween
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.camera.CameraFade = function() {
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend CameraTint.
     */
    rune.camera.CameraTintTween.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.camera.CameraFade.prototype = Object.create(rune.camera.CameraTintTween.prototype);
rune.camera.CameraFade.prototype.constructor = rune.camera.CameraFade;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Fade in.
 *
 * @param {number} [duration] ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {undefined}
 */
rune.camera.CameraFade.prototype.in = function(duration, callback, scope) {
    duration = duration || 1000;
    this.m_tweens.clear();
    this.m_tweens.add(this, {
        m_opacity: 0.0,
        duration: duration,
        scope: this,
        oncomplete: function() {
            if (callback) {
                callback.call(scope);
            }
        }
    });
}

/**
 * Fade out.
 *
 * @param {number} [duration] ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {undefined}
 */
rune.camera.CameraFade.prototype.out = function(duration, callback, scope) {
    duration = duration || 1000;
    this.m_tweens.clear();
    this.m_tweens.add(this, {
        m_opacity: 1.0,
        duration: duration,
        scope: this,
        oncomplete: function() {
            if (callback) {
                callback.call(scope);
            }
        }
    });
}