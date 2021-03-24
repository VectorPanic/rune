//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new sound manager.
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Represents a sound manager for sound effects and music.
 */
rune.media.Sounds = function() {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * The master channel.
     *
     * @type {rune.media.SoundChannel}
     * @protected
     * @ignore
     */
    this.m_master = null;
    
    /**
     * The music channel.
     *
     * @type {rune.media.SoundChannel}
     * @protected
     * @ignore
     */
    this.m_music = null;
    
    /**
     * The sound channel.
     *
     * @type {rune.media.SoundChannel}
     * @protected
     * @ignore
     */
    this.m_sound = null;
    
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
 * The master channel.
 *
 * @member {rune.media.soundChannel} master
 * @memberof rune.media.Sounds
 * @instance
 * @readonly
 */
Object.defineProperty(rune.media.Sounds.prototype, "master", {
    /**
     * @this rune.media.Sounds
     * @ignore
     */
    get : function() {
        return this.m_master;
    }
});

/**
 * The music channel. Used for playing background music.
 *
 * @member {rune.media.soundChannel} music
 * @memberof rune.media.Sounds
 * @instance
 * @readonly
 */
Object.defineProperty(rune.media.Sounds.prototype, "music", {
    /**
     * @this rune.media.Sounds
     * @ignore
     */
    get : function() {
        return this.m_music;
    }
});

/**
 * The sound channel. Used to play sound effects.
 *
 * @member {rune.media.soundChannel} sound
 * @memberof rune.media.Sounds
 * @instance
 * @readonly
 */
Object.defineProperty(rune.media.Sounds.prototype, "sound", {
    /**
     * @this rune.media.Sounds
     * @ignore
     */
    get : function() {
        return this.m_sound;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Removes this object and frees allocated memory.
 *
 * @return {undefined}
 */
rune.media.Sounds.prototype.dispose = function() {
    this.m_disposeSound();
    this.m_disposeMusic();
    this.m_disposeMaster();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Class constructor method. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_construct = function() {
    this.m_constructMaster();
    this.m_constructMusic();
    this.m_constructSound();
};

/**
 * Creates the master channel. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_constructMaster = function() {
    this.m_disposeMaster();
    if (this.m_master == null) {
        this.m_master = new rune.media.SoundChannel();
    } else throw new Error();
};

/**
 * Creates the music channel. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_constructMusic = function() {
    this.m_disposeMusic();
    if (this.m_music == null) {
        this.m_music = new rune.media.SoundChannel();
    } else throw new Error();
};

/**
 * Creates the sound channel. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_constructSound = function() {
    this.m_disposeSound();
    if (this.m_sound == null) {
        this.m_sound = new rune.media.SoundChannel();
    } else throw new Error();
};

/**
 * Removes the sound channel. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_disposeSound = function() {
    if (this.m_sound instanceof rune.media.SoundChannel) {
        this.m_sound.dispose();
        this.m_sound = null;
    }
};

/**
 * Removes the music channel. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_disposeMusic = function() {
    if (this.m_music instanceof rune.media.SoundChannel) {
        this.m_music.dispose();
        this.m_music = null;
    }
};

/**
 * Removes the master channel. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.media.Sounds.prototype.m_disposeMaster = function() {
    if (this.m_master instanceof rune.media.SoundChannel) {
        this.m_master.dispose();
        this.m_master = null;
    }
};