//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new command.
 *
 * @constructor
 *
 * @param {string} [trigger] ...
 * @param {Function} [callback] ...
 * @param {Object} [scope] ...
 *
 * @class
 * @classdesc
 * 
 * Represents a command that can perform actions when called via the console.
 */
rune.ui.ConsoleCommand = function(trigger, callback, scope) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * String value that activates the command.
     *
     * @type {string}
     */
    this.trigger = trigger || "...";

    /**
     * Command function.
     *
     * @type {Function}
     */
    this.callback = callback || function() { return "..." };

    /**
     * The scope in which the command is executed.
     *
     * @type {Object}
     */
    this.scope = scope || window;
};