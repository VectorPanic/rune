//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @param {Object} options
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.data.SceneBootDebug = function(options) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {Object}
     * @private
     */
    this.m_options = options || {};

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.data.SceneBootDebug.prototype = Object.create(rune.scene.Scene.prototype);
rune.data.SceneBootDebug.prototype.constructor = rune.data.SceneBootDebug;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.data.SceneBootDebug.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initConsole();
    this.m_initLoad();
};

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBootDebug.prototype.m_initConsole = function() {
    this['application']['screen']['console'].interactive = false;
    this['application']['screen']['console'].set(1.0, 0.0);
    this['application']['screen']['console']['instance']['input'].enabled = false;
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBootDebug.prototype.m_initLoad = function() {
    var Manifest = this.m_options.resources || rune.resource.Manifest;
    this['application'].resources.load(new Manifest(
        new rune.util.Executable(this.m_onLoadComplete, this),
        new rune.util.Executable(this.m_onResourcesProgress, this),
        new rune.util.Executable(this.m_onResourcesError, this)
    ), rune.resource.Storage.APPLICATION);

    this['application']['screen']['console'].log("Loading application resources...");
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBootDebug.prototype.m_onLoadComplete = function() {
    this['application'].resources.lock(true, true, false);
    var scenes = (this.m_options.scene != null) ? [new this.m_options.scene()] : [new rune.scene.Scene()];

    this['application']['scenes'].load(scenes);
    this['application']['screen']['console'].log("Load complete.");

    this['application']['screen']['console'].hide();
    this['application']['screen']['console'].interactive = true;
    this['application']['screen']['console']['instance']['input'].enabled = true;
    
    
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBootDebug.prototype.m_onResourcesProgress = function(name, type, data, progress) {
    this['application']['screen']['console'].log("Loaded: " + name + " [" + type + "]");
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBootDebug.prototype.m_onResourcesError = function(request) {
    this['application']['screen']['console'].log("Error: Invalid resource " + request.name);
};