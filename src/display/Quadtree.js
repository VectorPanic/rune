//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 * @extends rune.geom.Rectangle
 *
 * @param {rune.geom.Rectangle} [bounds] ...
 * @param {number} [threshold] ...
 * @param {number} [maxDepth] ...
 * @param {number} [depth] ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.display.Quadtree = function(bounds, threshold, maxDepth, depth) {

    //--------------------------------------------------------------------------
    // Default arguments
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    bounds = bounds || new rune.geom.Rectangle(0, 0, 384, 216);

    //--------------------------------------------------------------------------
    // Internal properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {Array}
     * @ignore
     */
    this.m_nodes = [];

    /**
     * ...
     *
     * @type {Array}
     * @ignore
     */
    this.m_objects = [];

    /**
     * ...
     *
     * @type {number}
     * @ignore
     */
    this.m_threshold = threshold || 6;

    /**
     * ...
     *
     * @type {number}
     * @ignore
     */
    this.m_maxDepth = maxDepth || 4;

    /**
     * ...
     *
     * @type {number}
     * @ignore
     */
    this.m_depth = depth || 0;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.geom.Rectangle.call(this, bounds.x, bounds.y, bounds.width, bounds.height);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.Quadtree.prototype = Object.create(rune.geom.Rectangle.prototype);
rune.display.Quadtree.prototype.constructor = rune.display.Quadtree;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @const {number}
 */
rune.display.Quadtree.TOP_LEFT = 0;

/**
 * ...
 *
 * @const {number}
 */
rune.display.Quadtree.TOP_RIGHT = 1;

/**
 * ...
 *
 * @const {number}
 */
rune.display.Quadtree.BOTTOM_LEFT = 2;

/**
 * ...
 *
 * @const {number}
 */
rune.display.Quadtree.BOTTOM_RIGHT = 3;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Clears the tree structure, including the underlying nodes.
 *
 * @return {undefined}
 */
rune.display.Quadtree.prototype.clear = function() {
    this.m_objects = [];
    for (var i = 0; i < this.m_nodes.length; i++) {
        if (typeof this.m_nodes[i] !== "undefined") {
            this.m_nodes[i].clear();
        }
    }

    this.m_nodes = [];
};

/**
 * Calculates in which node a two-dimensional point is located.
 * Returns the node's current index (0-3), not the node itself.
 *
 * @param {rune.geom.Point} point Current position
 *
 * @return {number}
 * @suppress {missingProperties}
 */
rune.display.Quadtree.prototype.getIndexOfPoint = function(point) {
    var left = (point.x > this.centerX) ? false : true;
    var top  = (point.y > this.centerY) ? false : true;

    if (left) return (top) ? rune.display.Quadtree.TOP_LEFT  : rune.display.Quadtree.BOTTOM_LEFT;
    else      return (top) ? rune.display.Quadtree.TOP_RIGHT : rune.display.Quadtree.BOTTOM_RIGHT;
};

/**
 * Retrieves node-index for each corner of a rectangle. The 
 * same node-index can only occur once in the list-structure 
 * representing the method's result.
 *
 * @param {rune.geom.Rectangle} rectangle ...
 *
 * @return {Array}
 * @suppress {missingProperties}
 */
rune.display.Quadtree.prototype.getIndexOfRectangle = function(rectangle) {
    var a = this.getIndexOfPoint(rectangle.topLeft);
    var b = this.getIndexOfPoint(rectangle.topRight);
    var c = this.getIndexOfPoint(rectangle.bottomLeft);
    var d = this.getIndexOfPoint(rectangle.bottomRight);
    
    var e = Array.prototype.concat(a, b, c, d);
    return e.filter(rune.util.Filter.unique);
};

/**
 * ...
 *
 * @param {rune.geom.Rectangle} rectangle ...
 *
 * @return {undefined}
 */
rune.display.Quadtree.prototype.insert = function(rectangle) {
    var corners;
    var c = 0; // corner index
    var l = 0; // corners length
    var o = 0; // object index

    if (typeof this.m_nodes[0] !== "undefined") {
        var divide = false;
        corners = this.getIndexOfRectangle(rectangle);
        for (c = 0, l = corners.length; c < l; c++) {
            this.m_nodes[corners[c]].insert(rectangle);
            divide = true;
        }

        if (divide === true) return;
    }

    this.m_objects.push(rectangle);

    if (this.m_objects.length > this.m_threshold && this.m_depth < this.m_maxDepth) {
        if (typeof this.m_nodes[0] === "undefined") {
            this.split();
        }

        while (o < this.m_objects.length) {
            var removeFromNode = false;
            var numProcessedCorners = 0;
            var currentObject = null;

            corners = this.getIndexOfRectangle(this.m_objects[o]);
            for (c = 0, l = corners.length; c < l; c++) {
                currentObject = this.m_objects[o];
                this.m_nodes[corners[c]].insert(currentObject);
                removeFromNode = true;
                numProcessedCorners++;
            }

            if (removeFromNode === true && numProcessedCorners === corners.length) this.m_objects.splice(o, 1);
            else o++;
        }
    }    
};

/**
 * ...
 *
 * @return {Array.<rune.display.DisplayObject>}
 */
rune.display.Quadtree.prototype.retrieve = function(rectangle) {
    if (rectangle == null) return [];
    var corners = (rectangle.width != undefined && rectangle.height != undefined) ? this.getIndexOfRectangle(rectangle) : [this.getIndexOfPoint(rectangle)];
    var objects = this.m_objects;

    if (typeof this.m_nodes[0] !== "undefined") {
        for (var i = 0, l = corners.length; i < l; i++) {
            if (corners[i] !== -1) {
                objects = objects.concat(this.m_nodes[corners[i]].retrieve(rectangle));
            } 
        }
    }

    return objects.filter(rune.util.Filter.unique);
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.display.Quadtree.prototype.split = function() {
    var depth = this.m_depth + 1;

    var bx = this.x;
    var by = this.y;

    var bwh = Math.round(this.width  >> 1);
    var bhh = Math.round(this.height >> 1);
    var bcw = bx + bwh; // border center width
    var bch = by + bhh; // border center height

    this.m_nodes[rune.display.Quadtree.TOP_LEFT] = new rune.display.Quadtree(
        new rune.geom.Rectangle(bx, by, bwh, bhh), this.m_threshold, this.m_maxDepth, depth
    );

    this.m_nodes[rune.display.Quadtree.TOP_RIGHT] = new rune.display.Quadtree(
        new rune.geom.Rectangle(bcw, by, bwh, bhh), this.m_threshold, this.m_maxDepth, depth
    );

    this.m_nodes[rune.display.Quadtree.BOTTOM_LEFT] = new rune.display.Quadtree(
        new rune.geom.Rectangle(bx, bch, bwh, bhh), this.m_threshold, this.m_maxDepth, depth
    );

    this.m_nodes[rune.display.Quadtree.BOTTOM_RIGHT] = new rune.display.Quadtree(
        new rune.geom.Rectangle(bcw, bch, bwh, bhh), this.m_threshold, this.m_maxDepth, depth
    );
};