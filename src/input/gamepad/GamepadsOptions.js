//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 *
 * @param {Object} [options=null] Used to override the default properties.
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.input.GamepadsOptions = function(options) {

    //--------------------------------------------------------------------------
    // Default arguments
    //--------------------------------------------------------------------------

    /**
     * @ignore
     */
    options = options || {};

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {boolean}
     * @default false
     */
    this.enable = options.enable || false;
    
    /**
     * ...
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onConnect = options.onConnect || null;
    
    /**
     * ...
     *
     * @type {rune.util.Executable}
     * @default null
     */
    this.onDisconnect = options.onDisconnect || null;
};