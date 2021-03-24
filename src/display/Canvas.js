//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @constructor
 *
 * @param {number} [width] ...
 * @param {number} [height] ...
 *
 * @class
 * @classdesc
 * 
 * TODO: ...
 */
rune.display.Canvas = function(width, height) {
    
    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------
    
    /**
     * TODO: ...
     *
     * @type {Element}
     * @protected
     * @ignore
     */
    this.m_canvas = null;
    
    /**
     * TODO: ...
     *
     * @type {Object}
     * @protected
     * @ignore
     */
    this.m_context = null;
    
    /**
     * TODO: ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_height = height || 16;
    
    /**
     * TODO: ...
     *
     * @type {number}
     * @protected
     * @ignore
     */
    this.m_width = width || 16;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * TODO: ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @member {Object} context
 * @memberof rune.display.Canvas
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Canvas.prototype, "context", {
    /**
     * @this rune.display.Canvas
     * @ignore
     */
    get : function() {
        return this.m_context;
    }
});

/**
 * TODO: ...
 *
 * @member {Element} element
 * @memberof rune.display.Canvas
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Canvas.prototype, "element", {
    /**
     * ...
     * 
     * @this rune.display.Canvas
     * @ignore
     */
    get : function() {
        return this.m_canvas;
    }
});

/**
 * TODO: ...
 *
 * @member {number} height
 * @memberof rune.display.Canvas
 * @instance
 */
Object.defineProperty(rune.display.Canvas.prototype, "height", {
    /**
     * @this rune.display.Canvas
     * @ignore
     */
    get : function() {
        return this.m_canvas.height;
    },
    
    /**
     * @this rune.display.Canvas
     * @ignore
     */
    set : function(value) {
        this.m_canvas.height = value;
    }
});

/**
 * TODO: ...
 *
 * @member {number} width
 * @memberof rune.display.Canvas
 * @instance
 * @readonly
 */
Object.defineProperty(rune.display.Canvas.prototype, "width", {
    /**
     * ...
     * 
     * @this rune.display.Canvas
     * @ignore
     */
    get : function() {
        return this.m_canvas.width;
    },
    
    /**
     * @this rune.display.Canvas
     * @ignore
     */
    set : function(value) {
        this.m_canvas.width = value;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * TODO: ...
 *
 * @param {HTMLElement} element ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.attach = function(element) {
    if (this.m_canvas != null) {
        if (element instanceof HTMLElement) {
            element.appendChild(this.m_canvas);
        }
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.clear = function() {
    this.m_context.clearRect(
        0,
        0,
        this.m_canvas.width,
        this.m_canvas.height
    );
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.detach = function() {
    if (this.m_canvas != null) {
        if (this.m_canvas.parentNode != null) {
            this.m_canvas.parentNode.removeChild(this.m_canvas);
        }
    }
};

/**
 * TODO: ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.dispose = function() {
    this.m_disposeCanvas();
    this.m_disposeContext();
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
rune.display.Canvas.prototype.drawArc = function(x, y, r, sa, ea, c, s, a) {
    this.m_context.save();
    this.m_context.lineWidth = s;
    this.m_context.strokeStyle = c;
    this.m_context.beginPath();
    this.m_context.arc(x, y, r, sa, ea, a);
    this.m_context.stroke();
    this.m_context.restore();
};

/**
 * TODO: ...
 *
 * @param {string} c ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.drawFill = function(c) {
    this.m_context.fillStyle = c;
    this.m_context.fillRect(
        0,
        0,
        this.m_canvas.width,
        this.m_canvas.height
    );
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
rune.display.Canvas.prototype.drawImage = function(img, ox, oy, ow, oh, cx, cy, cw, ch) {
    this.m_context.drawImage(
        img,
        cx || 0,
        cy || 0,
        cw || ow,
        ch || oh,
        ox,
        oy,
        ow,
        oh
    );
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
rune.display.Canvas.prototype.drawImageFill = function(img, x, y, w, h) {
    this.m_context.save();
    this.m_context.fillStyle = this.m_context.createPattern(img, "repeat");
    this.m_context.translate(-x, -y);
    this.m_context.fillRect(0, 0, w + x, h + y);
    this.m_context.restore();
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
rune.display.Canvas.prototype.drawLine = function(x1, y1, x2, y2, c, s) {
    this.m_context.save();
    this.m_context.translate(0.5, 0.5);
    this.m_context.strokeStyle = c;
    this.m_context.lineWidth = s;
    this.m_context.moveTo(x1, y1);
    this.m_context.lineTo(x2, y2);
    this.m_context.stroke();
    this.m_context.restore();
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
rune.display.Canvas.prototype.drawRect = function(x, y, w, h, c, s) {
    this.m_context.save();
    this.m_context.translate(0.5, 0.5);
    this.m_context.strokeStyle = c;
    this.m_context.lineWidth = s;
    this.m_context.strokeRect(
        x,
        y,
        w,
        h
    );
    
    this.m_context.restore();
};

/**
 * TODO: ...
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} w ...
 * @param {number} h ...
 * @param {string} c ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.drawRectFill = function(x, y, w, h, c) {
    this.m_context.fillStyle = c;
    this.m_context.fillRect(
        x,
        y,
        w,
        h
    );
};

/**
 * TODO: ...
 *
 * @param {rune.geom.Rectangle} rect ...
 *
 * @return {boolean}
 */
rune.display.Canvas.prototype.intersects = function(rect) {
    return rune.geom.Rectangle.intersects(
        0,
        0,
        this.m_canvas.width,
        this.m_canvas.height,
        rect.x,
        rect.y,
        rect.width,
        rect.height
    );
};

/**
 * TODO: ...
 *
 * @param {rune.display.DisplayObject} obj ...
 * @param {number} [offsetX] ...
 * @param {number} [offsetY] ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.renderObj = function(obj, offsetX, offsetY) {
    if (obj['hidden'] == false) {
        var frame = obj.getRenderFrame();
            frame.x -= offsetX || 0;
            frame.y -= offsetY || 0;
            
        if (this.intersects(frame)) {
            obj.cacheTest();
            
            var fx = (obj['flippedX']) ? -1 : 1;
            var fy = (obj['flippedY']) ? -1 : 1;
            var tx = (frame.x + obj['pivotX']);
            var ty = (frame.y + obj['pivotY']);
            
            this.m_context.save();
            this.m_context.translate(tx, ty);
            this.m_context.scale(fx, fy);
            this.m_context.rotate(obj['rotation'] * rune.util.Math.DEG_TO_RAD);
            this.m_context.translate(-tx, -ty);
            this.m_context.globalAlpha = obj['alpha'];
            this.m_context.drawImage(
                obj['canvas']['element'],
                frame['clipping']['x'],
                frame['clipping']['y'],
                frame['clipping']['width'],
                frame['clipping']['height'],
                frame['x'],
                frame['y'],
                frame['width'],
                frame['height']
            );
            
            this.m_context.restore();
        }
    }
};

/**
 * TODO: ...
 *
 * @param {number} width ...
 * @param {number} height ...
 *
 * @return {undefined}
 */
rune.display.Canvas.prototype.resize = function(width, height) {
    this.m_canvas.width = width;
    this.m_canvas.height = height;
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
rune.display.Canvas.prototype.m_construct = function() {
    this.m_constructCanvas();
    this.m_constructContext();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.Canvas.prototype.m_constructCanvas = function() {
    this.m_disposeCanvas();
    if (this.m_canvas === null) {
        this.m_canvas = document.createElement('canvas');
        this.m_canvas.width  = this.m_width;
        this.m_canvas.height = this.m_height;
        this.m_canvas.style.imageRendering = "crisp-edges"; //pixelated
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @throws {Error} ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.Canvas.prototype.m_constructContext = function() {
    this.m_disposeContext();
    if (this.m_context == null && this.m_canvas instanceof HTMLCanvasElement ) {
        this.m_context = this.m_canvas.getContext("2d");
        this.m_context.imageSmoothingEnabled = false;
    } else throw new Error();
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.Canvas.prototype.m_disposeContext = function() {
    if (this.m_context != null) {
        this.m_context  = null;
    };
};

/**
 * TODO: ...
 *
 * @return {undefined}
 * @protected
 * @ignore
 */
rune.display.Canvas.prototype.m_disposeCanvas = function() {
    if (this.m_canvas instanceof HTMLCanvasElement) {
        if (this.m_canvas.parentNode != null) {
            this.m_canvas.parentNode.removeChild(this.m_canvas);
        }
        
        this.m_canvas = null;
    }
};