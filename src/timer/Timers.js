//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * TODO: ...
 * 
 * @constructor
 *
 * @param {Object} [scope] TODO: ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.timer.Timers = function(scope) {

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
     * @type {Array.<rune.timer.Timer>}
     * @private
     */
    this.m_timers = [];

    /**
     * TODO: ...
     *
     * @type {Object}
     * @private
     */
    this.m_scope = scope || window;
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} length
 * @memberof rune.timer.Timers
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timers.prototype, "length", {
    /**
     * @this rune.timer.Timers
     * @ignore
     */
    get : function() {
        return this.m_timers.length;
    }
});

/**
 * TODO: ...
 *
 * @member {number} numActive
 * @memberof rune.timer.Timers
 * @instance
 * @readonly
 */
Object.defineProperty(rune.timer.Timers.prototype, "numActive", {
    /**
     * @this rune.timer.Timers
     * @ignore
     */
    get : function() {
        var n = 0;
        var i = this.m_timers.length;
        while (i--) {
            if (this.m_timers[i]['active'] == true) {
                n++;
            }
        }
        
        return n;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {rune.timer.Timer} timer TODO: ...
 * @param {boolean} [autoStart=true] TODO: ...
 *
 * @returns {rune.timer.Timer}
 */
rune.timer.Timers.prototype.add = function(timer, autoStart) {
    var i = this.m_timers.indexOf(timer);
    if (i === -1) {
        this.m_timers.push(timer);
        if (autoStart !== false) timer.start();
    }
    
    return timer;
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timers.prototype.clear = function() {
    for (var i = 0; i < this.m_timers.length; i++) {
        this.remove(this.m_timers[i]);
    }
};

/**
 * TODO: ...
 *
 * @param {Object} options TODO: ...
 * @param {boolean} [autoStart=true] TODO: ...
 *
 * @returns {rune.timer.Timer}
 */
rune.timer.Timers.prototype.create = function(options, autoStart) {
    options = options || {};
    options.scope = options.scope || this.m_scope;
    var timer = new rune.timer.Timer(options);
    return this.add(timer, autoStart);
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timers.prototype.dispose = function() {
    this.m_disposeTimers();
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timers.prototype.init = function() {
    
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timers.prototype.remove = function(timer) {
    var i = this.m_timers.indexOf(timer);
    if (i > -1) {
        this.m_timers[i].dispose();
        this.m_timers[i] = null;
        this.m_timers.splice(i, 1);
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timers.prototype.reset = function() {
    for (var i = 0; i < this.m_timers.length; i++) {
        if (this.m_timers[i].disposed) this.m_timers.splice(i, 1);
        else this.m_timers[i].restart();
    }
};

/**
 * TODO: ...
 *
 * @param {number} step TODO: ...
 *
 * @returns {undefined}
 */
rune.timer.Timers.prototype.update = function(step) {
    this.m_updateTimers(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.timer.Timers.prototype.m_updateTimers = function(step) {
    for (var i = 0; i < this.m_timers.length; i++) {
        if (this.m_timers[i].disposed) this.m_timers.splice(i, 1);
        else if (this.m_timers[i]['complete'] === false) this.m_updateTimer(i, step);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.timer.Timers.prototype.m_updateTimer = function(index, step) {
    if (this.m_timers[index].update(step)) {
        this.m_timers[index].dispose();
        this.m_timers[index] = null;
        this.m_timers.splice(index, 1);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.timer.Timers.prototype.m_disposeTimers = function() {
    for (var i = 0; i < this.m_timers.length; i++) {
        this.m_timers[i].dispose();
        this.m_timers[i] = null;
        this.m_timers.splice(i, 1);
    }
    
    this.m_timers.length = 0;
    this.m_timers = null;
};