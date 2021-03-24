//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new empty execution stack.
 * 
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Represents a list of executable objects.
 */
rune.util.Stack = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Time delta of previous execution.
     *
     * @type {number}
     * @private
     */
    this.m_duration = 0.0;

    /**
     * List of executables.
     *
     * @type {Array}
     * @private
     */
    this.m_execs = [];
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Time delta of previous execution.
 *
 * @member {number} duration
 * @memberof rune.util.Stack
 * @instance
 * @readonly
 */
Object.defineProperty(rune.util.Stack.prototype, "duration", {
    /**
     * Return time delta of previous execution.
     *
     * @this rune.util.Stack
     * @ignore
     */
    get : function() {
        return this.m_duration;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Add function and execution scope to the stack.
 *
 * @param {Function} fn Function to add.
 * @param {Object} [scope=null] The scope in which the function will be executed.
 * @param {Array} [args=null] ...
 *
 * @throws {TypeError} Argument must be of valid function type.
 *
 * @return {undefined}
 */
rune.util.Stack.prototype.add = function(fn, scope, args) {
    if (typeof fn === "function") {
        scope = scope || null;
        for (var i = 0; i < this.m_execs.length; i++) {
            var exec = this.m_execs[i];
            if (exec["fn"] === fn && exec["scope"] === scope && exec["args"] === args) {
                return;
            }
        }

        this.m_execs.push(new rune.util.Executable(fn, scope, args));
    } else throw new TypeError("Argument must be of valid function type.");
};

/**
 * Resets the stack.
 *
 * @param {boolean} [dispose] ...
 *
 * @return {undefined}
 */
rune.util.Stack.prototype.clear = function(dispose) {
    while (this.m_execs.length > 0) {
        this.m_execs.shift();
    }

    this.m_execs = (dispose) ? null : [];
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.util.Stack.prototype.dispose = function() {
    this.clear(true);
};

/**
 * TODO: ...
 *
 * @param {...Object} args
 *
 * @return {undefined}
 */
rune.util.Stack.prototype.execute = function(args) {
    var timestamp = performance.now();
    for (var i = 0, l = this.m_execs.length; i < l; i++) {
        this.m_execs[i].execute.apply(this.m_execs[i], arguments);
    }
    
    this.m_duration = performance.now() - timestamp;
};

/**
 * Remove a function from the execution stack.
 *
 * @param {Function} fn Function to remove.
 * @param {Object} [scope=null] The scope in which the function will be executed.
 *
 * @return {undefined}
 */
rune.util.Stack.prototype.remove = function(fn, scope) {
    scope = scope || null;
    for (var i = 0; i < this.m_execs.length; i++) {
        var exec = this.m_execs[i];
        if (exec.fn === fn && exec.scope === scope) {
            this.m_execs.splice(i, 1);
            return;
        }
    }
};