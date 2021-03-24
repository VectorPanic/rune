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
rune.camera.CameraTargets = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.geom.Point}
     * @private
     */
    this.m_position = new rune.geom.Point();

    /**
     * ...
     *
     * @type {Array.<rune.display.DisplayObject>}
     * @private
     */
    this.m_targets = [];
};

//--------------------------------------------------------------------------
// Public prototype getter and setter methods
//--------------------------------------------------------------------------

/**
 * ...
 *
 * @member {number} length
 * @memberof rune.camera.CameraTargets
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.CameraTargets.prototype, "length", {
    /**
     * ...
     * 
     * @this rune.camera.CameraTargets
     * @ignore
     */
    get : function() {
        return this.m_targets.length;
    }
});

/**
 * ...
 *
 * @member {number} position
 * @memberof rune.camera.CameraTargets
 * @instance
 * @readonly
 */
Object.defineProperty(rune.camera.CameraTargets.prototype, "position", {
    /**
     * ...
     * 
     * @this rune.camera.CameraTargets
     * @ignore
     */
    get : function() {
        this.m_position.x = 0;
        this.m_position.y = 0;
        for (var i = 0, l = this.m_targets.length; i < l; i++) {
            this.m_position.x += this.m_targets[i]['center'].x;
            this.m_position.y += this.m_targets[i]['center'].y;
        }

        this.m_position.x = Math.floor(this.m_position.x / this.m_targets.length);
        this.m_position.y = Math.floor(this.m_position.y / this.m_targets.length);

        return this.m_position;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @param {rune.display.DisplayObject} target ...
 *
 * @return {undefined}
 */
rune.camera.CameraTargets.prototype.add = function(target) {
    var index = this.m_targets.indexOf(target);
    if (index === -1) this.m_targets.push(target);
};

/**
 * ...
 * 
 * @return {undefined}
 */
rune.camera.CameraTargets.prototype.clear = function() {
    while (this.m_targets.length > 0) {
        this.m_targets.shift();
    }
};

/**
 * ...
 *
 * @return {undefined}
 */
rune.camera.CameraTargets.prototype.dispose = function() {
    this.m_position = null;
    this.m_targets.length = 0;
    this.m_targets = null;
};

/**
 * ...
 * 
 * @param {rune.display.DisplayObject} target ...
 *
 * @return {undefined}
 */
rune.camera.CameraTargets.prototype.remove = function(target) {
    var index = this.m_targets.indexOf(target);
    if (index > -1) this.m_targets.splice(index, 1);
};