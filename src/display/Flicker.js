//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 *
 * @param {rune.display.DisplayObject} obj ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rune.display.Flicker = function(obj) {

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {boolean}
     */
    this.m_active = false;
    
    /**
     * ...
     *
     * @type {rune.display.DisplayObject}
     * @protected
     * @ignore
     */
    this.m_displayObject = obj;

    /**
     * ...
     *
     * @type {number}
     */
    this.m_duration = 0;

    /**
     * ...
     *
     * @type {number}
     */
    this.m_frequency = 0;

    /**
     * ...
     *
     * @type {number}
     */
    this.m_frequencyTicker = 0;

    /**
     * ...
     *
     * @type {rune.util.Executable}
     */
    this.m_onComplete = null;

    /**
     * ...
     *
     * @type {boolean}
     */
    this.m_visible = true;
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {boolean} active
 * @memberof rune.display.Flicker
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Flicker.prototype, "active", {
    /**
     * ...
     * 
     * @this rune.display.Flicker
     * @ignore
     */
    get : function() {
        return this.m_active;
    }
});

/**
 * ...
 *
 * @member {boolean} visible
 * @memberof rune.display.Flicker
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Flicker.prototype, "visible", {
    /**
     * ...
     * 
     * @this rune.display.Flicker
     * @ignore
     */
    get : function() {
        return this.m_visible;
    }
});

//------------------------------------------------------------------------------
// Public methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @param {number} [duration=3000] ...
 * @param {number} [frequency=64] ...
 * @param {Function} [onComplete]  ...
 * @param {Object} [scope] ...
 *
 * @returns {undefined}
 */
rune.display.Flicker.prototype.start = function(duration, frequency, onComplete, scope) {
    this.m_active     = true;
    this.m_duration   = (duration  || 500);
    this.m_frequency  = (frequency || 60);
    this.m_onComplete = new rune.util.Executable(onComplete, scope);
    this.m_visible    = false;
};

/**
 * ...
 *
 * @param {boolean} [exec] ...
 *
 * @returns {undefined}
 */
rune.display.Flicker.prototype.stop = function(exec) {
    this.m_active    = false;
    this.m_duration  = 0;
    this.m_frequency = 0;

    if (this.m_onComplete != null && exec === true) {
        this.m_onComplete.execute();
        this.m_onComplete.dispose();
        this.m_onComplete = null;
    }
};

//------------------------------------------------------------------------------
// Public methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @returns {undefined}
 */
rune.display.Flicker.prototype.init = function() {
    
};

/**
 * ...
 * 
 * @param {number} step ...
 *
 * @returns {undefined}
 */
rune.display.Flicker.prototype.update = function(step) {
    if (this.m_active === true) {
        if (this.m_duration > 0) {
            this.m_duration -= step;
            this.m_frequencyTicker += step;
            if (this.m_frequencyTicker > this.m_frequency) {
                this.m_frequencyTicker = 0;
                this.m_visible = !this.m_visible;
                
                if (this.m_displayObject['parent'] != null) {
                    this.m_displayObject['parent'].breakCache();
                }
            }     
        } else {
            this.m_active = false;
            this.m_visible = true;
            if (this.m_onComplete != null) {
                this.m_onComplete.execute();
                this.m_onComplete.dispose();
                this.m_onComplete = null;
            }
        }
    }
};

/**
 * ...
 * 
 * @returns {undefined}
 */
rune.display.Flicker.prototype.dispose = function() {
    
};