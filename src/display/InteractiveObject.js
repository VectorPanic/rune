//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * @extends rune.display.DisplayObject
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
rune.display.InteractiveObject = function(x, y, width, height, fillColor) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {boolean}
     * @default false
     */
    this.clickable = false;

    /**
     * ...
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onMouseDown = null;

    /**
     * ...
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onMouseOut = null;

    /**
     * ...
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onMouseOver = null;

    /**
     * ...
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onMouseUp = null;
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {string}
     * @ignore
     */
    this.m_mouseState = rune.display.InteractiveObject.MOUSE_UP;
    
    /**
     * ...
     *
     * @type {rune.state.States}
     * @protected
     * @ignore
     */
    this.m_states = null;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend DisplayObjectContainer.
     */
    rune.display.DisplayObject.call(this, x, y, width, height, fillColor);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.display.InteractiveObject.prototype = Object.create(rune.display.DisplayObject.prototype);
rune.display.InteractiveObject.prototype.constructor = rune.display.InteractiveObject;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @const {string}
 * @ignore
 */
rune.display.InteractiveObject.MOUSE_UP = "mouse_up";

/**
 * ...
 * 
 * @const {string}
 * @ignore
 */
rune.display.InteractiveObject.MOUSE_OVER = "mouse_over";

/**
 * ...
 * 
 * @const {string}
 * @ignore
 */
rune.display.InteractiveObject.MOUSE_DOWN = "mouse_down";

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.input.Gamepads} gamepads
 * @memberof rune.display.InteractiveObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.InteractiveObject.prototype, "gamepads", {
    /**
     * ...
     * 
     * @this rune.display.InteractiveObject
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance']['inputs']['gamepads'];
    }
});

/**
 * ...
 *
 * @member {boolean} hovering
 * @memberof rune.display.InteractiveObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.InteractiveObject.prototype, "hovering", {
    /**
     * @this rune.display.InteractiveObject
     * @ignore
     */
    get : function() {
        var cameras = this['cameras'];
        var camera  = null;

        var i = cameras['numCameras'];
        var p = new rune.geom.Point();

        while (i--) {
           camera = cameras.getCamera(i);
           p.x = this['mouse'].x - camera['viewport']['x'];
           p.y = this['mouse'].y - camera['viewport']['y'];
           
           return this.getGlobalRect().containsPoint(p);
        }

        return false;
    }
});

/**
 * ...
 *
 * @member {rune.input.Keyboard} keyboard
 * @memberof rune.display.InteractiveObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.InteractiveObject.prototype, "keyboard", {
    /**
     * @this rune.display.InteractiveObject
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance']['inputs']['keyboard'];
    }
});

/**
 * ...
 *
 * @member {rune.input.Mouse} mouse
 * @memberof rune.display.InteractiveObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.InteractiveObject.prototype, "mouse", {
    /**
     * @this rune.display.InteractiveObject
     * @ignore
     */
    get : function() {
        return rune.system.Main['instance']['inputs']['mouse'];
    }
});

/**
 * ...
 *
 * @member {rune.state.States} states
 * @memberof rune.display.InteractiveObject
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.InteractiveObject.prototype, "states", {
    /**
     * @this rune.display.InteractiveObject
     * @ignore
     */
    get : function() {
        return this.m_states;
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.display.InteractiveObject.prototype.update = function(step) {
    rune.display.DisplayObject.prototype.update.call(this, step);
    this.m_updateStates(step);
    this.m_updateMouseInteractionState(step);
};

/**
 * @inheritDoc
 */
rune.display.InteractiveObject.prototype.render = function() {
    rune.display.DisplayObject.prototype.render.call(this);
    this.m_renderStates();
};

/**
 * @inheritDoc
 */
rune.display.InteractiveObject.prototype.dispose = function() {
    this.m_disposeStates();
    rune.display.DisplayObject.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.display.InteractiveObject.prototype.m_construct = function() {
    rune.display.DisplayObject.prototype.m_construct.call(this);
    this.m_constructStates();
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
rune.display.InteractiveObject.prototype.m_constructStates = function() {
    this.m_disposeStates();
    if (this.m_states == null) {
        this.m_states = new rune.state.States(this);
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
rune.display.InteractiveObject.prototype.m_updateStates = function(step) {
    if (this.m_states != null) {
        this.m_states.update(step);
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @ignore
 * @suppress {missingProperties}
 */
rune.display.InteractiveObject.prototype.m_updateMouseInteractionState = function(step) {
    if (this.mouse != null && this.clickable === true) {
        if (this.hovering === true) {
            if (this.mouse.justPressed()) {
                this.m_mouseState = rune.display.InteractiveObject.MOUSE_DOWN;
                this.m_execOnMouseDown();
            }

            if (this.m_mouseState === rune.display.InteractiveObject.MOUSE_DOWN && this.mouse.justReleased()) {
                this.m_execOnMouseUp();
            }

            if (this.m_mouseState === rune.display.InteractiveObject.MOUSE_UP) {
                this.m_mouseState = rune.display.InteractiveObject.MOUSE_OVER;
                this.m_execOnMouseOver();
            }

        } else {
            if (this.m_mouseState !== rune.display.InteractiveObject.MOUSE_UP) {
                this.m_execOnMouseOut();
            }

            this.m_mouseState = rune.display.InteractiveObject.MOUSE_UP;
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
rune.display.InteractiveObject.prototype.m_renderStates = function() {
    if (this.m_states != null) {
        this.m_states.render();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.InteractiveObject.prototype.m_disposeStates = function() {
    if (this.m_states != null) {
        this.m_states.dispose();
        this.m_states = null;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.display.InteractiveObject.prototype.m_execOnMouseOver = function() {
    if (this.onMouseOver instanceof rune.util.Executable) {
        this.onMouseOver.execute(this);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.display.InteractiveObject.prototype.m_execOnMouseDown = function() {
    if (this.onMouseDown instanceof rune.util.Executable) {
        this.onMouseDown.execute(this);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.display.InteractiveObject.prototype.m_execOnMouseUp = function() {
    if (this.onMouseUp instanceof rune.util.Executable) {
        this.onMouseUp.execute(this);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.display.InteractiveObject.prototype.m_execOnMouseOut = function() {
    if (this.onMouseOut instanceof rune.util.Executable) {
        this.onMouseOut.execute(this);
    }
};