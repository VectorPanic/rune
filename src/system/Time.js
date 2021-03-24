//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of Time.
 *
 * @constructor
 *
 * @param {number} [framerate=60] Target framerate.
 * 
 * @class
 * @classdesc
 * 
 * Represents time.
 */
rune.system.Time = function(framerate) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Time step buffer.
     *
     * @type {number}
     * @private
     */
    this.m_buffer = 0;
    
    /**
     * Timestamp for current time.
     *
     * @type {number}
     * @private
     */
    this.m_currentTime = 0;
    
    /**
     * The current framerate.
     *
     * @type {number}
     * @private
     */
    this.m_currentFramerate = 0;
    
    /**
     * Timestamp for previous tick.
     *
     * @type {number}
     * @private
     */
    this.m_previousTime = 0;
    
    /**
     * The render stack.
     *
     * @type {rune.util.Stack}
     * @private
     */
    this.m_render = new rune.util.Stack();
    
    /**
     * Fixed amount of time between each frame.
     *
     * @type {number}
     * @private
     */
    this.m_step = 1000 / (framerate || 60);
    
    /**
     * ...
     *
     * @type {Array}
     * @private
     */
    this.m_ticks = [];
    
    /**
     * Request ID from latest requestAnimationFrame call.
     *
     * @type {number}
     * @private
     */
    this.m_timeLoopID = 0;
    
    /**
     * The update stack.
     *
     * @type {rune.util.Stack}
     * @private
     */
    this.m_update = new rune.util.Stack();
}

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * The current framerate.
 *
 * @member {number} currentFramerate
 * @memberof rune.system.Time
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Time.prototype, "currentFramerate", {
    /**
     * ... 
     *
     * @this rune.system.Time
     * @ignore
     */
    get : function() {
        return rune.util.Math.clamp(this.m_currentFramerate, 0, this['targetFramerate']);
    },
});

/**
 * The render stack.
 *
 * @member {rune.util.Stack} render
 * @memberof rune.system.Time
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Time.prototype, "render", {
    /**
     * ... 
     *
     * @this rune.system.Time
     * @ignore
     */
    get : function() {
        return this.m_render;
    }
});

/**
 * The fixed time step.
 *
 * @member {number} step
 * @memberof rune.system.Time
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Time.prototype, "step", {
    /**
     * ... 
     *
     * @this rune.system.Time
     * @ignore
     */
    get : function() {
        return this.m_step;
    }
});

/**
 * Target framerate.
 *
 * @member {number} framerate
 * @memberof rune.system.Time
 * @instance
 */
Object.defineProperty(rune.system.Time.prototype, "targetFramerate", {
    /**
     * ... 
     *
     * @this rune.system.Time
     * @ignore
     */
    get : function() {
        return Math.ceil(1000 / this.m_step);
    },

    /**
     * ... 
     *
     * @this rune.system.Time
     * @ignore
     */
    set : function(value) {
        this.m_step = 1000 / value;
    }
});

/**
 * The update stack.
 *
 * @member {rune.util.Stack} update
 * @memberof rune.system.Time
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Time.prototype, "update", {
    /**
     * ... 
     *
     * @this rune.system.Time
     * @ignore
     */
    get : function() {
        return this.m_update;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Reset time count to current time.
 *
 * @return {undefined}
 */
rune.system.Time.prototype.reset = function() {
    this.m_currentTime  = window.performance.now();
    this.m_previousTime = this.m_currentTime - this.m_step;
};

/**
 * Starts time count.
 *
 * @return {undefined}
 */
rune.system.Time.prototype.start = function() {
    this.m_initTimeLoop();
};

/**
 * Stops time count.
 *
 * @param {boolean} [clear=false] Whether the update and render stacks should be emptied or not.
 *
 * @return {undefined}
 */
rune.system.Time.prototype.stop = function(clear) {
    this.m_disposeTimeLoop();
    if (clear === true) {
        this.m_update.clear();
        this.m_render.clear();
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Stops and deletes all memory allocations associated with the object.
 *
 * @returns {undefined}
 */
rune.system.Time.prototype.dispose = function() {
    this.stop(true);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Starts the loop that represents time.
 *
 * @throws {Error} If the runtime environment does not support requestAnimationFrame.
 *
 * @return {undefined}
 * @private
 */
rune.system.Time.prototype.m_initTimeLoop = function() {
    if (window.requestAnimationFrame !== undefined) {
        var m_this = this;
        this.m_timeLoopID = window.requestAnimationFrame(function() {
            m_this.m_tick();
        });
    } else throw new Error();
};

/**
 * Calculates tick.
 *
 * @return {undefined}
 * @private
 */
rune.system.Time.prototype.m_tick = function() {
    this.m_previousTime = this.m_currentTime;
    this.m_currentTime  = window.performance.now();

    this.m_buffer += this.m_currentTime - this.m_previousTime;

    if (this.m_buffer > this.m_step) {
        
        while(this.m_ticks.length > 0 && this.m_ticks[0] <= this.m_currentTime - 1000) {
            this.m_ticks.shift();
        }
        
        this.m_ticks.push(this.m_currentTime);
        this.m_currentFramerate = this.m_ticks.length;
        
        while (this.m_buffer > this.m_step) {
            this.m_buffer -= this.m_step;
            this.m_execUpdateStack();
        }
        
        this.m_execRenderStack();
    }
    
    var m_this = this;
    this.m_requestID = window.requestAnimationFrame(function() {
        m_this.m_tick();
    });
};

/**
 * Executes the contents of the update stack.
 *
 * @throws {Error} On missing stack.
 *
 * @return {undefined}
 * @private
 */
rune.system.Time.prototype.m_execUpdateStack = function() {
    if (this.m_update != null) {
        this.m_update.execute(this['step']);
    } else throw new Error();
};

/**
 * Executes the contents of the render stack.
 *
 * @throws {Error} On missing stack.
 *
 * @return {undefined}
 * @private
 */
rune.system.Time.prototype.m_execRenderStack = function() {
    if (this.m_render != null) {
        this.m_render.execute();
    } else throw new Error();
};

/**
 * Stops the loop that represents time.
 *
 * @throws {Error} If the runtime environment does not support requestAnimationFrame.
 *
 * @return {undefined}
 * @private
 */
rune.system.Time.prototype.m_disposeTimeLoop = function() {
    if (window.cancelAnimationFrame !== undefined) {
        window.cancelAnimationFrame(this.m_timeLoopID);
        this.m_timeLoopID = 0;
    } else throw new Error();
};