//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.geom.Point
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.geom.Vector2D = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.geom.Point.call(this, x, y);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.geom.Vector2D.prototype = Object.create(rune.geom.Point.prototype);
rune.geom.Vector2D.prototype.constructor = rune.geom.Vector2D;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.geom.Vector2D.prototype.toString = function() {
    return "[{Vector2D (x=" + this.x + " y=" + this.y + ")}]";
};

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {rune.geom.Vector2D} vector2D ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.add = function(vector2D) {
    this.x += vector2D.x;
    this.y += vector2D.y;

    return this;
};

/**
 * ...
 *
 * @param {rune.geom.Vector2D} vector2D ...
 *
 * @returns {number}
 */
rune.geom.Vector2D.prototype.angle = function(vector2D) {
    return Math.atan2((vector2D.y - this.y), (vector2D.x - this.x));
};

/**
 * ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);

    return this;
};

/**
 * ...
 *
 * @param {number} max ...
 * @param {number} min ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.clamp = function(min, max) {
    this.x = rune.util.Math.clamp(this.x, min, max);
    this.y = rune.util.Math.clamp(this.y, min, max);

    return this;
};

/**
 * ...
 *
 * @param {rune.geom.Vector2D} vector2D ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.copy = function(vector2D) {
    this.x = vector2D.x;
    this.y = vector2D.y;

    return this;
};

/**
 * ...
 *
 * @param {rune.geom.Vector2D} vector2D ...
 * @param {boolean} round ...
 *
 * @returns {number}
 */
rune.geom.Vector2D.prototype.distance = function(vector2D, round) {
    var distance = rune.util.Math.distance(this.x, this.y, vector2D.x, vector2D.y);
    return round ? Math.round(distance) : distance;
};

/**
 * ...
 *
 * @param {number} n ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.divide = function(n) {
    this.x /= n;
    this.y /= n;

    return this;
};

/**
 * ...
 *
 * @param  {rune.geom.Vector2D} vector2D ...
 *
 * @returns {number}
 */
rune.geom.Vector2D.prototype.dotProduct = function(vector2D) {
    return this.x * vector2D.x + this.y * vector2D.y;
};

/**
 * ...
 *
 * @param  {rune.geom.Vector2D} vector2D ...
 *
 * @returns {boolean}
 */
rune.geom.Vector2D.prototype.equals = function(vector2D) {
    return ((this.x === vector2D.x) && (this.y === vector2D.y));
};

/**
 * ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
};

/**
 * ...
 *
 * @returns {number}
 */
rune.geom.Vector2D.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.normalize = function() {
    var d = this.length();
    if (d > 0) {
        this.x = this.x / d;
        this.y = this.y / d;
    }

    return this;
};

/**
 * ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.reset = function() {
    this.x = 0;
    this.y = 0;

    return this;
};

/**
 * ...
 *
 * @param {number} x ...
 * @param {number} y ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.scale = function(x, y) {
    this.x *= x || 1;
    this.y *= y || x;

    return this;
};

/**
 * ...
 *
 * @param {rune.geom.Vector2D} vector2D ...
 *
 * @returns {rune.geom.Vector2D}
 */
rune.geom.Vector2D.prototype.subtract = function(vector2D) {
    this.x -= vector2D.x;
    this.y -= vector2D.y;

    return this;
};