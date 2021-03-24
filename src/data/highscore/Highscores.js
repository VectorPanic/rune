//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @param {string} id Used to allocate a location in localStorage.
 * @param {number} tables The number of tables to be allocated.
 * @param {number} length The length of each table.
 *
 * @class
 * @classdesc
 * 
 * Represents one or more high-score tables. A high score consists of name, 
 * score and date (unix timestamp) and is sorted in numerical descending order 
 * based on score.
 */
rune.data.Highscores = function(id, tables, length) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * High score data.
     *
     * @type {Array}
     * @private
     */
    this.m_data = null;
    
    /**
     * Used to allocate a location in localStorage.
     *
     * @type {string}
     * @private
     */
    this.m_id = id;
    
    /**
     * The length of each table.
     *
     * @type {number}
     * @private
     */
    this.m_length = length || 10;
    
    /**
     * The number of tables that need to be allocated.
     *
     * @type {number}
     * @private
     */
    this.m_tables = tables || 1;
    
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
 * Removes all high scores associated with this application. Note that this 
 * operation cannot be undone. 
 *
 * @return {undefined}
 */
rune.data.Highscores.prototype.clear = function() {
    window.localStorage.removeItem(this.m_id + ".highscore");
    this.m_constructData();
};

/**
 * Gets a specific high score based on ranking. Note that first places start 
 * with index 0 and not 1.
 *
 * @param {number} ranking Requested ranking.
 * @param {number} [table=0] Which table the data should be retrieved from.
 *
 * @return {Object}
 */
rune.data.Highscores.prototype.get = function(ranking, table) {
    table = table || 0;
    return this.m_data[table][ranking];
};

/**
 * Saves all high-score data in the device's LocalStorage.
 *
 * @return {undefined}
 */
rune.data.Highscores.prototype.save = function() {
    window.localStorage.setItem(this.m_id + ".highscore", JSON.stringify(this.m_data));
};

/**
 * Tests whether a score can qualify as a high score. The method returns the 
 * raking of the score in the form of an integer. The result -1 indicates that 
 * the score is outside the scope of the current high score table and thus not 
 * a high score. Note that a test does not affect the current high score list, 
 * nothing is saved or deleted when a test is performed.
 *
 * @param {number} score Score to test.
 * @param {number} [table=0] Table to test against.
 *
 * @return {number} Current ranking on the highscore list.
 */
rune.data.Highscores.prototype.test = function(score, table) {
    table = table || 0;
    for (var i = 0; i < this.m_data[table].length; i++) {
        if (score > this.m_data[table][i].score) {
            return i;
        }
    }
    
    return -1;
};

/**
 * Sends data to the highscore list. The data is saved if it qualifies as a 
 * highscore.
 *
 * @param {number} score Score to save.
 * @param {string} [name] Name of score holder.
 * @param {number} [table=0] Which table to use.
 *
 * @return {number} Current ranking on the highscore list.
 */
rune.data.Highscores.prototype.send = function(score, name, table) {
    table = table || 0;
    var index = this.test(score, table);
    if (index > -1) {
        this.m_data[table].splice(index, 0, {
            name: name || "Rune",
            score: score,
            date: Date.now()
        });
        
        this.m_data[table].length = this.m_length;
        this.save();
    }
    
    return index;
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Initiates deallocation of this object.
 *
 * @return {undefined}
 */
rune.data.Highscores.prototype.dispose = function() {
    this.m_data = null;
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
rune.data.Highscores.prototype.m_construct = function() {
    this.m_constructData();
};

/**
 * Retrieves highscore data from LocalStorage. If no valid data can be 
 * retrieved, a new one is created.
 *
 * @return {undefined}
 * @protected
 * @ignore
 * @suppress {checkTypes}
 */
rune.data.Highscores.prototype.m_constructData = function() {
    this.m_data = JSON.parse(window.localStorage.getItem(this.m_id + ".highscore"));
    if (this.m_validate(this.m_data) == false) {
        this.m_data = [];
        for (var i = 0; i < this.m_tables; i++) {
            this.m_data.push(this.m_constructTable(this.m_length));
        }
            
        this.save();
    }
};

/**
 * Creates a new table.
 *
 * @param {number} [length] Length of table.
 *
 * @return {Array}
 * @protected
 * @ignore
 */
rune.data.Highscores.prototype.m_constructTable = function(length) {
    length = parseInt(length, 10) || this.m_length;
    var table = [];
    while (table.length < length) {
        table.push({
            name: "Rune",
            score: 0,
            date: Date.now()
        });
    }
    
    return table;
};

/**
 * Creates a new table. 
 *
 * @param {Array} data Data to validate.
 *
 * @return {boolean}
 * @protected
 * @ignore
 */
rune.data.Highscores.prototype.m_validate = function(data) {
    if (Array.isArray(data)) {
        if (data.length == this.m_tables) {
            for (var i = 0; i < data.length; i++) {
                if (!Array.isArray(data[i]) || data[i].length != this.m_length) {
                    return false;
                }
            }
            
            return true;
        }
    }
    
    return false;
};