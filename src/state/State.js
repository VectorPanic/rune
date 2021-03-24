//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new state.
 *
 * @constructor
 *
 * @param {string} [name=undefined] Unique (descriptive) identifier.
 * 
 * @class
 * @classdesc
 * 
 * Represents the current state of an object. Used to separate logic that 
 * relates to a specific state, such as "Standing", "Walking", or "Jumping".
 */
rune.state.State = function(name) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Represents a unique ID for the current state.
     *
     * @type {string}
     * @private
     */
    this.m_name = name || "undefined";

    /**
     * Reference to the object that is in the current state.
     *
     * @type {Object}
     * @private
     */
    this.m_owner = null;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Represents a unique ID for the current state.
 *
 * @member {string} name
 * @memberof rune.state.State
 * @instance
 * @readonly
 */
Object.defineProperty(rune.state.State.prototype, "name", {
    /**
     * @this rune.state.State
     * @ignore
     */
    get : function() {
        return this.m_name;
    }
});

/**
 * Reference to the object that is in the current state.
 *
 * @member {Object} owner
 * @memberof rune.state.State
 * @instance
 * @readonly
 */
Object.defineProperty(rune.state.State.prototype, "owner", {
    /**
     * @this rune.state.State
     * @ignore
     */
    get : function() {
        return this.m_owner;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Is activated when the state machine selects the current state.
 *
 * @param {rune.state.State} state The old state.
 *
 * @return {undefined}
 */
rune.state.State.prototype.onEnter = function(state) {
    //OVERRIDE
};

/**
 * Is activated when the state machine switches to another state.
 *
 * @param {rune.state.State} state The new state.
 *
 * @return {undefined}
 */
rune.state.State.prototype.onExit = function(state) {
    //OVERRIDE
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Called when the state is initiated by the state machine.
 *
 * @return {undefined}
 */
rune.state.State.prototype.init = function() {
    //OVERRIDE
};

/**
 * Called for each active frame.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 */
rune.state.State.prototype.update = function(step) {
    //OVERRIDE
};

/**
 * If a state needs to draw graphics, it is done via this method.
 *
 * @return {undefined}
 */
rune.state.State.prototype.render = function() {
    //OVERRIDE
};

/**
 * Called when the state machine discards the current state. If the state 
 * initiates its own objects, they must be deallocated using this method.
 *
 * @return {undefined}
 */
rune.state.State.prototype.dispose = function() {
    //OVERRIDE
};

//------------------------------------------------------------------------------
// Internal prototype methods
//------------------------------------------------------------------------------

/**
 * Assign the object that owns the current state.
 *
 * @param {Object} owner The state owner.
 *
 * @return {undefined}
 * @package
 * @ignore
 */
rune.state.State.prototype.setOwner = function(owner) {
    this.m_owner = owner;
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Class constructor
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.state.State.prototype.m_construct = function() {
    //OVERRIDE
};