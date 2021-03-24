//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 * @extends rune.geom.Vector2D
 *
 * @param {number} x ...
 * @param {number} y ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.physics.Velocity = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.geom.Vector2D.call(this, x, y);

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.geom.Vector2D}
     * @default new rune.geom.Vector2D(0, 0)
     */
    this.acceleration = new rune.geom.Vector2D(0, 0);

    /**
     * ...
     *
     * @type {number}
     * @default 0.0
     */
    this.angular = 0.0;

    /**
     * ...
     *
     * @type {number}
     * @default 0.0
     */
    this.angularAcceleration = 0.0;

    /**
     * ...
     *
     * @type {number}
     * @default 0.0
     */
    this.angularDrag = 0.0;

    /**
     * ...
     *
     * @type {number}
     * @default 10000
     */
    this.angularMax = 100;

    /**
     * ...
     *
     * @type {rune.geom.Vector2D}
     * @default new rune.geom.Vector2D(0, 0)
     */
    this.drag = new rune.geom.Vector2D(0, 0);

    /**
     * ...
     *
     * @type {rune.geom.Vector2D}
     * @default new rune.geom.Vector2D(100, 100)
     */
    this.max = new rune.geom.Vector2D(100, 100);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.physics.Velocity.prototype = Object.create(rune.geom.Vector2D.prototype);
rune.physics.Velocity.prototype.constructor = rune.physics.Velocity;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 */
rune.physics.Velocity.prototype.update = function(step) {
    this.m_updateMotion(step);
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.physics.Velocity.prototype.m_updateMotion = function(step) {
    this.x += this.m_calcVelocity(step, this.x, this.acceleration.x, this.drag.x, this.max.x) - this.x;
    this.y += this.m_calcVelocity(step, this.y, this.acceleration.y, this.drag.y, this.max.y) - this.y;
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.physics.Velocity.prototype.m_updateAngularMotion = function(step) {
    this.angular = this.m_calcVelocity(step, this.angular, this.angularAcceleration, this.angularDrag, this.angularMax) - this.angular;
};

/**
 * ...
 *
 * @param {number} step ...
 * @param {number} velocity ...
 * @param {number} [acceleration=0] ...
 * @param {number} [drag=0] ...
 * @param {number} [max=10000] ...
 *
 * @returns {number}
 * @ignore
 */
rune.physics.Velocity.prototype.m_calcVelocity = function(step, velocity, acceleration, drag, max) {
    acceleration = acceleration || 0;
    drag = drag || 0;
    max = max || 10000;

    if (acceleration != 0) {
        velocity += acceleration * step;
    } else if (drag != 0) {
        var d = drag * step;
        if (velocity - d > 0) {
            velocity = velocity - d;
        } else if (velocity + d < 0) {
            velocity += d;
        } else {
            velocity = 0.0;
        }
    }

    if ((velocity != 0) && (max != 10000)) {
        if (velocity > max) {
            velocity = max;
        } else if (velocity < -max) {
            velocity = -max;
        }
    }

    return velocity;
};