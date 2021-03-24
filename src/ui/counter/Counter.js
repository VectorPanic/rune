//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new object.
 * 
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @param {number} [numDigits=5] ...
 * @param {number} [digitWidth=10] ...
 * @param {number} [digitHeight=10] ...
 * @param {string} [texture=rune_counter_100x10] ...
 * @param {number} [padding=0] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a numeric counter.
 */
rune.ui.Counter = function(numDigits, digitWidth, digitHeight, texture, padding) {

	//--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    this.m_digitHeight = digitHeight || 10;

    /**
     * ..
     * 
     * @type {Array}
     * @private
     */
    this.m_digits = [];

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    this.m_digitWidth = digitWidth || 10;

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    this.m_numDigits = numDigits || 5;

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    this.m_padding = padding || 0;

    /**
     * ...
     * 
     * @type {string}
     * @private
     */
    this.m_texture = texture || "rune_texture_counter_digit_100x10";

    /**
     * ..
     * 
     * @type {number}
     * @private
     */
    this.m_value = 0;

	//--------------------------------------------------------------------------
	// Super call
	//--------------------------------------------------------------------------
	
	/**
	 *	...
	 */
	rune.display.DisplayObjectContainer.call(this, 0, 0, this.m_numDigits * (this.m_digitWidth + this.m_padding), this.m_digitHeight, "");
}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.Counter.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.ui.Counter.prototype.constructor = rune.ui.Counter;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} value
 * @memberof rune.ui.Counter
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Counter.prototype, "value", {
    /**
     * @this rune.ui.Counter
     * @ignore
     */
    get : function() {
        return this.getValue();
    },
    
    /**
     * @this rune.ui.Counter
     * @ignore
     */
    set : function(value) {
        this.setValue(value);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {number}
 */
rune.ui.Counter.prototype.getValue = function() {
    return this.m_value;
};

/**
 * ...
 *
 * @param  {number} value ...
 *
 * @return {undefined}
 */
rune.ui.Counter.prototype.setValue = function(value) {
    this.breakCache();
    this.m_value = value || 0;
    var str = String(value) || "0";
    var arr = str.split("");

    while (arr.length < this.m_digits.length) {
        arr.unshift("0");
    }

    for (var i = 0; i < this.m_digits.length; i++) {
        this.m_digits[i].value = arr[i];
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Counter.prototype.init = function() {
    rune.display.DisplayObjectContainer.prototype.init.call(this);
    this.m_initDigits();
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
rune.ui.Counter.prototype.m_initDigits = function() {
    for (var i = 0; i < this.m_numDigits; i++) {
         var x = (this.m_digitWidth * i) + (i * this.m_padding);
         var t = this.m_texture;
    	 var d = new rune.ui.CounterDigit(x, 0, this.m_digitWidth, this.m_digitHeight, t);
         
    	this.m_digits.push(d);
    	this.addChild(d);
    }
};