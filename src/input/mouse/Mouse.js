//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new mouse object.
 * 
 * @constructor
 * @extends rune.geom.Point
 *
 * @param {Object} [options] Mouse settings.
 *
 * @class
 * @classdesc
 * 
 * Represents the computer mouse. Can be used to read the current position of 
 * the mouse pointer, or the state of available mouse buttons.
 */
rune.input.Mouse = function(options) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Settings for the current mouse.
     *
     * @type {rune.input.MouseOptions}
     * @private
     */
    this.m_options = new rune.input.MouseOptions(options);
    
    /**
     * Whether the mouse is enabled or not.
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_enable = this.m_options.enable;

    /**
     * Reference to event handler.
     *
     * @type {Function}
     * @private
     */
    this.m_onContextMenuHandler = null;

    /**
     * Reference to event handler.
     *
     * @type {Function}
     * @private
     */
    this.m_onButtonDownHandler = null;

    /**
     * Reference to event handler.
     *
     * @type {Function}
     * @private
     */
    this.m_onMouseMoveHandler = null;

    /**
     * Reference to event handler.
     *
     * @type {Function}
     * @private
     */
    this.m_onButtonUpHandler = null;

    /**
     * List of mouse buttons.
     *
     * @type {Array.<rune.input.MouseButton>}
     * @private
     */
    this.m_buttons = [];

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend Point
     */
    rune.geom.Point.call(this, 0, 0);
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * Call for dedicated constructor method.
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.input.Mouse.prototype = Object.create(rune.geom.Point.prototype);
rune.input.Mouse.prototype.constructor = rune.input.Mouse;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {boolean} enable
 * @memberof rune.input.Mouse
 * @instance
 */
Object.defineProperty(rune.input.Mouse.prototype, "enable", {
    /**
     * ... 
     *
     * @this rune.input.Mouse
     * @ignore
     */
    get : function() {
        return this.m_enable;
    },

    /**
     * ... 
     *
     * @this rune.input.Mouse
     * @ignore
     */
    set : function(value) {
        if (this.m_enable != value) {
            this.m_enable  = value;
            
            if (this.m_enable == true) this.m_constructEvent();
            else this.m_disposeEvent();
        }
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Check if a button was just pressed.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 */
rune.input.Mouse.prototype.justPressed = function(button) {
    button = button || 0;
    return (this.m_buttons != null && this.m_buttons[button] != null) ? this.m_buttons[button].isJustPressed() : false;
};

/**
 * Check if a button was just released.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 */
rune.input.Mouse.prototype.justReleased = function(button) {
    button = button || 0;
    return (this.m_buttons != null && this.m_buttons[button] != null) ? this.m_buttons[button].isJustReleased() : false;
};

/**
 * Check if a button is pressed.
 *
 * @param {number} button Button ID.
 *
 * @returns {boolean}
 */
rune.input.Mouse.prototype.pressed = function(button) {
    button = button || 0;
    return (this.m_buttons != null && this.m_buttons[button] != null) ? this.m_buttons[button].isPressed() : false;
};

/**
 * Reset the state of all buttons.
 *
 * @returns {undefined}
 */
rune.input.Mouse.prototype.reset = function() {
    this.x = 0;
    this.y = 0;

    if (this.m_buttons != null) {
        for (var i = 0, l = this.m_buttons.length; i < l; i++) {
            this.m_buttons[i].reset();
        }
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the state of all buttons.
 *
 * @returns {undefined}
 */
rune.input.Mouse.prototype.update = function() {
    if (this.m_enable == true) {
        this.m_updateButtons();
    }
};

/**
 * Disables the mouse and frees up allocated memory.
 *
 * @returns {undefined}
 */
rune.input.Mouse.prototype.dispose = function() {
    this.m_disposeEvent();
    this.m_disposeButtons();
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
rune.input.Mouse.prototype.m_construct = function() {
    this.m_constructButtons();
    if (this.m_options.enable == true) {
        this.m_constructEvent();
    }
};

/**
 * Creates all buttons.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_constructButtons = function() {
    this.m_buttons = [];
    this.m_buttons[0] = new rune.input.MouseButton();
    this.m_buttons[1] = new rune.input.MouseButton();
    this.m_buttons[2] = new rune.input.MouseButton();
};

/**
 * Creates necessary event listeners.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_constructEvent = function() {
    this.m_constructEventMove();
    this.m_constructEventDown();
    this.m_constructEventUp();
    this.m_constructEventContextMenu();
};

/**
 * Listens for MOUSE_MOVE.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_constructEventMove = function() {
    this.m_onMouseMoveHandler = rune.util.Event.addEventListener(
        this.m_options.target,
        rune.util.Event.MOUSE_MOVE,
        this.m_onMouseMove,
        {},
        false,
        this
    );
};

/**
 * Listens for MOUSE_DOWN.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_constructEventDown = function() {
    this.m_onButtonDownHandler = rune.util.Event.addEventListener(
        this.m_options.target,
        rune.util.Event.MOUSE_DOWN,
        this.m_onButtonDown,
        {},
        false,
        this
    );
};

/**
 * Listens for MOUSE_UP.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_constructEventUp = function() {
    this.m_onButtonUpHandler = rune.util.Event.addEventListener(
        this.m_options.target,
        rune.util.Event.MOUSE_UP,
        this.m_onButtonUp,
        {},
        false,
        this
    );
};

/**
 * Listens for CONTEXTMENU.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_constructEventContextMenu = function() {
    if (this.m_options.useContextMenu === false) {
        this.m_onContextMenuHandler = rune.util.Event.addEventListener(
            this.m_options.target,
            rune.util.Event.CONTEXTMENU,
            function(event) {
                event.preventDefault();
            },
            {},
            false,
            this
        );
    }
};

/**
 * onMouseMove.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_onMouseMove = function(event) {
    event = rune.util.Event.getEvent(event);
    if (event != null) {
        var rect = event.target.getBoundingClientRect();
        
        var nw = rune.system.Main['instance']['screen']['width'];
        var nh = rune.system.Main['instance']['screen']['height'];
        var sw = rune.system.Main['instance']['screen']['canvas']['element'].offsetWidth;
        var sh = rune.system.Main['instance']['screen']['canvas']['element'].offsetHeight;
        
        var sx = sw / nw;
        var sy = sh / nh;
        
        this.x = (event.clientX - rect.left) / sx;
        this.y = (event.clientY - rect.top)  / sy;
    }
};

/**
 * onButtonDown.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_onButtonDown = function(event) {
    event = rune.util.Event.getEvent(event);
    var button = event.button || 0;
    if (this.m_buttons != null && this.m_buttons[button] != null) {
        this.m_buttons[button].onButtonDown();
    }
};

/**
 * onButtonUp.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_onButtonUp = function(event) {
    event = rune.util.Event.getEvent(event);
    var button = event.button || 0;
    if (this.m_buttons != null && this.m_buttons[button] != null) {
        this.m_buttons[button].onButtonUp();
    }
};

/**
 * Updates the state of all buttons.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_updateButtons = function() {
    if (this.m_buttons != null && this.m_enable == true) {
        for (var i = 0; i < this.m_buttons.length; i++) {
            this.m_buttons[i].update();
        }
    }
};

/**
 * Removes all event listeners.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_disposeEvent = function() {
    this.reset();
    this.m_disposeEventMove();
    this.m_disposeEventDown();
    this.m_disposeEventUp();
    this.m_disposeEventContextMenu();
};

/**
 * Removes MOUSE_MOVE.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_disposeEventMove = function() {
    if (this.m_onMouseMoveHandler != null) {
        rune.util.Event.removeEventListener(
            this.m_options.target,
            rune.util.Event.MOUSE_MOVE,
            this.m_onMouseMoveHandler,
            {},
            false
        );

        this.m_onMouseMoveHandler = null;
    }
};

/**
 * Removes MOUSE_DOWN.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_disposeEventDown = function() {
    if (this.m_onButtonDownHandler != null) {
        rune.util.Event.removeEventListener(
            this.m_options.target,
            rune.util.Event.MOUSE_DOWN,
            this.m_onButtonDownHandler,
            {},
            false
        );

        this.m_onButtonDownHandler = null;
    }
};

/**
 * Removes MOUSE_UP.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_disposeEventUp = function() {
    if (this.m_onButtonUpHandler != null) {
        rune.util.Event.removeEventListener(
            this.m_options.target,
            rune.util.Event.MOUSE_UP,
            this.m_onButtonUpHandler,
            {},
            false
        );

        this.m_onButtonUpHandler = null;
    }
};

/**
 * Removes CONTEXTMENU.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_disposeEventContextMenu = function() {
    if (this.m_onContextMenuHandler != null) {
        rune.util.Event.removeEventListener(
            this.m_options.target,
            rune.util.Event.CONTEXTMENU,
            this.m_onContextMenuHandler,
            {},
            false
        );

        this.m_onContextMenuHandler = null;
    }
};

/**
 * 
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Mouse.prototype.m_disposeButtons = function() {
    if (this.m_buttons != null && this.m_buttons.length > 0) {
        this.m_buttons.length = 0;
        this.m_buttons = null;
    }
};