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
 * Represents an individual key and its current state.
 */
rune.input.KeyboardKey = function() {

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
    this.m_current = rune.input.KeyboardKey.RELEASED;

    /**
     * Previous state.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_previous = rune.input.KeyboardKey.RELEASED;
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * The key is just released.
 *
 * @constant {number}
 * @default -1
 */
rune.input.KeyboardKey.JUST_RELEASED = -1;

/**
 * The key is released.
 *
 * @constant {number}
 * @default 0
 */
rune.input.KeyboardKey.RELEASED = 0;

/**
 * The key is just pressed.
 *
 * @constant {number}
 * @default 1
 */
rune.input.KeyboardKey.JUST_PRESSED = 1;

/**
 * The key is pressed.
 *
 * @constant {number}
 * @default 2
 */
rune.input.KeyboardKey.PRESSED = 2;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Check if the key is pressed.
 * 
 * @returns {boolean}
 */
rune.input.KeyboardKey.prototype.isPressed = function() {
    return this.m_current > rune.input.KeyboardKey.RELEASED;
};

/**
 * Check if the key is just pressed.
 * 
 * @returns {boolean}
 */
rune.input.KeyboardKey.prototype.isJustPressed = function() {
    return this.m_current === rune.input.KeyboardKey.JUST_PRESSED;
};

/**
 * Check if the key was just released.
 * 
 * @returns {boolean}
 */
rune.input.KeyboardKey.prototype.isJustReleased = function() {
    return this.m_current === rune.input.KeyboardKey.JUST_RELEASED;
};

/**
 * Presses the key.
 *
 * @returns {undefined}
 */
rune.input.KeyboardKey.prototype.onKeyDown = function() {
    if  (this.m_current > rune.input.KeyboardKey.RELEASED) this.m_current = rune.input.KeyboardKey.PRESSED;
    else this.m_current = rune.input.KeyboardKey.JUST_PRESSED;
};

/**
 * Releases the key.
 *
 * @returns {undefined}
 */
rune.input.KeyboardKey.prototype.onKeyUp = function() {
    if  (this.m_current > rune.input.KeyboardKey.RELEASED) this.m_current = rune.input.KeyboardKey.JUST_RELEASED;
    else this.m_current = rune.input.KeyboardKey.RELEASED;
};

/**
 * Resets the current state of the key.
 *
 * @returns {undefined}
 */
rune.input.KeyboardKey.prototype.reset = function() {
    this.m_current = rune.input.KeyboardKey.RELEASED;
    this.m_previous = rune.input.KeyboardKey.RELEASED;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the current state of the key.
 *
 * @return {undefined}
 */
rune.input.KeyboardKey.prototype.update = function() {
    this.m_updateStates();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Updates the current state of the key.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.KeyboardKey.prototype.m_updateStates = function() {
    if (this.m_previous === rune.input.KeyboardKey.JUST_RELEASED && this.m_current == rune.input.KeyboardKey.JUST_RELEASED) this.m_current = rune.input.KeyboardKey.RELEASED;
    else if (this.m_previous === rune.input.KeyboardKey.JUST_PRESSED && this.m_current === rune.input.KeyboardKey.JUST_PRESSED) this.m_current = rune.input.KeyboardKey.PRESSED;

    this.m_previous = this.m_current;
};