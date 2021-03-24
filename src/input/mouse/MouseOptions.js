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
 * Contains mouse settings.
 */
rune.input.MouseOptions = function(options) {

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
     * Enable mouse.
     *
     * @type {boolean}
     * @default false
     */
    this.enable = options.enable || false;

    /**
     * Elements where all event listeners (MouseEvent) are connected.
     *
     * @type {Object}
     * @default document
     */
    this.target = options.target || document;

    /**
     * Enable or disable the context menu.
     *
     * @type {boolean}
     * @default false
     */
    this.useContextMenu = options.useContextMenu || false;
};