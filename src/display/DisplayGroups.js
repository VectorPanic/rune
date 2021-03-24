
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Represents a manager for DisplayGroups.
 */
rune.display.DisplayGroups = function() {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * List of available groups.
     *
     * @type {Array.<rune.display.DisplayGroup>}
     * @protected
     * @ignore
     */
    this.m_groups = [];
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Adds a new group. 
 *
 * @param {rune.display.DisplayGroup} group Group to add.
 *
 * @return {rune.display.DisplayGroup}
 */
rune.display.DisplayGroups.prototype.add = function(group) {
    var index = this.m_groups.indexOf(group);
    if (index === -1) {
        this.m_groups.push(group);
        group.init();
    }

    return group;
};

/**
 * Creates a new group.
 *
 * @param {rune.display.DisplayObjectContainer} [target] Group target.
 *
 * @return {rune.display.DisplayGroup} Newly created group.
 */
rune.display.DisplayGroups.prototype.create = function(target) {
    var group = new rune.display.DisplayGroup(target || rune.display.DisplayObject.stage);
    this.m_groups.push(group);
    group.init();

    return group;
};

/**
 * Removes a group.
 *
 * @param {rune.display.DisplayGroup} group Group to remove.
 * @param {boolean} [dispose=false] If the group is to be disposed.
 *
 * @return {rune.display.DisplayGroup}
 */
rune.display.DisplayGroups.prototype.remove = function(group, dispose) {
    var index = this.m_groups.indexOf(group);
    if (index > -1) {
        this.m_groups.splice(index, 1);
        
        if (dispose === true) {
            group.dispose();
            group = null;
            
            return null;
        }
    }

    return group;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates all active groups.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 */
rune.display.DisplayGroups.prototype.update = function(step) {
    this.m_updateGroups(step);
};

/**
 * Dispossess this object.
 *
 * @return {undefined}
 */
rune.display.DisplayGroups.prototype.dispose = function() {
    this.m_disposeGroups();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * The class constructor.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroups.prototype.m_construct = function() {
    this.m_constructGroups();
};

/**
 * Create list for groups. 
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroups.prototype.m_constructGroups = function() {
    this.m_disposeGroups();
    if (this.m_groups == null) {
        this.m_groups = [];
    }
};

/**
 * Updates all active groups.
 *
 * @param {number} step Current time step.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroups.prototype.m_updateGroups = function(step) {
    var groups = this.m_groups;
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].active == true) {
            groups[i].update(step);
        }
    }
};

/**
 * Delete all groups.
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.DisplayGroups.prototype.m_disposeGroups = function() {
    if (this.m_groups != null) {
        while (this.m_groups.length > 0) {
            this.m_groups[0].dispose();
            this.m_groups[0] = null;
            this.m_groups.splice(0, 1);
        }
        
        this.m_groups = null;
    }
};