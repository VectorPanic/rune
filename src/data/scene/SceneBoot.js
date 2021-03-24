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
rune.data.SceneBoot = function(options) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * The camera.
     *
     * @type {rune.camera.Camera}
     * @private
     */
    this.m_camera = null;

    /**
     * The logotype.
     *
     * @type {rune.display.Sprite}
     * @private
     */
    this.m_logo = null;

    /**
     * The stage consists of two stages; load resources and fade-in / -out 
     * transitions. When both are completed, the next scene is activated.
     *
     * @type {number}
     * @private
     */
    this.m_numStepCompleted = 0;

    /**
     * Application configuration file.
     *
     * @type {Object}
     * @private
     */
    this.m_options = options || {};

    /**
     * The progress bar.
     *
     * @type {Object}
     * @private
     */
    this.m_progressbar = null;
    
    /**
     * Boot sound.
     *
     * @type {rune.media.Sound}
     * @private
     */
    this.m_sound = null;

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

rune.data.SceneBoot.prototype = Object.create(rune.scene.Scene.prototype);
rune.data.SceneBoot.prototype.constructor = rune.data.SceneBoot;

//------------------------------------------------------------------------------
// Private static constants
//------------------------------------------------------------------------------

/**
 * Start and stop delay.
 *
 * @constant {number}
 * @private
 */
rune.data.SceneBoot.DELAY_DURATION = 1000;

/**
 * The length of the fade effects.
 *
 * @constant {number}
 * @private
 */
rune.data.SceneBoot.FADE_DURATION = 2500;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.data.SceneBoot.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initLogo();
    this.m_initProgressbar();
    this.m_initSound();
};

/**
 * @inheritDoc
 */
rune.data.SceneBoot.prototype.dispose = function() {
    this.m_disposeSound();
    this.m_disposeProgressbar();
    this.m_disposeLogo();
    this.m_disposeCamera();
    rune.scene.Scene.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.data.SceneBoot.prototype.m_initCamera = function() {
    rune.scene.Scene.prototype.m_initCamera.call(this);
    this.m_camera = this['cameras'].getCamera(0);
    this.m_camera['fade']['opacity'] = 1.0;
    this['timers'].create({
        duration: rune.data.SceneBoot.DELAY_DURATION,
        scope: this,
        onComplete: this.m_fadeIn
    });
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a logotype and places it on the stage.
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_initLogo = function() {
    var cls = (this.m_options.bootLogoIcon) ? rune.data.LogoIcon : rune.data.LogoText;
    
    this.m_disposeLogo();
    if (this.m_logo == null) {
        this.m_logo = new cls();
        
        if (this['application']['screen']['width']  >= 1280 && 
            this['application']['screen']['height'] >= 720) {
            this.m_logo.scaleX = 2.0;
            this.m_logo.scaleY = 2.0;
        }
        
        this.m_logo["center"] = this["application"]["screen"]["center"];
        this["stage"].addChild(this.m_logo);
        
    } else throw new Error();
};

/**
 * Creates a progress bar and places it on the stage.
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_initProgressbar = function() {
    this.m_disposeProgressbar();
    if (this.m_progressbar == null) {
        this.m_progressbar = new rune.ui.Progressbar(
            this["application"]["screen"]["width"],
            4
        );

        this.m_progressbar.bottom = this["application"]["screen"]["height"];
        this.m_progressbar.progress = 0.0;
        this.m_camera.addChild(this.m_progressbar);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_initSound = function() {
    this.m_disposeSound();
    if (this.m_sound == null) {
        this.m_sound = this['application']['sounds']['sound'].get("rune_sound_logo");
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_disposeSound = function() {
    if (this.m_sound != null) {
        this.m_sound.dispose();
        this.m_sound = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_disposeProgressbar = function() {
    if (this.m_progressbar != null) {
        this.m_progressbar.parent.removeChild(this.m_progressbar, true);
        this.m_progressbar = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_disposeCamera = function() {
    if (this.m_camera != null) {
        this['cameras'].remove(this.m_camera, true);
        this.m_camera = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_disposeLogo = function() {
    if (this.m_logo != null) {
        this.m_logo.dispose();
        this.m_logo = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_fadeIn = function() {
    if (this.m_camera instanceof rune.camera.Camera) {
        this.m_camera['fade'].in(
            rune.data.SceneBoot.FADE_DURATION,
            this.m_onFadeInComplete,
            this
        );
        
        this.m_sound.play();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_onFadeInComplete = function() {
    this.m_load();
    this['timers'].create({
        duration: rune.data.SceneBoot.DELAY_DURATION,
        scope: this,
        onComplete: function() {
            if (++this.m_numStepCompleted === 2) {
                this.m_fadeOut();
            }
        }
    });
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_load = function() {
    var Manifest = this.m_options.resources || rune.resource.Manifest;
    this['application']['resources'].load(new Manifest(
        new rune.util.Executable(this.m_onLoadComplete, this),
        new rune.util.Executable(this.m_onResourcesProgress, this),
        new rune.util.Executable(this.m_onResourcesError, this)
    ), rune.resource.Storage.APPLICATION);
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_onLoadComplete = function() {
    if (++this.m_numStepCompleted === 2) {
        this.m_fadeOut();
    }
};

/**
 * ...
 *
 * @param {string} name ...
 * @param {string} type ...
 * @param {string} data ...
 * @param {number} progress ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_onResourcesProgress = function(name, type, data, progress) {
    if (this.m_progressbar != null) {
        this.m_progressbar.progress = progress / 100;
    }
};

/**
 * ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_onResourcesError = function(request) {
    throw new Error("@todo: ...");
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_fadeOut = function() {
    if (this.m_camera instanceof rune.camera.Camera) {
        this.m_camera['fade'].out(
            rune.data.SceneBoot.FADE_DURATION,
            this.m_onFadeOutComplete,
            this
        );

        if (this.m_progressbar != null) {
            this.m_progressbar.progress = 1.0;
        }
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.data.SceneBoot.prototype.m_onFadeOutComplete = function() {
    this['application'].resources.lock(true, true, false);
    var scenes = (this.m_options.scene != null) ? [new this.m_options.scene()] : [new rune.scene.Scene()];
    this['application']['scenes'].load(scenes);
};