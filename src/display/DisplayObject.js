//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new DisplayObject.
 *
 * @constructor
 * @extends rune.geom.Rectangle
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
rune.display.DisplayObject = function(x, y, width, height, fillColor) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * Whether the object should be updated by its parent or not. Inactive 
     * objects are still rendered.
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_active = true;
    
    /**
     * Indicates the alpha transparency value of the object specified. Valid 
     * values are 0 (fully transparent) to 1 (fully opaque). The default value 
     * is 1. Display objects with alpha set to 0 are active, even though they 
     * are invisible.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_alpha = 1.0;
    
    /**
     * Used to render the object's graphic representation.
     *
     * @type {rune.display.Canvas}
     * @protected
     * @ignore
     */
    this.m_canvas = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.display.Flicker}
     * @protected
     * @ignore
     */
    this.m_flicker = null;
    
    /**
     * TODO: ...
     *
     * @type {string}
     * @protected
     * @ignore
     */
    this.m_fillColor = fillColor || "";
    
    /**
     * TODO: ...
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_flippedX = false;
    
    /**
     * TODO: ...
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_flippedY = false;
    
    /**
     * TODO: ...
     *
     * @type {rune.display.Graphics}
     * @protected
     * @ignore
     */
    this.m_graphics = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.display.Hitbox}
     * @protected
     * @ignore
     */
    this.m_hitbox = null;
    
    /**
     * ...
     *
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_pivot = new rune.geom.Point(0.5, 0.5);
    
    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_previousX = x || 0.0;

    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_previousY = y || 0.0;
    
    /**
     * TODO: ...
     *
     * @type {rune.display.Frame}
     * @protected
     * @ignore
     */
    this.m_renderFrame = new rune.display.Frame(); // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    
    /**
     * TODO: ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_rotation = 0;
    
    /**
     * The object's current scale in the x and y directions.
     *
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_scale = new rune.geom.Point(1.0, 1.0);
    
    /**
     * ...
     *
     * @type {rune.geom.Rectangle}
     * @protected
     * @ignore
     */
    this.m_tmpRect = new rune.geom.Rectangle(); // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    
    /**
     * TODO: ...
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_visible = true;
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {boolean}
     * @private
     */
    this.m_cached = false;
    
    /**
     * ...
     *
     * @type {rune.display.DisplayGroup}
     * @private
     */
    this.m_group = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.display.DisplayObjectContainer}
     * @private
     */
    this.m_parent = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend Rectangle.
     */
    rune.geom.Rectangle.call(this, x, y, width, height);
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.DisplayObject.prototype = Object.create(rune.geom.Rectangle.prototype);
rune.display.DisplayObject.prototype.constructor = rune.display.DisplayObject;

//------------------------------------------------------------------------------
// Public static getter and setter properties
//------------------------------------------------------------------------------

/**
 * The Stage of the display object.
 *
 * @member {rune.display.DisplayObject} stage
 * @memberof rune.display.DisplayObject
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject, "stage", {
    /**
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance']['scenes']['selected']['stage'];
    }
});

//------------------------------------------------------------------------------
// Override public getter and setter methods
//------------------------------------------------------------------------------

/**
 * Indicates the height of the object, in pixels.
 *
 * @member {number} height
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "height", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_height * this.m_scale.y;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        value = value / this.m_scale.y;
        if (this.m_height != value) {
            this.m_height  = value;
            
            this.m_canvas['height'] = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * Indicates the width of the object, in pixels.
 *
 * @member {number} width
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "width", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_width * this.m_scale.x;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        value = value / this.m_scale.x;
        if (this.m_width != value) {
            this.m_width  = value;
            
            this.m_canvas['width'] = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * Indicates the x coordinate of the DisplayObject instance relative to the 
 * local coordinates of the parent DisplayObjectContainer.
 *
 * @member {number} x
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "x", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_x;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_previousX = this.m_x;
        if (this.m_x != value) {
            this.m_x =  value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * Indicates the y coordinate of the DisplayObject instance relative to the 
 * local coordinates of the parent DisplayObjectContainer.
 *
 * @member {number} y
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "y", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_y;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        this.m_previousY = this.m_y;
        if (this.m_y != value) {
            this.m_y =  value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * Whether the object should be updated by its parent or not. Inactive 
 * objects are still rendered.
 *
 * @member {boolean} active
 * @memberof rune.display.DisplayObject
 * @instance
 * @default true
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "active", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_active;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        this.m_active = value;
    }
});

/**
 * Indicates the alpha transparency value of the object specified. Valid 
 * values are 0 (fully transparent) to 1 (fully opaque). The default value 
 * is 1. Display objects with alpha set to 0 are active, even though they 
 * are invisible.
 *
 * @member {number} alpha
 * @memberof rune.display.DisplayObject
 * @instance
 * @default 1.0
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "alpha", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_alpha;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        value = rune.util.Math.clamp(value, 0.0, 1.0);
        if (this.m_alpha != value) {
            this.m_alpha  = value;
            if (this.m_parent != null) {
                this.m_parent.breakCache();
            }
        }
    }
});

/**
 * TODO: ...
 *
 * @member {rune.system.Main} application
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "application", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance'];
    }
});

/**
 * Whether the object is cached or not. Objects with invalid cache must be 
 * redrawn.
 *
 * @member {boolean} cached
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "cached", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_cached;
    }
});

/**
 * ...
 *
 * @member {rune.camera.Cameras} cameras
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "cameras", {
    /**
     * ...
     * 
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this['application']['scenes']['selected']['cameras'];
    }
});

/**
 * TODO: ...
 *
 * @member {rune.display.Canvas} canvas
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "canvas", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_canvas;
    }
});

/**
 * TODO: ...
 *
 * @member {boolean} flickering
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "flickering", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_flicker['active'];
    }
});

/**
 * TODO: ...
 *
 * @member {number} fillColor
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "fillColor", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_fillColor;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        if (this.m_fillColor != value) {
            this.m_fillColor  = value;
            
            this.breakCache();
        }
    }
});

/**
 * ...
 *
 * @member {boolean} flippedX
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "flippedX", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_flippedX;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        if (this.m_flippedX != value) {
            this.m_flippedX  = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * ...
 *
 * @member {boolean} flippedY
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "flippedY", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_flippedY;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        if (this.m_flippedY != value) {
            this.m_flippedY  = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * TODO: ...
 *
 * @member {rune.display.Graphics} graphics
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "graphics", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_graphics;
    }
});

/**
 * ...
 *
 * @member {rune.display.DisplayGroup} group
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "group", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_group;
    }
});

/**
 * TODO: ...
 *
 * @member {boolean} hidden
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "hidden", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return (!this['visible'] || !this.m_flicker['visible']);
    }
});

/**
 * TODO: ...
 *
 * @member {rune.display.Hitbox} hitbox
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "hitbox", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_hitbox;
    }
});

/**
 * Indicates the DisplayObjectContainer object that contains this display 
 * object. Use the parent property to specify a relative path to display 
 * objects that are above the current display object in the display list 
 * hierarchy.
 *
 * @member {rune.display.DisplayObjectContainer} parent
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "parent", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_parent;
    }
});

/**
 * ...
 *
 * @member {number} pivotX
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "pivotX", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return (this.m_canvas['width'] * this['scaleX']) * this.m_pivot.x;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        value = ((value / this.m_canvas['width']) / this['scaleX']);
        value = rune.util.Math.clamp(value, 0, 1.0);
        
        if (this.m_pivot.x != value) {
            this.m_pivot.x = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * ...
 *
 * @member {number} pivotY
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "pivotY", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return (this.m_canvas['height'] * this['scaleY']) * this.m_pivot.y;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        value = ((value / this.m_canvas['height']) / this['scaleY']);
        value = rune.util.Math.clamp(value, 0, 1.0);
        
        if (this.m_pivot.y != value) {
            this.m_pivot.y = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * ...
 *
 * @member {number} previousX
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "previousX", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_previousX;
    }
});

/**
 * ...
 *
 * @member {number} previousY
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "previousY", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_previousY;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.resource.Resources} resources
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "resources", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance']['resources'];
    }
});

/**
 * ...
 *
 * @member {number} rotation
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "rotation", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_rotation;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        if (this.m_rotation != value) {
            this.m_rotation  = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * ...
 *
 * @member {number} scaleX
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "scaleX", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_scale.x;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        value = rune.util.Math.clamp(value, 0, Infinity);
        if (this.m_scale.x != value) {
            this.m_scale.x  = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * ...
 *
 * @member {number} scaleY
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "scaleY", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_scale.y;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        value = rune.util.Math.clamp(value, 0, Infinity);
        if (this.m_scale.y != value) {
            this.m_scale.y  = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

/**
 * TODO: ...
 *
 * @member {rune.display.Stage} stage
 * @memberof rune.display.DisplayObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "stage", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        if (this.m_parent != null) {
            if (this.m_parent instanceof rune.display.Stage) {
                return this.m_parent;
            } else return this.m_parent['stage'];
        }
        
        return null;
    }
});

/**
 * ...
 *
 * @member {number} unscaledHeight
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "unscaledHeight", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_height;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        if (this.m_height != value) {
            this.m_height  = value;
            
            this.m_canvas.height = this.m_height;
            
            this.breakCache();
        }
    }
});

/**
 * ...
 *
 * @member {number} unscaledWidth
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "unscaledWidth", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.m_width;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        if (this.m_width != value) {
            this.m_width  = value;
            
            this.m_canvas.width = this.m_width;
            
            this.breakCache();
        }
    }
});

/**
 * TODO: ...
 *
 * @member {boolean} visible
 * @memberof rune.display.DisplayObject
 * @instance
 */
Object.defineProperty(rune.display.DisplayObject.prototype, "visible", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_visible;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        if (this.m_visible != value) {
            this.m_visible  = value;
            
            if (this['parent'] != null) {
                this['parent'].breakCache();
            }
        }
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @param {number} [duration=3000] ...
 * @param {number} [frequency=64] ...
 * @param {Function} [onComplete]  ...
 * @param {Object} [scope] ...
 *
 * @returns {undefined}
 */
rune.display.DisplayObject.prototype.flicker = function(duration, frequency, onComplete, scope) {
    if (this.m_flicker != null) {
        this.m_flicker.start(
            duration, 
            frequency, 
            onComplete, 
            scope
        );
    }
};

/**
 * Evaluates the bounding box of the display object to see if it overlaps or 
 * intersects with the bounding box of the obj display object.
 *
 * @param {rune.display.DisplayObject} obj ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {boolean} true if the bounding boxes of the display objects 
 * intersect; false if not.
 */
rune.display.DisplayObject.prototype.hitTestObject = function(obj, callback, scope) {
    if (rune.geom.Rectangle.intersects(
        this['hitbox']['x'],
        this['hitbox']['y'],
        this['hitbox']['width'],
        this['hitbox']['height'],
        obj['hitbox']['x'],
        obj['hitbox']['y'],
        obj['hitbox']['width'],
        obj['hitbox']['height']
    )) {
        if (typeof callback === "function") {
            callback.call(scope || this, this, obj);
        }
        
        return true;
    }
    
    return false;
};

/**
 * ...
 *
 * @param {rune.display.DisplayObjectContainer} parent ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {boolean} ...
 */
rune.display.DisplayObject.prototype.hitTestChildren = function(parent, callback, scope) {
    var found = false;
    if (parent.getChildren) {
        if (this.hitTestObject(parent)) {
            var children = parent.getChildren();
            for (var i = 0; i < children.length; i++) {
                if (this.hitTestObject(children[i], callback, scope)) {
                    found = true;
                }
            }
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
 * @return {boolean} ...
 */
rune.display.DisplayObject.prototype.hitTestGroup = function(group, callback, scope) {
    if (group.getChildren) {
        var children = group.getChildren();
        for (var i = 0; i < children.length; i++) {
            if (this.hitTestObject(children[i], callback, scope)) {
                return true;
            }
        }
    }
    
    return false;
};

/**
 * ...
 *
 * @param {rune.geom.Point} point ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @return {boolean} ...
 */
rune.display.DisplayObject.prototype.hitTestPoint = function(point, callback, scope) {
    if (rune.geom.Rectangle.containsPoint(
        this['hitbox']['x'],
        this['hitbox']['y'],
        this['hitbox']['width'],
        this['hitbox']['height'],
        point['x'] || 0.0,
        point['y'] || 0.0
    )) {
        if (typeof callback === "function") {
            callback.call(scope || this, this, point);
        }
        
        return true;
    }
    
    return false;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.DisplayObject.prototype.breakCache = function() {
    this.m_cached = false;
    if (this.m_parent != null) {
        this.m_parent.breakCache();
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.DisplayObject.prototype.dispose = function() {
    this.m_disposeParent();
    this.m_disposeFlicker();
    this.m_disposeHitbox();
    this.m_disposeGraphics();
    this.m_disposeCanvas();
};

/**
 * TODO: ...
 *
 * @return {rune.geom.Rectangle}
 */
rune.display.DisplayObject.prototype.getGlobalRect = function() {
    
    var parent = null;
    if (this.m_parent != null) {
        parent = this.m_parent.getGlobalRect();
    }
    
    /*
    return new rune.geom.Rectangle(
        this['x'] + ((parent) ? parent['x'] : 0),
        this['y'] + ((parent) ? parent['y'] : 0),
        this['width'],
        this['height']
    );
    */
    
    this.m_tmpRect['x'] = this['x'] + ((parent) ? parent['x'] : 0);
    this.m_tmpRect['y'] = this['y'] + ((parent) ? parent['y'] : 0);
    this.m_tmpRect['width'] = this['width'];
    this.m_tmpRect['height'] = this['height'];
    
    return this.m_tmpRect;
};

/**
 * TODO: ...
 *
 * @return {rune.geom.Rectangle}
 */
rune.display.DisplayObject.prototype.getRenderFrame = function() {
    this.m_renderFrame['x'] = this.m_x;
    this.m_renderFrame['y'] = this.m_y;
    this.m_renderFrame['width'] = this.m_canvas['width']  * this['scaleX'];
    this.m_renderFrame['height'] = this.m_canvas['height'] * this['scaleY'];
    this.m_renderFrame['clipping']['x'] = 0;
    this.m_renderFrame['clipping']['y'] = 0;
    this.m_renderFrame['clipping']['width'] = this.m_canvas['width'];
    this.m_renderFrame['clipping']['height'] = this.m_canvas['height'];
    
    return this.m_renderFrame;
    
    /*
    return new rune.display.Frame(
        this.m_x,
        this.m_y,
        this.m_canvas['width']  * this['scaleX'],
        this.m_canvas['height'] * this['scaleY'],
        0,
        0,
        this.m_canvas['width'],
        this.m_canvas['height']
    );
    */
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.DisplayObject.prototype.init = function() {
    //DO NOTHING; ATM
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.DisplayObject.prototype.render = function() {
    this.m_renderFillColor();
    this.m_renderGraphics();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.DisplayObject.prototype.restoreCache = function() {
    this.m_cached = true;
    if (this.m_parent != null) {
        this.m_parent.restoreCache();
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ... 
 *
 * @return {undefined}
 */
rune.display.DisplayObject.prototype.update = function(step) {
    this.m_updateFlicker(step);
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.display.DisplayObject.prototype.removeGroup = function() {
    if (this.m_group != null) {
        
        var children = this.m_group.getChildren();
        var i = children.indexOf(this);
        
        if (i > -1) {
            children.splice(i, 1);
        }
        
        this.m_group  = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.display.DisplayObject.prototype.removeParent = function() {
    if (this.m_parent != null) {
        
        var children = this.m_parent.getChildren();
        var i = children.indexOf(this);
        
        if (i > -1) {
            children.splice(i, 1);
            this.m_parent.breakCache();
        }
        
        this.m_parent  = null;
    }
};

/**
 * TODO: ...
 *
 * @param {rune.display.DisplayGroup} group ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.display.DisplayObject.prototype.setGroup = function(group) {
    if (group instanceof rune.display.DisplayGroup) {
        if (this.m_group != null) {
            this.removeGroup();
        }
        
        var children = group.getChildren();
        var i = children.indexOf(this);
        
        if (i == -1) {
            children.push(this);
        }
        
        this.m_group = group;
    } else throw new TypeError();
};

/**
 * TODO: ...
 *
 * @param {rune.display.DisplayObjectContainer} parent ...
 * @param {number} index ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.display.DisplayObject.prototype.setParent = function(parent, index) {
    if (parent instanceof rune.display.DisplayObjectContainer) {
        if (this.m_parent != null) {
            this.removeParent();
        }
        
        var children = parent.getChildren();
        var i = children.indexOf(this);
        
        if (i == -1) {
            children.splice(index, 0, this);
            parent.breakCache();
        }
        
        this.m_parent = parent;
    } else throw new TypeError();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.display.DisplayObject.prototype.cacheTest = function() {
    if (this['cached'] == false) {
        this.render();
        this.restoreCache();
    }
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * The class constructor.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_construct = function() {
    this.m_constructCanvas();
    this.m_constructGraphics();
    this.m_constructHitbox();
    this.m_constructFlicker();
};

/**
 * Creates a new canvas. 
 *
 * @param {number} [w] The width of the canvas.
 * @param {number} [h] The height of the canvas.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_constructCanvas = function(w, h) {
    this.m_disposeCanvas();
    if (this.m_canvas == null) {
        this.m_canvas = new rune.display.Canvas(
            w || this.m_width, 
            h || this.m_height
        );
    }
};

/**
 * Creates the Graphics API.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_constructGraphics = function() {
    this.m_disposeGraphics();
    if (this.m_graphics == null) {
        this.m_graphics = new rune.display.Graphics(this);
    }
};

/**
 * Creates the Graphics API.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_constructHitbox = function() {
    this.m_disposeHitbox();
    if (this.m_hitbox == null) {
        this.m_hitbox = new rune.display.Hitbox(this);
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_constructFlicker = function() {
    this.m_disposeFlicker();
    if (this.m_flicker == null) {
        this.m_flicker = new rune.display.Flicker(this);
    }
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
rune.display.DisplayObject.prototype.m_updateFlicker = function(step) {
    if (this.m_flicker != null) {
        this.m_flicker.update(step);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @ignore
 */
rune.display.DisplayObject.prototype.m_renderFillColor = function() {
    if (this.m_canvas != null) {
        if (this.m_fillColor != "") this.m_canvas.drawFill(this.m_fillColor);
        else this.m_canvas.clear();
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @ignore
 */
rune.display.DisplayObject.prototype.m_renderGraphics = function() {
    if (this.m_graphics != null) {
        this.m_graphics.render();
    }
};

/**
 * Removes the parent reference.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_disposeParent = function() {
    if (this.m_parent != null) {
        this.m_parent.removeChild(this, false);
        this.m_parent = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_disposeFlicker = function() {
    if (this.m_flicker != null) {
        this.m_flicker.dispose();
        this.m_flicker = null;
    }
};

/**
 * Removes the hitbox.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_disposeHitbox = function() {
    if (this.m_hitbox != null) {
        this.m_hitbox.dispose();
        this.m_hitbox = null;
    }
};

/**
 * Removes the Graphics API.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_disposeGraphics = function() {
    if (this.m_graphics != null) {
        this.m_graphics.dispose();
        this.m_graphics = null;
    }
};

/**
 * Removes the canvas.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayObject.prototype.m_disposeCanvas = function() {
    if (this.m_canvas != null) {
        this.m_canvas.dispose();
        this.m_canvas = null;
    }
};