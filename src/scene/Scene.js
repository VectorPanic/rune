//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new instance of the class.
 * 
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Represents a scene within an application and consists of an isolated set of 
 * logic.
 */
rune.scene.Scene = function() {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Determines if this scene is updated even if it is not selected.
     *
     * @type {boolean}
     * @default false
     */
    this.persistent = false;
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * The camera system.
     *
     * @type {rune.camera.Cameras}
     * @protected
     * @ignore
     */
    this.m_cameras = null;
    
    /**
     * ...
     *
     * @type {rune.display.DisplayGroups}
     * @protected
     * @ignore
     */
    this.m_groups = null;
    
    /**
     * The stage.
     *
     * @type {rune.display.Stage}
     * @protected
     * @ignore
     */
    this.m_stage = null;
    
    /**
     * ...
     *
     * @type {rune.state.States}
     * @protected
     * @ignore
     */
    this.m_states = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.timer.Timers}
     * @protected
     * @ignore
     */
    this.m_timers = null;
    
    /**
     * ...
     *
     * @type {rune.tween.Tweens}
     * @private
     */
    this.m_tweens = null;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * Call for dedicated constructor method.
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {rune.system.Main} application
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "application", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return rune.system.Main["instance"];
    }
});

/**
 * TODO: ...
 *
 * @member {rune.camera.Cameras} cameras
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "cameras", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return this.m_cameras;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.input.Gamepads} gamepads
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "gamepads", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return rune.system.Main["instance"]['inputs']['gamepads'];
    }
});

/**
 * ...
 *
 * @member {rune.display.DisplayGroups} groups
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "groups", {
    /**
     * ...
     * 
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return this.m_groups;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.input.Keyboard} keyboard
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "keyboard", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return rune.system.Main["instance"]['inputs']['keyboard'];
    }
});

/**
 * TODO: ...
 *
 * @member {rune.input.Mouse} mouse
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "mouse", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return rune.system.Main["instance"]['inputs']['mouse'];
    }
});

/**
 * TODO: ...
 *
 * @member {rune.resource.Resources} resources
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "resources", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return rune.system.Main["instance"]['resources'];
    }
});

/**
 * TODO: ...
 *
 * @member {rune.display.Stage} stage
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "stage", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return this.m_stage;
    }
});

/**
 * ...
 *
 * @member {rune.state.States} states
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "states", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return this.m_states;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.timer.Timers} timers
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "timers", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return this.m_timers;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.tween.Tweens} tweens
 * @memberof rune.scene.Scene
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scene.prototype, "tweens", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get : function() {
        return this.m_tweens;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * This method is called when the selected scene is replaced with a new one.
 *
 * @param {rune.scene.Scene} scene The replacement scene.
 *
 * @returns {undefined}
 */
rune.scene.Scene.prototype.onDeselect = function(scene) {
    //OVERRIDE
};

/**
 * This method is called when the current scene is selected.
 *
 * @param {rune.scene.Scene} scene The previous scene.
 *
 * @returns {undefined}
 */
rune.scene.Scene.prototype.onSelect = function(scene) {
    //OVERRIDE
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Initiates the content of the scene; this includes internal subsystems. 
 * Override this method to add your own content or subsystems.
 *
 * @returns {undefined}
 */
rune.scene.Scene.prototype.init = function() {
    this.m_initCamera();
};

/**
 * Goes through the content of the scene and makes sure that everything is 
 * updated.
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 */
rune.scene.Scene.prototype.update = function(step) {
    this.m_updateStage(step);
    this.m_updateCameras(step);
    this.m_updateTimers(step);
    this.m_updateTweens(step);
    this.m_updateGroups(step);
    this.m_updateStates(step);
};

/**
 * Goes through the content of the scene and renders graphics.
 *
 * @returns {undefined}
 */
rune.scene.Scene.prototype.render = function() {
    this.m_renderStates();
};

/**
 * Removes the contents of the scene and clears allocated memory.
 *
 * @returns {undefined}
 */
rune.scene.Scene.prototype.dispose = function() {
    this.m_disposeTweens();
    this.m_disposeTimers();
    this.m_disposeCameras();
    this.m_disposeStage();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Method that represents the class constructor.
 * 
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_construct = function() {
    this.m_constructStage();
    this.m_constructCameras();
    this.m_constructTimers();
    this.m_constructTweens();
    this.m_constructGroups();
    this.m_constructStates();
};

/**
 * Creates the stage.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_constructStage = function() {
    this.m_disposeStage();
    if (this.m_stage == null) {
        this.m_stage = new rune.display.Stage();
    } else throw new Error();
};

/**
 * Creates and activates the camera system.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scene.prototype.m_constructCameras = function() {
    this.m_disposeCameras();
    if (this.m_cameras == null && this.m_stage != null) {
        this.m_cameras = new rune.camera.Cameras(this.m_stage);
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
rune.scene.Scene.prototype.m_constructTimers = function() {
    this.m_disposeTimers();
    if (this.m_timers == null) {
        this.m_timers = new rune.timer.Timers();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_constructTweens = function() {
    this.m_disposeTweens();
    if (this.m_tweens == null) {
        this.m_tweens = new rune.tween.Tweens();
    } else throw new Error();
};

/**
 * ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_constructGroups = function() {
    this.m_disposeGroups();
    if (this.m_groups == null) {
        this.m_groups = new rune.display.DisplayGroups();
    } else throw new Error();
};

/**
 * ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_constructStates = function() {
    this.m_disposeStates();
    if (this.m_states == null) {
        this.m_states = new rune.state.States(this);
    } else throw new Error();
};

/**
 * Creates a camera object with the same resolution as the application. 
 * Override this method if, for example, multiple camera objects are to be 
 * created.
 *
 * @returns {undefined}
 * @protected
 */
rune.scene.Scene.prototype.m_initCamera = function() {
    if (this.m_cameras != null) {
        this.m_cameras.add(this.m_cameras.create());
    }
};

/**
 * Updates all stage objects.
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_updateStage = function(step) {
    if (this.m_stage != null) {
        this.m_stage.update(step);
    }
};

/**
 * Updates all camera objects.
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_updateCameras = function(step) {
    if (this.m_cameras != null) {
        this.m_cameras.update(step);
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_updateTimers = function(step) {
    if (this.m_timers != null) {
        this.m_timers.update(step * this.m_stage.timeScale);
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_updateTweens = function(step) {
    if (this.m_tweens != null) {
        this.m_tweens.update(step * this.m_stage.timeScale);
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_updateGroups = function(step) {
    if (this.m_groups != null) {
        this.m_groups.update(step);
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_updateStates = function(step) {
    if (this.m_states != null) {
        this.m_states.update(step);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_renderStates = function() {
    if (this.m_states != null) {
        this.m_states.render();
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_disposeStates = function() {
    if (this.m_states instanceof rune.state.States) {
        this.m_states.dispose();
        this.m_states = null;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_disposeGroups = function() {
    if (this.m_groups instanceof rune.display.DisplayGroups) {
        this.m_groups.dispose();
        this.m_groups = null;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_disposeTweens = function() {
    if (this.m_tweens instanceof rune.tween.Tweens) {
        this.m_tweens.dispose();
        this.m_tweens = null;
    }
};

/**
 * ...
 *
 * @throws {TypeError} ...
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scene.prototype.m_disposeTimers = function() {
    if (this.m_timers instanceof rune.timer.Timers) {
        this.m_timers.dispose();
        this.m_timers = null;
    }
};

/**
 * Removes the camera system.
 *
 * @throws {TypeError} If the reference to the camera system is invalid.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scene.prototype.m_disposeCameras = function() {
    if (this.m_cameras instanceof rune.camera.Cameras) {
        this.m_cameras.dispose();
        this.m_cameras = null;
    }
};

/**
 * Removes the stage.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.scene.Scene.prototype.m_disposeStage = function() {
    if (this.m_stage != null) {
        this.m_stage.dispose();
        this.m_stage = null;
    }
};