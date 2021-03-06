#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level VERBOSE \
--compilation_level SIMPLE_OPTIMIZATIONS \
--isolation_mode IIFE \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/util/Math.js" \
--js "./../../src/util/DataURL.js" \
--js "./../../src/util/Event.js" \
--js "./../../src/util/Executable.js" \
--js "./../../src/util/Filter.js" \
--js "./../../src/util/Stack.js" \
--js "./../../src/color/ColorComponent.js" \
--js "./../../src/color/Color24.js" \
--js "./../../src/color/Color32.js" \
--js "./../../src/net/URLLoader.js" \
--js "./../../src/net/URLRequest.js" \
--js "./../../src/net/URLResponse.js" \
--js "./../../src/resource/Cache.js" \
--js "./../../src/resource/Encoder.js" \
--js "./../../src/resource/Manifest.js" \
--js "./../../src/resource/Resources.js" \
--js "./../../src/resource/Storage.js" \
--js "./../../src/geom/Point.js" \
--js "./../../src/geom/Vector2D.js" \
--js "./../../src/geom/Rectangle.js" \
--js "./../../src/input/gamepad/GamepadsOptions.js" \
--js "./../../src/input/gamepad/Gamepad.js" \
--js "./../../src/input/gamepad/Gamepads.js" \
--js "./../../src/input/keyboard/KeyboardOptions.js" \
--js "./../../src/input/keyboard/KeyboardKey.js" \
--js "./../../src/input/keyboard/Keyboard.js" \
--js "./../../src/input/mouse/MouseOptions.js" \
--js "./../../src/input/mouse/MouseButton.js" \
--js "./../../src/input/mouse/Mouse.js" \
--js "./../../src/input/Inputs.js" \
--js "./../../src/media/sound/Sound.js" \
--js "./../../src/media/sound/Sounds.js" \
--js "./../../src/media/sound/SoundChannel.js" \
--js "./../../src/animation/Animation.js" \
--js "./../../src/animation/Animations.js" \
--js "./../../src/display/Quadtree.js" \
--js "./../../src/display/Frame.js" \
--js "./../../src/display/Canvas.js" \
--js "./../../src/display/Graphics.js" \
--js "./../../src/display/DisplayObject.js" \
--js "./../../src/display/Flicker.js" \
--js "./../../src/display/Hitbox.js" \
--js "./../../src/display/InteractiveObject.js" \
--js "./../../src/display/DisplayObjectContainer.js" \
--js "./../../src/display/Texture.js" \
--js "./../../src/display/Graphic.js" \
--js "./../../src/display/RepeatedGraphic.js" \
--js "./../../src/display/Sprite.js" \
--js "./../../src/display/Stage.js" \
--js "./../../src/display/DisplayGroup.js" \
--js "./../../src/display/DisplayGroups.js" \
--js "./../../src/text/bitmapfont/BitmapFormat.js" \
--js "./../../src/text/bitmapfont/BitmapField.js" \
--js "./../../src/game/basic/Entity.js" \
--js "./../../src/physics/Velocity.js" \
--js "./../../src/physics/Body.js" \
--js "./../../src/physics/Space.js" \
--js "./../../src/tilemap/Tile.js" \
--js "./../../src/tilemap/Tiles.js" \
--js "./../../src/tilemap/TilemapLayer.js" \
--js "./../../src/tilemap/TilemapLayers.js" \
--js "./../../src/tilemap/Tilemap.js" \
--js "./../../src/screen/Screen.js" \
--js "./../../src/state/State.js" \
--js "./../../src/state/States.js" \
--js "./../../src/camera/CameraViewport.js" \
--js "./../../src/camera/CameraTint.js" \
--js "./../../src/camera/CameraTintTween.js" \
--js "./../../src/camera/CameraFade.js" \
--js "./../../src/camera/CameraFlash.js" \
--js "./../../src/camera/CameraShake.js" \
--js "./../../src/camera/CameraTargets.js" \
--js "./../../src/camera/Camera.js" \
--js "./../../src/camera/Cameras.js" \
--js "./../../src/timer/TimerOptions.js" \
--js "./../../src/timer/Timer.js" \
--js "./../../src/timer/Timers.js" \
--js "./../../src/tween/transition/Back.js" \
--js "./../../src/tween/transition/Bounce.js" \
--js "./../../src/tween/transition/Circular.js" \
--js "./../../src/tween/transition/Cubic.js" \
--js "./../../src/tween/transition/Expo.js" \
--js "./../../src/tween/transition/Linear.js" \
--js "./../../src/tween/transition/Quad.js" \
--js "./../../src/tween/transition/Quart.js" \
--js "./../../src/tween/transition/Quint.js" \
--js "./../../src/tween/transition/Sine.js" \
--js "./../../src/tween/TweenProp.js" \
--js "./../../src/tween/Tween.js" \
--js "./../../src/tween/Tweens.js" \
--js "./../../src/scene/Scene.js" \
--js "./../../src/scene/Scenes.js" \
--js "./../../src/ui/cursor/MouseCursor.js" \
--js "./../../src/ui/progressbar/Progressbar.js" \
--js "./../../src/ui/console/ConsoleManager.js" \
--js "./../../src/ui/console/ConsoleCommands.js" \
--js "./../../src/ui/console/ConsoleCommand.js" \
--js "./../../src/ui/console/ConsoleHistory.js" \
--js "./../../src/ui/console/ConsoleCursor.js" \
--js "./../../src/ui/console/ConsoleOutput.js" \
--js "./../../src/ui/console/ConsoleInput.js" \
--js "./../../src/ui/console/Console.js" \
--js "./../../src/ui/debug/Memory.js" \
--js "./../../src/ui/debug/RenderBudget.js" \
--js "./../../src/ui/debug/UpdateBudget.js" \
--js "./../../src/ui/debug/FramerateHistogramBar.js" \
--js "./../../src/ui/debug/FramerateHistogram.js" \
--js "./../../src/ui/debug/Framerate.js" \
--js "./../../src/ui/debug/Debugger.js" \
--js "./../../src/ui/button/Button.js" \
--js "./../../src/ui/button/TextButton.js" \
--js "./../../src/ui/counter/CounterDigit.js" \
--js "./../../src/ui/counter/Counter.js" \
--js "./../../src/data/highscore/Highscores.js" \
--js "./../../src/data/graphics/LogoIcon.js" \
--js "./../../src/data/graphics/LogoText.js" \
--js "./../../src/data/manifest/EngineManifest.js" \
--js "./../../src/data/scene/SceneBoot.js" \
--js "./../../src/data/scene/SceneBootDebug.js" \
--js "./../../src/system/Config.js" \
--js "./../../src/system/Time.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/rune.js";