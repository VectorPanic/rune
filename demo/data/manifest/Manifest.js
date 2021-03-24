//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * ...
 * 
 * @constructor
 * @extends rune.resource.Manifest
 * 
 * @class
 * @classdesc
 *
 * @param {rune.util.Executable} [onLoadComplete] ...
 * @param {rune.util.Executable} [onLoadProgress] ...
 * @param {rune.util.Executable} [onLoadError] ...
 * @param {rune.util.Executable} [onLoadAbort] ...
 * 
 * ...
 */
demo.data.Manifest = function(onLoadComplete, onLoadProgress, onLoadError, onLoadAbort) {

	//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.resource.Manifest.call(this, onLoadComplete, onLoadProgress, onLoadError, onLoadAbort);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

demo.data.Manifest.prototype = Object.create(rune.resource.Manifest.prototype);
demo.data.Manifest.prototype.constructor = demo.data.Manifest;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @override
 */
demo.data.Manifest.prototype.m_construct = function() {
    this.create("demo_astronaut_48x480",                        "./../demo/asset/png/demo_astronaut_48x480.png");
    this.create("demo_controller_159x87",                       "./../demo/asset/png/demo_controller_159x87.png");
    this.create("demo_controller_button_yellow_15x15",          "./../demo/asset/png/demo_controller_button_yellow_15x15.png");
    this.create("demo_controller_button_red_15x15",             "./../demo/asset/png/demo_controller_button_red_15x15.png");
    this.create("demo_controller_button_green_15x15",           "./../demo/asset/png/demo_controller_button_green_15x15.png");
    this.create("demo_controller_button_blue_15x15",            "./../demo/asset/png/demo_controller_button_blue_15x15.png");
    this.create("demo_controller_button_shoulder_left_40x10",   "./../demo/asset/png/demo_controller_button_shoulder_left_40x10.png");
    this.create("demo_controller_button_shoulder_right_40x10",  "./../demo/asset/png/demo_controller_button_shoulder_right_40x10.png");
    this.create("demo_controller_button_select_start_16x16",    "./../demo/asset/png/demo_controller_button_select_start_16x16.png");
    this.create("demo_controller_button_dpad_up_11x10",         "./../demo/asset/png/demo_controller_button_dpad_up_11x10.png");
    this.create("demo_controller_button_dpad_down_11x10",       "./../demo/asset/png/demo_controller_button_dpad_down_11x10.png");
    this.create("demo_controller_button_dpad_left_8x13",        "./../demo/asset/png/demo_controller_button_dpad_left_8x13.png");
    this.create("demo_controller_button_dpad_right_8x13",       "./../demo/asset/png/demo_controller_button_dpad_right_8x13.png");
    this.create("demo_sound_add",                               "./../demo/asset/wav/demo_sound_add.wav");
    this.create("demo_sound_remove",                            "./../demo/asset/wav/demo_sound_remove.wav");
    this.create("demo_tilemap",                                 "./../demo/asset/png/demo_tilemap.png");
}