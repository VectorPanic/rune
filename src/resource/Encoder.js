//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.resource.Encoder = function() {
    console.warn("This class is not meant to be instantiated; all content is static.");
};

//------------------------------------------------------------------------------
// Public static methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {string} data ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @throws {Error} ...
 *
 * @returns {undefined}
 */
rune.resource.Encoder.encode = function(data, callback, scope) {
    switch (rune.util.DataURL.getContentTypeOfDataURL(data)) {
        case "audio/x-wav":
        case "audio/mpeg":
        case "audio/wav":
            rune.resource.Encoder.encodeAudio(data, callback, scope);
            break;

        case "image/jpeg":
        case "image/png":
        case "image/gif":
            rune.resource.Encoder.encodeImage(data, callback, scope);
            break;

        case "application/json":
            rune.resource.Encoder.encodeJSON(data, callback, scope);
            break;

        default:
            console.log(rune.util.DataURL.getContentTypeOfDataURL(data));
            throw new Error("Unsupported media type.");
            break;
    }
};

/**
 * TODO: ...
 *
 * @param {string} data ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @returns {undefined}
 */
rune.resource.Encoder.encodeAudio = function(data, callback, scope) {
    var audio = new Audio(data);
    audio.setAttribute("preload", "auto");
    rune.util.Event.addEventListener(
        audio,
        "canplaythrough",
        function() {
            callback.call(scope, audio);
        },
        {
            once: true
        },
        false,
        this
    );
};

/**
 * TODO: ...
 *
 * @param {string} data ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @returns {undefined}
 */
rune.resource.Encoder.encodeImage = function(data, callback, scope) {
    var img = new Image();
        img.decoding = "sync";
        img.src = data;
        img.onload = function() {
            callback.call(scope, img);
            img.onload = null;
        };
};

/**
 * TODO: ...
 *
 * @param {string} data ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @returns {undefined}
 */
rune.resource.Encoder.encodeJSON = function(data, callback, scope) {
    var str = data.replace(/^data:application\/json;base64,/, "");
    var obj = JSON.parse(atob(str));

    callback.call(scope, obj);
};

/**
 * TODO: ...
 *
 * @param {string} data ...
 * @param {Function} callback ...
 * @param {Object} scope ...
 *
 * @returns {undefined}
 */
rune.resource.Encoder.encodeFont = function(data, callback, scope) {
    console.warn("TODO: ...");
};