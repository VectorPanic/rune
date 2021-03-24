//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * TODO: ...
 * 
 * @constructor
 *
 * @param {Object} obj ...
 * @param {Object} [args] ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.tween.Tween = function(obj, args) {

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
    // Internal properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {Object}
     * @ignore
     */
    this.m_objInitial = Object.create(obj);

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {Object}
     * @private
     */
    this.m_args = args || {};

    /**
     * TODO: ...
     * 
     * @type {number}
     * @private
     */
    this.m_delay = 0;

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_duration = (this.m_args.duration != null) ? parseInt(this.m_args.duration, 10) : 1000;

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_elapsedTime = 0.0;

    /**
     * TODO: ...
     *
     * @type {Object}
     * @private
     */
    this.m_objCurrent = obj;

    /**
     * TODO: ...
     *
     * @type {Function}
     * @private
     */
    this.m_onInit = this.m_args.oninit || null;

    /**
     * TODO: ...
     *
     * @type {Function}
     * @private
     */
    this.m_onUpdate = this.m_args.onupdate || null;

    /**
     * TODO: ...
     *
     * @type {Function}
     * @private
     */
    this.m_onComplete = this.m_args.oncomplete || null;

    /**
     * TODO: ...
     *
     * @type {Array}
     * @private
     */
    this.m_prop = [];

    /**
     * TODO: ...
     *
     * @type {Object}
     * @private
     */
    this.m_scope = this.m_args.scope || this;

    /**
     * TODO: ...
     *
     * @type {Function}
     * @private
     */
    this.m_transition = this.m_args.transition || rune.tween.Sine.easeInOut;
};

//------------------------------------------------------------------------------
// Private static constants
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constant {Array.<string>}
 * @private
 */
rune.tween.Tween.RESERVED_ARGUMENTS = [
    "delay",
    "duration",
    "transition",
    "oninit",
    "onupdate",
    "oncomplete",
    "scope"
];

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} complete
 * @memberof rune.tween.Tween
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tween.Tween.prototype, "complete", {
    /**
     * @this rune.tween.Tween
     * @ignore
     */
    get : function() {
        return (this["elapsedTime"] >= this.m_duration);
    }
});

/**
 * TODO: ...
 *
 * @member {number} delay
 * @memberof rune.tween.Tween
 * @instance
 */
Object.defineProperty(rune.tween.Tween.prototype, "delay", {
    /**
     * @this rune.tween.Tween
     * @ignore
     */
    get : function() {
        return this.m_delay;
    },
    
    /**
     * @this rune.tween.Tween
     * @ignore
     */
    set : function(value) {
        this.m_delay = value;
    }
});

/**
 * TODO: ...
 *
 * @member {number} elapsedTime
 * @memberof rune.tween.Tween
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tween.Tween.prototype, "elapsedTime", {
    /**
     * @this rune.tween.Tween
     * @ignore
     */
    get : function() {
        return this.m_elapsedTime;
    }
});

/**
 * TODO: ...
 *
 * @member {number} progress
 * @memberof rune.tween.Tween
 * @instance
 * @readonly
 */
Object.defineProperty(rune.tween.Tween.prototype, "progress", {
    /**
     * @this rune.tween.Tween
     * @ignore
     */
    get : function() {
        return Math.min(this["elapsedTime"] / this.m_duration, 1);
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
rune.tween.Tween.prototype.init = function() {
    this.m_initTweenProps();
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 */
rune.tween.Tween.prototype.update = function(step) {
    if (this.paused === false) {
        if (this.delay <= 0) {
            this.m_updateTweenProps(step);
        } else {
            this.delay -= step;
        }
    }

    return this['complete'];
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.tween.Tween.prototype.dispose = function() {
    this.m_disposeTweenProps();
    this.m_args = null;
    this.m_objCurrent = null;
    this.m_objInitial = null;
    this.m_elapsedTime = 0.0;
    this.m_delay = 0.0;
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_initTweenProps = function() {
    var args = this.m_args;
    var obj  = this.m_objInitial;
    this.m_removeReservedProps(args);
    for (var prop in args) {
        if (obj[prop] !== args[prop]) {
            this.m_initTweenProp(prop);
        }
    }

    this.m_execOnInit();
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_initTweenProp = function(name) {
    var prop = new rune.tween.TweenProp(
        name,
        this.m_objInitial[name],
        this.m_args[name]
    );
    
    this.m_prop.push(prop);
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_updateTweenProps = function(step) {
    this.m_elapsedTime += step;
    for (var i = 0; i < this.m_prop.length; i++) {
        this.m_objCurrent[this.m_prop[i].name] = this.m_transition(
            this['elapsedTime'],
            this.m_prop[i].start,
            this.m_prop[i].end - this.m_prop[i].start,
            this.m_duration
        );
    }

    this.m_execOnUpdate();
    this.m_execOnComplete();
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_execOnInit = function() {
    if (this['complete'] === false) {
        if (typeof this.m_onInit === "function") {
            this.m_onInit.call(
                this.m_scope, 
                this.m_objCurrent, 
                this
            );
        }
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_execOnUpdate = function() {
    if (this['complete'] === false) {
        if (typeof this.m_onUpdate === "function") {
            this.m_onUpdate.call(
                this.m_scope, 
                this.m_objCurrent, 
                this
            );
        }
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_execOnComplete = function() {
    if (this['complete'] === true) {
        if (typeof this.m_onComplete === "function") {
            this.m_completeTweenProps();
            this.m_onComplete.call(
                this.m_scope, 
                this.m_objCurrent, 
                this
            );
        }
    }
};

/**
 * TODO: ...
 * 
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_completeTweenProps = function() {
    var p = null;
    var i = this.m_prop.length;
    while (i--) {
        p = this.m_prop[i];
        this.m_objCurrent[p.name] = p.end; 
    }
}

/**
 * TODO: ...
 *
 * @param {Object} args ...
 *
 * @returns {undefined}
 * @private
 */
rune.tween.Tween.prototype.m_removeReservedProps = function(args) {
    var reserved = rune.tween.Tween.RESERVED_ARGUMENTS;
    var i = reserved.length;
    while (i--) {
        delete args[reserved[i]];
    }
};

/**
 * TODO: ...
 * 
 * @returns void
 * @private
 */
rune.tween.Tween.prototype.m_disposeTweenProps = function() {
    var i = this.m_prop.length;
    while (i--) {
        this.m_prop[i].dispose();
        this.m_prop[i] = null;
        this.m_prop.splice(i, 1);
    }
}