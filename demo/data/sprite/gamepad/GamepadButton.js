//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {rune.input.Gamepad} gamepad ...
 * @param {number} buttonID ...
 * @param {string} GFX ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
demo.data.GamepadButton = function(x, y, gamepad, buttonID, GFX) {
    
    //--------------------------------------------------------------------------
    // Private properties (SCOPE BOUND)
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {HTMLImageElement}
     * @private
     */
    var resource = this.resources.get(GFX);
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     * 
     * @type {rune.input.Gamepad}
     * @private
     */
    this.m_gamepad = gamepad;
    
    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    this.m_buttonID = buttonID || 0;

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.Sprite.call(this, x, y, resource.width >> 1, resource.height, "", resource);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.data.GamepadButton.prototype = Object.create(rune.display.Sprite.prototype);
demo.data.GamepadButton.prototype.constructor = demo.data.GamepadButton;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
demo.data.GamepadButton.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initInput();
    this.m_initAnimation();
};

/**
 * @override
 */
demo.data.GamepadButton.prototype.update = function(step) {
    this.m_updateInput();
    rune.display.Sprite.prototype.update.call(this, step);
    
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @return {undefined}
 * @private
 */
demo.data.GamepadButton.prototype.m_initInput = function() {
    this.clickable = true;
    this.onMouseDown = new rune.util.Executable(function() {
        console.warn("WAA!");
        this.animations.gotoAndStop("active");
    }, this);
};

/**
 * ...
 * 
 * @return {undefined}
 * @private
 */
demo.data.GamepadButton.prototype.m_initAnimation = function() {
    this.animations.add("inactive", [0], 1);
    this.animations.add("active",   [1], 1);

    this.animations.gotoAndStop("inactive");
};

/**
 * ...
 * 
 * @return {undefined}
 * @private
 */
demo.data.GamepadButton.prototype.m_updateInput = function(step) {
    if (this.m_gamepad != null) {
        if (this.m_gamepad.pressed(this.m_buttonID)) this.animations.gotoAndStop("active");
        else this.animations.gotoAndStop("inactive");
    }
};