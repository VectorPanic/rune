//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new instance of the class.
 * 
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Handles lists of scenes. Multiple scenes can be updated simultaneously, but 
 * only the selected one is rendered to the screen. Use scenes to divide parts 
 * of an application based on related logic.
 */
rune.scene.Scenes = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Current batch. A list of current scenes.
     *
     * @type {Array.<rune.scene.Scene>}
     * @private
     */
    this.m_cb = [];
    
    /**
     * Requested batch. A list of requested scenes. Replaces the current batch 
     * at the next tick/frame.
     *
     * @type {Array.<rune.scene.Scene>}
     * @private
     */
    this.m_rb = null;

    /**
     * Selected scene index.
     *
     * @type {number}
     * @private
     */
    this.m_cs = 0;
    
    /**
     * Requested scene index.
     *
     * @type {number}
     * @private
     */
    this.m_rs = 0;
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Reference to currently selected scene.
 *
 * @member {rune.scene.Scene} selected
 * @memberof rune.scene.Scenes
 * @instance
 * @readonly
 */
Object.defineProperty(rune.scene.Scenes.prototype, "selected", {
    /**
     * @this rune.scene.Scenes
     * @ignore
     */
    get : function() {
        return this.m_cb[this.m_cs];
    },
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Load a list containing one or more scenes. This process will destroy current 
 * scenes and replace them with the new ones. Scenes are always loaded at the 
 * beginning of the next tick. Note that the first scene in the list (index 0) 
 * is always set as selected by default.
 *
 * @param {Array.<rune.scene.Scene>} scenes Scenes to be loaded.
 *
 * @throws {Error} If provided scenes cannot be loaded.
 *
 * @returns {undefined}
 */
rune.scene.Scenes.prototype.load = function(scenes) {
    if (Array.isArray(scenes) === true && scenes.length > 0) {
        this.m_rb = scenes;
    } else throw new Error();
};

/**
 * Select a scene from the currently loaded list of scenes. Selection is based 
 * on list index. The change between scenes always takes place at the beginning 
 * of the next tick.
 *
 * @param {number} index List index of requested scene.
 *
 * @throws {RangeError} On invalid list index.
 *
 * @returns {undefined}
 */
rune.scene.Scenes.prototype.select = function(index) {
    var batch = (this.m_rb) ? this.m_rb : this.m_cb;
    if (index > -1 && index < batch.length) {
        if (this.m_cs != index) {
            this.m_rs  = index;
        }
    } else throw new RangeError();
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Update active scenes.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @ignore
 */
rune.scene.Scenes.prototype.update = function(step) {
    this.m_updateBatch(step);
    this.m_updateSelection(step);
    this.m_updateScenes(step);
};

/**
 * Renders the selected scene.
 *
 * @returns {undefined}
 * @ignore
 */
rune.scene.Scenes.prototype.render = function() {
    this.m_renderScenes();
};

/**
 * Removes and clears scenes from memory.
 *
 * @returns {undefined}
 * @ignore
 */
rune.scene.Scenes.prototype.dispose = function() {
    this.m_disposeScenes();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Replaces a previous batch with a new one.
 *
 * @throws {Error} Unless there is a new batch of scenes.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scenes.prototype.m_iniScenes = function() {
    if (this.m_rb != null && this.m_rb.length > 0) {  
        
        this.m_disposeScenes();
        
        this.m_cb = this.m_rb;

        for (var i = 0; i < this.m_cb.length; i++) {
            this.m_cb[i].init();
        }
        
        this.m_rb = null;
        this.m_cb[0].onSelect(null);
    } else throw new Error();
};

/**
 * If there is a requested batch, it should replace the existing one.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scenes.prototype.m_updateBatch = function(step) {
    if (this.m_rb != null) {
        this.m_iniScenes();
    }
};

/**
 * Updates scene selection. Multiple scenes can be initiated simultaneously, 
 * but only one can be selected.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scenes.prototype.m_updateSelection = function(step) {
    if (this.m_cs != this.m_rs) {
        
        var o = this.m_cb[this.m_cs];
        var n = this.m_cb[this.m_rs];
        
        this.m_cs = this.m_rs;
        
        o['onDeselect'](n);
        n['onSelect'](o);
    }
};

/**
 * Updates active scenes.
 *
 * @param {number} step Current time step.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scenes.prototype.m_updateScenes = function(step) {
    if (this.m_cb != null) {
        var l = this.m_cb.length;
        for (var i = 0; i < l; i++) {
            if (i == this.m_cs || this.m_cb[i].persistent == true) {
                this.m_cb[i].update(step);
            }
        }
    }
};

/**
 * Renders the selected scene.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scenes.prototype.m_renderScenes = function() {
    if (this.m_cb != null && this.m_cb.length > this.m_cs) {
        this.m_cb[this.m_cs].render();
    }
};

/**
 * Removes allocated scenes.
 *
 * @returns {undefined}
 * @private
 */
rune.scene.Scenes.prototype.m_disposeScenes = function() {
    if (this.m_cb != null) {
        var i = this.m_cb.length;
        while (i--) {
            this.m_cb[i].dispose();
            this.m_cb[i] = null;
        }
        
        this.m = null;
        this.m_cs = 0;
        
        //rune.system.Main['instance']['sounds'].stop();
    }
};