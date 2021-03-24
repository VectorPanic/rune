//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new executable.
 * 
 * @constructor
 *
 * @param {Function} [fn] ...
 * @param {Object} [scope] ...
 * @param {Array} [args] ...
 * 
 * @class
 * @classdesc
 * 
 * An executable is an object containing a function reference and a execution 
 * scope.
 */
rune.util.Executable = function(fn, scope, args) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Function to execute.
     *
     * @type {Function}
     * @private
     */
    this.m_fn = fn || function() {};

    /**
     * Execution scope.
     *
     * @type {Object}
     * @private
     */
    this.m_scope = scope || null;
    
    /**
     * TODO: ...
     *
     * @type {Array}
     * @private
     */
    this.m_args = args || [];
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {Array} args
 * @memberof rune.util.Executable
 * @instance
 * @readonly
 */
Object.defineProperty(rune.util.Executable.prototype, "args", {
    /**
     * @this rune.util.Executable
     * @ignore
     */
    get : function() {
        return this.m_args;
    }
});

/**
 * Function to execute.
 *
 * @member {Function} fn
 * @memberof rune.util.Executable
 * @instance
 * @readonly
 */
Object.defineProperty(rune.util.Executable.prototype, "fn", {
    /**
     * @this rune.util.Executable
     * @ignore
     */
    get : function() {
        return this.m_fn;
    }
});

/**
 * Execution scope.
 *
 * @member {Object} scope
 * @memberof rune.util.Executable
 * @instance
 * @readonly
 */
Object.defineProperty(rune.util.Executable.prototype, "scope", {
    /**
     * @this rune.util.Executable
     * @ignore
     */
    get : function() {
        return this.m_scope;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Resets the object.
 *
 * @returns {undefined}
 */
rune.util.Executable.prototype.dispose = function() {
    this.m_args = null;
    this.m_fn = null;
    this.m_scope = null;
};

/**
 * Executes the object.
 *
 * @param {...*} [args] Optional arguments.
 *
 * @throws {TypeError} If the specified function cannot be executed.
 *
 * @returns {undefined}
 */
rune.util.Executable.prototype.execute = function(args) {
    args = this.m_args.concat(Array.prototype.slice.call(arguments));
    if (typeof this.m_fn === "function") {
        this.m_fn.apply(this.m_scope, args);
    } else throw new TypeError();
};