//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * ...
 */
demo.scene.Scene001 = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rune.game.Counter}
     * @private
     */
    this.m_counter = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.scene.Scene001.prototype = Object.create(rune.scene.Scene.prototype);
demo.scene.Scene001.prototype.constructor = demo.scene.Scene001;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
demo.scene.Scene001.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initCounter();
    this.m_initAstronauts();
    //this.m_initButtons();
};

/**
 * @override
 */
demo.scene.Scene001.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene001.prototype.m_initCounter = function() {
    this.m_counter = new rune.ui.Counter(3);
    this.m_counter.left = 5;
    this.m_counter.bottom = this.application.screen.height - 5;

    this.cameras.getCamera(0).addChild(this.m_counter);
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene001.prototype.m_initAstronauts = function() {
    this.m_astronauts = this.groups.add(new demo.data.Astronauts(this.m_counter));
    this.m_astronauts.add();
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene001.prototype.m_initButtons = function() {
    this.m_btnAdd = new rune.ui.TextButton("Add astronaut", function() {
        this.m_astronauts.add();
        this.m_btnAdd.label = "Astronauts: " + String(this.m_astronauts.numChildren);
    }, this);
    this.m_btnAdd.center = this.cameras.getCamera(0).center;
    //this.stage.addChild(this.m_btnAdd);
    
    this.cameras.getCamera(0).addChild(this.m_btnAdd);
};

/**
 * ...
 *
 * @param {number} step ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene001.prototype.m_updateInput = function(step) {
    if (this.keyboard.justPressed("D")) {
        this.cameras.getCamera(0).debug = !this.cameras.getCamera(0).debug;
    }
};