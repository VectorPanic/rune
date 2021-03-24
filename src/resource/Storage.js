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
rune.resource.Storage = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {rune.resource.Cache}
     * @private
     */
    this.m_cacheApplication = null;

    /**
     * TODO: ...
     *
     * @type {rune.resource.Cache}
     * @private
     */
    this.m_cacheEngine = null;

    /**
     * TODO: ...
     *
     * @type {rune.resource.Cache}
     * @private
     */
    this.m_cacheScene = null;

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
rune.resource.Storage.ENGINE = 0;

/**
 * TODO: ...
 *
 * @constant {number}
 * @default 1
 */
rune.resource.Storage.APPLICATION = 1;

/**
 * TODO: ...
 *
 * @constant {number}
 * @default 2
 */
rune.resource.Storage.SCENE = 2;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 */
rune.resource.Storage.prototype.dispose = function() {
    this.m_disposeCacheScene();
    this.m_disposeCacheApplication();
    this.m_disposeCacheEngine();
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @returns {Object}
 */
rune.resource.Storage.prototype.get = function(name) {
    var data = null;
    var caches = ["m_cacheScene", "m_cacheApplication", "m_cacheEngine"];

    for (var i = 0; i < caches.length; i++) {
        data = this[caches[i]].get(name);
        if (data != null) {
            return data;
        }
    }

    return data;
};

/**
 * TODO: ...
 *
 * @param {boolean} [engine] ...
 * @param {boolean} [application] ...
 * @param {boolean} [scene] ...
 *
 * @returns {undefined}
 */
rune.resource.Storage.prototype.lock = function(engine, application, scene) {
    this.m_cacheEngine.locked = (engine === true || engine == undefined) ? true : false;
    this.m_cacheApplication.locked = (application === true || scene == undefined) ? true : false;
    this.m_cacheScene.locked = (scene === true || scene == undefined) ? true : false;
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {Object} value ...
 * @param {number} [cache] ...
 *
 * @returns {boolean}
 */
rune.resource.Storage.prototype.set = function(name, value, cache) {
    switch (cache) {
        case rune.resource.Storage.ENGINE:
            return this.m_cacheEngine.set(name, value);
            break;

        case rune.resource.Storage.APPLICATION:
            return this.m_cacheApplication.set(name, value);
            break;

        default:
            return this.m_cacheScene.set(name, value);
            break;
    }
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @protected
 */
rune.resource.Storage.prototype.m_construct = function() {
    this.m_constructCacheEngine();
    this.m_constructCacheApplication();
    this.m_constructCacheScene();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @private
 */
rune.resource.Storage.prototype.m_constructCacheEngine = function() {
    this.m_disposeCacheEngine();
    if (this.m_cacheEngine == null) {
        this.m_cacheEngine = new rune.resource.Cache();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @private
 */
rune.resource.Storage.prototype.m_constructCacheApplication = function() {
    this.m_disposeCacheApplication();
    if (this.m_cacheApplication == null) {
        this.m_cacheApplication = new rune.resource.Cache();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @private
 */
rune.resource.Storage.prototype.m_constructCacheScene = function() {
    this.m_disposeCacheScene();
    if (this.m_cacheScene == null) {
        this.m_cacheScene = new rune.resource.Cache();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.resource.Storage.prototype.m_disposeCacheScene = function() {
    if (this.m_cacheScene instanceof rune.resource.Cache) {
        this.m_cacheScene.dispose();
        this.m_cacheScene = null;
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.resource.Storage.prototype.m_disposeCacheApplication = function() {
    if (this.m_cacheApplication instanceof rune.resource.Cache) {
        this.m_cacheApplication.dispose();
        this.m_cacheApplication = null;
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @private
 */
rune.resource.Storage.prototype.m_disposeCacheEngine = function() {
    if (this.m_cacheEngine instanceof rune.resource.Cache) {
        this.m_cacheEngine.dispose();
        this.m_cacheEngine = null;
    }
};