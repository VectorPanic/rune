//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new instance of the class.
 * 
 * @constructor
 *
 * @param {Object} [options] Gamepad settings.
 *
 * @class
 * @classdesc
 *
 * The class represents a handler for connected gamepads.
 */
rune.input.Gamepads = function(options) {
    
    //--------------------------------------------------------------------------
    // Protected properties (ARGUMENTS)
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.input.GamepadsOptions}
     * @protected
     * @ignore
     */
    this.m_options = new rune.input.GamepadsOptions(options);

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_enable = this.m_options.enable;

    /**
     * Executed when a new gamepad is connected.
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onConnect = this.m_options.onConnect || null;

    /**
     * Executed when a connected gamepad is disconnected.
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onDisconnect = this.m_options.onDisconnect || null;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * List containing objects that represent each gamepad.
     *
     * @type {Array}
     * @protected
     * @ignore
     */
    this.m_gamepads;
    
    /**
     * List containing registered input devices.
     *
     * @type {Array}
     * @protected
     * @ignore
     */
    this.m_devices;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * Call for dedicated constructor method.
     */
    this.m_construct();
}

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {boolean} enable
 * @memberof rune.input.Gamepads
 * @instance
 */
Object.defineProperty(rune.input.Gamepads.prototype, "enable", {
    /**
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_enable;
    },

    /**
     * @this rune.input.Gamepads
     * @ignore
     */
    set : function(value) {
        if (this.m_enable != value) {
            this.m_enable  = value;
            
            if (this.m_enable == false) {
                this.reset();
            }
        }
    }
});

/**
 * The number of connected gamepads.
 *
 * @member {number} numGamepads
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "numGamepads", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        var num = 0;
        if (this.m_gamepads != null) {
            for (var i = 0; i < this.m_gamepads.length; i++) {
                if (this.m_gamepads[i].connected == true) {
                    num++;
                }
            }
        }

        return num;
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeft
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeft");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftUp
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftUP", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftUp");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftJustUP
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftJustUP", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftJustUp");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftDown
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftDown");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftJustDown
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftJustDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftJustDown");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftLeft
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftLeft");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftJustLeft
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftJustLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftJustLeft");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftRight
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftRight");
    }
});

/**
 * ...
 *
 * @member {boolean} stickLeftJustRight
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickLeftJustRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickLeftJustRight");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRight
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRight");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightUp
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightUP", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightUp");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightJustUp
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightJustUP", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightJustUp");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightDown
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightDown");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightJustDown
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightJustDown", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightJustDown");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightLeft
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightLeft");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightJustLeft
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightJustLeft", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightJustLeft");
    }
});

/**
 * ...
 *
 * @member {boolean} stickRightRight
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightRight");
    }
});

/**
 * ...
 *
 * @member {number} stickRightJustRight
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 */
Object.defineProperty(rune.input.Gamepads.prototype, "stickRightJustRight", {
    /**
     * ...
     * 
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        return this.m_getPropOfGamepads("stickRightJustRight");
    }
});

//------------------------------------------------------------------------------
// Private getter and setter methods
//------------------------------------------------------------------------------

/**
 * The number of connected input devices.
 *
 * @member {number} m_numDevices
 * @memberof rune.input.Gamepads
 * @instance
 * @readonly
 * @ignore
 */
Object.defineProperty(rune.input.Gamepads.prototype, "m_numDevices", {
    /**
     * @this rune.input.Gamepads
     * @ignore
     */
    get : function() {
        var num = 0;
        for (var i = 0; i < this.m_devices.length; i++) {
            if (this.m_devices[i] !== null) {
                num++;
            }
        }

        return num;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Stops and Clears allocated memory.
 *
 * @returns {undefined}
 */
rune.input.Gamepads.prototype.dispose = function() {
    this.m_disposeGamepads();
    this.m_disposeDevices();
};

/**
 * Retrieves gamepad by ID.
 * 
 * @param {number} id ID of requested gamepad.
 * 
 * @throws {RangeError} If the requested ID is outside the range of possible IDs.
 *
 * @returns {rune.input.Gamepad}
 */
rune.input.Gamepads.prototype.get = function(id) {
    if (id < this.m_gamepads.length) {
        return this.m_gamepads[id];
    } throw new RangeError();
};

/**
 * ...
 *
 * @param {number} button ...
 *
 * @returns {boolean}
 */
rune.input.Gamepads.prototype.justPressed = function(button) {
    var i = this.m_gamepads.length;
    while (i--) {
        if (this.m_gamepads[i] != null) {
            if (this.m_gamepads[i].justPressed(button) === true) {
                return true;
            };
        };
    };

    return false;
};

/**
 * ...
 *
 * @param {number} button ...
 *
 * @returns {boolean}
 */
rune.input.Gamepads.prototype.justReleased = function(button) {
    var i = this.m_gamepads.length;
    while (i--) {
        if (this.m_gamepads[i] != null) {
            if (this.m_gamepads[i].justReleased(button) === true) {
                return true;
            };
        };
    };

    return false;
};

/**
 * ...
 *
 * @param {number} button ...
 *
 * @returns {boolean}
 */
rune.input.Gamepads.prototype.pressed = function(button) {
    var i = this.m_gamepads.length;
    while (i--) {
        if (this.m_gamepads[i] != null) {
            if (this.m_gamepads[i].pressed(button) === true) {
                return true;
            };
        };
    };

    return false;
};

/**
 * ...
 *
 * @returns {undefined}
 */
rune.input.Gamepads.prototype.reset = function() {
    this.m_resetGamepads();
};

/**
 * ...
 *
 * @returns {undefined}
 */
rune.input.Gamepads.prototype.update = function() {
    if (this.m_enable == true) {
        this.m_updateDevices();
        this.m_updateGamepads();
    }
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Method that represents the class constructor.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_construct = function() {
    this.m_constructDevices();
    this.m_constructGamepads();
};

/**
 * ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_constructDevices = function() {
    if (navigator && typeof navigator.getGamepads === "function") {
        this.m_devices = window.navigator.getGamepads();
    } else throw new Error("Gamepads not supported at runtime.");
};

/**
 * ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_constructGamepads = function() {
    this.m_disposeGamepads();
    if (this.m_gamepads == null && this.m_devices != null) {
        this.m_gamepads = [];
        for (var i = 0; i < this.m_devices.length; i++) {
            this.m_gamepads.push(
                new rune.input.Gamepad()
            );
        }
    } else throw new Error();
};

/**
 * ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_updateDevices = function() {
    if (window.navigator != null) {
        this.m_devices = window.navigator.getGamepads();

        var a = this['m_numDevices'];
        var b = this['numGamepads'];

        if      (a > b) this.m_onDeviceConnected();
        else if (a < b) this.m_onDeviceDisconnected();
    } else throw new Error();
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_updateGamepads = function() {
    if (this.m_gamepads == null) return;
    for (var i = 0; i < this.m_gamepads.length; i++) {
        if (this.m_gamepads[i].active === true) {
            this.m_gamepads[i].update(
                this.m_devices[i]
            );
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
rune.input.Gamepads.prototype.m_disposeGamepads = function() {
    if (Array.isArray(this.m_gamepads)) {
        while (this.m_gamepads.length > 0) {
            this.m_gamepads[0].dispose();
            this.m_gamepads.splice(0, 1);
        }
    }

    this.m_gamepads = null;
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_disposeDevices = function() {
    this.m_devices = null;
};

/**
 * ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_resetGamepads = function() {
    var i = this.m_gamepads.length;
    while (i--) this.m_resetGamepad(this.m_gamepads[i]);
};

/**
 * ...
 *
 * @param {rune.input.Gamepad} gamepad ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_resetGamepad = function(gamepad) {
    if (gamepad instanceof rune.input.Gamepad) {
        gamepad.reset();
    } else throw new Error();
};

/**
 * ...
 *
 * @param {string} prop ...
 *
 * @returns {boolean}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_getPropOfGamepads = function(prop) {
    var i = this.m_gamepads.length;
    while (i--) {
        if (this.m_gamepads[i] != null) {
            if (this.m_gamepads[i][prop] === true) {
                return true;
            };
        };
    };

    return false;
};

/**
 * Callback for when gamepads are connected.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_onDeviceConnected = function() {
    this.m_execTrigger("onConnect");
};

/**
 * Callback for when gamepads are disconnected.
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_onDeviceDisconnected = function() {
    this.m_execTrigger("onDisconnect");
};

/**
 * ...
 *
 * @param {string} triggerName ...
 *
 * @returns {undefined}
 * @protected
 * @ignore
 */
rune.input.Gamepads.prototype.m_execTrigger = function(triggerName) {
    var trigger = this[triggerName];
    if (trigger instanceof rune.util.Executable) {
        if (trigger.fn && typeof trigger.fn === "function") {
            trigger.fn.call((trigger.scope || window), arguments);
        }
    }
};