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
rune.camera.CameraFlash = function() {
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend CameraTintTween.
     */
    rune.camera.CameraTintTween.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.camera.CameraFlash.prototype = Object.create(rune.camera.CameraTintTween.prototype);
rune.camera.CameraFlash.prototype.constructor = rune.camera.CameraFlash;

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
rune.camera.CameraFlash.prototype.start = function(duration, callback, scope) {
    duration = duration || 750;
    this.m_opacity = 1.0;
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