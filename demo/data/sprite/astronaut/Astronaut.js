//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.physics.Body
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
demo.data.Astronaut = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.physics.Body.call(this, x || 0, y || 0, 48, 48, "", "demo_astronaut_48x480");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.data.Astronaut.prototype = Object.create(rune.physics.Body.prototype);
demo.data.Astronaut.prototype.constructor = demo.data.Astronaut;

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
demo.data.Astronaut.prototype.init = function() {
    rune.physics.Body.prototype.init.call(this);
    this.m_initBounds();
    this.m_initVelocity();
    this.m_initAnimation();
    
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    this.clickable = true;
    this.onMouseDown = new rune.util.Executable(function() {
        //@note: kan inte ta bort via gruppen, fungerar bara via parent.
        this.parent.removeChild(this);
    }, this);
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
};

/**
 * @override
 */
demo.data.Astronaut.prototype.update = function(step) {
    rune.physics.Body.prototype.update.call(this, step);
    this.m_updateMotion(step);
};

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
demo.data.Astronaut.prototype.m_initBounds = function() {
    this.hitbox.set(
        14,
        14,
        20,
        20
    );
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
demo.data.Astronaut.prototype.m_initVelocity = function() {
    this.velocity.x = Math.random(-0.125, 0.125);
    this.velocity.y = Math.random(-0.125, 0.125);
    this.velocity.angular = Math.random(-1, 1);
    //this.mass = Math.random(1.0, 2.0);
    this.elasticity = Math.random(0.0, 0.5);
};

/**
 * ...
 * 
 * @returns {undefined}
 * @private
 */
demo.data.Astronaut.prototype.m_initAnimation = function() {
    this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, true);
};

/**
 * ...
 *
 * @param {number} step ...
 * 
 * @returns {undefined}
 * @private
 */
demo.data.Astronaut.prototype.m_updateMotion = function(step) {
    //@todo: ...
};