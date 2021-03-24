//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * TODO: ...
 * 
 * @constructor
 *
 * @param {Object} data TODO: ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.timer.TimerOptions = function(data) {
	
	//--------------------------------------------------------------------------
    // Default arguments
    //--------------------------------------------------------------------------

	/**
     * TODO: ...
     *
     * @ignore
     */
	data = data || {};

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {number}
     * @default 1000
     */
	this.duration = data.duration || rune.timer.TimerOptions.DEFAULT_DURATION;
	
	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onAbort = data.onAbort || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onComplete = data.onComplete || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onPause = data.onPause || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onStart = data.onStart || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onTick = data.onTick || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onUnpause = data.onUnpause || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {Function}
     */
	this.onUpdate = data.onUpdate || function(timer) {};

	/**
     * TODO: ...
     *
     * @type {number}
     * @default 0
     */
	this.repeat = data.repeat || 0;

    /**
     * TODO: ...
     *
     * @type {Object}
     */
    this.scope = data.scope || null;
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @const {number}
 * @ignore
 */
rune.timer.TimerOptions.DEFAULT_DURATION = 1000;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} durationTotal
 * @memberof rune.timer.TimerOptions
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.TimerOptions.prototype, "durationTotal", {
    /**
     * @this rune.timer.TimerOptions
     * @ignore
     */
    get : function() {
        //NOTE: +1 because 1 corresponds to two ticks, 0 is one tick
        return this.duration * (this.repeat + 1);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.TimerOptions.prototype.dispose = function() {
	this.duration = 0;
	this.onAbort = null;
	this.onComplete = null;
	this.onPause = null;
	this.onStart = null;
	this.onTick = null;
	this.onUnpause = null;
	this.onUpdate = null;
	this.repeat = 0;
};