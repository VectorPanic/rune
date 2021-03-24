//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new stage.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @class
 * @classdesc
 * 
 * The Stage class represents the main drawing area.
 */
rune.display.Stage = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.tilemap.Tilemap}
     * @private
     */
    this.m_tilemap = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend DisplayObjectContainer.
     */
    rune.display.DisplayObjectContainer.call(this, 0, 0, Infinity, Infinity, "");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.Stage.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.display.Stage.prototype.constructor = rune.display.Stage;

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.tilemap.Tilemap} tilemap
 * @memberof rune.display.Stage
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Stage.prototype, "tilemap", {
    /**
     * @this rune.display.Stage
     * @ignore
     */
    get : function() {
        return this.m_tilemap;
    }
});

//------------------------------------------------------------------------------
// Override public getter and setter methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.Stage.prototype, "fillColor", {
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_fillColor;
    },
    
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.Stage.prototype, "visible", {
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_visible;
    },
    
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.Stage.prototype, "x", {
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_x;
    },
    
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * @inheritDoc
 */
Object.defineProperty(rune.display.Stage.prototype, "y", {
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_y;
    },
    
    /**
     * @this rune.display.Stage
     * @suppress {accessControls}
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.display.Stage.prototype.render = function() {
    //DO NOTING; CAMERA WILL RENDER CHILDREN OF STAGE
};

/**
 * @inheritDoc
 */
rune.display.Stage.prototype.dispose = function() {
    this.m_disposeTilemap();
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} [w] ...
 * @param {number} [h] ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Stage.prototype.m_construct = function(w, h) {
    rune.display.DisplayObjectContainer.prototype.m_construct.call(this);
    this.m_constructTilemap();
};

/**
 * TODO: ...
 *
 * @param {number} [w] ...
 * @param {number} [h] ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Stage.prototype.m_constructCanvas = function(w, h) {
    //DO NOTHING; STAGE SHOULD NOT HAVE ANY CANVAS OBJECT
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Stage.prototype.m_constructTilemap = function() {
    this.m_disposeTilemap();
    if (this.m_tilemap == null) {
      this.m_tilemap = new rune.tilemap.Tilemap();
    }
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.display.Stage.prototype.m_disposeTilemap = function() {
    if (this.m_tilemap instanceof rune.tilemap.Tilemap) {
        this.m_tilemap.dispose();
        this.m_tilemap = null;
    }
};