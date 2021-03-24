//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
demo.data.Astronauts = function(counter) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.game.Counter}
     * @private
     */
    this.m_counter = counter;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayGroup.call(this, rune.display.DisplayObject.stage);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.data.Astronauts.prototype = Object.create(rune.display.DisplayGroup.prototype);
demo.data.Astronauts.prototype.constructor = demo.data.Astronauts;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {rune.display.DisplayObject} child ...
 *
 * @return {rune.display.DisplayObject}
 */
demo.data.Astronauts.prototype.add = function() {
    var astronaut = new demo.data.Astronaut();
        astronaut.centerX  = rune.util.Math.random(0, this.cameras.getCamera(0).width);
        astronaut.centerY  = rune.util.Math.random(0, this.cameras.getCamera(0).height);
        astronaut.rotation = rune.util.Math.random(0, 360);
        astronaut.flicker();
        
    this.addChild(astronaut);
    this.m_soundAdd.play(true);
    
};

/**
 * ...
 *
 * @param {rune.display.DisplayObject} child ...
 *
 * @return {rune.display.DisplayObject}
 */
demo.data.Astronauts.prototype.remove = function() {
    if (this.target.numChildren > 0) {
        this.removeChild(this.getChildAt(0), true);
        this.m_soundRemove.play(true);
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.init = function() {
    rune.display.DisplayGroup.prototype.init.call(this);
    //this.m_initQuadtree();
    this.m_initSound();
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
    this.m_updateInputs(step);
    this.m_updateBounds(step);
    this.m_updateCollision(step);
    this.m_updateCounter(step);
};

/**
 * ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.m_initSound = function() {
    this.m_soundAdd = this.application.sounds.sound.get("demo_sound_add");
    this.m_soundRemove = this.application.sounds.sound.get("demo_sound_remove");
};

/**
 * ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.m_initQuadtree = function() {
    this.useQuadtree = true;
    this.quadtree.width  = this.application.screen.width;
    this.quadtree.height = this.application.screen.height;
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.m_updateInputs = function(step) {
    if (this.keyboard.justPressed("PLUS")) {
        this.add();
        console.log(this.numChildren, rune.system.Main['instance']['scenes']['selected']['stage'].numChildren);
    }

    if (this.keyboard.justPressed("MINUS")) {
        this.remove();
        console.log(this.numChildren, rune.system.Main['instance']['scenes']['selected']['stage'].numChildren);
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.m_updateBounds = function(step) {
    for (var i = 0; i < this.target.numChildren; i++) {
        var astronaut = this.target.getChildAt(i);
        
        if (astronaut.left > this.cameras.getCamera(0).width) {
            astronaut.right = 0;
            astronaut.right = 0;
        } else if (astronaut.right < 0) {
            astronaut.left = this.cameras.getCamera(0).width;
            astronaut.left = this.cameras.getCamera(0).width;
        }
        
        if (astronaut.top > this.cameras.getCamera(0).height) {
            astronaut.bottom = 0;
            astronaut.bottom = 0;
        } else if (astronaut.bottom < 0) {
            astronaut.top = this.cameras.getCamera(0).height;
            astronaut.top = this.cameras.getCamera(0).height;
        }
    }
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.m_updateCollision = function(step) {
    //this.hitTestGroup(this); //@todo: better name.
    this.hitTestXXX(this);
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
demo.data.Astronauts.prototype.m_updateCounter = function(step) {
    if (this.m_counter != null) {
        this.m_counter.value = this.numChildren;
    }
};