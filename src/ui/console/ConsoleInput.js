//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new console input.
 *
 * @constructor
 *
 * @param {rune.ui.Console} console Reference to the console to which the object is connected.
 *
 * @class
 * @classdesc
 * 
 * The part of a console that receives input.
 */
rune.ui.ConsoleInput = function(console) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {boolean}
     */
    this.enabled = true;
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {rune.ui.Console}
     * @protected
     * @ignore
     */
    this.m_console = console;
    
    /**
     * ...
     *
     * @type {rune.ui.ConsoleCursor}
     * @protected
     * @ignore
     */
    this.m_cursor = null;
    
    /**
     * ...
     *
     * @type {string}
     * @private
     */
    this.m_cursorPrefix = "> ";
    
    /**
     * ...
     *
     * @type {rune.ui.ConsoleHistory}
     * @private
     */
    this.m_history = null;
    
    /**
     * ...
     *
     * @type {string}
     * @protected
     * @ignore
     */
    this.m_input = "";
    
    /**
     * ...
     *
     * @type {Function}
     * @protected
     * @ignore
     */
    this.m_onKeyDownHandler = null;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * @const {number}
 */
rune.ui.ConsoleInput.KEYBOARD_RETURN = 13;

/**
 * @const {number}
 */
rune.ui.ConsoleInput.KEYBOARD_BACKSPACE = 8;

/**
 * @const {number}
 */
rune.ui.ConsoleInput.KEYBOARD_UP = 38;

/**
 * @const {number}
 */
rune.ui.ConsoleInput.KEYBOARD_DOWN = 40;

/**
 * @const {number}
 */
rune.ui.ConsoleInput.KEYBOARD_TILDE = 192;

/**
 * @const {number}
 */
rune.ui.ConsoleInput.KEYBOARD_SHIFT = 16;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {string} chr ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleInput.prototype.add = function(chr) {
    this.m_input += chr || "";
    this.m_console.breakCache();
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleInput.prototype.clear = function() {
    this.m_input = "";
    this.m_console.breakCache();
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleInput.prototype.update = function(step) {
    this.m_updateCursor(step);
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleInput.prototype.render = function() {
    this.m_renderString(this.m_cursorPrefix + this.m_input + this.m_cursor.text);
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleInput.prototype.dispose = function() {
    this.m_disposeHistory();
    this.m_disposeCursor();
    this.m_disposeEvent();
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
rune.ui.ConsoleInput.prototype.m_construct = function() {
    this.m_constructEvent();
    this.m_constructCursor();
    this.m_constructHistory();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_constructEvent = function() {
    this.m_disposeEvent();
    if (this.m_onKeyDownHandler == null) {
        this.m_onKeyDownHandler = rune.util.Event.addEventListener(
            window,
            rune.util.Event.KEY_DOWN,
            this.m_onKeyDown,
            {},
            false,
            this
        );
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_constructCursor = function() {
    this.m_disposeCursor();
    if (this.m_cursor == null) {
        this.m_cursor = new rune.ui.ConsoleCursor();
    } else throw new Error();
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_constructHistory = function() {
    this.m_disposeHistory();
    if (this.m_history == null) {
        this.m_history = new rune.ui.ConsoleHistory();
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
rune.ui.ConsoleInput.prototype.m_updateCursor = function(step) {
    if (this.m_cursor != null) {
        if (this.m_cursor.update(step)) {
            this.m_console.breakCache();
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
rune.ui.ConsoleInput.prototype.m_renderString = function(str) {
    var x = this.m_console['indentation'];
    var y = this.m_console['unscaledHeight'] - this.m_console['format']['charHeight'];

    for (var i = 0; i < str.length; i++) {
        this.m_renderCharacter(
            str.charCodeAt(i),
            x,
            y
        );
        
        x += this.m_console['format']['charWidth'];
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleInput.prototype.m_renderCharacter = function(chr, x, y) {
    var rect = this.m_console['format'].getCharRect(chr);
    if (rect != null) {
        this.m_console['canvas'].drawImage(
            this.m_console['format']['texture'],
            x,
            y,
            rect.width,
            rect.height,
            rect.x, 
            rect.y,
            rect.width,
            rect.height
        );
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_disposeHistory = function() {
    if (this.m_history instanceof rune.ui.ConsoleHistory) {
        this.m_history.dispose();
        this.m_history = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_disposeCursor = function() {
    if (this.m_cursor instanceof rune.ui.ConsoleCursor) {
        this.m_cursor.dispose();
        this.m_cursor = null;
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_disposeEvent = function() {
    if (typeof this.m_onKeyDownHandler === "function") {
        rune.util.Event.removeEventListener(
            window,
            rune.util.Event.KEY_DOWN,
            this.m_onKeyDownHandler
        );
    }
};

/**
 * ...
 *
 * @param {Event} event ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_onKeyDown = function(event) {
    if (this.enabled == true && this.m_console['enabled'] == true) {
        this.m_commandSwitch(event);
    }
};

/**
 * ...
 *
 * @param {Event} event ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_commandSwitch = function(event) {
    switch (event.keyCode) {
        case rune.ui.ConsoleInput.KEYBOARD_RETURN:
            this.m_executeCommand();
            break;
            
        case rune.ui.ConsoleInput.KEYBOARD_BACKSPACE:
            this.m_removeFromInput();
            break;
            
        case rune.ui.ConsoleInput.KEYBOARD_UP:
            this.m_previousInput();
            break;
            
        case rune.ui.ConsoleInput.KEYBOARD_DOWN:
            this.m_nextInput();
            break;
            
        case rune.ui.ConsoleInput.KEYBOARD_TILDE:
            break;
            
        case rune.ui.ConsoleInput.KEYBOARD_SHIFT:
            break;
            
        default:
            this.m_addToInput(event);
            break;
    }
};
    
/**
 * ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleInput.prototype.m_executeCommand = function() {
    this.m_onInput(this.m_input);
    this.m_history.add(this.m_input);
    this.clear();
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleInput.prototype.m_onInput = function(input) {
    if (this.m_console != null) {
        this.m_console.execute(input);
    }
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleInput.prototype.m_addToInput = function(event) {
    this.m_cursor.reset();
    var chr = (event.key != null && event.key.length === 1) ? event.key : String.fromCharCode(event.which || event.keyCode);
    this.add(chr);
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleInput.prototype.m_nextInput = function() {
    this.clear();
    this.m_input = this.m_history.next() || "";
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleInput.prototype.m_previousInput = function() {
    this.clear();
    this.m_input = this.m_history.previous() || "";
};

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleInput.prototype.m_removeFromInput = function() {
    this.m_cursor.reset();
    this.m_input = this.m_input.substring(0, this.m_input.length - 1);
    this.m_console.breakCache();
};