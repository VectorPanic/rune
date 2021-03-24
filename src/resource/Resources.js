//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.resource.Resources = function() {

	//--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_cache = rune.resource.Storage.SCENE;

    /**
     * TODO: ...
     *
     * @type {rune.resource.Manifest}
     * @private
     */
    this.m_manifest = null;

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_status = rune.resource.Resources.STATUS_IDLE;

    /**
     * TODO: ...
     *
     * @type {rune.resource.Storage}
     * @private
     */
    this.m_storage = null;

    /**
     * TODO: ...
     *
     * @type {rune.net.URLLoader}
     * @private
     */
    this.m_URLLoader = null;

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     * @private
     */
    this.m_execOnRequestComplete = new rune.util.Executable(this.m_processResponse, this);

    /**
     * TODO: ...
     *
     * @type {rune.util.Executable}
     * @private
     */
    this.m_execOnRequestError = new rune.util.Executable(this.m_onRequestError, this);

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constant {number}
 * @default 0
 */
rune.resource.Resources.STATUS_IDLE = 0;

/**
 * TODO: ...
 *
 * @constant {number}
 * @default 1
 */
rune.resource.Resources.STATUS_BUSY = 1;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} progress
 * @memberof rune.resource.Resources
 * @instance
 * @readonly
 */
Object.defineProperty(rune.resource.Resources.prototype, "progress", {
    /**
     * @this rune.resource.Resources
     * @ignore
     */
    get : function() {
        return rune.util.Math.percentDec( 
            this.m_manifest["length"],
            this.m_numRequests
        ) * 100;
    }
});

/**
 * TODO: ...
 *
 * @member {number} status
 * @memberof rune.resource.Resources
 * @instance
 * @readonly
 */
Object.defineProperty(rune.resource.Resources.prototype, "status", {
    /**
     * @this rune.resource.Resources
     * @ignore
     */
    get : function() {
        return this.m_status;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {boolean}
 */
rune.resource.Resources.prototype.abort = function() {
    if (this.m_status !== rune.resource.Resources.STATUS_IDLE) {
        this.m_status   = rune.resource.Resources.STATUS_IDLE;
        if (this.m_URLLoader instanceof rune.net.URLLoader) {
            this.m_URLLoader.abort();
        }

        if (this.m_manifest instanceof rune.resource.Manifest && 
            this.m_manifest.onLoadAbort instanceof rune.util.Executable) {
            this.m_manifest.onLoadAbort.execute();
        }

        return true;
    }

    return false;
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.resource.Resources.prototype.dispose = function() {
    this.abort();
    this.m_disposeManifest();
    this.m_disposeURLLoader();
    this.m_disposeStorage();
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @return {Object}
 */
rune.resource.Resources.prototype.get = function(name) {
    if (this.m_storage != null) {
        return this.m_storage.get(name);
    }

    return null;
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {Object} data ...
 * @param {number} cache ...
 *
 * @return {boolean}
 */
rune.resource.Resources.prototype.set = function(name, data, cache) {
    return this.m_storage.set(name, data, cache);
};

/**
 * TODO: ...
 *
 * @param {rune.resource.Manifest} manifest ...
 * @param {number} [cache] ...
 *
 * @return {boolean}
 */
rune.resource.Resources.prototype.load = function(manifest, cache) {
    this.m_cache = (cache != undefined) ? cache : rune.resource.Storage.SCENE;
    if (this.m_status !== rune.resource.Resources.STATUS_BUSY) {
        this.m_status   = rune.resource.Resources.STATUS_BUSY;
        if (this.m_manifest == null) {
            this.m_manifest = manifest;
            this.m_numRequests = this.m_manifest["length"];

            //NOTE: PUSH THE PROCESSING PART TO END OF FRAME
            var m_this = this;
            window.setTimeout(function() {
                m_this.m_processRequest();
            }, 0);

        } else throw new Error("@todo: ...");

        return true;
    }

    return false;
};

/**
 * TODO: ...
 *
 * @param {boolean} [engine] ...
 * @param {boolean} [application] ...
 * @param {boolean} [scene] ...
 *
 * @return {undefined}
 */
rune.resource.Resources.prototype.lock = function(engine, application, scene) {
    this.m_storage.lock(engine, application, scene);
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
rune.resource.Resources.prototype.m_construct = function() {
    this.m_constructStorage();
    this.m_constructURLLoader();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_constructStorage = function() {
    this.m_disposeStorage();
    if (this.m_storage == null) {
    	this.m_storage = new rune.resource.Storage();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_constructURLLoader = function() {
    this.m_disposeURLLoader();
    if (this.m_URLLoader == null) {
    	this.m_URLLoader = new rune.net.URLLoader();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_processRequest = function() {
    if (this.m_manifest != null) {
        if (this.m_manifest && this.m_manifest["length"] > 0) {
            var request = this.m_manifest.shift();
                request.onRequestComplete = this.m_execOnRequestComplete;
                request.onRequestError = this.m_execOnRequestError;
                
            this.m_URLLoader.load(request);
        } else {
            this.m_status = rune.resource.Resources.STATUS_IDLE;
            if (this.m_manifest instanceof rune.resource.Manifest &&
                this.m_manifest.onLoadComplete instanceof rune.util.Executable) {
                this.m_manifest.onLoadComplete.execute(this);
                
                this.m_disposeManifest();
            }
        }
    } else throw new Error(this.m_manifest);
};

/**
 * TODO: ...
 *
 * @param {rune.net.URLResponse} response ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_processResponse = function(response) {
    rune.resource.Encoder.encode(response["data"], function(data) { //TODO: MAKE SURE DATA IS VALID
        this.m_storage.set(response["name"], data, this.m_cache);
        if (this.m_manifest instanceof rune.resource.Manifest &&
            this.m_manifest.onLoadProgress instanceof rune.util.Executable) {
            this.m_manifest.onLoadProgress.execute(response["name"], response["contentType"], data, this.progress);
        }

        this.m_processRequest();
    },
    this
    );
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_disposeManifest = function() {
    if (this.m_manifest instanceof rune.resource.Manifest) {
        this.m_manifest.dispose();
        this.m_manifest = null;
    };
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_disposeURLLoader = function() {
    if (this.m_URLLoader instanceof rune.net.URLLoader) {
        this.m_URLLoader.dispose();
        this.m_URLLoader = null;
    };
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_disposeStorage = function() {
    if (this.m_storage instanceof rune.resource.Storage) {
        this.m_storage.dispose();
        this.m_storage = null;
    };
};

/**
 * TODO: ...
 *
 * @param {rune.net.URLRequest} request ...
 *
 * @return {undefined}
 * @private
 */
rune.resource.Resources.prototype.m_onRequestError = function(request) {
    if (this.m_manifest instanceof rune.resource.Manifest && 
        this.m_manifest.onLoadError instanceof rune.util.Executable) {
        this.m_manifest.onLoadError.execute(request);
    }
};