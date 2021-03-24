//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.DisplayObject
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * @param {number} [width] ...
 * @param {number} [height] ...
 * @param {number} [color] ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.ui.Console = function(x, y, width, height, color) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.ui.ConsoleCommands}
     * @protected
     * @ignore
     */
    this.m_commands = null;
    
    /**
     * ...
     *
     * @type {rune.text.BitmapFormat}
     * @protected
     * @ignore
     */
    this.m_format = null;
    
    /**
     * ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_indentation = 4;
    
    /**
     * ...
     *
     * @type {rune.ui.ConsoleInput}
     * @protected
     * @ignore
     */
    this.m_input = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObject.call(this, x, y, width, height, "#252525");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.Console.prototype = Object.create(rune.display.DisplayObject.prototype);
rune.ui.Console.prototype.constructor = rune.ui.Console;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @const {string}
 */
rune.ui.Console.CMD_CLEAR = "clear";

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.ui.ConsoleCommands} commands
 * @memberof rune.ui.Console
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Console.prototype, "commands", {
    /**
     * @this rune.ui.Console
     * @ignore
     */
    get : function() {
        return this.m_commands;
    }
});

/**
 * ...
 *
 * @member {boolean} enabled
 * @memberof rune.ui.Console
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Console.prototype, "enabled", {
    /**
     * @this rune.ui.Console
     * @ignore
     */
    get : function() {
        return (this['parent'] != null);
    }
});

/**
 * ...
 *
 * @member {rune.text.BitmapFormat} format
 * @memberof rune.ui.Console
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Console.prototype, "format", {
    /**
     * @this rune.ui.Console
     * @ignore
     */
    get : function() {
        return this.m_format;
    }
});

/**
 * ...
 *
 * @member {number} indentation
 * @memberof rune.ui.Console
 * @instance
 */
Object.defineProperty(rune.ui.Console.prototype, "indentation", {
    /**
     * @this rune.ui.Console
     * @ignore
     */
    get : function() {
        return this.m_indentation;
    },
    
    /**
     * @this rune.ui.Console
     * @ignore
     */
    set : function(value) {
        this.m_indentation = parseInt(value, 10);
    }
});

/**
 * ...
 *
 * @member {rune.ui.ConsoleInput} input
 * @memberof rune.ui.Console
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Console.prototype, "input", {
    /**
     * @this rune.ui.Console
     * @ignore
     */
    get : function() {
        return this.m_input;
    }
});

/**
 * ...
 *
 * @member {number} numLines
 * @memberof rune.ui.Console
 * @instance
 * @readonly
 */
Object.defineProperty(rune.ui.Console.prototype, "numLines", {
    /**
     * @this rune.ui.Console
     * @ignore
     */
    get : function() {
        return Math.ceil(this['height'] / this.m_format['charHeight']);
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {string}
 */
rune.ui.Console.prototype.clear = function() {
    if (this.m_output != null) {
        this.m_output.clear();
    }

    return " ";
};

/**
 * ...
 *
 * @param {string} cmd ...
 *
 * @return {undefined}
 */
rune.ui.Console.prototype.execute = function(cmd) {
    if (this.m_commands != null) {
        this.log(this.m_commands.exec(cmd));
    }
};

/**
 * ...
 *
 * @param {string} msg ...
 *
 * @return {undefined}
 */
rune.ui.Console.prototype.log = function(msg) {
    if (this.m_output != null) {
        this.m_output.log(msg);
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.Console.prototype.update = function(step) {
    rune.display.DisplayObject.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
rune.ui.Console.prototype.render = function() {
    rune.display.DisplayObject.prototype.render.call(this);
    this.m_renderInput();
    this.m_renderOutput();
};

/**
 * @inheritDoc
 */
rune.ui.Console.prototype.dispose = function() {
    this.m_disposeCommands();
    this.m_disposeOutput();
    this.m_disposeInput();
    this.m_disposeFormat();
    rune.display.DisplayObject.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.ui.Console.prototype.m_construct = function() {
    rune.display.DisplayObject.prototype.m_construct.call(this);
    this.m_constructFormat();
    this.m_constructInput();
    this.m_constructOutput();
    this.m_constructCommands();
    this.m_constructMessage();
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
rune.ui.Console.prototype.m_constructFormat = function() {
    this.m_disposeFormat();
    if (this.m_format == null) {
        this.m_format = new rune.text.BitmapFormat();
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Console.prototype.m_constructInput = function() {
    this.m_disposeInput();
    if (this.m_input == null) {
        this.m_input = new rune.ui.ConsoleInput(this);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Console.prototype.m_constructOutput = function() {
    this.m_disposeOutput();
    if (this.m_output == null) {
        this.m_output = new rune.ui.ConsoleOutput(this);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Console.prototype.m_constructCommands = function() {
    this.m_disposeCommands();
    if (this.m_commands == null) {
        this.m_commands = new rune.ui.ConsoleCommands();
        this.m_commands.create(rune.ui.Console.CMD_CLEAR, this.clear, this);
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Console.prototype.m_constructMessage = function() {
    this.log("Booting: " + rune.system.Main['version']);
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @ignore
 */
rune.ui.Console.prototype.m_updateInput = function(step) {
    if (this.m_input != null) {
        this.m_input.update(step);
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @ignore
 */
rune.ui.Console.prototype.m_renderInput = function() {
    if (this.m_input != null) {
        this.m_input.render();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @ignore
 */
rune.ui.Console.prototype.m_renderOutput = function() {
    if (this.m_output != null) {
        this.m_output.render();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Console.prototype.m_disposeCommands = function() {
    if (this.m_commands instanceof rune.ui.ConsoleCommands) {
        this.m_commands.dispose();
        this.m_commands = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.Console.prototype.m_disposeOutput = function() {
    if (this.m_output instanceof rune.ui.ConsoleOutput) {
        this.m_output.dispose();
        this.m_output = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Console.prototype.m_disposeInput = function() {
    if (this.m_input instanceof rune.ui.ConsoleInput) {
        this.m_input.dispose();
        this.m_input = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.Console.prototype.m_disposeFormat = function() {
    if (this.m_format instanceof rune.text.BitmapFormat) {
        this.m_format.dispose();
        this.m_format = null;
    }
};