//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.geom.Rectangle
 *
 * @param {rune.camera.Camera} camera ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
rune.camera.CameraViewport = function(camera) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.camera.Camera}
     * @private
     */
    this.m_camera = camera;
    
    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_zoom = 1;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.geom.Rectangle.call(this, 0, 0, camera.width, camera.height);
};

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

rune.camera.CameraViewport.prototype = Object.create(rune.geom.Rectangle.prototype);
rune.camera.CameraViewport.prototype.constructor = rune.camera.CameraViewport;

//--------------------------------------------------------------------------
// Override public getter and setter methods
//--------------------------------------------------------------------------

/**
 * @override
 */
Object.defineProperty(rune.camera.CameraViewport.prototype, "width", {
    /**
     * @this rune.camera.CameraViewport
     * @ignore
     */
    get : function() {
        return this.m_camera['canvas']['width'];
    },
    
    /**
     * @this rune.camera.CameraViewport
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * @override
 */
Object.defineProperty(rune.camera.CameraViewport.prototype, "height", {
    /**
     * @this rune.camera.CameraViewport
     * @ignore
     */
    get : function() {
        return this.m_camera['canvas']['height'];
    },
    
    /**
     * @this rune.camera.CameraViewport
     * @ignore
     */
    set : function(value) {
        throw new Error("Illegal operation");
    }
});

/**
 * @override
 */
Object.defineProperty(rune.camera.CameraViewport.prototype, "zoom", {
    /**
     * @this rune.camera.CameraViewport
     * @ignore
     */
    get : function() {
        return this.m_zoom;
    },
    
    /**
     * @this rune.camera.CameraViewport
     * @ignore
     */
    set : function(value) {
        this.m_zoom = rune.util.Math.clamp(value, 0.25, 4.0);
        this.m_camera['canvas'].resize(
            this.m_camera['width']  / this.m_zoom,
            this.m_camera['height'] / this.m_zoom
        );
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
rune.camera.CameraViewport.prototype.dispose = function() {
    this.m_camera = null;
};