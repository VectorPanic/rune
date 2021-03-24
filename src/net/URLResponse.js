//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {string} [name] ...
 * @param {string} [data] ...
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.net.URLResponse = function(name, data) {
    
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
    this.m_data = data || "";
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {string} contentType
 * @memberof rune.net.URLResponse
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLResponse.prototype, "contentType", {
    /**
     * @this rune.net.URLResponse
     * @ignore
     */
    get : function() {
        return rune.util.DataURL.getContentTypeOfDataURL(this.m_data);
    }
});

/**
 * TODO: ...
 *
 * @member {string} data
 * @memberof rune.net.URLResponse
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLResponse.prototype, "data", {
    /**
     * @this rune.net.URLResponse
     * @ignore
     */
    get : function() {
        return this.m_data;
    }
});

/**
 * TODO: ...
 *
 * @member {string} name
 * @memberof rune.net.URLResponse
 * @instance
 * @readonly
 */
Object.defineProperty(rune.net.URLResponse.prototype, "name", {
    /**
     * @this rune.net.URLResponse
     * @ignore
     */
    get : function() {
        return this.m_name;
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
rune.net.URLResponse.prototype.dispose = function() {
    this.m_name = "";
    this.m_data = "";
};