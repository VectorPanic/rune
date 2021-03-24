//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 * @extends rune.game.Entity
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * @param {number} [width] ...
 * @param {number} [height] ...
 * @param {number} [color] ...
 * @param {string} [texture] ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.physics.Body = function(x, y, width, height, color, texture) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {number}
     * @default rune.physics.Space.ANY
     */
    this.allowCollisions = rune.physics.Space.ANY;

    /**
     * ...
     *
     * @type {boolean}
     * @default true
     */
    this.autoMove = true;

    /**
     * ...
     *
     * @type {number}
     * @default 1.0
     */
    this.mass = 1.0;

    /**
     * ...
     *
     * @type {number}
     * @default 0.0
     */
    this.elasticity = 0.0;

    /**
     * ...
     *
     * @type {boolean}
     * @default false
     */
    this.immovable = false;

    /**
     * ...
     *
     * @type {rune.physics.Velocity}
     * @default new rune.physics.Velocity()
     */
    this.velocity = new rune.physics.Velocity(0, 0);

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {number}
     * @ignore
     */
    this.m_touching = rune.physics.Space.NONE;

    /**
     * ...
     *
     * @type {number}
     * @ignore
     */
    this.m_touched = rune.physics.Space.NONE;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.game.Entity.call(this, x, y, width, height, color, texture);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rune.physics.Body.prototype = Object.create(rune.game.Entity.prototype);
rune.physics.Body.prototype.constructor = rune.physics.Body;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} touching
 * @memberof rune.physics.Body
 * @instance
 */
Object.defineProperty(rune.physics.Body.prototype, "touching", {
    /**
     * ...
     * 
     * @this rune.physics.Body
     * @ignore
     */
    get : function() {
        return this.m_touching;
    },
    /**
     * ...
     * 
     * @this rune.physics.Body
     * @ignore
     */
    set : function(value) {
        this.m_touched = this.m_touching;
        this.m_touching = value;
    }
});

/**
 * ...
 *
 * @member {number} touched
 * @memberof rune.physics.Body
 * @instance
 * @readonly
 */
Object.defineProperty(rune.physics.Body.prototype, "touched", {
    /**
     * ...
     * 
     * @this rune.physics.Body
     * @ignore
     */
    get : function() {
        return this.m_touched;
    }
});

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {rune.physics.Body} obj ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @return {boolean}
 */
rune.physics.Body.prototype.collide = function(obj, callback, scope) {
    if (this.hitTestObject(obj)) {
        if (rune.physics.Space.separate(this, obj)) {
            if (typeof callback === "function") {
                callback.call(scope || this, this, obj);
            }
        }
        
        return true;
    }
    
    return false;
};

/**
 * ...
 *
 * @param {number} direction ...
 *
 * @returns {boolean}
 */
rune.physics.Body.prototype.isTouching = function(direction) {
    return (this.touching & direction) > rune.physics.Space.NONE;
};

/**
 * ...
 *
 * @param {number} direction ...
 *
 * @returns {boolean}
 * @suppress {missingProperties}
 */
rune.physics.Body.prototype.justTouched = function(direction) {
    return ((this.touching & direction) >  rune.physics.Space.NONE) && 
           ((this.touched  & direction) <= rune.physics.Space.NONE);
};

//------------------------------------------------------------------------------
// Override protected methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.physics.Body.prototype.update = function(step) {
    rune.game.Entity.prototype.update.call(this, step);
    this.m_updateVelocity(step);
};

//------------------------------------------------------------------------------
// Protected methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.physics.Body.prototype.m_updateVelocity = function(step) {
    if (this.autoMove === true && this.velocity != null) {
        this.velocity.update(step);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.rotation += this.velocity.angular;
    }

    this.touching = rune.physics.Space.NONE;
};