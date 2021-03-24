//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of Rune SDK.
 *
 * @constructor
 *
 * @param {Object} [options=null] Used to override the default properties.
 * 
 * @class
 * @classdesc
 * 
 * Third party applications shall inherit from this class for the purpose of 
 * creating their own applications based on the Rune SDK.
 */
rune.system.Main = function(options) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Internal configuration object containing initial global settings. 
     * These settings should be considered static and should not be changed 
     * during execution.
     *
     * @type {rune.system.Config}
     * @private
     */
    this.m_config = new rune.system.Config(options);
    
    /**
     * ...
     *
     * @type {rune.data.Highscores}
     * @private
     */
    this.m_highscores = null;
    
    /**
     * The input system.
     *
     * @type {rune.input.Inputs}
     * @private
     */
    this.m_inputs = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.resource.Resources}
     * @private
     */
    this.m_resources = null;
    
    /**
     * Internal value to keep track of whether the engine is running or not. 
     * Used to keep track of the start and stop processes.
     *
     * @type {boolean}
     * @private
     */
    this.m_running = false;
    
    /**
     * The scene system.
     *
     * @type {rune.scene.Scenes}
     * @private
     */
    this.m_scenes = null;
    
    /**
     * The screen system.
     *
     * @type {rune.screen.Screen}
     * @private
     */
    this.m_screen = null;
    
    /**
     * ...
     *
     * @type {rune.media.Sounds}
     * @private
     */
    this.m_sounds = null;
    
    /**
     * ...
     *
     * @type {rune.system.Time}
     * @private
     */
    this.m_time = null;
};

//------------------------------------------------------------------------------
// Private static properties
//------------------------------------------------------------------------------

/**
 * Reference to the current application executed by the engine.
 *
 * @type {rune.system.Main}
 * @private
 */
rune.system.Main.m_instance = null;

//------------------------------------------------------------------------------
// Private static constants
//------------------------------------------------------------------------------

/**
 * Engine name.
 *
 * @const {string}
 * @private
 */
rune.system.Main.NAME = "RUNE";

/**
 * Current version.
 *
 * @const {string}
 * @private
 */
rune.system.Main.VERSION = "0.0.0";

//------------------------------------------------------------------------------
// Public static getter and setter methods
//------------------------------------------------------------------------------

/**
 * Reference to the current application executed by the engine. This is mainly 
 * for internal use.
 *
 * @member {rune.system.Main} instance
 * @memberof rune.system.Main
 * @readonly
 */
Object.defineProperty(rune.system.Main, "instance", {
    /**
     * @ignore
     */
    get : function() {
        return rune.system.Main.m_instance;
    }
});

/**
 * Version string containing name and version number.
 *
 * @member {string} version
 * @memberof rune.system.Main
 * @readonly
 */
Object.defineProperty(rune.system.Main, "version", {
    /**
     * @ignore
     */
    get : function() {
        return (rune.system.Main.NAME + " " + rune.system.Main.VERSION).toUpperCase();
    }
});

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.data.Highscores} highscores
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "highscores", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_highscores;
    }
});


/**
 * The input system.
 *
 * @member {rune.input.Inputs} inputs
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "inputs", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_inputs;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.resource.Resources} resources
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "resources", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_resources;
    }
});

/**
 * The scene system.
 *
 * @member {rune.scene.Scenes} scenens
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "scenes", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_scenes;
    }
});

/**
 * The screen system.
 *
 * @member {rune.screen.Screen} screen
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "screen", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_screen;
    }
});

/**
 * The global sound manager. Handles playback of audio and music within the 
 * context of the application.
 *
 * @member {rune.media.Sounds} sounds
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "sounds", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_sounds;
    }
});

/**
 * The module that handles the application's update and rendering loop.
 *
 * @member {rune.system.Time} time
 * @memberof rune.system.Main
 * @instance
 * @readonly
 */
Object.defineProperty(rune.system.Main.prototype, "time", {
    /**
     * @this rune.system.Main
     * @ignore
     */
    get : function() {
        return this.m_time;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Starts the current application based on the engine start-up process. 
 * Start-up takes place at the end of the current tick, or as soon as the DOM 
 * is ready.
 *
 * @return {undefined}
 */
rune.system.Main.prototype.start = function() {
    if (this.m_running != true) {
        this.m_running  = true;
        var m_this = this;
        if (document.readyState === "complete") {
            window.setTimeout(function() {
                m_this.m_preInit();
            }, 0);
        } else {
            rune.util.Event.addEventListener(
                window,
                rune.util.Event.LOAD,
                function(event) {
                    m_this.start();
                },
                {
                    once: true
                }
            );
        }
    }
};

/**
 * Shuts down the current application and frees up allocated memory.
 *
 * @return {undefined}
 */
rune.system.Main.prototype.stop = function() {
    if (this.m_running != false) {
        this.m_running  = false;
        var m_this = this;
        if (document.readyState === "complete") {
            window.setTimeout(function() {
                m_this.m_dispose();
            }, 0);
        } else {
            rune.util.Event.addEventListener(
                window,
                rune.util.Event.LOAD,
                function(event) { 
                    m_this.stop();
                },
                {
                    once: true
                }
            );
        }
    }
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates and activates subsystems that are necessary to start the engine.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_preInit = function() {
    this.m_preTest();
    this.m_preInitResources();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_preTest = function() {
    var regex = new RegExp("^[a-z]+\.[a-z]+\.[a-z]+");
    if (!regex.test(this.m_config.id)) {
        throw new Error("Invalid application ID.");   
    }
};

/**
 * Creates and initiates the engine resource library. The process ensures that 
 * all resources related to the engine are loaded, before any application code 
 * is executed.
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_preInitResources = function() {
    this.m_disposeResources();
    if (this.m_resources == null) {
        this.m_resources = new rune.resource.Resources();
        this.m_resources.load(new rune.data.EngineManifest(
            new rune.util.Executable(this.m_init, this),
            new rune.util.Executable(this.m_onResourcesProgress, this),
            new rune.util.Executable(this.m_onResourcesError, this)
        ), rune.resource.Storage.ENGINE);
    } else throw new Error();
};

/**
 * Creates and activates subsystems that are necessary to start an application, 
 * or game, within the engine.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_init = function() {
    this.m_initInstance();
    this.m_initHighscores();
    this.m_initSounds();
    this.m_initScreen();
    this.m_initInputs();
    this.m_initScenes();
    this.m_initTime();
    this.m_initCommands();
};

/**
 * Creates a static reference to the current application.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initInstance = function() {
    this.m_disposeInstance();
    if (rune.system.Main.m_instance == null) {
        rune.system.Main.m_instance  = this;
    } else throw new Error();
};

/**
 * ...
 *
 * @throws {Error} If an object reference already exists.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initHighscores = function() {
    this.m_disposeHighscores();
    if (this.m_highscores == null) {
        this.m_highscores = new rune.data.Highscores(
            this.m_config.id,
            1,
            5
        );
    } else throw new Error();
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
rune.system.Main.prototype.m_initSounds = function() {
    this.m_disposeSounds();
    if (this.m_sounds == null) {
        this.m_sounds = new rune.media.Sounds();
    } else throw new Error();
};

/**
 * Creates the system that represents the screen.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initScreen = function() {
    this.m_disposeScreen();
    if (this.m_screen == null) {
        this.m_screen = new rune.screen.Screen(this.m_config); 
        this.m_screen["canvas"].attach(document.body); //TODO: CONFIG FOR TARGET
    } else throw new Error();
};

/**
 * Creates and activates the system that manages input devices.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initInputs = function() {
    this.m_disposeInputs();
    if (this.m_inputs == null) {
        this.m_inputs = new rune.input.Inputs(this.m_config);
    } else throw new Error();
};

/**
 * Creates and activates the system that manages scenes.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initScenes = function() {
    this.m_disposeScenes();
    if (this.m_scenes == null) {
        this.m_scenes = new rune.scene.Scenes();
        this.m_scenes.load(this.m_config.debug ? 
            [new rune.data.SceneBootDebug(this.m_config)] :
            [new this.m_config.loader(this.m_config)]
        );
    } else throw new Error();
};

/**
 * Creates and activates the system that calculates time.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initTime = function() {
    this.m_disposeTime();
    if (this.m_time == null) {
        this.m_time = new rune.system.Time(this.m_config.framerate);
        this.m_time['update'].add(this.m_update, this);
        this.m_time['render'].add(this.m_render, this);
        this.m_time.start();
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_initCommands = function() {
    if (this.m_screen['console'] != null) {
        
        //@note: Quit the application.
        this.m_screen['console']['commands'].create(
            "quit",
            function() {
                this.stop();
            },
            this
        );
        
        //@note: Print current version of Rune.
        this.m_screen['console']['commands'].create(
            "version",
            function() {
                return rune.system.Main.version;
            },
            this
        );
    }
};

/**
 * The update loop.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_update = function(step) {
    this.m_updateInputs(step);
    this.m_updateScenes(step);
    this.m_updateScreen(step);
};

/**
 * Updates all input devices.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_updateInputs = function(step) {
    if (this.m_inputs!= null) {
        this.m_inputs.update(step);
    }
};

/**
 * Updates the scene system.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_updateScenes = function(step) {
    if (this.m_scenes != null) {
        this.m_scenes.update(step);
    }
};

/**
 * ...
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_updateScreen = function(step) {
    if (this.m_screen != null) {
        this.m_screen.update(step);
    }
};


/**
 * The render loop.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_render = function() {
    this.m_renderScenes();
    this.m_renderScreen();
};

/**
 * Renders objects in the selected scene.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_renderScenes = function() {
    if (this.m_scenes!= null) {
        this.m_scenes.render();
    }
};

/**
 * Renders objects on the screen.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_renderScreen = function() {
    if (this.m_screen!= null && this.m_screen['visible']) {
        this.m_screen.render();
    }
};

/**
 * Stops and clears all subsystems from allocated memory.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_dispose = function() {
    this.m_disposeTime()
    this.m_disposeScenes();
    this.m_disposeInputs();
    this.m_disposeScreen();
    this.m_disposeHighscores();
    this.m_disposeInstance();
    this.m_disposeSounds();
    this.m_disposeResources();
};

/**
 * Removes the system that calculates time.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeTime = function() {
    if (this.m_time instanceof rune.system.Time) {
        this.m_time.dispose();
        this.m_time = null;
    }
};

/**
 * Removes the scene system.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeScenes = function() {
    if (this.m_scenes instanceof rune.scene.Scenes) {
        this.m_scenes.dispose();
        this.m_scenes = null;
    }
};

/**
 * Removes the system that handles input devices.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeInputs = function() {
    if (this.m_inputs instanceof rune.input.Inputs) {
        this.m_inputs.dispose();
        this.m_inputs = null;
    }
};

/**
 * Removes the system responsible for rendering graphics to the canvas element 
 * that represents the screen.
 *
 * @throws {TypeError} If the reference to the screen system is invalid.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeScreen = function() {
    if (this.m_screen instanceof rune.screen.Screen) {
        this.m_screen.dispose();
        this.m_screen = null;
    }
};

/**
 * ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeHighscores = function() {
    if (this.m_highscores instanceof rune.data.Highscores) {
        this.m_highscores.dispose();
        this.m_highscores = null;
    }
};

/**
 * Removes the static reference to the current application.
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeInstance = function() {
    if (rune.system.Main.m_instance instanceof rune.system.Main) {
        rune.system.Main.m_instance.stop();
        rune.system.Main.m_instance = null;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeSounds = function() {
    if (this.m_sounds instanceof rune.media.Sounds) {
        this.m_sounds.dispose();
        this.m_sounds = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.system.Main.prototype.m_disposeResources = function() {
    if (this.m_resources != null) {
        this.m_resources.dispose();
        this.m_resources = null;
    }
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {string} type ...
 * @param {Object} data ...
 * @param {number} progress ...
 *
 * @returns {undefined}
 * @private
 */
rune.system.Main.prototype.m_onResourcesProgress = function(name, type, data, progress) {
    // @todo: ...
};

/**
 * TODO: ...
 *
 * @param {rune.net.URLRequest} request ...
 *
 * @returns {undefined}
 * @private
 * @suppress {missingProperties}
 */
rune.system.Main.prototype.m_onResourcesError = function(request) {
    alert("ERROR: Boot process aborted due to missing or corrupt resource file.");
};