//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new button.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {Function} [onClick] Executed when the button is clicked.
 * @param {Object} [scope] Scope of callback execution.
 * @param {string} [texture] Bitmap texture.
 *
 * @class
 * @classdesc
 * 
 * Represents a bitmap-based button. The button can be in three different 
 * states; UP, DOWN and HOVER. 
 */
rune.ui.Button = function(onClick, scope, texture) {

    //--------------------------------------------------------------------------
    // Private properties (SCOPE BOUND)
    //--------------------------------------------------------------------------

    /**
     * The resource to be used for the texture of the button.
     *
     * @type {HTMLImageElement}
     * @private
     */
    var resource = this['resources'].get(texture || "rune_texture_button_150x72");

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Executed when the button is clicked.
     * 
     * @type {rune.util.Executable}
     * @protected
     * @ignore
     */
    this.m_onClick = new rune.util.Executable(onClick, scope);

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.Sprite.call(this, 0, 0, resource.width, resource.height / 3, "", resource);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.Button.prototype = Object.create(rune.display.Sprite.prototype);
rune.ui.Button.prototype.constructor = rune.ui.Button;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Executed when the button is clicked.
 *
 * @member {rune.util.Executable} onClick
 * @memberof rune.ui.Button
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Button.prototype, "onClick", {
    /**
     * @this rune.ui.Button
     * @ignore
     */
    get : function() {
        return this.m_onClick;
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Button.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initAnimations();
    this.m_initStates();
};

/**
 * @inheritDoc
 */
rune.ui.Button.prototype.dispose = function() {
    this.m_disposeOnClick();
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Button.prototype.m_construct = function() {
    rune.display.Sprite.prototype.m_construct.call(this);
    this.clickable = true;
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
rune.ui.Button.prototype.m_initAnimations = function() {
    this['animations'].add(rune.display.InteractiveObject.MOUSE_UP,   [0], 1, true);
    this['animations'].add(rune.display.InteractiveObject.MOUSE_OVER, [1], 1, true);
    this['animations'].add(rune.display.InteractiveObject.MOUSE_DOWN, [2], 1, true);

    this['animations'].gotoAndStop(rune.display.InteractiveObject.MOUSE_UP);
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Button.prototype.m_initStates = function() {
    this.onMouseUp   = new rune.util.Executable(this.m_onMouseUp, this);
    this.onMouseDown = new rune.util.Executable(this.m_onMouseDown, this);
    this.onMouseOver = new rune.util.Executable(this.m_onMouseOver, this);
    this.onMouseOut  = new rune.util.Executable(this.m_onMouseOut, this);
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Button.prototype.m_disposeOnClick = function() {
    if (this.m_onClick instanceof rune.util.Executable) {
        this.m_onClick.dispose();
        this.m_onClick = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Button.prototype.m_onMouseUp = function() {
    this['animations'].gotoAndStop(rune.display.InteractiveObject.MOUSE_OVER);
    if (this.m_onClick != null) {
        this.m_onClick.execute();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Button.prototype.m_onMouseOver = function() {
    this['animations'].gotoAndStop(rune.display.InteractiveObject.MOUSE_OVER);
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Button.prototype.m_onMouseDown = function() {
    this['animations'].gotoAndStop(rune.display.InteractiveObject.MOUSE_DOWN);
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Button.prototype.m_onMouseOut = function() {
    this['animations'].gotoAndStop(rune.display.InteractiveObject.MOUSE_UP);
};