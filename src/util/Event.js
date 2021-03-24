//------------------------------------------------------------------------------
// Public static class
//------------------------------------------------------------------------------

/**
 * Since the class is static; the class constructor should never be 
 * executed during runtime.
 *
 * @class
 * @classdesc
 *
 * Static class for uniform handling of events, between most 
 * browsers.
 */
rune.util.Event = function() {
    console.warn("This class is not meant to be instantiated.");
};

//------------------------------------------------------------------------------
// WINDOW EVENTS
//------------------------------------------------------------------------------

/**
 * The load event is fired when a resource and its dependent resources 
 * have finished loading.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.LOAD = "load";

/**
 * The document view has been resized.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.RESIZE = "resize";

/**
 * The document or a dependent resource is being unloaded.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.UNLOAD = "unload";

//------------------------------------------------------------------------------
// DOCUMENT & XHR EVENTS
//------------------------------------------------------------------------------

/**
 * The readystatechange event is fired when the readyState attribute 
 * of a document has changed.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.READY_STATE_CHANGE = "readystatechange";

/**
 * The error event is fired when an error occurred; the exact 
 * circumstances vary, events by this name are used from a variety 
 * of APIs.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.ERROR = "error";

/**
 * The loading of a resource has been aborted.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.ABORT = "abort";

/**
 * Progression is terminated due to preset time expiring.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.TIMEOUT = "timeout";

/**
 * The progress event is fired to indicate that an operation is 
 * in progress.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.PROGRESS = "progress";

//------------------------------------------------------------------------------
// KEYBOARD EVENTS
//------------------------------------------------------------------------------

/**
 * ANY key is pressed.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.KEY_DOWN = "keydown";

/**
 * ANY key except Shift, Fn, CapsLock is in pressed position.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.KEY_PRESS = "keypress";

/**
 * ANY key is released.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.KEY_UP = "keyup";

//------------------------------------------------------------------------------
// MOUSE EVENTS
//------------------------------------------------------------------------------

/**
 * A pointing device button (ANY button; soon to be primary button only) 
 * has been pressed and released on an element.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.CLICK = "click";

/**
 * The right button of the mouse is clicked (before the context menu is 
 * displayed).
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.CONTEXTMENU = "contextmenu";

/**
 * A pointing device button is clicked twice on an element. 
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.DBL_CLICK = "dblclick";

/**
 * A pointing device button is pressed on an element.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.MOUSE_DOWN = "mousedown";

/**
 * The mousemove event is fired when a pointing device (usually a mouse) 
 * is moved while over an element.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.MOUSE_MOVE = "mousemove";

/**
 * A pointing device is moved off the element that has the listener 
 * attached or off one of its children.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.MOUSE_OUT = "mouseout";

/**
 * The mouseover event is fired when a pointing device is moved onto 
 * the element that has the listener attached or onto one of its 
 * children.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.MOUSE_OVER = "mouseover";

/**
 * A pointing device is moved onto the element that has the listener 
 * attached or onto one of its children.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.MOUSE_UP = "mouseup";

/**
 * A wheel button of a pointing device is rotated in any direction.
 *
 * @type {string}
 * @constant
 * @default
 */
rune.util.Event.MOUSE_WHEEL = "mousewheel";

//------------------------------------------------------------------------------
// Internal static constants
//------------------------------------------------------------------------------

/**
 * Invalid argument error message.
 *
 * @constant {string}
 * @private
 */
rune.util.Event.ERROR_DESC_ARGUMENT = "Argument must be of valid Event type.";

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * The EventTarget method addEventListener() sets up a function that will 
 * be called whenever the specified event is delivered to the target. Common 
 * targets are Element, Document, and Window, but the target may be any 
 * object that supports events (such as XMLHttpRequest).
 *
 * @param {Object} target Object that applies the current event listener.
 * @param {string} type Case-sensitive string representing the event type to listen for (Use static class constants for this).
 * @param {function(Event)} listener The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs. This must be an object implementing the EventListener interface, or a JavaScript function.
 * @param {Object} [options] An options object that specifies characteristics about the event listener.
 * @param {boolean} [useCapture] Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
 * @param {Object} [scope] The scope that the listener executes within.
 *
 * @returns {function(Event)} Event handler object.
 */
rune.util.Event.addEventListener = function(target, type, listener, options, useCapture, scope) {
    var handler = listener;
    useCapture = useCapture || false;
    scope = scope || this;
    if (target.addEventListener !== undefined) {
        target.addEventListener(type, handler = function(event) {
            listener.call(scope, event);
        }, options, useCapture);
    } else if (target.attachEvent !== undefined) {
        target.attachEvent("on" + type, listener);
    } else {
        target["on" + type] = listener;
    }

    return handler;
};

/**
 * Retrieves a "secure" reference to the current event object. Safe means 
 * that it is copyable with several event systems and web browsers.
 *
 * @throws {Error} Will throw an error if the argument is not an event object.
 *
 * @param {Event} event Default event object.
 *
 * @returns {Event} Safe reference to current Event object.
 */
rune.util.Event.getEvent = function(event) {
    if (event instanceof Event) {
        return event ? event : window.event;
    } else throw new TypeError(rune.util.Event.ERROR_DESC_ARGUMENT);
};

/**
 * Retrieves a "secure" reference to the current event target object. Safe means 
 * that it is copyable with several event systems and web browsers.
 *
 * @throws {Error} Will throw an error if the argument is not an event object.
 *
 * @param {Event} event Default event object.
 *
 * @returns {EventTarget} Safe reference to current Event target object.
 */
rune.util.Event.getTarget = function(event) {
    if (event instanceof Event) {
        return event.target || event.srcElement || window;
    } else throw new TypeError(rune.util.Event.ERROR_DESC_ARGUMENT);
};

/**
 * Offers a "safe" way to prevent the default behavior of an event. Safe means 
 * that it is copyable with several event systems and web browsers.
 *
 * @throws {Error} Will throw an error if the argument is not an event object.
 *
 * @param {Event} event Default event object.
 *
 * @returns {undefined}
 */
rune.util.Event.preventDefault = function(event) {
    if (event instanceof Event) {
        if (event.preventDefault !== undefined) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    } else throw new TypeError(rune.util.Event.ERROR_DESC_ARGUMENT);
};

/**
 * Removes from the EventTarget an event listener previously registered with 
 * EventTarget.addEventListener(). The event listener to be removed is identified 
 * using a combination of the event type, the event listener function itself, and 
 * various optional options that may affect the matching process
 *
 * @param {Object} target ...
 * @param {string} type String which specifies the type of event for which to remove an event listener.
 * @param {Object} listener The EventListener function of the event handler to remove from the event target.
 * @param {Object} [options] An options object that specifies characteristics about the event listener.
 * @param {boolean} [useCapture] Specifies whether the EventListener to be removed is registered as a capturing listener or not. If this parameter is absent, a default value of false is assumed.
 *
 * @returns {undefined}
 */
rune.util.Event.removeEventListener = function(target, type, listener, options, useCapture) {
    useCapture = useCapture || false;
    if (target.removeEventListener !== undefined) {
        target.removeEventListener(type, listener, options, useCapture);
    } else if (target.detachEvent !== undefined) {
        target.detachEvent("on" + type, listener);
    } else {
        target["on" + type] = null;
    }
};

/**
 * Offers a "safe" way to stop propagation. Safe means that it is copyable 
 * with several event systems and web browsers.
 *
 * @throws {Error} Will throw an error if the argument is not an event object.
 *
 * @param {Event} event Default event object.
 *
 * @returns {undefined}
 */
rune.util.Event.stopPropagation = function(event) {
    if (event instanceof Event) {
        if (event.stopPropagation !== undefined) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    } else throw new TypeError(rune.util.Event.ERROR_DESC_ARGUMENT);
};