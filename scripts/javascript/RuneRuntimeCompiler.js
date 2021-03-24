//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 *
 * @param {string} [path] ...
 * 
 * @class
 * @classdesc
 * 
 * ...
 */
RuneRuntimeCompiler = (function(init, complete, appPath, enginePath) {

    //--------------------------------------------------------------------------
    // Default parameters
    //--------------------------------------------------------------------------

    /**
     * ...
     * 
     * @ignore
     */
    appPath = appPath || "../demo/";

    /**
     * ...
     * 
     * @ignore
     */
    enginePath = enginePath || "../src/";

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     * 
     * @type {Array.<string>}
     * @private
     */
    var m_queue = [];

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    var m_numFilesApplication = 0;

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    var m_numFilesEngine = 0;

    /**
     * ...
     * 
     * @type {Object}
     * @private
     */
    var m_this = this;

    /**
     * ...
     * 
     * @type {number}
     * @private
     */
    var m_timestamp = 0.0;

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @param {string} path ...
     * 
     * @returns {undefined}
     * @public
     */
    this.add = function(path) {
        m_queue.push(appPath + path);
        m_numFilesApplication++;
    }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    /**
     * ...
     * 
     * @returns {undefined}
     * @private
     */
    function m_construct() {
        if (document.readyState === "complete") m_init();
        else window.addEventListener(
            "load",
            m_init
        );
    }
    
    /**
     * ...
     *
     * @param {Event} event ...
     * 
     * @returns {undefined}
     * @private
     */
    function m_init(event) {
        m_initTime();
        m_initQueue();
        m_initSetup();
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_initTime() {
        m_timestamp = Date.now();
        console.info("RRC: Starting compilation of JavaScript application, please wait.");
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_initQueue() {
        m_initQueueEngine();
        m_initQueueApplication();
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_initQueueEngine() {
        m_queue.push(enginePath + "scope/Manifest.js");
        
        // UTIL
        m_queue.push(enginePath + "util/Math.js");
        m_queue.push(enginePath + "util/DataURL.js");
        m_queue.push(enginePath + "util/Event.js");
        m_queue.push(enginePath + "util/Executable.js");
        m_queue.push(enginePath + "util/Filter.js");
        m_queue.push(enginePath + "util/Stack.js");
        
        // COLOR
        m_queue.push(enginePath + "color/ColorComponent.js");
        m_queue.push(enginePath + "color/Color24.js");
        m_queue.push(enginePath + "color/Color32.js");
        
        // NET
        m_queue.push(enginePath + "net/URLLoader.js");
        m_queue.push(enginePath + "net/URLRequest.js");
        m_queue.push(enginePath + "net/URLResponse.js");
        
        // RESOURCE
        m_queue.push(enginePath + "resource/Cache.js");
        m_queue.push(enginePath + "resource/Encoder.js");
        m_queue.push(enginePath + "resource/Manifest.js");
        m_queue.push(enginePath + "resource/Resources.js");
        m_queue.push(enginePath + "resource/Storage.js");
        
        // GEOM
        m_queue.push(enginePath + "geom/Point.js");
        m_queue.push(enginePath + "geom/Vector2D.js");
        m_queue.push(enginePath + "geom/Rectangle.js");
        
        // INPUT
        m_queue.push(enginePath + "input/gamepad/GamepadsOptions.js");
        m_queue.push(enginePath + "input/gamepad/Gamepad.js");
        m_queue.push(enginePath + "input/gamepad/Gamepads.js");
        m_queue.push(enginePath + "input/keyboard/KeyboardOptions.js");
        m_queue.push(enginePath + "input/keyboard/KeyboardKey.js");
        m_queue.push(enginePath + "input/keyboard/Keyboard.js");
        m_queue.push(enginePath + "input/mouse/MouseOptions.js");
        m_queue.push(enginePath + "input/mouse/MouseButton.js");
        m_queue.push(enginePath + "input/mouse/Mouse.js");
        m_queue.push(enginePath + "input/Inputs.js");
        
        // MEDIA
        m_queue.push(enginePath + "media/sound/Sound.js");
        m_queue.push(enginePath + "media/sound/Sounds.js");
        m_queue.push(enginePath + "media/sound/SoundChannel.js");
        
        // ANIMATION
        m_queue.push(enginePath + "animation/Animation.js");
        m_queue.push(enginePath + "animation/Animations.js");
        
        // DISPLAY
        m_queue.push(enginePath + "display/Quadtree.js");
        m_queue.push(enginePath + "display/Frame.js");
        m_queue.push(enginePath + "display/Canvas.js");
        m_queue.push(enginePath + "display/Graphics.js");
        m_queue.push(enginePath + "display/DisplayObject.js");
        m_queue.push(enginePath + "display/Flicker.js");
        m_queue.push(enginePath + "display/Hitbox.js");
        m_queue.push(enginePath + "display/InteractiveObject.js");
        m_queue.push(enginePath + "display/DisplayObjectContainer.js");
        m_queue.push(enginePath + "display/Texture.js");
        m_queue.push(enginePath + "display/Graphic.js");
        m_queue.push(enginePath + "display/RepeatedGraphic.js");
        m_queue.push(enginePath + "display/Sprite.js");
        m_queue.push(enginePath + "display/Stage.js");
        m_queue.push(enginePath + "display/DisplayGroup.js");
        m_queue.push(enginePath + "display/DisplayGroups.js");
        
        // TEXT
        m_queue.push(enginePath + "text/bitmapfont/BitmapFormat.js");
        m_queue.push(enginePath + "text/bitmapfont/BitmapField.js");
        
        // GAME
        m_queue.push(enginePath + "game/basic/Entity.js");
        
        // PHYSICS
        m_queue.push(enginePath + "physics/Velocity.js");
        m_queue.push(enginePath + "physics/Body.js");
        m_queue.push(enginePath + "physics/Space.js");
        
        // TILEMAP
        m_queue.push(enginePath + "tilemap/Tile.js");
        m_queue.push(enginePath + "tilemap/Tiles.js");
        m_queue.push(enginePath + "tilemap/TilemapLayer.js");
        m_queue.push(enginePath + "tilemap/TilemapLayers.js");
        m_queue.push(enginePath + "tilemap/Tilemap.js");
        
        // SCREEN
        m_queue.push(enginePath + "screen/Screen.js");
        
        // STATE
        m_queue.push(enginePath + "state/State.js");
        m_queue.push(enginePath + "state/States.js");
        
        // CAMERA
        m_queue.push(enginePath + "camera/CameraViewport.js");
        m_queue.push(enginePath + "camera/CameraTint.js");
        m_queue.push(enginePath + "camera/CameraTintTween.js");
        m_queue.push(enginePath + "camera/CameraFade.js");
        m_queue.push(enginePath + "camera/CameraFlash.js");
        m_queue.push(enginePath + "camera/CameraShake.js");
        m_queue.push(enginePath + "camera/CameraTargets.js");
        m_queue.push(enginePath + "camera/Camera.js");
        m_queue.push(enginePath + "camera/Cameras.js");
        
        // TIMER
        m_queue.push(enginePath + "timer/TimerOptions.js");
        m_queue.push(enginePath + "timer/Timer.js");
        m_queue.push(enginePath + "timer/Timers.js");
        
        // TWEEN
        m_queue.push(enginePath + "tween/transition/Back.js");
        m_queue.push(enginePath + "tween/transition/Bounce.js");
        m_queue.push(enginePath + "tween/transition/Circular.js");
        m_queue.push(enginePath + "tween/transition/Cubic.js");
        m_queue.push(enginePath + "tween/transition/Expo.js");
        m_queue.push(enginePath + "tween/transition/Linear.js");
        m_queue.push(enginePath + "tween/transition/Quad.js");
        m_queue.push(enginePath + "tween/transition/Quart.js");
        m_queue.push(enginePath + "tween/transition/Quint.js");
        m_queue.push(enginePath + "tween/transition/Sine.js");
        m_queue.push(enginePath + "tween/TweenProp.js");
        m_queue.push(enginePath + "tween/Tween.js");
        m_queue.push(enginePath + "tween/Tweens.js");
        
        // SCENE
        m_queue.push(enginePath + "scene/Scene.js");
        m_queue.push(enginePath + "scene/Scenes.js");
        
        // UI
        m_queue.push(enginePath + "ui/cursor/MouseCursor.js");
        m_queue.push(enginePath + "ui/progressbar/Progressbar.js");
        m_queue.push(enginePath + "ui/console/ConsoleManager.js");
        m_queue.push(enginePath + "ui/console/ConsoleCommands.js");
        m_queue.push(enginePath + "ui/console/ConsoleCommand.js");
        m_queue.push(enginePath + "ui/console/ConsoleHistory.js");
        m_queue.push(enginePath + "ui/console/ConsoleCursor.js");
        m_queue.push(enginePath + "ui/console/ConsoleOutput.js");
        m_queue.push(enginePath + "ui/console/ConsoleInput.js");
        m_queue.push(enginePath + "ui/console/Console.js");
        m_queue.push(enginePath + "ui/debug/Memory.js");
        m_queue.push(enginePath + "ui/debug/RenderBudget.js");
        m_queue.push(enginePath + "ui/debug/UpdateBudget.js");
        m_queue.push(enginePath + "ui/debug/FramerateHistogramBar.js");
        m_queue.push(enginePath + "ui/debug/FramerateHistogram.js");
        m_queue.push(enginePath + "ui/debug/Framerate.js");
        m_queue.push(enginePath + "ui/debug/Debugger.js");
        m_queue.push(enginePath + "ui/button/Button.js");
        m_queue.push(enginePath + "ui/button/TextButton.js");
        m_queue.push(enginePath + "ui/counter/CounterDigit.js");
        m_queue.push(enginePath + "ui/counter/Counter.js");
        
        // DATA
        m_queue.push(enginePath + "data/highscore/Highscores.js");
        m_queue.push(enginePath + "data/graphics/LogoIcon.js");
        m_queue.push(enginePath + "data/graphics/LogoText.js");
        m_queue.push(enginePath + "data/manifest/EngineManifest.js");
        m_queue.push(enginePath + "data/scene/SceneBoot.js");
        m_queue.push(enginePath + "data/scene/SceneBootDebug.js");
        
        // SYSTEM
        m_queue.push(enginePath + "system/Config.js");
        m_queue.push(enginePath + "system/Time.js");
        m_queue.push(enginePath + "system/Main.js");

        m_queue.push(enginePath + "scope/Alias.js");

        m_numFilesEngine = m_queue.length;
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_initQueueApplication() {
        if (typeof init === "function") {
            init.call(m_this);
        }
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_initSetup() {
        if (m_queue.length > 0) m_beginLoadOfNextScript();
        else m_executeCallback();
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_beginLoadOfNextScript() {
        if (m_queue.length > 0) {
            m_loadScript(
                m_queue[0],
                function() {
                    m_queue.shift();
                    m_initSetup();
                }
            );
        }
    }

    /**
     * ...
     *
     * @param {string} path ...
     * @param {function} callback ...
     *
     * @returns {undefined}
     * @private
     */
    function m_loadScript(path, callback) {
        var script = document.createElement("script");
            script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback(script);
                }
            };
        } else {
            script.onload = function(event) {
                callback(script);
            };
        }

        script.src = path;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    /**
     * ...
     *
     * @returns {undefined}
     * @private
     */
    function m_executeCallback() {
        if (typeof complete === "function") {
            complete.call(window);
        }

        var toc = Date.now() - m_timestamp;
        var ncf = (m_numFilesEngine + m_numFilesApplication);

        console.log("RRC: Found " + m_numFilesEngine + " engine files.");
        console.log("RRC: Found " + m_numFilesApplication + " application files.");
        console.log("RRC: Compilation completed, " + ncf + " files processed in " + toc + " ms.");
    }

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    m_construct();
});