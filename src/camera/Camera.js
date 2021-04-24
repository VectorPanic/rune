//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new camera object.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @param {number} x Current x position for the camera object.
 * @param {number} y Current y position for the camera object.
 * @param {number} width The width of the camera. 
 * @param {number} height The height of the camera.
 * 
 * @class
 * @classdesc
 * 
 * Represents a camera in a two-dimensional space.
 */
rune.camera.Camera = function(x, y, width, height) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.geom.Rectangle}
     * @default null
     */
    this.bounderies = null;
    
    /**
     * ...
     *
     * @type {boolean}
     * @default false
     */
    this.debug = false;
    
    //--------------------------------------------------------------------------
    // Internal properties
    //--------------------------------------------------------------------------

    /**
     * Camera input.
     *
     * @type {rune.display.Stage}
     * @package
     * @ignore
     */
    this.input = null;
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {rune.camera.CameraFade}
     * @protected
     * @ignore
     */
    this.m_fade = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.camera.CameraFlash}
     * @protected
     * @ignore
     */
    this.m_flash = null;
    
    /**
     * ...
     *
     * @type {rune.geom.Point}
     * @protected
     * @ignore
     */
    this.m_lag = new rune.geom.Point(0.125, 0.125);
    
    /**
     * TODO: ...
     *
     * @type {rune.camera.CameraShake}
     * @protected
     * @ignore
     */
    this.m_shake = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.camera.CameraTargets}
     * @protected
     * @ignore
     */
    this.m_targets = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.camera.CameraTint}
     * @protected
     * @ignore
     */
    this.m_tint = null;
    
    /**
     * TODO: ...
     *
     * @type {rune.camera.CameraViewport}
     * @protected
     * @ignore
     */
    this.m_viewport = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend DisplayObjectContainer.
     */
    rune.display.DisplayObjectContainer.call(this, x, y, width, height, "");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.camera.Camera.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.camera.Camera.prototype.constructor = rune.camera.Camera;

//------------------------------------------------------------------------------
// Override public getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {boolean} cached
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "cached", {
    /**
     * @this rune.camera.Camera
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return false; //NOTE: HUR KAN EN KAMERA ANVÄNDA CACHE? (IF STAGE.CACHE == TRUE???)
    }
});

/**
 * ...
 *
 * @member {number} pivotX
 * @memberof rune.camera.Camera
 * @instance
 */
Object.defineProperty(rune.camera.Camera.prototype, "pivotX", {
    /**
     * @this rune.camera.Camera
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.width * this.m_pivot.x;
    },
    
    /**
     * @this rune.camera.Camera
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        value = (value / this.width);
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
 * @memberof rune.camera.Camera
 * @instance
 */
Object.defineProperty(rune.camera.Camera.prototype, "pivotY", {
    /**
     * @this rune.camera.Camera
     * @ignore
     * @suppress {accessControls}
     */
    get : function() {
        return this.height * this.m_pivot.y;
    },
    
    /**
     * @this rune.camera.Camera
     * @ignore
     * @suppress {accessControls}
     */
    set : function(value) {
        value = (value / this.height);
        value = rune.util.Math.clamp(value, 0, 1.0);
        
        if (this.m_pivot.y != value) {
            this.m_pivot.y = value;
            
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
 * TODO: ...
 *
 * @member {rune.camera.CameraFade} fade
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "fade", {
    /**
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_fade;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.camera.CameraFlash} fade
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "flash", {
    /**
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_flash;
    }
});

/**
 * ...
 *
 * @member {rune.geom.Point} lag
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "lag", {
    /**
     * ...
     * 
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_lag;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.camera.CameraShake} shake
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "shake", {
    /**
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_shake;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.camera.CameraTint} targets
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "targets", {
    /**
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_targets;
    }
});


/**
 * TODO: ...
 *
 * @member {rune.camera.CameraTint} tint
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "tint", {
    /**
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_tint;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.camera.CameraViewport} viewport
 * @memberof rune.camera.Camera
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Camera.prototype, "viewport", {
    /**
     * @this rune.camera.Camera
     * @ignore
     */
    get : function() {
        return this.m_viewport;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} duration ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @return {undefined}
 */
rune.camera.Camera.prototype.fadeIn = function(duration, callback, scope) {
    //TODO: FIXA DETTA
};

/**
 * TODO: ...
 *
 * @param {number} duration ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @return {undefined}
 */
rune.camera.Camera.prototype.fadeOut = function(duration, callback, scope) {
    //TODO: FIXA DETTA
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.camera.Camera.prototype.update = function(step) {
    rune.display.DisplayObjectContainer.prototype.update.call(this, step);
    this.m_updateShake(step);
    this.m_updateFlash(step);
    this.m_updateFade(step);
    this.m_updateTargets(step);
    this.m_updateBoundaries(step);
};

/**
 * @inheritDoc
 */
rune.camera.Camera.prototype.render = function() {
    this.m_renderFillColor();
    this.m_renderTilemap();
    this.m_renderInput();
    this.m_renderChildren();
    this.m_renderGraphics();
    this.m_renderTint();
    this.m_renderFlash();
    this.m_renderFade();
};

/**
 * @inheritDoc
 */
rune.camera.Camera.prototype.dispose = function() {
    this.m_disposeTargets();
    this.m_disposeFade();
    this.m_disposeFlash();
    this.m_disposeTint();
    this.m_disposeShake();
    this.m_disposeViewport();
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

/**
 * @inheritDoc
 */
rune.camera.Camera.prototype.getRenderFrame = function() {
    return new rune.display.Frame(
        this.x,
        this.y,
        this.width,
        this.height,
        0,
        0,
        this.m_viewport['width'],
        this.m_viewport['height']
    );
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.camera.Camera.prototype.m_construct = function() {
    rune.display.DisplayObjectContainer.prototype.m_construct.call(this);
    this.m_constructViewport();
    this.m_constructTilemap();
    this.m_constructShake();
    this.m_constructTint();
    this.m_constructFlash();
    this.m_constructFade();
    this.m_constructTargets();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_constructViewport = function() {
    this.m_disposeViewport();
    if (this.m_viewport == null) {
        this.m_viewport = new rune.camera.CameraViewport(this);
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_constructTilemap = function() {
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    
    /*
    this.m_tilemap = this.input.tilemap.getViewport(
        this['width'],
        this['height']
    );
    */
    
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_constructShake = function() {
    this.m_disposeShake();
    if (this.m_shake == null) {
        this.m_shake = new rune.camera.CameraShake();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_constructTint = function() {
    this.m_disposeTint();
    if (this.m_tint == null) {
        this.m_tint = new rune.camera.CameraTint();
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_constructFlash = function() {
    this.m_disposeFlash();
    if (this.m_flash == null) {
        this.m_flash = new rune.camera.CameraFlash();
        this.m_flash['color'].setRGB(255, 255, 255);
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_constructFade = function() {
    this.m_disposeFade();
    if (this.m_fade == null) {
        this.m_fade = new rune.camera.CameraFade();
    } else throw new Error();
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
rune.camera.Camera.prototype.m_constructTargets = function() {
    this.m_disposeTargets();
    if (this.m_targets == null) {
        this.m_targets = new rune.camera.CameraTargets();
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_updateShake = function(step) {
    if (this.m_shake != null) {
        this.m_shake.update(step);
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_updateFlash = function(step) {
    if (this.m_flash != null) {
        this.m_flash.update(step);
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_updateFade = function(step) {
    if (this.m_fade != null) {
        this.m_fade.update(step);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_updateTargets = function(step) {
    if (this.m_targets['length'] > 0) {
        var tx = (this['targets'].position.x - (this.m_viewport.width  >> 1));
        var ty = (this['targets'].position.y - (this.m_viewport.height >> 1));
        
        this.m_viewport.x += (tx - this.m_viewport.x) * this.m_lag.x;
        this.m_viewport.y += (ty - this.m_viewport.y) * this.m_lag.y;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 * @suppress {missingProperties}
 */
rune.camera.Camera.prototype.m_updateBoundaries = function(step) {
    if (this.bounderies != null) {
        if (this.m_viewport.left < this.bounderies.left) {
            this.m_viewport.left = this.bounderies.left;
        }

        if (this.m_viewport.right > this.bounderies.right) {
            this.m_viewport.right = this.bounderies.right;
        }

        if (this.m_viewport.top < this.bounderies.top) {
            this.m_viewport.top = this.bounderies.top;
        }

        if (this.m_viewport.bottom > this.bounderies.bottom) {
            this.m_viewport.bottom = this.bounderies.bottom;
        }
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 * @suppress {checkTypes}
 */
rune.camera.Camera.prototype.m_renderTilemap = function() {
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    
    if (this.input) {
        
        var tw = this.input.tilemap.tileWidth;
        var th = this.input.tilemap.tileHeight;
        
        var r = this.input.tilemap.getTileIndexesInRectangle(
            this.viewport.x,
            this.viewport.y,
            this.viewport.width,
            this.viewport.height
        );
        
        var t = this.input.tilemap.texture;
        
        var ox = this.viewport.x % tw;
        var oy = this.viewport.y % th;
        
        if (ox < 0) {
            ox = tw + ox;
        }
        
        if (oy < 0) {
            oy = th + oy;
        }
        
        if (t) {
            for (var y = 0; y < r.length; y++) {
                for (var x = 0; x < r[y].length; x++) {
                    if (r[y][x] > 0) {
                        this['canvas'].drawImage(
                            t,
                            (x * tw) - ox, 
                            (y * th) - oy, 
                            tw, 
                            th,
                            (r[y][x] * tw) % t.width,
                            Math.floor(r[y][x] * tw / t.width) * tw,
                            tw,
                            th
                        );
                    }
                }
            }
        }
    }
    
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
    // WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_renderInput = function() {
    if (this.input != null) {
        var children = this.input.getChildren();
        for (var i = 0, l = children.length; i < l; i++) {
            this["canvas"].renderObj(
                children[i], 
                this.m_viewport.x + this.m_shake['x'], 
                this.m_viewport.y + this.m_shake['y']
            );
            
            this.m_renderInputDebug(children[i]);
        }
    }
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
rune.camera.Camera.prototype.m_renderInputDebug = function(obj) {
    if (this.debug == true) {
        this["canvas"].drawRect(
            obj.x - this.m_viewport.x,
            obj.y - this.m_viewport.y,
            obj.width,
            obj.height,
            "#FFFFFF"
        );
        
        this["canvas"].drawRect(
            obj['hitbox']['x'] - this.m_viewport['x'],
            obj['hitbox']['y'] - this.m_viewport['y'],
            obj['hitbox']['width'],
            obj['hitbox']['height'],
            "#FF0000"
        );
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_renderTint = function() {
    if (this.m_tint != null && this.m_tint["opacity"] > 0.0) {
        this["canvas"].drawFill(this.m_tint.toString());
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_renderFlash = function() {
    if (this.m_flash != null && this.m_flash["opacity"] > 0.0) {
        this["canvas"].drawFill(this.m_flash.toString());
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_renderFade = function() {
    if (this.m_fade != null && this.m_fade["opacity"] > 0.0) {
        this["canvas"].drawFill(this.m_fade.toString());
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
rune.camera.Camera.prototype.m_disposeTargets = function() {
    if (this.m_targets != null) {
        this.m_targets.dispose();
        this.m_targets = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_disposeFade = function() {
    if (this.m_fade instanceof rune.camera.CameraFade) {
        this.m_fade.dispose();
        this.m_fade = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_disposeFlash = function() {
    if (this.m_flash instanceof rune.camera.CameraFlash) {
        this.m_flash.dispose();
        this.m_flash = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_disposeTint = function() {
    if (this.m_tint instanceof rune.camera.CameraTint) {
        this.m_tint.dispose();
        this.m_tint = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_disposeShake = function() {
    if (this.m_shake instanceof rune.camera.CameraShake) {
        this.m_shake.dispose();
        this.m_shake = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.camera.Camera.prototype.m_disposeViewport = function() {
    if (this.m_viewport instanceof rune.camera.CameraViewport) {
        this.m_viewport.dispose();
        this.m_viewport = null;
    }
};