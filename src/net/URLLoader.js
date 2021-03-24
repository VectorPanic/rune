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
rune.net.URLLoader = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {FileReader}
     * @private
     */
    this.m_reader = null;

    /**
     * TODO: ...
     *
     * @type {rune.net.URLRequest}
     * @private
     */
    this.m_request = null;

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_status = rune.net.URLLoader.STATUS_IDLE;

    /**
     * TODO: ...
     *
     * @type {XMLHttpRequest}
     * @private
     */
    this.m_xhr = null;
};

//------------------------------------------------------------------------------
// Private static constants
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constant {number}
 * @default 0
 * @private
 */
rune.net.URLLoader.STATUS_IDLE = 0;

/**
 * TODO: ...
 *
 * @constant {number}
 * @default 1
 * @private
 */
rune.net.URLLoader.STATUS_BUSY = 1;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} status
 * @memberof rune.net.URLLoader
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLLoader.prototype, "status", {
    /**
     * ...
     * 
     * @this rune.net.URLLoader
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
 * @return {undefined}
 */
rune.net.URLLoader.prototype.abort = function() {
    if (this.m_status !== rune.net.URLLoader.STATUS_IDLE) {
        this.m_disposeXHR();
        this.m_disposeFileReader();
        this.m_execOnAbort();
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.net.URLLoader.prototype.dispose = function() {
    this.m_request = null;
    this.m_reader = null;
    this.m_xhr = null;
};

/**
 * TODO: ...
 *
 * @param {rune.net.URLRequest} request ...
 *
 * @throws {TypeError} ...
 * @throws {Error} ...
 *
 * @return {undefined}
 */
rune.net.URLLoader.prototype.load = function(request) {
    if (this.m_status !== rune.net.URLLoader.STATUS_BUSY) {
        this.m_status   = rune.net.URLLoader.STATUS_BUSY;
        if (request instanceof rune.net.URLRequest) {
            this.m_request = request;
            this.m_processRequest();
        } else throw new TypeError("@todo: ...");
    } else throw new Error("@todo: ...");
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_processRequest = function() {
    if (this.m_request instanceof rune.net.URLRequest) {
        if (this.m_request.isDataURL) this.m_processDataURL();
        else this.m_processFileURL();
    } else throw new TypeError("@todo: ...");
};

/**
 * TODO: ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_processDataURL = function() {
    if (this.m_request != null) {
        this.m_generateResponse(this.m_request['name'], this.m_request['path']);
    } else throw new TypeError();
    
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 * @suppress {checkTypes}
 */
rune.net.URLLoader.prototype.m_processFileURL = function() {
    this.m_disposeXHR();
    if (this.m_xhr == null) {
        var m_this = this;
        this.m_xhr = new XMLHttpRequest();
        this.m_xhr.onload = function(event) {
            if (event.target.status === 200) {
                m_this.m_readFileStream(m_this.m_request['name'], m_this.m_xhr.response);
            } else {
                m_this.m_execOnError();
                m_this.m_disposeXHR();
            }
        };

        this.m_xhr.open("GET", this.m_request['path'], true);
        this.m_xhr.responseType = "blob";
        this.m_xhr.onerror = function() {
            m_this.m_execOnError();
            m_this.m_disposeXHR();
        };

        this.m_xhr.send();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {Blob} blob ...
 *
 * @return {undefined}
 * @private
 * @suppress {checkTypes}
 */
rune.net.URLLoader.prototype.m_readFileStream = function(name, blob) {
    this.m_disposeFileReader();
    if (this.m_reader == null) {
        var m_this = this;
        this.m_reader = new FileReader();
        this.m_reader.onloadend = function(event) {
            m_this.m_generateResponse(name, m_this.m_reader.result);
        }

        this.m_reader.readAsDataURL(blob);
    }
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {string} data ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_generateResponse = function(name, data) {
    var response = new rune.net.URLResponse(name, data);
    this.m_execOnComplete(response);
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_execOnAbort = function() {
    if (this.m_status !== rune.net.URLLoader.STATUS_IDLE) {
        this.m_status   = rune.net.URLLoader.STATUS_IDLE;
        if (this.m_request instanceof rune.net.URLRequest && this.m_request.onRequestAbort instanceof rune.util.Executable) {
            this.m_request.onRequestAbort.execute(this.m_request);
        }
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @param {rune.net.URLResponse} response ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_execOnComplete = function(response) {
    if (this.m_status !== rune.net.URLLoader.STATUS_IDLE) {
        this.m_status   = rune.net.URLLoader.STATUS_IDLE;
        if (this.m_request instanceof rune.net.URLRequest && this.m_request.onRequestComplete instanceof rune.util.Executable) {
            this.m_request.onRequestComplete.execute(response);
        }
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
rune.net.URLLoader.prototype.m_execOnError = function() {
    if (this.m_status !== rune.net.URLLoader.STATUS_IDLE) {
        this.m_status   = rune.net.URLLoader.STATUS_IDLE;
        if (this.m_request instanceof rune.net.URLRequest && this.m_request.onRequestError instanceof rune.util.Executable) {
            this.m_request.onRequestError.execute(this.m_request);
        }
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_disposeXHR = function() {
    if (this.m_xhr instanceof XMLHttpRequest) {
        this.m_xhr.onload = null;
        this.m_xhr.abort();
        this.m_xhr = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.net.URLLoader.prototype.m_disposeFileReader = function() {
    if (this.m_reader instanceof FileReader) {
        this.m_reader.onloadend = null;
        this.m_reader.abort();
        this.m_reader = null;
    }
};