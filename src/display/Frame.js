//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.geom.Rectangle
 *
 * @param {number} [fx=0] ...
 * @param {number} [fy=0] ...
 * @param {number} [fw=0] ...
 * @param {number} [fh=0] ...
 * @param {number} [cx=0] ...
 * @param {number} [cy=0] ...
 * @param {number} [cw=0] ...
 * @param {number} [ch=0] ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.display.Frame = function(fx, fy, fw, fh, cx, cy, cw, ch) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.geom.Rectangle}
     * @protected
     * @ignore
     */
    this.m_clipping = new rune.geom.Rectangle(cx, cy, cw, ch);
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend Rectangle.
     */
    rune.geom.Rectangle.call(this, fx, fy, fw, fh);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.Frame.prototype = Object.create(rune.geom.Rectangle.prototype);
rune.display.Frame.prototype.constructor = rune.display.Frame;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.geom.Rectangle} clipping
 * @memberof rune.display.Frame
 * @instance
 * @readonly
 */
Object.defineProperty(rune.geom.Rectangle.prototype, "clipping", {
    /**
     * @this rune.display.Frame
     * @ignore
     */
    get : function() {
        return this.m_clipping;
    }
});