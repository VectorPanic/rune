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
 * Represents an individual mouse button and its current state.
 */
rune.input.MouseButton = function() {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Current state.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_current = rune.input.MouseButton.RELEASED;

    /**
     * Previous state.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_previous = rune.input.MouseButton.RELEASED;
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * The button is just released.
 *
 * @constant {number}
 * @default -1
 */
rune.input.MouseButton.JUST_RELEASED = -1;

/**
 * The button is released.
 *
 * @constant {number}
 * @default 0
 */
rune.input.MouseButton.RELEASED = 0;

/**
 * The button was just released.
 *
 * @constant {number}
 * @default 1
 */
rune.input.MouseButton.JUST_PRESSED = 1;

/**
 * The button is pressed.
 *
 * @constant {number}
 * @default 2
 */
rune.input.MouseButton.PRESSED = 2;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Check if the button is pressed.
 *
 * @returns {boolean}
 */
rune.input.MouseButton.prototype.isPressed = function() {
    return this.m_current > rune.input.MouseButton.RELEASED;
};

/**
 * Check if the button is just pressed.
 *
 * @returns {boolean}
 */
rune.input.MouseButton.prototype.isJustPressed = function() {
    return this.m_current === rune.input.MouseButton.JUST_PRESSED;
};

/**
 * Check if the button was just released.
 *
 * @returns {boolean}
 */
rune.input.MouseButton.prototype.isJustReleased = function() {
    return this.m_current === rune.input.MouseButton.JUST_RELEASED;
};

/**
 * Presses the button.
 *
 * @returns {undefined}
 */
rune.input.MouseButton.prototype.onButtonDown = function() {
    if  (this.m_current > rune.input.MouseButton.RELEASED) this.m_current = rune.input.MouseButton.PRESSED;
    else this.m_current = rune.input.MouseButton.JUST_PRESSED;
};

/**
 * Releases the button.
 *
 * @returns {undefined}
 */
rune.input.MouseButton.prototype.onButtonUp = function() {
    if  (this.m_current > rune.input.MouseButton.RELEASED) this.m_current = rune.input.MouseButton.JUST_RELEASED;
    else this.m_current = rune.input.MouseButton.RELEASED;
};

/**
 * Resets the current state of the button.
 *
 * @returns {undefined}
 */
rune.input.MouseButton.prototype.reset = function() {
    this.m_current = rune.input.MouseButton.RELEASED;
    this.m_previous = rune.input.MouseButton.RELEASED;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the current state of the button.
 *
 * @return {undefined}
 */
rune.input.MouseButton.prototype.update = function() {
    this.m_updateStates();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Updates the current state of the button.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.MouseButton.prototype.m_updateStates = function() {
    if (this.m_previous === rune.input.MouseButton.JUST_RELEASED && this.m_current == rune.input.MouseButton.JUST_RELEASED) this.m_current = rune.input.MouseButton.RELEASED;
    else if (this.m_previous === rune.input.MouseButton.JUST_PRESSED && this.m_current === rune.input.MouseButton.JUST_PRESSED) this.m_current = rune.input.MouseButton.PRESSED;

    this.m_previous = this.m_current;
};