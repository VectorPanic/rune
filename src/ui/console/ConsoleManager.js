//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new console manager.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @param {number} [x] ...
 * @param {number} [y] ...
 * @param {number} [width] ...
 * @param {number} [height] ...
 * 
 * @class
 * @classdesc
 * 
 * A rectangular surface that handles a text terminal.
 */
rune.ui.ConsoleManager = function(x, y, width, height) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {boolean}
     */
    this.interactive = true;
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Reference to the text terminal handled by this object.
     *
     * @type {rune.ui.Console}
     * @protected
     * @ignore
     */
    this.m_console = null;
    
    /**
     * ...
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_responsive = true;
    
    /**
     * ...
     *
     * @type {rune.tween.Tweens}
     * @protected
     * @ignore
     */
    this.m_tweens = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObjectContainer.call(this, x, y, width, height, "");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rune.ui.ConsoleManager.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rune.ui.ConsoleManager.prototype.constructor = rune.ui.ConsoleManager;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * Key to activate and deactivate the console.
 *
 * @constant {string}
 * @default "BACKQUOTE"
 */
rune.ui.ConsoleManager.CONSOLE_TRIGGER = "BACKQUOTE";

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rune.ui.ConsoleCommands} commands
 * @memberof rune.ui.ConsoleManager
 * @instance
 * readonly
 */
Object.defineProperty(rune.ui.ConsoleManager.prototype, "commands", {
    /**
     * @this rune.ui.ConsoleManager
     * @ignore
     */
    get : function() {
        return this.m_console['commands'];
    }
});

/**
 * ...
 *
 * @member {rune.ui.Console} instance
 * @memberof rune.ui.ConsoleManager
 * @instance
 * readonly
 */
Object.defineProperty(rune.ui.ConsoleManager.prototype, "instance", {
    /**
     * @this rune.ui.ConsoleManager
     * @ignore
     */
    get : function() {
        return this.m_console;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleManager.prototype.hide = function() {
    if (this.m_console != null && this.m_console['parent'] != null) {
        if (this.m_responsive == true) {
            this.m_animate(0.0, 500, function(console) {
                this.removeChild(console);
                this['visible'] = false;
            });
        }
    }
};

/**
 * ...
 *
 * @param {string} str ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleManager.prototype.log = function(str) {
    if (this.m_console != null) {
        this.m_console.log(str);
    }
};

/**
 * ...
 *
 * @param {number} [ammount] ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleManager.prototype.set = function(ammount) {
    ammount = ammount || 0.0;
    if (this.m_console) {
        if (ammount > 0) {
            if (this.m_console['parent'] == null) {
                this.addChild(this.m_console);
                this['visible'] = true;
            }
            
            this.m_console['bottom'] = this['height'] * ammount;
        } else {
            this.removeChild(this.m_console, false);
            this['visible'] = false;
        }
    }
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleManager.prototype.show = function() {
    if (this.m_console != null && this.m_console['parent'] == null) {
        if (this.m_responsive == true) {
            this.addChild(this.m_console);
            this.m_animate(0.5, 500);
            this['visible'] = true;
        }
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
rune.ui.ConsoleManager.prototype.update = function(step) {
    rune.display.DisplayObjectContainer.prototype.update.call(this, step);
    this.m_updateTweens(step);
    this.m_updateInput(step);
};

/**
 * @override
 */
rune.ui.ConsoleManager.prototype.dispose = function() {
    this.m_disposeConsole();
    this.m_disposeTweens();
    rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rune.ui.ConsoleManager.prototype.m_construct = function() {
    rune.display.DisplayObjectContainer.prototype.m_construct.call(this);
    this.m_constructTweens();
    this.m_constructConsole();
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
rune.ui.ConsoleManager.prototype.m_constructTweens = function() {
    this.m_disposeTweens();
    if (this.m_tweens == null) {
        this.m_tweens = new rune.tween.Tweens();
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleManager.prototype.m_constructConsole = function() {
    this.m_disposeConsole();
    if (this.m_console == null) {
        this.m_console = new rune.ui.Console(
            0,
            0,
            this.width,
            this.height
        );
        
        if (this.m_console.width  >= 1280 && 
            this.m_console.height >= 720) {
            this.m_console.width  = this.m_console.width  >> 1;
            this.m_console.height = this.m_console.height >> 1;
            this.m_console.scaleX = 2.0;
            this.m_console.scaleY = 2.0;
        }
        
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
rune.ui.ConsoleManager.prototype.m_updateTweens = function(step) {
    if (this.m_tweens != null) {
        this.m_tweens.update(step);
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @ignore
 */
rune.ui.ConsoleManager.prototype.m_updateInput = function(step) {
    if (this.interactive) {
        if (this['keyboard'] != null && this['keyboard'].justPressed(rune.ui.ConsoleManager.CONSOLE_TRIGGER)) {
            if (this.m_console['parent'] == null) this.show();
            else this.hide();
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
rune.ui.ConsoleManager.prototype.m_disposeConsole = function() {
    if (this.m_console instanceof rune.ui.Console) {
        this.m_console.dispose();
        this.m_console = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleManager.prototype.m_disposeTweens = function() {
    if (this.m_tweens instanceof rune.tween.Tweens) {
        this.m_tweens.dispose();
        this.m_tweens = null;
    }
};

/**
 * ...
 *
 * @param {number} p ...
 * @param {number} d ...
 * @param {Function} [c] ...
 *
 * @return {undefined}
 * @ignore
 */
rune.ui.ConsoleManager.prototype.m_animate = function(p, d, c) {
    this.m_responsive = false;
    this.m_console['input'].enabled = false;
    this.m_tweens.clear();
    this.m_tweens.add(this.m_console, {
        bottom : this.height * p,
        duration: d,
        scope: this,
        oncomplete: function(console) {
            this.m_responsive = true;
            this.m_console['input'].enabled = true;
            if (typeof c === "function") {
                c.call(this, console);
            }
        }
    });
};