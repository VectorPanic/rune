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
rune.util.Filter = function() {
    console.warn("This class is not meant to be instantiated.");
};

//--------------------------------------------------------------------------
// Public static methods
//--------------------------------------------------------------------------

/**
 * ...
 * 
 * @param {Object} element ...
 * @param {number} [index] ...
 * @param {Array} [array] ...
 * @param {Object} [thisArg] ...
 * 
 * @returns {boolean} ...
 */
rune.util.Filter.unique = function(element, index, array, thisArg) {
    return array.indexOf(element) === index;
};