//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.game.Entity = function(x, y, width, height, fillColor, texture) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {number}
     */
    this.health = 100.0;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    rune.display.Sprite.call(this, x, y, width, height, fillColor, texture);
};

//--------------------------------------------------------------------------
//  Inheritance
//--------------------------------------------------------------------------

rune.game.Entity.prototype = Object.create(rune.display.Sprite.prototype);
rune.game.Entity.prototype.constructor = rune.game.Entity;

//--------------------------------------------------------------------------
//  Public prototype getter and setter methods
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @member {boolean} alive
 * @memberof rune.game.Entity
 * @instance
 */
Object.defineProperty(rune.game.Entity.prototype, "alive", {
    /**
     * ...
     * 
     * @this rune.game.Entity
     * @ignore
     */
    get : function() {
        return (this.health > 0.0);
    }
});

//--------------------------------------------------------------------------
// Public prototype methods (API)
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @param  {number} damage ...
 * 
 * @return {undefined}
 */
rune.game.Entity.prototype.hurt = function(damage) {
    this.health -= damage;
    this.onDamage(damage);
    
    if (this.health <= 0) {
        this.kill();
    }
};

/**
 * ...
 * 
 * @return {undefined}
 */
rune.game.Entity.prototype.kill = function() {
    if (this.health > 0.0) {
        this.health = 0.0;
    }
};

/**
 * ...
 * 
 * @return {undefined}
 */
rune.game.Entity.prototype.onDamage = function(ammount) {
    
};