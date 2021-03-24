//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * TODO: ...
 * 
 * @constructor
 *
 * @param {Object} options TODO: ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.timer.Timer = function(options) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * TODO: ...
     * 
     * @type {boolean}
     * @private
     */
    this.m_active = false;
    
    /**
     * TODO: ...
     * 
     * @type {rune.timer.TimerOptions}
     * @private
     */
    this.m_arguments = null;
    
    /**
     * TODO: ...
     * 
     * @type {boolean}
     * @private
     */
    this.m_disposed = false;
    
    /**
     * TODO: ...
     * 
     * @type {number}
     * @private
     */
    this.m_elapsed = 0.0;
    
    /**
     * TODO: ...
     * 
     * @type {boolean}
     * @private
     */
    this.m_paused = false;
    
    /**
     * TODO: ...
     * 
     * @type {number}
     * @private
     */
    this.m_repeats = 0;

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     *  TODO: ...
     */
    this.m_construct(options);
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {boolean} active
 * @memberof rune.timer.Timer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timer.prototype, "active", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        return this.m_active;
	}
});

/**
 * TODO: ...
 *
 * @member {boolean} complete
 * @memberof rune.timer.Timer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timer.prototype, "complete", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        //@note: +1 because 1 corresponds to two ticks, 0 is one tick
		return (this.m_repeats >= this.m_arguments.repeat + 1);
	}
});

/**
 * TODO: ...
 *
 * @member {number} elapsed
 * @memberof rune.timer.Timer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timer.prototype, "elapsed", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        return this.m_elapsed;
	}
});

/**
 * TODO: ...
 *
 * @member {boolean} disposed
 * @memberof rune.timer.Timer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timer.prototype, "disposed", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        return this.m_disposed;
	}
});

/**
 * TODO: ...
 *
 * @member {boolean} paused
 * @memberof rune.timer.Timer
 * @instance
 */
Object.defineProperty(rune.timer.Timer.prototype, "paused", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        return this.m_paused;
	},
    /**
     * @this rune.timer.Timer
     * @ignore
     */
	set : function(value) {
		var a = value;
		var b = this.m_paused;
		
		this.m_paused = value;
		
		if      (a === true  && a != b) this.m_arguments.onPause.call(this.m_arguments.scope, this);
		else if (a === false && a != b) this.m_arguments.onUnpause.call(this.m_arguments.scope, this);
	}
});

/**
 * TODO: ...
 *
 * @member {number} progressTick
 * @memberof rune.timer.Timer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timer.prototype, "progressTick", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        return Math.min((this.m_elapsed % this.m_arguments.duration) / this.m_arguments.duration, 1);
	}
});

/**
 * TODO: ...
 *
 * @member {number} progressTotal
 * @memberof rune.timer.Timer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timer.prototype, "progressTotal", {
    /**
     * @this rune.timer.Timer
     * @ignore
     */
    get : function() {
        return Math.min(this.m_elapsed / this.m_arguments['durationTotal'], 1);
	}
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timer.prototype.restart = function() {
    this.m_elapsed = 0.0;
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timer.prototype.start = function() {
    if (this.m_active === false) {
        this.m_active = true;
        this.m_elapsed = 0.0;
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timer.prototype.stop = function() {
    this.m_active = false;
	this.m_elapsed = 0.0;
};

//------------------------------------------------------------------------------
// Public prototype methods (Engine)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} step TODO: ...
 *
 * @returns {boolean}
 */
rune.timer.Timer.prototype.update = function(step) {
    if (this.m_paused === true || this.m_active === false) return false;
    this.m_updateElapsed(step);
    this.m_updateComplete(step);
    
    return this['complete'];
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timer.prototype.dispose = function() {
    this.m_disposeTrigger();
    this.m_disposeArguments();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {Object} options TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.timer.Timer.prototype.m_construct = function(options) {
    this.m_initArguments(options);
};

/**
 * TODO: ...
 *
 * @param {Object} options TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.timer.Timer.prototype.m_initArguments = function(options) {
    this.m_disposeArguments();
    if (this.m_arguments === null) {
        this.m_arguments = new rune.timer.TimerOptions(options);
    }
    
    this.m_arguments.onStart.call(this.m_arguments.scope, this);
};

/**
 * TODO: ...
 *
 * @param {number} step TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.timer.Timer.prototype.m_updateElapsed = function(step) {
    this.m_elapsed += step;
};

/**
 * TODO: ...
 *
 * @param {number} step TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.timer.Timer.prototype.m_updateComplete = function(step) {
    if (this.m_arguments != null) {
        var repreats = parseInt(this.m_elapsed / this.m_arguments.duration, 10);
        if (repreats > this.m_repeats) {
            this.m_repeats = repreats;
            this.m_arguments.onTick.call(this.m_arguments.scope, this);
        }
        
        if (this.complete) this.m_arguments.onComplete.call(this.m_arguments.scope, this);
        else this.m_arguments.onUpdate.call(this.m_arguments.scope, this);
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.timer.Timer.prototype.m_disposeTrigger = function() {
    if (this['complete'] === false && this.m_disposed === false) {
		this.m_arguments.onAbort.call(this.m_arguments.scope, this);
	}
	
	this.m_disposed = true;
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.timer.Timer.prototype.m_disposeArguments = function() {
    if (this.m_arguments instanceof rune.timer.TimerOptions) {
		this.m_arguments.dispose();
		this.m_arguments = null;
	}
};