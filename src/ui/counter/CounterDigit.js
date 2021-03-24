//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new object.
 * 
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} width ...
 * @param {number} height ...
 * @param {string} texture ...
 *
 * @class
 * @classdesc
 * 
 * Represents a number in a numeric counter.
 */
rune.ui.CounterDigit = function(x, y, width, height, texture) {

	//--------------------------------------------------------------------------
	//  Constructor call
	//--------------------------------------------------------------------------
	
	/**
	 * ...
	 */
	rune.display.Sprite.call(this, x, y, width, height, "", texture);
}

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rune.ui.CounterDigit.prototype = Object.create(rune.display.Sprite.prototype);
rune.ui.CounterDigit.prototype.constructor = rune.ui.CounterDigit;

//------------------------------------------------------------------------------
//  Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} value
 * @memberof rune.ui.CounterDigit
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.CounterDigit.prototype, "value", {
    /**
     * @this rune.ui.CounterDigit
     * @ignore
     */
    get : function() {
        return this.getValue();
    },
    
    /**
     * @this rune.ui.CounterDigit
     * @ignore
     */
    set : function(value) {
        this.setValue(value);
    }
});

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.CounterDigit.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initAnimation();
};

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @return {number}
 */
rune.ui.CounterDigit.prototype.getValue = function() {
	var value = parseInt(this['animations'].current.name, 10);
	return rune.util.Math.clamp(value, 0, 9);
};

/**
 * ...
 *
 * @param {number} value ...
 *
 * @return {undefined}
 */
rune.ui.CounterDigit.prototype.setValue = function(value) {
	value = rune.util.Math.clamp(parseInt(value, 10), 0, 9);
	this['animations'].gotoAndStop(value.toString());
};

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.CounterDigit.prototype.m_initAnimation = function() {
	this['animations'].add("0", [0], 1, true);
	this['animations'].add("1", [1], 1, true);
	this['animations'].add("2", [2], 1, true);
	this['animations'].add("3", [3], 1, true);
	this['animations'].add("4", [4], 1, true);
	this['animations'].add("5", [5], 1, true);
	this['animations'].add("6", [6], 1, true);
	this['animations'].add("7", [7], 1, true);
	this['animations'].add("8", [8], 1, true);
	this['animations'].add("9", [9], 1, true);
};