//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new cursor.
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Represents a text cursor.
 */
rune.ui.ConsoleCursor = function() {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Blink rate.
     *
     * @type {number}
     * @default 500
     */
    this.blinkRate = 500;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Whether the cursor is active or not.
     *
     * @type {boolean}
     * @protected
     * @ignore
     */
    this.m_cursor = false;

    /**
     * Time until the cursor is to be updated.
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_cursorTicker = 0.0;
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Current cursor character.
 *
 * @member {string} cursor
 * @memberof rune.ui.ConsoleCursor
 * @instance
 */
Object.defineProperty(rune.ui.ConsoleCursor.prototype, "text", {
    /**
     * @this rune.ui.ConsoleCursor
     * @ignore
     */
    get : function() {
        return this.m_cursor ? "_" : "";
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Resets the cursor blink frequency.
 *
 * @return {undefined}
 */
rune.ui.ConsoleCursor.prototype.reset = function() {
    this.m_cursor = false;
    this.m_cursorTicker = 0;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the cursor.
 *
 * @param {number} step Current time step.
 *
 * @return {boolean}
 */
rune.ui.ConsoleCursor.prototype.update = function(step) {
    return this.m_updateCursor(step);
};

/**
 * Removes the object.
 *
 * @return {boolean}
 */
rune.ui.ConsoleCursor.prototype.dispose = function() {
    //@note: Nothing yet.
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Updates the blink frequency.
 *
 * @param {number} step Current time step.
 *
 * @return {boolean}
 * @protected
 * @ignore
 */
rune.ui.ConsoleCursor.prototype.m_updateCursor = function(step) {
    this.m_cursorTicker += step;
    if (this.m_cursorTicker > this.blinkRate) {
        this.m_cursorTicker = 0;
        this.m_cursor = !this.m_cursor;
        
        return true;
    }

    return false;
};