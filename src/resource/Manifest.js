//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {rune.util.Executable} [onLoadComplete] ...
 * @param {rune.util.Executable} [onLoadProgress] ...
 * @param {rune.util.Executable} [onLoadError] ...
 * @param {rune.util.Executable} [onLoadAbort] ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 *
 */
rune.resource.Manifest = function(onLoadComplete, onLoadProgress, onLoadError, onLoadAbort) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onLoadAbort = onLoadAbort || null;

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onLoadComplete = onLoadComplete || null;

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onLoadError = onLoadError || null;

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     */
    this.onLoadProgress = onLoadProgress || null;
    
	//--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {Array.<rune.net.URLRequest>}
     * @private
     */
    this.m_URLRequests = [];

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} length
 * @memberof rune.resource.Manifest
 * @instance
 * @readonly
 */
Object.defineProperty(rune.resource.Manifest.prototype, "length", {
    /**
     * @this rune.resource.Manifest
     * @ignore
     */
    get : function() {
        return this.m_URLRequests.length;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {rune.net.URLRequest} request ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 */
rune.resource.Manifest.prototype.add = function(request) {
    if (request instanceof rune.net.URLRequest) {
        if (this.get(request['name']) === null) {
            this.m_URLRequests.push(request);
        }
    } else throw new TypeError();
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.resource.Manifest.prototype.clear = function() {
    var i = this.m_URLRequests.length;
    while (i--) {
        this.m_URLRequests[0].dispose();
        this.m_URLRequests[0] = null;
        this.m_URLRequests.splice(0, 1);
    }

    this.m_URLRequests = [];
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {string} path ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 */
rune.resource.Manifest.prototype.create = function(name, path) {
    if (this.get(name) === null) {
        var request = new rune.net.URLRequest(name, path);
        this.add(request);
    } else throw new Error("@todo: ...");  
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.resource.Manifest.prototype.dispose = function() {
    this.m_onLoadComplete = null;
    this.m_onLoadProgress = null;
    this.m_onLoadError = null;

    while (this.m_URLRequests.length > 0) {
        this.m_URLRequests[0].dispose();
        this.m_URLRequests[0] = null;
        this.m_URLRequests.splice(0, 1);
    }
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @returns {rune.net.URLRequest}
 */
rune.resource.Manifest.prototype.get = function(name) {
    var i = this.m_URLRequests.length;
    while (i--) {
        if (this.m_URLRequests[i]['name'] === name) {
            return this.m_URLRequests[i];
        }
    }

    return null;
};

/**
 * TODO: ...
 *
 * @param {number} index ...
 *
 * @throws {RangeError} ...
 *
 * @returns {rune.net.URLRequest}
 */
rune.resource.Manifest.prototype.getAt = function(index) {
    if (index > -1 && index < this.m_URLRequests.length) return this.m_URLRequests[index];
    else throw new RangeError();
};

/**
 * TODO: ...
 *
 * @return {rune.net.URLRequest}
 */
rune.resource.Manifest.prototype.pop = function() {
    return this.m_URLRequests.pop();
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @returns {boolean}
 */
rune.resource.Manifest.prototype.remove = function(name) {
    var i = this.m_URLRequests.length;
    while (i--) {
        if (this.m_URLRequests[i]['name'] === name) {
            this.m_URLRequests.splice(i, 1);
            return true;
        }
    }

    return false;
};

/**
 * TODO: ...
 *
 * @return {rune.net.URLRequest}
 */
rune.resource.Manifest.prototype.shift = function() {
    return this.m_URLRequests.shift();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 */
rune.resource.Manifest.prototype.m_construct = function() {
    //DO NOTHING; ATM
};