//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of Inputs.
 *
 * @constructor
 *
 * @param {Object} [options] Input settings.
 * 
 * @class
 * @classdesc
 * 
 * Handles all input systems.
 */
rune.input.Inputs = function(options) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * The gamepad management system.
     *
     * @type {rune.input.Gamepads}
     * @private
     */
    this.m_gamepads = null;
    
    /**
     * The keyboard management system.
     *
     * @type {rune.input.Keyboard}
     * @private
     */
    this.m_keyboard = null;
    
    /**
     * The mouse management system.
     *
     * @type {rune.input.Mouse}
     * @private
     */
    this.m_mouse = null;
    
    /**
     * Input settings.
     *
     * @type {Object}
     * @private
     */
    this.m_options = options || {};
    
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
 * The gamepad management system.
 *
 * @member {rune.input.Keyboard} keyboard
 * @memberof rune.input.Inputs
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Inputs.prototype, "gamepads", {
    /**
     * @this rune.input.Inputs
     * @ignore
     */
    get : function() {
        return this.m_gamepads;
    },
});

/**
 * The keyboard management system.
 *
 * @member {rune.input.Keyboard} keyboard
 * @memberof rune.input.Inputs
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Inputs.prototype, "keyboard", {
    /**
     * @this rune.input.Inputs
     * @ignore
     */
    get : function() {
        return this.m_keyboard;
    },
});

/**
 * The mouse management system.
 *
 * @member {rune.input.Mouse} mouse
 * @memberof rune.input.Inputs
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Inputs.prototype, "mouse", {
    /**
     * @this rune.input.Inputs
     * @ignore
     */
    get : function() {
        return this.m_mouse;
    },
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Resets all input devices.
 *
 * @returns {undefined}
 */
rune.input.Inputs.prototype.reset = function() {
    if (this.m_gamepads != null) this.m_gamepads.reset();
    if (this.m_keyboard != null) this.m_keyboard.reset();
    if (this.m_mouse != null) this.m_mouse.reset();
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates all input devices.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 */
rune.input.Inputs.prototype.update = function(step) {
    this.m_updateGamepads(step);
    this.m_updateKeyboard(step);
    this.m_updateMouse(step);
};

/**
 * Stops and deletes all memory allocations associated with the object.
 *
 * @returns {undefined}
 */
rune.input.Inputs.prototype.dispose = function() {
    this.m_disposeMouse();
    this.m_disposeKeyboard();
    this.m_disposeGamepads();
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
rune.input.Inputs.prototype.m_construct = function() {
    this.m_constructGamepads();
    this.m_constructKeyboard();
    this.m_constructMouse();
};

/**
 * Creates and activates the gamepad management system.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_constructGamepads = function() {
    this.m_disposeGamepads();
    if (this.m_gamepads === null) {
        this.m_gamepads = new rune.input.Gamepads({
            enable: this.m_options.useGamepads
        });
    } else throw new Error();
};

/**
 * Creates and activates the keyboard management system.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_constructKeyboard = function() {
    this.m_disposeKeyboard();
    if (this.m_keyboard === null) {
        this.m_keyboard = new rune.input.Keyboard({
            enable: this.m_options.useKeyboard,
            target: window
        });
    } else throw new Error();
};

/**
 * Creates and activates the mouse management system.
 *
 * @throws {Error} If an object reference already exists.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_constructMouse = function() {
    this.m_disposeMouse();
    if (this.m_mouse === null) {
        this.m_mouse = new rune.input.Mouse({
            enable: this.m_options.useMouse,
            useContextMenu: false,
            target: rune.system.Main['instance']['screen']['canvas']['element']
        });
    }
};

/**
 * Updates the gamepad system.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_updateGamepads = function(step) {
    if (this.m_gamepads != null) {
        this.m_gamepads.update();
    }
};

/**
 * Updates the keyboard system.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_updateKeyboard = function(step) {
    if (this.m_keyboard != null) {
        this.m_keyboard.update();
    }
};

/**
 * Updates the mouse system.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_updateMouse = function(step) {
    if (this.m_mouse != null) {
        this.m_mouse.update();
    }
};

/**
 * Removes the mouse management system.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_disposeMouse = function() {
    if (this.m_mouse instanceof rune.input.Mouse) {
        this.m_mouse.dispose();
        this.m_mouse = null;
    }
};

/**
 * Removes the keyboard management system.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_disposeKeyboard = function() {
    if (this.m_keyboard instanceof rune.input.Keyboard) {
        this.m_keyboard.dispose();
        this.m_keyboard = null;
    }
};

/**
 * Removes the gamepad management system.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Inputs.prototype.m_disposeGamepads = function() {
    if (this.m_gamepads instanceof rune.input.Gamepads) {
        this.m_gamepads.dispose();
        this.m_gamepads = null;
    }
};