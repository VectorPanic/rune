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
rune.util.DataURL = function() {
    console.warn("This class is not meant to be instantiated; all content is static.");
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constant {RegExp}
 */
rune.util.DataURL.CONTENT_TYPE_OF_DATA_URL = /[^:]\w+\/[\w-+\d.]+(?=;|,)/;

/**
 * ...
 *
 * @constant {RegExp}
 */
rune.util.DataURL.IS_DATA_URL = /^\s*data:([a-z]+\/[a-z-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

//------------------------------------------------------------------------------
// Protected static constants
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constant {string}
 * @ignore
 */
rune.util.DataURL.DEFAULT_CONTENT_TYPE = "application/octet-stream";

//--------------------------------------------------------------------------
// Public static methods
//--------------------------------------------------------------------------

/**
 * ...
 * 
 * @param {string} str ...
 * 
 * @returns {string}
 */
rune.util.DataURL.getContentTypeOfDataURL = function(str) {
    if (rune.util.DataURL.isDataURL(str)) {
        if (typeof str === "string") {
            var contentType = str.match(rune.util.DataURL.CONTENT_TYPE_OF_DATA_URL);
            if (contentType.length > 0) return contentType[0];
            else return rune.util.DataURL.DEFAULT_CONTENT_TYPE;
        } else throw new TypeError("@todo: ...");
    } else throw new Error("@todo: ...");
};

/**
 * ...
 * 
 * @param {string} str ...
 * 
 * @returns {boolean}
 */
rune.util.DataURL.isDataURL = function(str) {
    return (str.match(rune.util.DataURL.IS_DATA_URL)) ? true : false;
};