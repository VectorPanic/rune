//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new console output.
 *
 * @constructor
 *
 * @param {rune.ui.Console} console Reference to the console to which the object is connected.
 *
 * @class
 * @classdesc
 * 
 * Represents the part of a console that is responsible for printing output.
 */
rune.ui.ConsoleOutput = function(console) {
    
    //----------------------------------------------------------------------
    // Private properties
    //----------------------------------------------------------------------

    /**
     * Reference to the console to which the object is connected.
     *
     * @type {rune.ui.Console}
     * @private
     */
    this.m_console = console;

    /**
     * Contains current output in the form of text lines.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_rows = [];
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Clears the current output.
 *
 * @return {undefined}
 */
rune.ui.ConsoleOutput.prototype.clear = function() {
    this.m_rows = [];
    this.m_console.breakCache();
};

/**
 * Logs output.
 *
 * @param {string} str String to log.
 *
 * @return {undefined}
 */
rune.ui.ConsoleOutput.prototype.log = function(str) {
    str = str || "";
    var strs = str.split("\n");
    for (var i = 0; i < strs.length; i++) {
        this.m_rows.unshift(strs[i]);
    }

    this.m_trimLog();
    this.m_console.breakCache();
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Disposes the current object.
 *
 * @return {undefined}
 */
rune.ui.ConsoleOutput.prototype.dispose = function() {
    this.m_rows.length = 0;
    this.m_rows = null;
    this.m_console = null;
};

/**
 * Renders the current object.
 *
 * @return {undefined}
 */
rune.ui.ConsoleOutput.prototype.render = function() {
    this.m_renderRows();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Trims the number of possible lines of text.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleOutput.prototype.m_trimLog = function() {
    while (this.m_rows.length > this.m_console['numLines']) {
        this.m_rows.pop();
    }
};

/**
 * Renders rows.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleOutput.prototype.m_renderRows = function() {
    var text = "";
    var rows = this.m_rows;
    for (var ln = 0; ln < this.m_rows.length; ln++) {
        text = rows[ln];
        var x = this.m_console['indentation'];
        var y = (this.m_console['unscaledHeight'] - (this.m_console['format']['charHeight'] << 1)) - (this.m_console['format']['charHeight'] * ln);
        for (var col = 0; col < text.length; col++) {
            this.m_renderCharacter(
                text.charCodeAt(col),
                x,
                y
            );
            
            x += this.m_console['format']['charWidth'];
        }
    }
};

/**
 * Renders a character.
 *
 * @param {number} charCode Unicode character code.
 * @param {number} x Position in the x-direction.
 * @param {number} y Position in the y-direction.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.ui.ConsoleOutput.prototype.m_renderCharacter = function(charCode, x, y) {
    var rect = this.m_console['format'].getCharRect(charCode);
    this.m_console['canvas'].drawImage(
        this.m_console['format']['texture'],
        x,
        y,
        rect['width'],
        rect['height'],
        rect['x'], 
        rect['y'],
        rect['width'],
        rect['height']
    );
};