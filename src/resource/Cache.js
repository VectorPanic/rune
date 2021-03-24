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
rune.resource.Cache = function() {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {boolean}
     */
    this.locked = false;
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {Object}
     * @private
     */
    this.m_cache = {};
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {boolean}
 */
rune.resource.Cache.prototype.clear = function() {
    if (this.locked == false) {
        this.m_cache = {};

        return true;
    }

    return false;
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @return {boolean}
 */
rune.resource.Cache.prototype.delete = function(name) {
    if (this.locked == false) {
        delete this.m_cache[name];

        return true;
    }

    return false;
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.resource.Cache.prototype.dispose = function() {
    this.m_cache = null;
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @return {Object}
 */
rune.resource.Cache.prototype.get = function(name) {
    return this.m_cache[name];
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {Object} value ...
 *
 * @return {boolean}
 */
rune.resource.Cache.prototype.set = function(name, value) {
    if (this.locked == false) {
        this.m_cache[name] = value;
        return true;
    }

    return false;
};