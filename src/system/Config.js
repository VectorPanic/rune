//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new configuration object.
 *
 * @constructor
 *
 * @param {Object} [options=null] Used to override the default properties.
 * 
 * @class
 * @classdesc
 * 
 * Represents a configuration for an application, this includes screen 
 * resolution and frame rate.
 */
rune.system.Config = function(options) {
    
    //--------------------------------------------------------------------------
    // Default argument values
    //--------------------------------------------------------------------------

    /**
     * @ignore
     */
    options = options || {};
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * If set to true, an icon is used instead of the logo during the Rune 
     * startup process.
     *
     * @type {boolean}
     * @default false
     */
    this.bootLogoIcon = options.bootLogoIcon || false;
    
    /**
     * If set to true, the Rune debug tool is enabled. This tool is made 
     * available throughout the execution time. Use the "shift + D" shortcut 
     * to show or hide the tool.
     *
     * @type {boolean}
     * @default false
     */
    this.debug = options.debug || false;
    
    /**
     * Requested frame rate for the application.
     *
     * @type {number}
     * @default 60
     */
    this.framerate = options.framerate || 60;
    
    /**
     * Each application based on Rune must use a unique ID. This ID is used, 
     * among other things, to manage local high scores. Use reverse domain 
     * name notation (reverse-DNS) as ID, for example: com.vectorpanic.myapp.
     *
     * @type {string}
     */
    this.id = options.id || null;
    
    /**
     * Reference to the preloader used to load the application's resources 
     * into memory. If a custom preloader is created, this reference must 
     * be updated to refer to the new preloader.
     *
     * @type {Function}
     * @default null
     */
    this.loader = options.loader || rune.data.SceneBoot;
    
    /**
     * Reference to the application's resource manifest.
     *
     * @type {Function}
     * @default null
     */
    this.resources = options.resources || null;
    
    /**
     * Reference to the scene class to be used after the start-up process is 
     * completed. This class thus constitutes the starting point for the 
     * current application.
     *
     * @type {Function}
     * @default rune.scene.Scene
     */
    this.scene = options.scene || rune.scene.Scene;

    /**
     * The pixel width of the application.
     *
     * @type {number}
     * @default 384
     */
    this.screenResolutionX = options.screenResolutionX || 384;

    /**
     * The pixel height of the application.
     *
     * @type {number}
     * @default 216
     */
    this.screenResolutionY = options.screenResolutionY || 216;
    
    /**
     * If true, gamepads support is enabled.
     *
     * @type {boolean}
     * @default false
     */
    this.useGamepads = options.useGamepads || false;
    
    /**
     * If true, keyboard support is enabled.
     *
     * @type {boolean}
     * @default false
     */
    this.useKeyboard = options.useKeyboard || false;
    
    /**
     * If true, mouse support is enabled.
     *
     * @type {boolean}
     * @default false
     */
    this.useMouse = options.useMouse || false;
    
    /**
     * Current version of the application. Version numbers should follow 
     * semantic versioning.
     *
     * @type {string}
     * @default "0.0.0"
     */
    this.version = options.version || "0.0.0";
};