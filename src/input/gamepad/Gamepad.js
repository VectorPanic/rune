//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new instance of the class.
 * 
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Represents a single gamepad and its current state.
 */
rune.input.Gamepad = function() {
    
    //TODO: Skriv kommentarer

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {number}
     * @default 0.2
     */
    this.threshold = 0.2;

    /**
     * ...
     *
     * @type {number}
     * @default 0.5
     */
    this.tolerance = 0.5;

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {boolean}
     * @private
     */
    this.m_active = true;

    /**
     * Input from the left analog stick.
     *
     * @type {rune.geom.Point}
     * @private
     */
    this.m_axesOne = new rune.geom.Point(0, 0);

    /**
     * Input from the right analog stick.
     *
     * @type {rune.geom.Point}
     * @private
     */
    this.m_axesTwo = new rune.geom.Point(0, 0);

    /**
     * Current state object.
     *
     * @type {Object}
     * @private
     */
    this.m_sc = null;

    /**
     * Previous state object.
     *
     * @type {Object}
     * @private
     */
    this.m_so = null
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {boolean} active
 * @memberof rune.input.Gamepad
 * @instance
 */
Object.defineProperty(rune.input.Gamepad.prototype, "active", {
    /**
     * Returns internal value.
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return this.m_active;
    },
    /**
     * Sets new value and resets current game controller.
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    set : function(value) {
        this.m_active = value;
        this.reset();
    }
});

/**
 * A string containing some information about the controller. 
 *
 * @member {number} id
 * @memberof rune.input.Gamepad
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "id", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return (this.m_sc) ? this.m_sc.id : "";
    }
});

/**
 * An integer that is auto-incremented to be unique for each device 
 * currently connected to the system.
 *
 * @member {number} index
 * @memberof rune.input.Gamepad
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "index", {
    /**
     * Retrieves the current state value, otherwise -1 is returned.
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return (this.m_sc) ? this.m_sc.index : -1;
    }
});

/**
 * A boolean indicating whether the game controller is still connected 
 * to the system.
 *
 * @member {booelan} connected
 * @memberof rune.input.Gamepad
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "connected", {
    /**
     * Retrieves the current state value, otherwise false is returned.
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return (this.m_sc) ? Boolean(this.m_sc.connected) : false;
    }
});

/**
 * An array of gamepadButton objects representing the buttons present 
 * on the device.
 *
 * @member {Array} buttons
 * @memberof rune.input.Gamepad
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "buttons", {
    /**
     * Retrieves the current state value, otherwise an empty array 
     * is returned.
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return (this.m_sc) ? this.m_sc.buttons : [];
    }
});

/**
 * Retrives the value of the left analog stick, the value is represented 
 * as an Point object.
 *
 * @member {booelan} stickLeft
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeft", {
    /**
     * Return value of this.m_axesOne.
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return this.m_axesOne;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftUp", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesOne.y < -this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftJustUp", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesOne.y < -this.tolerance) && (this.m_so.axes[1] > -this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesOne.y > this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftJustDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @instance 
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesOne.y > this.tolerance) && (this.m_so.axes[1] < this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesOne.x < -this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftJustLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesOne.x < -this.tolerance) && (this.m_so.axes[0] > -this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesOne.x > this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickLeftJustRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesOne.x > this.tolerance) && (this.m_so.axes[0] < this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return this.m_axesTwo;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightUp", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesTwo.y < -this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightJustUp", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesTwo.y < -this.tolerance) && (this.m_so.axes[3] > -this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesTwo.y > this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightJustDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesTwo.y > this.tolerance) && (this.m_so.axes[3] < this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesTwo.x < -this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance 
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightJustLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesTwo.x < -this.tolerance) && (this.m_so.axes[2] > -this.tolerance)) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightRight
 * @memberof rune.input.Gamepad
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     */
    get : function() {
        return (this.m_axesTwo.x > this.tolerance) ? true : false;
    }
});

/**
 * ...
 *
 * @member {booelan} stickRightJustRight
 * @memberof rune.input.Gamepad
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepad.prototype, "stickRightJustRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepad
     * @ignore
     * @suppress {missingProperties}
     */
    get : function() {
        return ((this.m_axesTwo.x > this.tolerance) && (this.m_so.axes[2] < this.tolerance)) ? true : false;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} button Button ID.
 *
 * @return {boolean}
 * @suppress {missingProperties}
 */
rune.input.Gamepad.prototype.justPressed = function(button) {
    if (this.m_isButtonInvalid(button)) return false;
    return (this.m_sc.buttons[button].pressed === true && 
            this.m_so.buttons[button].pressed === false) ? true : false;
};

/**
 * ...
 *
 * @param {number} button Button ID.
 *
 * @return {boolean}
 * @suppress {missingProperties}
 */
rune.input.Gamepad.prototype.justReleased = function(button) {
    if (this.m_isButtonInvalid(button)) return false;
    return (this.m_sc.buttons[button].pressed === false && 
            this.m_so.buttons[button].pressed === true) ? true : false;
};

/**
 * ...
 *
 * @param {number} button Button ID.
 *
 * @return {boolean}
 * @suppress {missingProperties}
 */
rune.input.Gamepad.prototype.pressed = function(button) {
    if (this.m_isButtonInvalid(button)) return false;
    return this.m_sc.buttons[button].pressed === true ? true : false;
};

/**
 * ...
 * 
 * @returns {undefined}
 */
rune.input.Gamepad.prototype.reset = function() {
    this.m_disposeState();
};

/**
 * ...
 *
 * @param {Object} state New gamepad state.
 *
 * @returns {undefined}
 */
rune.input.Gamepad.prototype.update = function(state) {
    this.m_updateState(state);
    this.m_updateAxes();
};

/**
 * ...
 * 
 * @returns {undefined}
 */
rune.input.Gamepad.prototype.dispose = function() {
    this.m_disposeAxes();
    this.m_disposeState();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Updates the current state of the gamepad.
 *
 * @param {Object} state New gamepad state.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepad.prototype.m_updateState = function(state) {
    this.m_so = this.m_sc;
    this.m_sc = this.m_clone(state);
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 * @suppress {missingProperties}
 */
rune.input.Gamepad.prototype.m_updateAxes = function() {
    if (this.m_sc != null && this.m_sc.axes != null) {
        this.m_axesOne.x = this.m_sc.axes[0] || 0;
        this.m_axesOne.y = this.m_sc.axes[1] || 0;
        this.m_axesTwo.x = this.m_sc.axes[2] || 0;
        this.m_axesTwo.y = this.m_sc.axes[3] || 0;

        this.m_axesOne.x = (Math.abs(this.m_axesOne.x) < this.threshold) ? 0 : this.m_axesOne.x;
        this.m_axesOne.y = (Math.abs(this.m_axesOne.y) < this.threshold) ? 0 : this.m_axesOne.y;
        this.m_axesTwo.x = (Math.abs(this.m_axesTwo.x) < this.threshold) ? 0 : this.m_axesTwo.x;
        this.m_axesTwo.y = (Math.abs(this.m_axesTwo.y) < this.threshold) ? 0 : this.m_axesTwo.y;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepad.prototype.m_disposeAxes = function() {
    this.m_axesOne = null;
    this.m_axesTwo = null;
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepad.prototype.m_disposeState = function() {
    this.m_so = null;
    this.m_cs = null;
};

/**
 * ...
 *
 * @param {number} button ID of button to test.
 *
 * @returns {boolean}
 * @protected
 * @ignore
 */
rune.input.Gamepad.prototype.m_isButtonInvalid = function(button) {
    if (this.m_sc == null || this.m_sc.buttons == null || this.m_sc.buttons[button] == null) return true;
    if (this.m_so == null || this.m_so.buttons == null || this.m_so.buttons[button] == null) return true;

    return false;
}

/**
 * Creates a shallow clone of an object.
 *
 * @param {Object} obj Object to clone.
 *
 * @returns {Object}
 * @protected
 * @ignore
 */
rune.input.Gamepad.prototype.m_clone = function(obj) {
    var clone = {};
    for (var i in obj) {
        if (obj[i] && typeof obj[i] === "object") clone[i] = this.m_clone(obj[i]);
        else clone[i] = obj[i];
    }

    return clone;
}