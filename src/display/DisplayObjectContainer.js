//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.display.InteractiveObject
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 * @param {number} [width=0] ...
 * @param {number} [height=0] ...
 * @param {string} [fillColor=""] ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.display.DisplayObjectContainer = function(x, y, width, height, fillColor) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Reference to sort function. Sorting is executed for each active frame 
     * and affects the order of current child objects.
     *
     * @type {Function}
     * @default null
     */
    this.sort = null;

    /**
     * ...
     *
     * @type {number}
     * @default 1.0
     */
    this.timeScale = 1.0;
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * List of current children.
     *
     * @type {Array.<rune.display.DisplayObject>}
     * @protected
     * @ignore
     */
    this.m_children = [];
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend DisplayObject.
     */
    rune.display.InteractiveObject.call(this, x, y, width, height, fillColor);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.DisplayObjectContainer.prototype = Object.create(rune.display.InteractiveObject.prototype);
rune.display.DisplayObjectContainer.prototype.constructor = rune.display.DisplayObjectContainer;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * Returns the number of children of this object.
 *
 * @member {number} numChildren
 * @memberof rune.display.DisplayObjectContainer
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObjectContainer.prototype, "numChildren", {
    /**
     * @this rune.display.DisplayObjectContainer
     * @ignore
     */
    get : function() {
        return this.m_children.length;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Adds a child DisplayObject instance to this DisplayObjectContainer instance. 
 * The child is added to the front (top) of all other children in this 
 * DisplayObjectContainer instance. To add a child to a specific index 
 * position, use the addChildAt() method.
 *
 * @param {rune.display.DisplayObject} child The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
 *
 * @throws {Error} Throws if the child is the same as the parent.
 * @throws {TypeError} Throws if the child is not of type DisplayObject.
 *
 * @return {rune.display.DisplayObject} The DisplayObject instance that you pass in the child parameter.
 */
rune.display.DisplayObjectContainer.prototype.addChild = function(child) {
    if (child instanceof rune.display.DisplayObject) {
        if (child != this) {
            child.setParent(this, this['numChildren']);
            child.init();
        } else throw new Error();
    } else throw new TypeError();
    
    return child;
};

/**
 * Adds a child DisplayObject instance to this DisplayObjectContainer instance. 
 * The child is added at the index position specified. An index of 0 represents 
 * the back (bottom) of the display list for this DisplayObjectContainer object.
 *
 * @param {rune.display.DisplayObject} child The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
 * @param {number} index The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
 *
 * @throws {TypeError} ...
 * @throws {RangeError} Throws if the index position does not exist in the child list.
 * @throws {Error} ...
 *
 * @return {rune.display.DisplayObject} The DisplayObject instance that you pass in the child parameter.
 */
rune.display.DisplayObjectContainer.prototype.addChildAt = function(child, index) {
    if (child instanceof rune.display.DisplayObject) {
        if (index > -1 && index <= this.m_children.length) {
            if (child != this) {
                child.setParent(this, index);
                child.init();
            } else throw new Error();
        } else throw new RangeError();
    } else throw new TypeError();
    
    return child;
};

/**
 * Returns the child display object instance that exists at the specified index.
 *
 * @param {number} index The index position of the child object.
 *
 * @throws {RangeError} Throws if the index does not exist in the child list.
 *
 * @return {rune.display.DisplayObject} The index position of the child object.
 */
rune.display.DisplayObjectContainer.prototype.getChildAt = function(index) {
    if (index > -1 && index < this.m_children.length) {
        return this.m_children[index];
    } else throw new RangeError();
};

/**
 * Returns the index position of a child DisplayObject instance.
 *
 * @param {rune.display.DisplayObject} child The DisplayObject instance to identify.
 *
 * @return {number} The index position of the child display object to identify.
 */
rune.display.DisplayObjectContainer.prototype.getChildIndex = function(child) {
    return this.m_children.indexOf(child);
};

/**
 * Returns a list of all children.
 *
 * @return {Array.<rune.display.DisplayObject>}
 */
rune.display.DisplayObjectContainer.prototype.getChildren = function() {
    return this.m_children;
};

/**
 * Checks if a specific child exists.
 *
 * @param {rune.display.DisplayObject} child ...
 *
 * @return {boolean}
 */
rune.display.DisplayObjectContainer.prototype.hasChild = function(child) {
    return (child) ? (this === child['parent']) : false;
};

/**
 * Removes the specified child DisplayObject instance from the child list of 
 * the DisplayObjectContainer instance. The parent property of the removed 
 * child is set to null , and the object is garbage collected if no other 
 * references to the child exist. The index positions of any display objects 
 * above the child in the DisplayObjectContainer are decreased by 1.
 *
 * @param {rune.display.DisplayObject} child ...
 * @param {boolean} dispose ...
 *
 * @return {rune.display.DisplayObject}
 */
rune.display.DisplayObjectContainer.prototype.removeChild = function(child, dispose) {
    if (this.hasChild(child)) {
        
        child.removeGroup();
        child.removeParent();
        
        if (dispose === true) {
            child.dispose();
            child = null;
        }
    }
    
    return child;
};

/**
 * ...
 *
 * @param {boolean} dispose ...
 *
 * @return {undefined}
 */
rune.display.DisplayObjectContainer.prototype.removeChildren = function(dispose) {
    while (this.m_children.length > 0) {
        this.removeChild(this.getChildAt(0), dispose);
    }
};

/**
 * ...
 *
 * @param {Function} func ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 */
rune.display.DisplayObjectContainer.prototype.sortChildren = function(func) {
    if (typeof func === "function") {
        this.m_children.sort(func);
        this.breakCache();
    } else throw new TypeError();
};

/**
 * ...
 *
 * @param {rune.display.DisplayObject} a ...
 * @param {rune.display.DisplayObject} b ...
 *
 * @return {boolean} ...
 */
rune.display.DisplayObjectContainer.prototype.swapChildren = function(a, b) {
    var ai = this.getChildIndex(a);
    var bi = this.getChildIndex(b);

    if ((ai !== -1) && (bi !== -1)) {
        var tz = a.z;
        a.z = b.z;
        b.z = tz;

        this.m_children[ai] = b;
        this.m_children[bi] = a;

        this.breakCache();

        return true;
    }

    return false;
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.display.DisplayObjectContainer.prototype.update = function(step) {
    rune.display.InteractiveObject.prototype.update.call(this, step);
    this.m_updateChildren(step);
};

/**
 * @inheritDoc
 */
rune.display.DisplayObjectContainer.prototype.render = function() {
    this.m_renderFillColor();
    this.m_renderChildren();
    this.m_renderGraphics();
    this.m_renderStates();
};

/**
 * @inheritDoc
 */
rune.display.DisplayObjectContainer.prototype.dispose = function() {
    this.m_disposeChildren();
    rune.display.InteractiveObject.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Protected prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObjectContainer.prototype.m_updateChildren = function(step) {
    var c = this.m_children;
    var i = c.length;
    
    if (this.sort != null) {
        this.sortChildren(this.sort);
    }
    
    while (i--) {
        this.m_updateChild(c[i], step);
    }
};

/**
 * TODO: ...
 *
 * @param {rune.display.DisplayObject} child ...
 * @param {number} step ...
 *
 * @return {undefined}
 * @ignore
 */
rune.display.DisplayObjectContainer.prototype.m_updateChild = function(child, step) {
    if (child != null) {
        if (child["active"] == true) {
            child.update(step * this.timeScale);
        }
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObjectContainer.prototype.m_renderChildren = function() {
    var children = this.m_children;
    for (var i = 0, l = children.length; i < l; i++) {
        this.m_renderChild(children[i]);
    } 
};

/**
 * TODO: ...
 *
 * @param {rune.display.DisplayObject} child ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObjectContainer.prototype.m_renderChild = function(child) {
    this.m_canvas.renderObj(child);
    this.m_renderChildDebug(child);
};

/**
 * TODO: ...
 *
 * @param {rune.display.DisplayObject} obj ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObjectContainer.prototype.m_renderChildDebug = function(obj) {
    /*
    if (this.debug == true) {
        var frame = obj.getRenderFrame();
        
        this.m_canvas.drawRect(
            obj.x,
            obj.y,
            obj.width,
            obj.height,
            "#00FF00"
        );
        
        this.m_canvas.drawRect(
            frame.x,
            frame.y,
            frame.width,
            frame.height,
            "#FF0000"
        );
    }
    */
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObjectContainer.prototype.m_disposeChildren = function() {
    //TODO: ...
};