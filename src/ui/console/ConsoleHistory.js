//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new console history.
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Objects that enable storage of console inputs.
 */
rune.ui.ConsoleHistory = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Current history.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_inputs = [];

    /**
     * Current input.
     *
     * @type {number}
     * @private
     */
    this.m_inputIndex = -1;

    /**
     * The extent of history.
     *
     * @type {number}
     * @private 
     */
    this.m_length = 5;
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Add input to current history.
 *
 * @param {string} input Input to store.
 *
 * @return {undefined}
 */
rune.ui.ConsoleHistory.prototype.add = function(input) {
    this.m_inputs.unshift(input);
    this.m_trimPrevious();
};

/**
 * Select next.
 *
 * @return {string}
 */
rune.ui.ConsoleHistory.prototype.next = function() {
    this.m_inputIndex--;
    if (this.m_inputIndex < 0) {
        this.m_inputIndex = this.m_inputs.length - 1;
    }

    return this.m_inputs[this.m_inputIndex];
};

/**
 * Select previous. 
 *
 * @return {string}
 */
rune.ui.ConsoleHistory.prototype.previous = function() {
    this.m_inputIndex++;
    if (this.m_inputIndex > this.m_inputs.length - 1) {
        this.m_inputIndex = 0;
    }

    return this.m_inputs[this.m_inputIndex];
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Deletes current object.
 *
 * @return {undefined}
 */
rune.ui.ConsoleHistory.prototype.dispose = function() {
    this.m_inputs.length = 0;
    this.m_inputs = null;
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Trims current history.
 *
 * @return {undefined}
 * @private
 */
rune.ui.ConsoleHistory.prototype.m_trimPrevious = function() {
    while (this.m_inputs.length > this.m_length) {
        this.m_inputs.pop();
    }
};