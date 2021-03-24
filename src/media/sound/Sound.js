//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 *
 * @param {AudioContext} context ...
 * @param {string} resource ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.media.Sound = function(context, resource) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {string}
     * @private
     */
    this.m_resource = resource;
    
    /**
     * ...
     *
     * @type {AudioContext}
     * @private
     */
    this.m_context = context;
    
    /**
     * ...
     *
     * @type {MediaElementAudioSourceNode}
     * @private
     */
    this.m_source = null;
    
    /**
     * ...
     *
     * @type {StereoPannerNode}
     * @private
     */
    this.m_stereoPanner = null;

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} pan
 * @memberof rune.media.Sound
 * @instance
 * @readonly
 */
Object.defineProperty(rune.media.Sound.prototype, "pan", {
    /**
     * @this rune.media.Sound
     * @ignore
     */
    get : function() {
        return this.m_stereoPanner['pan'].value;
    },
    
    /**
     * @this rune.media.Sound
     * @ignore
     */
    set : function(value) {
        this.m_stereoPanner['pan'].value = rune.util.Math.clamp(value, -1.0, 1.0);
    }
});

/**
 * ...
 *
 * @member {boolean} paused
 * @memberof rune.media.Sound
 * @instance
 * @readonly
 */
Object.defineProperty(rune.media.Sound.prototype, "paused", {
    /**
     * @this rune.media.Sound
     * @ignore
     */
    get : function() {
        return this.m_source['mediaElement'].paused;
    }
});

/**
 * Current volume.
 *
 * @member {number} volume
 * @memberof rune.media.Sound
 * @instance
 */
Object.defineProperty(rune.media.Sound.prototype, "volume", {
    /**
     * @this rune.media.Sound
     * @ignore
     */
    get : function() {
        return this.m_source['mediaElement'].volume;
    },
    
    /**
     * @this rune.media.Sound
     * @ignore
     */
    set : function(value) {
        this.m_source['mediaElement'].volume = rune.util.Math.clamp(value, 0.0, 1.0);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Pause current playback.
 *
 * @return {undefined}
 */
rune.media.Sound.prototype.pause = function() {
    this.m_source['mediaElement'].pause();
};

/**
 * Start playback.
 *
 * @param {boolean} [restart=false] Restart playback.
 *
 * @return {undefined}
 */
rune.media.Sound.prototype.play = function(restart) {
    if (restart == true) {
        this.m_source['mediaElement'].currentTime = 0;
    }

    this.m_source['mediaElement'].play();
};

/**
 * Resume playback.
 *
 * @return {undefined}
 */
rune.media.Sound.prototype.resume = function() {
    this.play(false);
};

/**
 * ...
 *
 * @param {number} x ...
 *
 * @return {undefined}
 */
rune.media.Sound.prototype.set = function(x) {
    this.m_source['mediaElement'].currentTime = x;
};

/**
 * Stop playback.
 *
 * @return {undefined}
 */
rune.media.Sound.prototype.stop = function() {
    this.m_source['mediaElement'].pause();
    this.m_source['mediaElement'].currentTime = 0;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.media.Sound.prototype.dispose = function() {
    this.m_disposeStereoPanner();
    this.m_disposeSource();
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.media.Sound.prototype.connect = function(node) {
    this.m_stereoPanner.connect(node);
};

//------------------------------------------------------------------------------
// Protected methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sound.prototype.m_construct = function() {
    this.m_constructSource();
    this.m_constructStereoPanner();
};

//------------------------------------------------------------------------------
// Private methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.media.Sound.prototype.m_constructSource = function() {
    this.m_disposeSource();
    if (this.m_source == null && this.m_context != null) {
        var resource = rune.system.Main['instance']['resources'].get(this.m_resource);
        this.m_source = this.m_context.createMediaElementSource(resource.cloneNode());
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.media.Sound.prototype.m_constructStereoPanner = function() {
    this.m_disposeStereoPanner();
    if (this.m_stereoPanner == null && this.m_context != null) {
        this.m_stereoPanner = this.m_context.createStereoPanner();
        this.m_source.connect(this.m_stereoPanner);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.media.Sound.prototype.m_disposeStereoPanner = function() {
    if (this.m_stereoPanner instanceof StereoPannerNode) {
        this.m_stereoPanner.disconnect();
        this.m_stereoPanner = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.media.Sound.prototype.m_disposeSource = function() {
    if (this.m_source != null) {
        this.m_source.disconnect();
        this.m_source  = null;
    }
};