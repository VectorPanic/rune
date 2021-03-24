//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {rune.display.DisplayObject} obj
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.display.Graphics = function(obj) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     *
     * @type {rune.display.DisplayObject}
     * @private
     */
    this.m_displayObject = obj;
    
    /**
     * TODO: ...
     *
     * @type {rune.util.Stack}
     * @private
     */
    this.m_queue = null;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.clear = function() {
    this.m_queue.clear();
};

/**
 * TODO: ...
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} r ...
 * @param {number} sa ...
 * @param {number} ea ...
 * @param {number} c ...
 * @param {number} s ...
 * @param {number} a ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawArc = function(x, y, r, sa, ea, c, s, a) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawArc, scope, [x, y, r, sa, ea, c, s, a]);
    }
};

/**
 * TODO: ...
 *
 * @param {string} c ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawFill = function(c) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawFill, scope, [c]);
    }
};

/**
 * TODO: ...
 *
 * @param {HTMLImageElement} img ...
 * @param {number} ox ...
 * @param {number} oy ...
 * @param {number} ow ...
 * @param {number} oh ...
 * @param {number} [cx] ...
 * @param {number} [cy] ...
 * @param {number} [cw] ...
 * @param {number} [ch] ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawImage = function(img, ox, oy, ow, oh, cx, cy, cw, ch) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawImage, scope, [img, ox, oy, ow, oh, cx, cy, cw, ch]);
    }
};

/**
 * TODO: ...
 *
 * @param {HTMLImageElement} img ...
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} w ...
 * @param {number} h ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawImageFill = function(img, x, y, w, h) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawImageFill, scope, [img, x, y, w, h]);
    }
};

/**
 * TODO: ...
 *
 * @param {number} x1 ...
 * @param {number} y1 ...
 * @param {number} x2 ...
 * @param {number} y2 ...
 * @param {number} c ...
 * @param {number} s ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawLine = function(x1, y1, x2, y2, c, s) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawLine, scope, [x1, y1, x2, y2, c, s]);
    }
};

/**
 * TODO: ...
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} w ...
 * @param {number} h ...
 * @param {number} c ...
 * @param {number} s ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawRect = function(x, y, w, h, c, s) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawRect, scope, [x, y, w, h, c, s]);
    }
};

/**
 * TODO: ...
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} w ...
 * @param {number} h ...
 * @param {number} c ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.drawRectFill = function(x, y, w, h, c) {
    if (this.m_displayObject != null) {
        this.m_displayObject.breakCache();
        var scope = this.m_displayObject["canvas"];
        this.m_queue.add(scope.drawRectFill, scope, [x, y, w, h, c]);
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.dispose = function() {
    this.m_disposeQueue();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.Graphics.prototype.render = function() {
    this.m_renderQueue();
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.Graphics.prototype.m_construct = function() {
    this.m_constructQueue();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.display.Graphics.prototype.m_constructQueue = function() {
    this.m_disposeQueue();
    if (this.m_queue == null) {
        this.m_queue = new rune.util.Stack();
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.display.Graphics.prototype.m_renderQueue = function() {
    if (this.m_queue != null) {
        this.m_queue.execute();
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @private
 */
rune.display.Graphics.prototype.m_disposeQueue = function() {
    if (this.m_queue instanceof rune.util.Stack) {
        this.m_queue.dispose();
        this.m_queue = null;
    }
};