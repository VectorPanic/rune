//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {rune.display.Sprite} target ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.animation.Animations = function(target) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {Array.<rune.animation.Animation>}
     * @private
     */
    this.m_animations = [];

    /**
     * TODO: ...
     *
     * @type {rune.animation.Animation}
     * @private
     */
    this.m_animation = null;

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_atlasIndex = -1;

    /**
     * TODO: ...
     *
     * @type {rune.geom.Rectangle}
     * @private
     */
    this.m_frame = new rune.geom.Rectangle(0, 0, target['canvas']['width'], target['canvas']['height']);

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_frameElapsed = 0;

    /**
     * TODO: ...
     *
     * @type {number}
     * @private
     */
    this.m_frameIndexCache = 0;

    /**
     * TODO: ...
     *
     * @type {boolean}
     * @private
     */
    this.m_paused = false;

    /**
     * TODO: ...
     *
     * @type {rune.display.Sprite}
     * @private
     */
    this.m_target = target;
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {rune.animation.Animation} current
 * @memberof rune.animation.Animations
 * @instance
 * @readonly
 */
Object.defineProperty(rune.animation.Animations.prototype, "current", {
    /**
     * @this rune.animation.Animations
     * @ignore
     */
    get : function() {
        return this.m_animation;
    }
});

/**
 * TODO: ...
 *
 * @member {rune.geom.Rectangle} frame
 * @memberof rune.animation.Animations
 * @instance
 * @readonly
 */
Object.defineProperty(rune.animation.Animations.prototype, "frame", {
    /**
     * @this rune.animation.Animations
     * @ignore
     */
    get : function() {
        return this.m_frame;
    }
});

//------------------------------------------------------------------------------
// Private prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {number} m_frameIndex
 * @memberof rune.animation.Animations
 * @instance
 * @readonly
 * @private
 */
Object.defineProperty(rune.animation.Animations.prototype, "m_frameIndex", {
    /**
     * @this rune.animation.Animations
     * @ignore
     */
    get : function() {
        return this.m_frameIndexCache;
    },
    
    /**
     * @this rune.animation.Animations
     * @ignore
     */
    set : function(value) {
        if (this.m_animation.looped === true) {
            this.m_frameIndexCache = rune.util.Math.wrap(value, 0, this.m_animation['length'] - 1);
        } else {
            this.m_frameIndexCache = rune.util.Math.clamp(value, 0, this.m_animation['length'] - 1);
        }

        if (this.m_animation.triggers != null && 
            this.m_animation.triggers[this.m_frameIndexCache] != null) {
            this.m_animation.triggers[this.m_frameIndexCache].call(this.m_target);
        }
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {Array.<number>} frames ...
 * @param {number} [framerate=0] ...
 * @param {boolean} [looped=false] ...
 * @param {Array.<Function>} [triggers=null] ...
 *
 * @return {boolean}
 */
rune.animation.Animations.prototype.add = function(name, frames, framerate, looped, triggers) {
    if (this.m_nameInUse(name) === false) {
        if (this.m_animations.push(new rune.animation.Animation(
            name.toLowerCase(), 
            frames, 
            framerate, 
            looped, 
            triggers
        )) === 1) {
            this.m_animation = this.m_animations[0];
        }

        return true;
    }

    return false;
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {number} frame ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.goto = function(name, frame) {
    if (this.m_animation != null && (this.m_animation.name != name || frame)) {
        var i = this.m_animations.length;
        while (i--) {
            if (this.m_animations[i].name.toLowerCase() == name.toLowerCase()) {
                this.m_animation = this.m_animations[i];
                this.m_frameElapsed = 0;
                this.m_frameIndex = frame || 0;
                
                this.m_updateFramePosition(0);

                return;
            }
        }
    }
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 * @param {number} frame ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.gotoAndPlay = function(name, frame) {
    this.goto(name, frame);
    this.play();
};

/**
 * ...
 *
 * @param {string} name ...
 * @param {number} frame ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.gotoAndStop = function(name, frame) {
    this.goto(name, frame);
    this.stop();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 *
 * @suppress {missingProperties}
 */
rune.animation.Animations.prototype.gotoNextFrame = function() {
    this.m_frameIndex++;
    this.m_frameElapsed = 0;
};

/**
 * TODO: ...
 *
 * @return {undefined}
 *
 * @suppress {missingProperties}
 */
rune.animation.Animations.prototype.gotoPreviousFrame = function() {
    this.m_frameIndex--;
    this.m_frameElapsed = 0;
};

/**
 * TODO: ...
 *
 * @return {undefined}
 *
 * @suppress {missingProperties}
 */
rune.animation.Animations.prototype.gotoRandomFrame = function() {
    this.m_frameIndex = rune.util.Math.randomInt(0, this.m_animation.length);
    this.m_frameElapsed = 0;
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.play = function() {
    this.m_paused = false;
};

/**
 * TODO: ...
 *
 * @param {string} name ...
 *
 * @return {boolean}
 */
rune.animation.Animations.prototype.remove = function(name) {
    var i = this.m_animations.length;
    while (i--) {
        if (this.m_animations[i].name.toLowerCase() == name.toLowerCase()) {
            this.m_animations.splice(i, 1);
            return true;
        }
    }
    
    return false;
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.stop = function() {
    this.m_paused = true;
};

//------------------------------------------------------------------------------
// Public prototype methods (Engine)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.dispose = function() {
    this.m_animations = [];
    this.m_animation = null;
    this.m_frame = null;
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
rune.animation.Animations.prototype.update = function(step) {
    this.m_updateFrameTiming(step);
    this.m_updateFramePosition(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
rune.animation.Animations.prototype.m_updateFrameTiming = function(step) {
    if (this.m_animation != null && this.m_animation.delay > 0 && this.m_paused == false) {
        this.m_frameElapsed += step;

        while (this.m_frameElapsed  > this.m_animation.delay) {
               this.m_frameElapsed -= this.m_animation.delay;
               this.m_frameIndex++;
        }
    }
};

/**
 * TODO: ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
rune.animation.Animations.prototype.m_updateFramePosition = function(step) {
    if (this.m_animation != null) {
        if (this.m_atlasIndex != this.m_animation.frames[this.m_frameIndex]) {
            this.m_atlasIndex  = this.m_animation.frames[this.m_frameIndex];

            this.m_frame.x = this.m_frame.width * this.m_atlasIndex;
            this.m_frame.y = 0;

            while (this.m_frame.x + this.m_frame.width > this.m_target["texture"]["width"]) {
                this.m_frame.y += this.m_frame.height;
                this.m_frame.x -= this.m_target["texture"]["width"];
            }

            this.m_target.breakCache();
        }
    }
};

/**
 * TODO: ...
 *
 * @return {boolean}
 * @private
 */
rune.animation.Animations.prototype.m_nameInUse = function(name) {
    var i = this.m_animations.length;
    while (i--) {
        if (this.m_animations[i].name.toLowerCase() == name.toLowerCase()) {
            return true;
        }
    }

    return false;
};