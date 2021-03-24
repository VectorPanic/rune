//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.ui.ConsoleCommands = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {Array.<rune.ui.ConsoleCommand>}
     * @private
     */
    this.m_commands = [];

    /**
     * ...
     *
     * @type {string}
     * @private
     */
    this.m_cursorMarker = "> ";
};

//------------------------------------------------------------------------------
// Public methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {rune.ui.ConsoleCommand} command ...
 *
 * @throws {TypeError} ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleCommands.prototype.add = function(command) {
    if (command instanceof rune.ui.ConsoleCommand) {
        this.m_commands.push(command);
    } else throw new TypeError("Invalid console command.");
};

/**
 * ...
 *
 * @param {string} command ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleCommands.prototype.create = function(command, callback, scope) {
    this.add(new rune.ui.ConsoleCommand(command, callback, scope));
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleCommands.prototype.dispose = function() {
    this.m_commands.length = 0;
    this.m_commands = null;
};

/**
 * ...
 *
 * @param {string} input ...
 * 
 * @return {string}
 */
rune.ui.ConsoleCommands.prototype.exec = function(input) {
    var command = input.replace(/ .*/, "");
    var args = input.split(" ");
        args.shift();
        
    for (var i = 0; i < this.m_commands.length; i++) {
        if (this.m_commands[i].trigger.toLowerCase() === command.toLowerCase()) {
            var output = this.m_commands[i].callback.apply(
                this.m_commands[i].scope,
                args
            );

            return (output) ? this.m_cursorMarker + input +"\n" + output : this.m_cursorMarker + input;
        }
    }

    return this.m_cursorMarker + input + "\nUnknown command \"" + command + "\"";
};

/**
 * ...
 *
 * @param {string} command ...
 *
 * @return {undefined}
 */
rune.ui.ConsoleCommands.prototype.remove = function(command) {
    for (var i = 0; i < this.m_commands.length; i++) {
        if (this.m_commands[i].trigger === command) {
            this.m_commands.splice(i, 1);
            break;
        }
    }
};