//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {string} name ...
 * @param {Array} frames ...
 * @param {number} [framerate=0] ...
 * @param {boolean} [looped=false] ...
 * @param {Array.<Function>} [triggers=null] ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.animation.Animation = function(name, frames, framerate, looped, triggers) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {number}
     * @default 0
     */
    this.delay = parseInt(framerate, 10) > 0 ? (1 / framerate) * 1000 : 0;

    /**
     * TODO: ...
     *
     * @type {Array}
     * @default []
     */
    this.frames = frames || [];

    /**
     * TODO: ...
     *
     * @type {boolean}
     * @default false
     */
    this.looped = looped || false;
    
    /**
     * TODO: ...
     *
     * @type {string}
     * @default unnamed
     */
    this.name = name || "unnamed";

    /**
     * TODO: ...
     *
     * @type {Array.<Function>}
     * @default unnamed
     */
    this.triggers = triggers || [];
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} length
 * @memberof rune.animation.Animation
 * @instance
 * @readonly
 */
Object.defineProperty(rune.animation.Animation.prototype, "length", {
    /**
     * @this rune.animation.Animation
     * @ignore
     */
    get : function() {
        return this.frames.length;
    }
});