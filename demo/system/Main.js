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
demo.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.system.Main.call(this, {
        name: "Demo",
        version: "1.0.0",
        id: "com.vectorpanic.demo",
        scene: demo.scene.Scene000,
        resources: demo.data.Manifest,
        debug: true,
        useMouse: true,
        useKeyboard: true,
        useGamepads: true,
        framerate: 60,
        //bootLogoIcon: true
        //screenResolutionX: 1280,
        //screenResolutionY: 720
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.system.Main.prototype = Object.create(rune.system.Main.prototype);
demo.system.Main.prototype.constructor = demo.system.Main;