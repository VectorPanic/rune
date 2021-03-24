//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new sound channel. 
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Represents a channel for playing audio and music.
 */
rune.media.SoundChannel = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * The audio context that represents the audio channel.
     *
     * @type {AudioContext}
     * @private
     */
    this.m_context = null;

    /**
     * Used for volume control.
     *
     * @type {GainNode}
     * @private
     */
    this.m_gain = null;

    /**
     * Register of created sound objects. 
     *
     * @type {Object}
     * @private
     */
    this.m_sounds = {};

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
 * @member {boolean} paused
 * @memberof rune.media.SoundChannel
 * @instance
 * @readonly
 */
Object.defineProperty(rune.media.SoundChannel.prototype, "paused", {
    /**
     * @this rune.media.SoundChannel
     * @ignore
     */
    get : function() {
        return (this.m_context.state === "suspended");
    }
});


/**
 * ...
 *
 * @member {number} volume
 * @memberof rune.media.SoundChannel
 * @instance
 */
Object.defineProperty(rune.media.SoundChannel.prototype, "volume", {
    /**
     * @this rune.media.SoundChannel
     * @ignore
     */
    get : function() {
        return this.m_gain.gain.value;
    },
    
    /**
     * @this rune.media.SoundChannel
     * @ignore
     */
    set : function(value) {
        this.m_gain.gain.value = rune.util.Math.clamp(value, 0.0, 1.0);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {rune.media.Sound}
 */
rune.media.SoundChannel.prototype.get = function(name) {
    /*
    if (this.m_sounds[name] == null) {
        this.m_sounds[name] = new rune.media.Sound(this.m_context, name);
        this.m_sounds[name].connect(this.m_panner);
    }

    return this.m_sounds[name];
    */
    
    var sound = new rune.media.Sound(this.m_context, name);
    sound.connect(this.m_panner);
    
    return sound;
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.media.SoundChannel.prototype.pause = function() {
    if (this.m_context && this.m_context.state === "running") {
        this.m_context.suspend();
    }
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.media.SoundChannel.prototype.resume = function() {
    if (this.m_context && this.m_context.state === "suspended") {
        this.m_context.resume();
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.media.SoundChannel.prototype.dispose = function() {
    this.m_disposePanner();
    this.m_disposeGain();
    this.m_disposeContext();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_construct = function() {
    this.m_constructContext();
    this.m_constructGain();
    this.m_constructPanner();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_constructContext = function() {
    this.m_disposeContext();
    if (this.m_context == null) {
        this.m_context = new AudioContext();
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_constructGain = function() {
    this.m_disposeGain();
    if (this.m_gain == null && this.m_context != null) {
        this.m_gain = this.m_context.createGain();
        this.m_gain.connect(this.m_context.destination);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_constructPanner = function() {
    this.m_disposePanner();
    if (this.m_panner == null && this.m_gain != null) {
        this.m_panner = this.m_context.createStereoPanner();
        this.m_panner.connect(this.m_gain);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_disposePanner = function() {
    if (this.m_panner != null) {
        this.m_panner.disconnect();
        this.m_panner = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_disposeGain = function() {
    if (this.m_gain != null) {
        this.m_gain.disconnect();
        this.m_gain = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.SoundChannel.prototype.m_disposeContext = function() {
    if (this.m_context != null) {
        this.m_context.close();
        this.m_context = null;
    }
};