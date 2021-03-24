//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new button.
 *
 * @constructor
 * @extends rune.ui.Button
 *
 * @param {string} [label] ...
 * @param {Function} [onClick] ...
 * @param {Object} [scope] ...
 * @param {string} [texture] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bitmap-based button with text label.
 */
rune.ui.TextButton = function(label, onClick, scope, texture) {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * The text field that represents the text label of the button.
     * 
     * @type {rune.text.BitmapField}
     * @protected
     * @ignore
     */
    this.m_label = null;

    /**
     * The position of the text label in relation to the button. 
     * 
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_labelPosition = null;

    /**
     * Offset of the button's text label when the button is pressed.
     * 
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_labelPositionOffsetUp = new rune.geom.Point(0, -1);

    /**
     * Offset of the button's text label when the button is not pressed.
     * 
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_labelPositionOffsetDown = new rune.geom.Point(0, 3);

    /**
     * The button's current text label text.
     * 
     * @type {string}
     * @protected
     * @ignore
     */
    this.m_labelText = label || "";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.ui.Button.call(this, onClick, scope, texture);
}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.TextButton.prototype = Object.create(rune.ui.Button.prototype);
rune.ui.TextButton.prototype.constructor = rune.ui.TextButton;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * The text label that the button shows.
 *
 * @member {string} label
 * @memberof rune.ui.TextButton
 * @instance
 */
Object.defineProperty(rune.ui.TextButton.prototype, "label", {
    /**
     * @this rune.ui.TextButton
     * @ignore
     */
    get : function() {
        return this.m_labelText;
    },
    
    /**
     * @this rune.ui.TextButton
     * @ignore
     */
    set : function(value) {
        if (this.m_labelText != value) {
            this.m_labelText  = value;
            
            this.m_initLabel();
        }
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.ui.TextButton.prototype.init = function() {
    rune.ui.Button.prototype.init.call(this);
    this.m_initLabel();
};

/**
 * @override
 */
rune.ui.TextButton.prototype.dispose = function() {
    this.m_disposeLabel();
    rune.ui.Button.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.ui.TextButton.prototype.m_onMouseUp = function() {
    rune.ui.Button.prototype.m_onMouseUp.call(this);
    this.m_label.x = this.m_labelPosition.x + this.m_labelPositionOffsetUp.x;
    this.m_label.y = this.m_labelPosition.y + this.m_labelPositionOffsetUp.y;
};

/**
 * @override
 */
rune.ui.TextButton.prototype.m_onMouseOver = function() {
    rune.ui.Button.prototype.m_onMouseOver.call(this);
    this.m_label.x = this.m_labelPosition.x + this.m_labelPositionOffsetUp.x;
    this.m_label.y = this.m_labelPosition.y + this.m_labelPositionOffsetUp.y;
};

/**
 * @override
 */
rune.ui.TextButton.prototype.m_onMouseDown = function() {
    rune.ui.Button.prototype.m_onMouseDown.call(this);
    this.m_label.x = this.m_labelPosition.x + this.m_labelPositionOffsetDown.x;
    this.m_label.y = this.m_labelPosition.y + this.m_labelPositionOffsetDown.y;
};

/**
 * @override
 */
rune.ui.TextButton.prototype.m_onMouseOut = function() {
    rune.ui.Button.prototype.m_onMouseOut.call(this);
    this.m_label.x = this.m_labelPosition.x + this.m_labelPositionOffsetUp.x;
    this.m_label.y = this.m_labelPosition.y + this.m_labelPositionOffsetUp.y;
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.ui.TextButton.prototype.m_initLabel = function() {
    this.m_disposeLabel();
    if (this.m_label == null) {
        this.m_label = new rune.text.BitmapField();
        this.m_label.autoSize = true;
        this.m_label.text = this.m_labelText || "";
        this.m_labelPosition = new rune.geom.Point(
            (this.width  >> 1) - (this.m_label.width  >> 1),
            (this.height >> 1) - (this.m_label.height >> 1)
        );
        
        this.m_label.x = this.m_labelPosition.x + this.m_labelPositionOffsetUp.x;
        this.m_label.y = this.m_labelPosition.y + this.m_labelPositionOffsetUp.y;
        
        this.addChild(this.m_label);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.ui.TextButton.prototype.m_disposeLabel = function() {
    if (this.m_label != null) {
        this.m_label['parent'].removeChild(this.m_label, true);
        this.m_label = null;
    }
};