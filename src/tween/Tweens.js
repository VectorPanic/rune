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
rune.tween.Tweens = function() {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     * 
     * @type {boolean}
     * @default false
     */
    this.paused = false;

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     * 
     * @type {Array.<rune.tween.Tween>}
     * @private
     */
    this.m_tweens = [];
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {Object} obj ...
 * @param {Object} options ...
 *
 * @returns {rune.tween.Tween}
 */
rune.tween.Tweens.prototype.add = function(obj, options) {
    var tween = new rune.tween.Tween(obj, options);
        tween.init();

    this.m_tweens.push(tween);
    return tween;
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.tween.Tweens.prototype.clear = function() {
    this.m_disposeTweens();
};

/**
 * TODO: ...
 *
 * @param {rune.tween.Tween} tween ...
 *
 * @returns {undefined}
 */
rune.tween.Tweens.prototype.remove = function(tween) {
    this.m_disposeTween(tween);
};

/**
 * TODO: ...
 *
 * @param {Object} obj ...
 *
 * @returns {boolean}
 */
rune.tween.Tweens.prototype.removeFrom = function(obj) {
    for (var i = 0; i < this.m_tweens; i++) {
        if (this.m_tweens[i].m_objInitial == obj) {
            this.m_tweens.splice(i, 1);
            return true;
        }
    }

    return false;
};

//------------------------------------------------------------------------------
// Public prototype methods (Engine)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 */
rune.tween.Tweens.prototype.update = function(step) {
    if (this.paused === false) {
        this.m_updateTweens(step);
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.tween.Tweens.prototype.dispose = function() {
    this.m_disposeTweens();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tweens.prototype.m_updateTweens = function(step) {
    var i = this.m_tweens.length;
    while (i--) {
        if (this.m_tweens[i].update(step)) {
            this.m_disposeTween(this.m_tweens[i]);
        }
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tweens.prototype.m_disposeTweens = function() {
    var i = this.m_tweens.length;
    while (i--) {
        this.m_disposeTween(this.m_tweens[i]);
    }
};

/**
 * TODO: ...
 *
 * @param {rune.tween.Tween} tween ...
 *
 * @throws {TypeError} ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tweens.prototype.m_disposeTween = function(tween) {
    if (tween instanceof rune.tween.Tween) {
        tween.dispose();
        var i = this.m_tweens.indexOf(tween);
        this.m_tweens.splice(i, 1);
    } else throw new TypeError();
};