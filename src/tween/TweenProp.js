//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * TODO: ...
 * 
 * @constructor
 *
 * @param {string} name ...
 * @param {number} [start] ...
 * @param {number} [end] ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.tween.TweenProp = function(name, start, end) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     * 
     * @type {string}
     * @default ""
     */
    this.name = name;

    /**
     * TODO: ...
     * 
     * @type {number}
     * @default 0
     */
    this.start = start || 0;

    /**
     * TODO: ...
     * 
     * @type {number}
     * @default 0
     */
    this.end = end || 0;
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
rune.tween.TweenProp.prototype.dispose = function() {
    //NOTHING; ATM
};

/**
 * ...
 *
 * @returns {string}
 */
rune.tween.TweenProp.prototype.toString = function() {
    return "[{TweenProp (name=" + this['name'] + " start=" + this['start'] + " end=" + this['end']  + ")}]";
};