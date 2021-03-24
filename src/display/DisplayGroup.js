//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new group.
 *
 * @constructor
 * @extends rune.geom.Rectangle
 *
 * @class
 * @classdesc
 * 
 * Represents a group of children belonging to a DisplayObjectContainer. When 
 * objects are added to the group, they are also added as children in the 
 * DisplayObjectContainer to which the group is connected. 
 */
rune.display.DisplayGroup = function(target) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * If the group is active or inactive - an active group executes its update 
     * loop for each frame. Note that group members (children) are updated by 
     * the group owner (DisplayObjectContainer), not the group itself.
     *
     * @type {boolean}
     * @default true
     */
    this.active = true;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * List containing group members.
     *
     * @type {Array.<rune.display.DisplayObject>}
     * @protected
     * @ignore
     */
    this.m_children = [];
    
    /**
     * ...
     *
     * @type {rune.display.Quadtree}
     * @protected
     * @ignore
     */
    this.m_quadtree = null;

    /**
     * The owner of the group.
     *
     * @type {rune.display.DisplayObjectContainer}
     * @protected
     * @ignore
     */
    this.m_target = target;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.geom.Rectangle.call(this, target.x, target.y, target.width, target.height);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.DisplayGroup.prototype = Object.create(rune.geom.Rectangle.prototype);
rune.display.DisplayGroup.prototype.constructor = rune.display.DisplayGroup;

//------------------------------------------------------------------------------
// Override public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "height", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_target['height'];
    },
    
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_target['height'] = value;
        this.m_height = value;
    }
});

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "width", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_target['width'];
    },
    
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_target['width'] = value;
        this.m_width = value;
    }
});

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "x", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_target.x;
    },
    
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_target['x'] = value;
        this.m_x = value;
    }
});

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "y", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_target.y;
    },
    
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_target['y'] = value;
        this.m_y = value;
    }
});

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Reference to an instance of the main class of the application. Useful for 
 * reading system settings such as screen resolution, etc.
 *
 * @member {rune.system.Main} application
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "application", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance'];
    }
});

/**
 * Reference to the application's camera manager.
 *
 * @member {rune.camera.Cameras} cameras
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "cameras", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this['application']['scenes']['selected']['cameras'];
    }
});

/**
 * Reference to the application's gamepads manager.
 *
 * @member {rune.input.Gamepads} gamepads
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "gamepads", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this['application']['inputs']['gamepads'];
    }
});

/**
 * Reference to the application's keyboard manager.
 *
 * @member {rune.input.Keyboard} keyboard
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "keyboard", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this['application']['inputs']['keyboard'];
    }
});

/**
 * Reference to the application's mouse manager. 
 *
 * @member {rune.input.Mouse} mouse
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "mouse", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this['application']['inputs']['mouse'];
    }
});

/**
 * The number of members in the group. This value is not necessarily the same 
 * as the number of children in the DisplayObjectContainer to which the group 
 * is connected.
 *
 * @member {number} numChildren
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "numChildren", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_children.length;
    }
});

/**
 * Reference to a quadtree that can be used to find objects that overlap, or 
 * are close to overlapping other objects. This reference is always Null when 
 * useQuadtree is set to false.
 *
 * @member {rune.display.Quadtree} quadtree
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "quadtree", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_quadtree;
    }
});

/**
 * The DisplayObjectContainer to which the object is connected. To add members 
 * to this group, also adds them as children of this object.
 *
 * @member {rune.display.DisplayObjectContainer} target
 * @memberof rune.display.DisplayGroup
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "target", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return this.m_target;
    }
});

/**
 * Activate or deactivate the group's built-in quadtree. A quadtree is the same 
 * size as the group target, but its size can change during execution. 
 *
 * @member {boolean} useQuadtree
 * @memberof rune.display.DisplayGroup
 * @instance
 */
Object.defineProperty(rune.display.DisplayGroup.prototype, "useQuadtree", {
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    get : function() {
        return (this.m_quadtree != null);
    },
    
    /**
     * @this rune.display.DisplayGroup
     * @ignore
     */
    set : function(value) {
        if (this.m_quadtree == null && value == true) {
            this.m_constructQuadtree();
        } else {
            this.m_disposeQuadtree();
        }
    },
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {rune.display.DisplayObject} child Object to add.
 *
 * @return {rune.display.DisplayObject}
 */
rune.display.DisplayGroup.prototype.addChild = function(child) {
    if (child instanceof rune.display.DisplayObject) {
        if (child != this.m_target) {
            child.setGroup(this);
            child.setParent(this.m_target, this['numChildren']);
            child.init();
        } else throw new Error();
    } else throw new TypeError();
    
    return child;
};

/**
 * ...
 *
 * @param {rune.display.DisplayGroup} group ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {undefined}
 */
rune.display.DisplayGroup.prototype.collideGroup = function(group, callback, scope) {
    var a = this.getChildren();
    var b = group.getChildren();
    
    for (var x = 0; x < a.length; x++) {
        for (var y = 0; y < b.length; y++) {
            if (a[x] != b[y]) {
                a[x].collide(b[y], callback, scope);
            }
        }
    }
};

/**
 * ...
 *
 * @param {number} index ...
 *
 * @return {rune.display.DisplayObject}
 */
rune.display.DisplayGroup.prototype.getChildAt = function(index) {
    if (index > -1 && index < this.m_children.length) {
        return this.m_children[index];
    } else throw new RangeError(index);
};

/**
 * TODO: ...
 *
 * @return {Array.<rune.display.DisplayObject>}
 */
rune.display.DisplayGroup.prototype.getChildren = function() {
    return this.m_children;
};

/**
 * ...
 *
 * @param {rune.display.DisplayObject} obj ...
 *
 * @return {Array.<rune.display.DisplayObject>}
 */
rune.display.DisplayGroup.prototype.getChildrenInProximityOfObject = function(obj) {
    if (this.m_quadtree != null) {
        var prospects = this.m_quadtree.retrieve(obj);
        var i = prospects.indexOf(obj);
        if (i > -1) {
            prospects.splice(i, 1);
        }
        
        return prospects;
    }

    return this.m_children;
};

/**
 * ...
 *
 * @param {rune.display.DisplayObject} obj ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {boolean}
 */
rune.display.DisplayGroup.prototype.hitTestObject = function(obj, callback, scope) {
    var found = false;
    var children = this.m_children;
    for (var i = 0; i < children.length; i++) {
        if (obj.hitTestObject(children[i], callback, scope)) {
            found = true;
        }
    }
    
    return found;
};

/**
 * ...
 *
 * @param {rune.display.DisplayGroup} group ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {boolean}
 */
rune.display.DisplayGroup.prototype.hitTestGroup = function(group, callback, scope) {
    var found = false;
    if (group.getChildren) {
        var children = group.getChildren();
        for (var i = 0; i < children.length; i++) {
            if (this.hitTestObject(children[i], callback, scope)) {
                found = true;
            }
        }
    }
    
    return found;
};

/**
 * ...
 *
 * @param {Function} func ...
 * @param {Object} scope ...
 * 
 * @return {undefined}
 */
rune.display.DisplayGroup.prototype.onEach = function(func, scope) {
    for (var i = 0; i < this.m_children.length; i++) {
        func.call(scope, this.m_children[i]);
    }
};

/**
 * ...
 *
 * @param {rune.display.DisplayObject} child ...
 * @param {boolean} [dispose=false] ...
 *
 * @return {rune.display.DisplayObject}
 */
rune.display.DisplayGroup.prototype.removeChild = function(child, dispose) {
    if (this.m_target.hasChild(child)) {
        
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
 * @param {boolean} [dispose=false] ...
 *
 * @return {undefined}
 */
rune.display.DisplayGroup.prototype.removeChildren = function(dispose) {
    while (this['numChildren'] > 0) {
        this.removeChild(this.getChildAt(0), dispose);
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.display.DisplayGroup.prototype.init = function() {
    
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
rune.display.DisplayGroup.prototype.update = function(step) {
    this.m_updateQuadtree(step);
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.display.DisplayGroup.prototype.dispose = function() {
    this.m_disposeQuadtree();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroup.prototype.m_constructQuadtree = function() {
    this.m_disposeQuadtree();
    if (this.m_quadtree == null) {
        this.m_quadtree = new rune.display.Quadtree(this.m_target);
    } else throw new Error();
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroup.prototype.m_updateQuadtree = function(step) {
    if (this.m_quadtree != null) {
        this.m_quadtree.clear();
        
        var c = this.m_children;
        var i = c.length;
        
        while (i--) {
            this.m_quadtree.insert(c[i]);
        }
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroup.prototype.m_disposeQuadtree = function() {
    if (this.m_quadtree instanceof rune.display.Quadtree) {
        this.m_quadtree.clear();
        this.m_quadtree = null;
    }
};