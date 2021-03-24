//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the class.
 *
 * @constructor
 *
 * @param {rune.display.Stage} input Camera input.
 * 
 * @class
 * @classdesc
 * 
 * Camera system with the ability to handle multiple cameras simultaneously.
 */
rune.camera.Cameras = function(input) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * List containing camera objects.
     *
     * @type {Array.<rune.camera.Camera>}
     * @private
     */
    this.m_cameras = [];
    
    /**
     * Camera input.
     *
     * @type {rune.display.Stage}
     * @private
     */
    this.m_input = input || null;
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} numCameras
 * @memberof rune.camera.Cameras
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.Cameras.prototype, "numCameras", {
    /**
     * @this rune.camera.Cameras
     * @ignore
     */
    get : function() {
        return (this.m_cameras) ? this.m_cameras.length : 0;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Add a new camera object to the camera system.
 *
 * @param {rune.camera.Camera} camera The new camera object.
 *
 * @throws {TypeError} If no valid camera object.
 *
 * @returns {rune.camera.Camera}
 */
rune.camera.Cameras.prototype.add = function(camera) {
    if (camera instanceof rune.camera.Camera) {
        if (this.m_cameras.indexOf(camera) === -1) {
            this.m_cameras.push(camera);
            camera.input = this.m_input;
            camera.init();
        }
    } else throw new TypeError();
    
    return camera;
};

/**
 * Removes all camera objects.
 *
 * @returns {undefined}
 */
rune.camera.Cameras.prototype.clear = function() {
    while (this.m_cameras.length > 0) {
        this.remove(this.m_cameras[0], true);
    }
};

/**
 * Creates a new camera object.
 *
 * @param {number} [x=0] Camera position in x coordinates.
 * @param {number} [y=0] Camera position in y coordinates.
 * @param {number} [width=384] Camera size in width.
 * @param {number} [height=216] Camera size in height.
 *
 * @returns {rune.camera.Camera} The new camera object.
 */
rune.camera.Cameras.prototype.create = function(x, y, width, height) {
    var camera = new rune.camera.Camera(
        x || 0,
        y || 0,
        width  || rune.system.Main['instance']['screen']['width'],
        height || rune.system.Main['instance']['screen']['height']
    );

    return camera;
};

/**
 * Retrieves a camera object from the list of cameras.
 *
 * @param {number} index Camera index.
 *
 * @throws {RangeError} If the camera index is out of range.
 *
 * @returns {rune.camera.Camera}
 */
rune.camera.Cameras.prototype.getCamera = function(index) {
    if (index > -1 && index < this.m_cameras.length) {
        return this.m_cameras[index];
    } else throw new RangeError();
};

/**
 * Retrieves all camera objects.
 *
 * @returns {Array.<rune.camera.Camera>}
 */
rune.camera.Cameras.prototype.getCameras = function() {
    return this.m_cameras;
};

/**
 * Remove camera.
 *
 * @param {rune.camera.Camera} camera Camera to remove.
 * @param {boolean} [dispose=false] Whether to dispose the camera, or not.
 *
 * @throws {TypeError} If invalid camera object.
 *
 * @returns {rune.camera.Camera} ...
 */
rune.camera.Cameras.prototype.remove = function(camera, dispose) {
    if (camera instanceof rune.camera.Camera) {
        var i = this.m_cameras.indexOf(camera);
        if (i > -1) {
            this.m_cameras.splice(i, 1);
            if (dispose === true) {
                camera.dispose();
                camera = null;
            }
        }
    } else throw new TypeError();

    return camera;
};

/**
 * By selecting a camera, it is placed last in the list of cameras, and will 
 * thus be rendered last.
 *
 * @param {rune.camera.Camera} camera Camera to select.
 *
 * @throws {TypeError} If invalid camera object.
 *
 * @returns {undefined}
 */
rune.camera.Cameras.prototype.select = function(camera) {
    if (camera instanceof rune.camera.Camera) {
        this.remove(camera, false);
        this.add(camera);
    } else throw new TypeError();
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @ignore
 */
rune.camera.Cameras.prototype.update = function(step) {
    this.m_updateCameras(step);
};

/**
 * TODO: ...
 *
 * @returns {undefined}
 * @ignore
 */
rune.camera.Cameras.prototype.dispose = function() {
    this.m_disposeCameras();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Updates all cameras.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @private
 */
rune.camera.Cameras.prototype.m_updateCameras = function(step) {
    var cameras = this.m_cameras;
    for (var i = 0, l = cameras.length; i < l; i++) {
        this.m_updateCamera(cameras[i], step);
    }
};

/**
 * Updates a specific camera.
 *
 * @param {rune.camera.Camera} camera Camera to be updated.
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @private
 */
rune.camera.Cameras.prototype.m_updateCamera = function(camera, step) {
    if (camera['active'] == true) {
        camera.update(step);
    }
};

/**
 * Removes all cameras.
 *
 * @returns {undefined}
 * @ignore
 */
rune.camera.Cameras.prototype.m_disposeCameras = function() {
    //TODO: ...
};