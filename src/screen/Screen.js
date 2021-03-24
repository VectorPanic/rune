//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.screen.Screen = function(options) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {Object}
     */
    this.m_config = options;
    
    /**
     * ...
     *
     * @type {rune.ui.ConsoleManager}
     */
    this.m_console = null;
    
    /**
     * ...
     *
     * @type {rune.ui.Debugger}
     */
    this.m_debugger = null;
    
    /**
     * ...
     *
     * @type {rune.ui.MouseCursor}
     */
    this.m_mouseCursor = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend DisplayObjectContainer.
     */
    rune.display.DisplayObjectContainer.call(this, 0, 0, options.screenResolutionX, options.screenResolutionY, "#000000");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.screen.Screen.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.screen.Screen.prototype.constructor = rune.screen.Screen;

//------------------------------------------------------------------------------
// Override public getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {boolean} cached
 * @memberof rune.screen.Screen
 * @instance
 * @readonly
 */
Object.defineProperty(rune.screen.Screen.prototype, "cached", {
    /**
     * @this rune.screen.Screen
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return false; //Note: ...
    }
});

/**
 * TODO: ...
 *
 * @member {number} height
 * @memberof rune.screen.Screen
 * @instance
 */
Object.defineProperty(rune.screen.Screen.prototype, "height", {
    /**
     * @this rune.screen.Screen
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_canvas['element'].height;
    },
    
    /**
     * @this rune.screen.Screen
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * TODO: ...
 *
 * @member {number} width
 * @memberof rune.screen.Screen
 * @instance
 */
Object.defineProperty(rune.screen.Screen.prototype, "width", {
    /**
     * @this rune.screen.Screen
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_canvas['element'].width;
    },
    
    /**
     * @this rune.screen.Screen
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * TODO: ...
 *
 * @member {number} x
 * @memberof rune.screen.Screen
 * @instance
 */
Object.defineProperty(rune.screen.Screen.prototype, "x", {
    /**
     * @this rune.screen.Screen
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_x;
    },
    
    /**
     * @this rune.screen.Screen
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * TODO: ...
 *
 * @member {number} y
 * @memberof rune.screen.Screen
 * @instance
 */
Object.defineProperty(rune.screen.Screen.prototype, "y", {
    /**
     * @this rune.screen.Screen
     * @suppress {accessControls}
     * @ignore
     */
    get : function() {
        return this.m_y;
    },
    
    /**
     * @this rune.screen.Screen
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.ui.ConsoleManager} console
 * @memberof rune.screen.Screen
 * @instance
 * @readonly
 */
Object.defineProperty(rune.screen.Screen.prototype, "console", {
    /**
     * @this rune.screen.Screen
     * @ignore
     */
    get : function() {
        return this.m_console;
    }
});

/**
 * ...
 *
 * @member {rune.ui.MouseCursor} mouseCursor
 * @memberof rune.screen.Screen
 * @instance
 * @readonly
 */
Object.defineProperty(rune.screen.Screen.prototype, "mouseCursor", {
    /**
     * @this rune.screen.Screen
     * @ignore
     */
    get : function() {
        return this.m_mouseCursor;
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.screen.Screen.prototype.update = function(step) {
    rune.display.DisplayObjectContainer.prototype.update.call(this, step);
    this.m_updateMouseCursor(step);
    this.m_updateConsole(step);
    this.m_updateDebugger(step);
};

/**
 * @inheritDoc
 */
rune.screen.Screen.prototype.render = function() {
    if (this["visible"] == true) {
        this.m_renderFillColor();
        this.m_renderCameras();
        this.m_renderChildren();
        this.m_renderGraphics();
        this.m_renderMouseCursor();
        this.m_renderDebugger();
        this.m_renderConsole();
    }
};

/**
 * @inheritDoc
 */
rune.screen.Screen.prototype.dispose = function() {
    this.m_disposeConsole();
    this.m_disposeDebugger();
    this.m_disposeMouseCursor();
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.screen.Screen.prototype.m_construct = function() {
    rune.display.DisplayObjectContainer.prototype.m_construct.call(this);
    this.m_constructMouseCursor();
    this.m_constructDebugger();
    this.m_constructConsole();
    this.m_constructScreenMode();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_constructMouseCursor = function() {
    this.m_disposeMouseCursor();
    if (this.m_mouseCursor == null && this.m_config.useMouse == true) {
        this.m_mouseCursor = new rune.ui.MouseCursor();
    }
    
    this.m_canvas['element'].style.cursor = "none";
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 * @suppress {missingProperties}
 */
rune.screen.Screen.prototype.m_constructDebugger = function() {
    this.m_disposeDebugger();
    if (this.m_debugger == null && this.m_config.debug == true) {
        this.m_debugger = new rune.ui.Debugger(0, 0, this.width, this.height);
        
        if (this.m_debugger.width  >= 1280 && 
            this.m_debugger.height >= 720) {
            this.m_debugger.width  = this.m_debugger.width  >> 1;
            this.m_debugger.height = this.m_debugger.height >> 1;
            this.m_debugger.scaleX = 2.0;
            this.m_debugger.scaleY = 2.0;
        }
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_constructConsole = function() {
    this.m_disposeConsole();
    if (this.m_console == null) {
        this.m_console = new rune.ui.ConsoleManager(
            0, 
            0, 
            this.width, 
            this.height
        );
    }
    
    if (this.m_config.debug == false) {
        this.m_console.interactive = false;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_constructScreenMode = function() {
    //TODO: MORE AND BETTER SCREEN MODES
    this.m_canvas['element'].style.width  = "100%";
    this.m_canvas['element'].style.height = "100%";
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
rune.screen.Screen.prototype.m_updateMouseCursor = function(step) {
    if (this.m_mouseCursor != null) {
        this.m_mouseCursor.update(step);
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
rune.screen.Screen.prototype.m_updateConsole = function(step) {
    if (this.m_console != null && this.m_config.debug == true) {
        this.m_console.update(step);
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @private
 */
rune.screen.Screen.prototype.m_updateDebugger = function(step) {
    if (this.m_debugger != null) {
        this.m_debugger.update(step);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_renderCameras = function() {
    var cameras = rune.system.Main['instance']['scenes']['selected']['cameras'].getCameras(); //NOTE: BETTER REF?
    for (var i = 0; i < cameras.length; i++) {
        this['canvas'].renderObj(cameras[i]);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_renderMouseCursor = function() {
    if (this.m_mouseCursor != null) {
        this.m_canvas.renderObj(this.m_mouseCursor);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 * @suppress {missingProperties}
 */
rune.screen.Screen.prototype.m_renderDebugger = function() {
    if (this.m_debugger != null && this.m_debugger.visible == true) {
        this.m_canvas.renderObj(this.m_debugger);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_renderConsole = function() {
    if (this.m_console != null && this.m_console['visible'] == true && this.m_config.debug == true) {
        this.m_canvas.renderObj(this.m_console);
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_disposeConsole = function() {
    if (this.m_console instanceof rune.ui.ConsoleManager) {
        this.m_console.dispose();
        this.m_console = null;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
rune.screen.Screen.prototype.m_disposeDebugger = function() {
    if (this.m_debugger != null) {
        this.m_debugger.dispose();
        this.m_debugger = null;
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.screen.Screen.prototype.m_disposeMouseCursor = function() {
    if (this.m_mouseCursor instanceof rune.ui.MouseCursor) {
        this.m_mouseCursor.dispose();
        this.m_mouseCursor = null;
    }
};