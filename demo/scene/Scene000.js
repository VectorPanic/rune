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
demo.scene.Scene000 = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {Array}
     * @private
     */
    this.m_cams = null;

    /**
     * ...
     *
     * @type {rune.data.Logo}
     * @private
     */
    this.m_gamepad = null;

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

demo.scene.Scene000.prototype = Object.create(rune.scene.Scene.prototype);
demo.scene.Scene000.prototype.constructor = demo.scene.Scene000;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
demo.scene.Scene000.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initGamepad();
};

/**
 * @override
 */
demo.scene.Scene000.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

//------------------------------------------------------------------------------
// Override protected prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @override
 */
demo.scene.Scene000.prototype.m_initCamera = function() {
    this.cameras.clear();
    
    var w = this.application.screen.width  >> 1;
    var h = this.application.screen.height >> 1;
    
    this.m_cams = [];
    
    this.m_cams[0] = this.cameras.create(0, 0, w, h, "camera 0");
    this.m_cams[0].fillColor = "#ff0000ff";
    this.m_cams[0].viewport.zoom = 0.25;
    this.m_cams[0].viewport.center = this.application.screen.center;

    this.m_cams[1] = this.cameras.create(w, 0, w, h, "camera 1");
    this.m_cams[1].fillColor = "#00ff00ff";
    this.m_cams[1].viewport.zoom = 0.5;
    this.m_cams[1].viewport.center = this.application.screen.center;

    this.m_cams[2] = this.cameras.create(0, h, w, h, "camera 2");
    this.m_cams[2].fillColor = "#0000ffff";
    this.m_cams[2].viewport.zoom = 1;
    this.m_cams[2].viewport.center = this.application.screen.center;

    this.m_cams[3] = this.cameras.create(w, h, w, h, "camera 3");
    this.m_cams[3].fillColor = "#ff00ffff";
    this.m_cams[3].viewport.zoom = 2;
    this.m_cams[3].viewport.center = this.application.screen.center;
    
    this.cameras.add(this.m_cams[0]);
    this.cameras.add(this.m_cams[1]);
    this.cameras.add(this.m_cams[2]);
    this.cameras.add(this.m_cams[3]);
    
    this.m_cam = this.m_cams[0];
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
demo.scene.Scene000.prototype.m_initGamepad = function() {
    this.m_disposeGamepad();
    if (this.m_gamepad == null) {
        this.m_gamepad = new demo.data.Gamepad();
        this.m_gamepad.center = this.application.screen.center;
        this.m_gamepad.scaleX = 0;
        this.m_gamepad.scaleY = 0;
        this.m_gamepad.rotation = 360;
        
        this.tweens.add(this.m_gamepad, {
            scaleX: 1,
            scaleY: 1,
            scope: this,
            rotation: 0,
            duration: 2500,
            onupdate: function(obj) {
                obj.center = this.application.screen.center;
            }
        });
        
        this.stage.addChild(this.m_gamepad);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInput = function() {
    this.m_updateInputSelect();
    this.m_updateInputFlash();
    this.m_updateInputTarget();
    this.m_updateInputFade();
    this.m_updateInputShake();
    this.m_updateInputMove();
    this.m_updateInputView();
    this.m_updateInputReset();
    this.m_updateInputMirror();
    this.m_updateInputZoom();
    this.m_updateInputScale();
    this.m_updateInputDebug();
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputSelect = function() {
    if (this.keyboard.justPressed("ONE")) {
        this.m_cam = this.m_cams[0];
    } else if (this.keyboard.justPressed("TWO")) {
        this.m_cam = this.m_cams[1];
    } else if (this.keyboard.justPressed("THREE")) {
        this.m_cam = this.m_cams[2];
    } else if (this.keyboard.justPressed("FOUR")) {
        this.m_cam = this.m_cams[3];
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputFlash = function() {
    if (this.keyboard.justPressed("F")) {
        this.m_cam.flash.start();
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputTarget = function() {
    if (this.keyboard.justPressed("T")) {
        if (this.m_cam.targets.length == 0) {
            this.m_cam.targets.add(this.m_gamepad);
        } else {
            this.m_cam.targets.clear();
        }
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputFade = function() {
    if (this.keyboard.justPressed("I")) {
        this.m_cam.fade.in(2500);
    } else if (this.keyboard.justPressed("O")) {
        this.m_cam.fade.out(2500);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputShake = function() {
    if (this.keyboard.justPressed("R")) {
        this.m_cam.shake.start(2500, 5, 5, true);
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputMove = function() {
    var obj;
    if (this.keyboard.pressed("SHIFT")) {
        obj = this.m_gamepad;
    } else {
        obj = this.m_cam;
    }
    
    if (this.keyboard.pressed("A")) {
        obj.x--;
    } else if (this.keyboard.pressed("D")) {
        obj.x++;
    }

    if (this.keyboard.pressed("W")) {
        obj.y--;
    } else if (this.keyboard.pressed("S")) {
        obj.y++;
    }
    
    if (this.keyboard.pressed("Q")) {
        obj.rotation--;
    } else if (this.keyboard.pressed("E")) {
        obj.rotation++;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputView = function() {
    if (this.keyboard.pressed("LEFT")) {
        this.m_cam.viewport.x--;
    } else if (this.keyboard.pressed("RIGHT")) {
        this.m_cam.viewport.x++;
    }

    if (this.keyboard.pressed("UP")) {
        this.m_cam.viewport.y--;
    } else if (this.keyboard.pressed("DOWN")) {
        this.m_cam.viewport.y++;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputReset = function() {
    if (this.keyboard.pressed("ESCAPE")) {
        this.m_initCamera();
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputMirror = function() {
    if (this.keyboard.justPressed("M")) {
        this.m_cam.flippedX = !this.m_cam.flippedX;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputZoom = function() {
    var p = this.m_cam.viewport.center;
    
    if (this.keyboard.pressed("Z")) {
        this.m_cam.viewport.zoom += 0.01;
        this.m_cam.viewport.center = p;
    } else if (this.keyboard.pressed("X")) {
        this.m_cam.viewport.zoom -= 0.01;
        this.m_cam.viewport.center = p;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputScale = function() {
   /*
    var obj;
    if (this.keyboard.pressed("SHIFT")) {
        obj = this.m_gamepad;
    } else {
        obj = this.m_cam;
    }
    */
    
    obj = this.m_gamepad;
    
    if (this.keyboard.pressed("MINUS")) {
        obj.scaleX -= 0.01;
        obj.scaleY -= 0.01;
    } else if (this.keyboard.pressed("PLUS")) {
        obj.scaleX += 0.01;
        obj.scaleY += 0.01;
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_updateInputDebug = function() {
    if (this.keyboard.justPressed("I")) {
        //TODO: ...
    }
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
demo.scene.Scene000.prototype.m_disposeGamepad = function() {
    if (this.m_gamepad instanceof demo.data.Gamepad) {
        this.m_gamepad.dispose();
        this.m_gamepad = null;
    }
};