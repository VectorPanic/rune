//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {string} [name] ...
 * @param {string} [path] ...
 * @param {rune.util.Executable} [onRequestComplete] ...
 * @param {rune.util.Executable} [onRequestError] ...
 * @param {rune.util.Executable} [onRequestAbort] ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.net.URLRequest = function(name, path, onRequestComplete, onRequestError, onRequestAbort) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onRequestAbort = onRequestAbort || null;

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onRequestComplete = onRequestComplete || null;

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onRequestError = onRequestError || null;

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {string}
     * @private
     */
    this.m_name = name || "Unnamed";

    /**
     * TODO: ...
     *
     * @type {string}
     * @private
     */
    this.m_path = path || "";
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {boolean} isDataURL
 * @memberof rune.net.URLRequest
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLRequest.prototype, "isDataURL", {
    /**
     * @this rune.net.URLRequest
     * @ignore
     */
    get : function() {
        return rune.util.DataURL.isDataURL(this.m_path);
    }
});

/**
 * TODO: ...
 *
 * @member {string} name
 * @memberof rune.net.URLRequest
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLRequest.prototype, "name", {
    /**
     * @this rune.net.URLRequest
     * @ignore
     */
    get : function() {
        return this.m_name;
    }
});

/**
 * TODO: ...
 *
 * @member {string} path
 * @memberof rune.net.URLRequest
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLRequest.prototype, "path", {
    /**
     * @this rune.net.URLRequest
     * @ignore
     */
    get : function() {
        return this.m_path;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.net.URLRequest.prototype.dispose = function() {
    this.m_name = "";
    this.onRequestAbort = null;
    this.onRequestComplete = null;
    this.onRequestError = null;
    this.m_path = "";
};