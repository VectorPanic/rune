//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new instance of the class.
 * 
 * @constructor
 *
 * @param {Object} [options=null] Used to override the default properties.
 *
 * @class
 * @classdesc
 * 
 * Contains keyboard settings.
 */
rune.input.KeyboardOptions = function(options) {

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
     * Enable keyboard.
     *
     * @type {boolean}
     * @default false
     */
    this.enable = options.enable || false;

    /**
     * Objects that listen for key events. Should more or less always be window.
     *
     * @type {Object}
     * @default window
     */
    this.target = options.target || window;
};