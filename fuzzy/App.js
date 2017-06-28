(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

window.jraDebug = false;
window.toggleDebug = function () {
    window.jraDebug = !window.jraDebug;
};

/**
 * Logs an error message, only when window.jraDebug is set to true;
 * @param message
 */
function logError(message, renderImmediate) {
    let css = "background:red;color:white; padding-left:2px; padding-right:2px;";
    if (window.jraDebug || renderImmediate) {
        console.log(`%c ${ message }`, css);
    }
}

/**
 * Checks the context to ensure it has the desired extension enabled
 * @param ctx {WebGLRenderingContext} the webgl context to check
 * @param extension {String} the name of the extension to look for
 */


/**
 * Logs a warning message, only when window.jraDebug is set to true
 * @param message
 */
function logWarn(message, renderImmediate) {
    let css = "background:yellow;color:red; padding-left:2px; padding-right:2px;";
    if (window.jraDebug || renderImmediate) {
        console.log(`%c ${ message }`, css);
    }
}

/**
 * Logs a regular console.log call, only when window.jraDebug is set to true
 * @param message
 */

/**
 * Flattens an nested array that is assumed to be nested with child arrays used in place of
 * an actual vector object. Note, this does not check for completeness and will automatically
 * only take the first 3 values of the child arrays
 * @param array the parent array
 * @returns {Array}
 */
function flattenArray(array) {

    let fin = [];
    let len = array.length;
    for (var i = 0; i < len; ++i) {
        let arr = array[i];
        fin.push(arr[0], arr[1], arr[2]);
    }

    // map through to ensure we don't have any unknown / undefined values.
    // if so, set to 0
    fin = fin.map(itm => {
        if (itm === undefined || itm === null) {
            return 0.0;
        } else {
            return itm;
        }
    });

    return fin;
}

/**
 * Does subtraction between two arrays. Assumes both arrays have 3 values each inside
 * @param array1 {Array} the array to subtract from
 * @param array2 {Array} the array to subtract
 * @returns {*[]}
 */
function subArrays(array1, array2) {

    let x1 = array1[0];
    let y1 = array1[1];
    let z1 = array1[2];

    let x2 = array2[0];
    let y2 = array2[1];
    let z2 = array2[2];
    return [x1 - x2, y1 - y2, z1 - z2];
}

function addArrays(array1, array2) {

    let x1 = array1[0];
    let y1 = array1[1];
    let z1 = array1[2];

    let x2 = array2[0];
    let y2 = array2[1];
    let z2 = array2[2];
    return [x1 + x2, y1 + y2, z1 + z2];
}

function multiplyScalar(array1, scalar) {

    let x1 = array1[0];
    let y1 = array1[1];
    let z1 = array1[2];

    return [x1 * scalar, y1 * scalar, z1 * scalar];
}

function emptyVec3Array(count) {
    return Array(count).fill(0).map(() => {
        return [0, 0, 0];
    });
}

/**
 * Converts value to radians
 * @param deg a value in degrees
 */
function toRadians(deg) {
    return deg * Math.PI / 180;
}

/**
 * Normalizes an array. Assumes that the array has a max of 3 items in it
 * @param value
 * @returns {*}
 */
function normalizeArray(value) {
    if (isVector(value)) {
        if (value.length === 3) {
            var length = Math.sqrt(value[0] * value[0] + value[1] * value[1] + value[2] * value[2]);
            return [value[0] / length, value[1] / length, value[2] / length];
        } else {
            var length = Math.sqrt(value[0] * value[0] + value[1] * value[1]);
            return [value[0] / length, value[1] / length];
        }
    }
}

/**
 * Cross function.
 * @param a first "vector" / array
 * @param b second "vector" / array
 * @returns {[*,*,*]}
 */
function cross(a, b) {
    if (a.length === 3 && b.length === 3) {
        let a1 = a[0];
        let a2 = a[1];
        let a3 = a[2];
        let b1 = b[0];
        let b2 = b[1];
        let b3 = b[2];

        return [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1];
    }
}

/**
 * Creates an array with a range of values
 * @param from {Number} the value to start from
 * @param to {Number} the value end at.
 * @returns {Array}
 */
function range(from, to) {
    var result = [];
    var n = from;
    while (n < to) {
        result.push(n);
        n += 1;
    }
    return result;
}

/**
 * Returns a random vec3(in the form of an array)
 * @returns {*[]}
 */


/**
 * Performs linear interpolation of a value
 * @param value the value to interpolate
 * @param min the minimum value
 * @param max the maximum value
 * @returns {number}
 */


/**
 * Returns a random float value between two numbers
 * @param min the minimum value
 * @param max the maximum value
 * @returns {number}
 */
function randFloat(min = 0, max = 1) {
    return min + Math.random() * (max - min + 1);
}

/**
 * Returns a random integer value between two numbers
 * @param min the minimum value
 * @param max the maximum value
 * @returns {number}
 */
function randInt(min = 0, max = 1) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Very simple array cloning util.
 * Note - only works with arrays who have 3 elements
 * @param arrayToClone the array to clone
 * @returns {*[]} the new array
 */


/**
 * Ensures a value lies in between a min and a max
 * @param value
 * @param min
 * @param max
 * @returns {*}
 */
function clamp(value, min, max) {
    return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
}

/**
 * ensures that when using an array as a 3d vector, that it actually
 * contains at max 3 components.
 * @param array the array to verify
 * @returns {*}
 */
function isVector(array) {
    // ensure 3 component vectors
    if (array.length >= 2 && array.length <= 3) {
        return array;
    } else {
        return false;
    }
}

var RendererFormat = function (options = { width: window.innerWidth, height: window.innerHeight }) {
    this.width = options.width;
    this.height = options.height;
    this.viewportX = 0;
    this.viewportY = 0;
    this.clearColor = [0, 0, 0, 1];
};

RendererFormat.prototype = {
    /**
     * Appends the canvas to the DOM.
     * @param {node} el the element you want to append to. By default will append to body
     */
    attachToScreen(el = document.body) {
        el.appendChild(this.canvas);
        return this;
    },

    /**
     * Shorthand for enabling blending.
     */
    enableBlending() {
        this.enable(this.BLEND);
    },
    setBlendFunction(funcName1, funcName2) {
        this.blendFunc(this[funcName1], this[funcName2]);
    },

    blendLayers() {
        this.setBlendFunction("ONE", "ONE_MINUS_SRC_ALPHA");
    },
    /**
     * Shorthand for disabling blending.
     */
    disableBlending() {
        this.disable(this.BLEND);
    },

    /**
     * Enables an attribute to become instanced, provided that the GPU supports the extension.
     * TODO re-write when WebGL 2 comes along
     * @param attributeLoc the attribute location of the attribute you want to be instanced.
     * @param divisor The divisor setting for that attribute. It is 1 by default which should essentially turn on instancing.
     */
    enableInstancedAttribute(attributeLoc, divisor = 1) {

        if (this.hasOwnProperty("ANGLE_instanced_arrays")) {
            let ext = this.ANGLE_instanced_arrays;
            ext.vertexAttribDivisorANGLE(attributeLoc, divisor);
        } else {
            console.warn("Current GPU does not support the ANGLE_instance_arrays extension");
        }

        return this;
    },

    /**
     * Disables an attribute to become instanced.
     * TODO re-write when WebGL 2 comes along
     * @param attributeLoc the attribute location of the attribute you want to be instanced.
     */
    disableInstancedAttribute(attributeLoc) {
        if (this.hasOwnProperty("ANGLE_instance_arrays")) {
            let ext = this.ANGLE_instanced_arrays;
            ext.vertexAttribDivisorANGLE(attributeLoc, 0);
        } else {
            console.warn("Current GPU does not support the ANGLE_instance_arrays extension");
        }
    },
    /**
     * Runs the drawArraysInstanced command of the context. If the context is
     * webgl 1, it attempts to try and use the extension, if webgl 2, it runs the
     * regular command.
     * @param mode A GLenum specifying the type primitive to render, ie GL_TRIANGLE, etc..:
     * @param first {Number} a number specifying the starting index in the array of vector points.
     * @param count {Number} a number specifying the number of vertices
     * @param primcount {Number} a number specifying the number of instances to draw
     */
    drawInstancedArrays(mode, first, count, primcount) {
        if (!this.isWebGL2) {
            if (this.hasOwnProperty("ANGLE_instanced_arrays")) {
                this.ANGLE_instanced_arrays.drawArraysInstancedANGLE(mode, first, count, primcount);
            } else {
                console.error("Unable to draw instanced geometry - extension is not available");
            }
        } else {
            this.drawArraysInstanced(mode, first, count, primcount);
        }
    },

    /**
     * Drawing function to use for instanced items that have indices
     * @param mode {Number} the drawing mode, gl.TRIANGLES, etc..
     * @param numElements {Number} the number of element to draw(aka the number of indices)
     * @param numInstances {Number} the number of instances of the object to draw
     * @param type {Number} the data type of the index data, defaults to gl.UNSIGNED_SHORT
     * @param offset {Number} A GLintptr specifying an offset in the element array buffer. Must be a valid multiple of the size of the given type.
     */
    drawInstancedElements(mode, numElements, numInstances, { type = UNSIGNED_SHORT, offset = 0 } = {}) {
        if (!this.isWebGL2) {
            if (this.hasOwnProperty("ANGLE_instanced_arrays")) {
                this.ANGLE_instanced_arrays.drawElementsInstancedANGLE(mode, numElements, type, offset, numInstances);
            } else {
                console.error("Unable to draw instanced geometry - extension is not available");
            }
        } else {
            this.drawElementsInstanced(mode, numElements, type, offset, numInstances);
        }
    },

    /**
     * Sets the context to be full screen.
     * @param {function} customResizeCallback specify an optional callback to deal with what happens
     * when the screen resizes.
     * @returns {RendererFormat}
     */
    setFullscreen(customResizeCallback = null) {
        let self = this;
        let gl = this;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        //set the viewport size
        this.setViewport();

        if (customResizeCallback) {
            window.addEventListener("resize", customResizeCallback);
        } else {
            window.addEventListener("resize", () => {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.setViewport();
            });
        }
        return this;
    },

    /**
     * Helper function for clearing the screen, clear with a clear color,
     * set the viewport and clear the depth and color buffer bits
     * @param {number} r the value for the red channel of the clear color.
     * @param {number} g the value for the green channel of the clear color.
     * @param {number} b the value for the blue channel of the clear color.
     * @param {number} a the value for the alpha channel
     */
    clearScreen(r = 0, g = 0, b = 0, a = 1) {
        let gl = this;
        this.clearColor(r, g, b, a);
        gl.viewport(this.viewportX, this.viewportY, this.canvas.width, this.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return this;
    },

    /**
     * This clears all currently bound textures
     */
    clearTextures() {
        gl.bindTexture(gl.TEXTURE_2D, null);
    },

    /**
     * Useful when overlaying FBOs,
     * clears the buffer with a transparent overlay
     */
    clearTransparent() {
        this.gl.clearScreen(0, 0, 0, 0);
    },
    /**
     * Resets the current clear color.
     * @param {number} r the value for the red channel of the clear color.
     * @param {number} g the value for the green channel of the clear color.
     * @param {number} b the value for the blue channel of the clear color.
     * @param {number} a the value for the alpha channel
     */
    setClearColor(r = 0, g = 0, b = 0, a = 1) {
        this.clearColor(r, g, b, a);
    },

    /**
     * Enable depth testing
     */
    enableDepth() {
        this.gl.enable(this.gl.DEPTH_TEST);
        return this;
    },

    /**
     * Disables Depth testing
     */
    disableDepth() {
        this.gl.disable(this.gl.DEPTH_TEST);
    },

    /**
     * Returns the maximum texture size that the current card
     * supports.
     */
    getMaxTextureSize() {
        return this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE);
    },

    /**
     * Sets the viewport for the context
     * @param {number} x the x coordinate for the viewport
     * @param {number} y the y coordinate for the viewport
     * @param {number} width the width for the viewport
     * @param {number} height the height for the viewport
     */
    setViewport(x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
        let gl = this;
        gl.viewport(x, y, width, height);
    }

};

/**
 * Enables some extensions that are commonly used in WebGL 1.
 * @param gl {WebGLRenderingContext} a webgl context
 * @returns {{}}
 */
function getExtensions(gl) {
    let exts = {};

    // common extensions we might want
    const extensions = ["OES_texture_float", "OES_vertex_array_object", "ANGLE_instanced_arrays", "OES_texture_half_float", "OES_texture_float_linear", "OES_texture_half_float_linear", "WEBGL_color_buffer_float", "EXT_color_buffer_half_float", "OES_standard_derivatives", "WEBGL_draw_buffers", "WEBGL_depth_texture"];

    extensions.forEach(name => {
        // try getting the extension
        let ext = gl.getExtension(name);

        // if debugging is active, show warning message for any missing extensions
        if (ext === null) {
            logWarn(`Unable to get extension ${ name }, things might look weird or just plain fail`);
        }
        exts[name] = ext;
    });

    return exts;
}

/**
 * Creates a WebGLRendering context
 * @param node an optional node to build the context from. If nothing is provided, we generate a canvas
 * @param options any options for the context
 * @returns {*} the resulting WebGLRenderingContext
 */
function createContext(node = null, options = {}) {
    let el = node !== null ? node : document.createElement("canvas");
    let isWebGL2 = false;
    let defaults = {
        alpha: true,
        antialias: true,
        depth: true
    };

    // override any defaults if set
    Object.assign(options, defaults);

    // the possible context flags, try for webgl 2 first.
    let types = [ "webgl", "experimental-webgl"];

    // loop through trying different context settings.
    var ctx = types.map(type => {
        var tCtx = el.getContext(type);
        if (tCtx !== null) {
            if (type === "webgl2" || type === "experimental-webgl2") {
                isWebGL2 = true;
            }
            return tCtx;
        }
    }).filter(val => {
        if (val !== undefined) {
            return val;
        }
    });

    // make sure to note that this is a webgl 2 context
    if (isWebGL2) {
        window.hasWebGL2 = true;
    } else {
        window.hasWebGL2 = false;
    }

    ctx[0]["isWebGL2"] = isWebGL2;
    // just return 1 context
    return ctx[0];
}

/**
 * Sets up some WebGL constant values on top of the
 * window object for ease of use so you don't have to always have a
 * context object handy.
 * @param gl {WebGLRenderingContext} a WebGLRenderingContext
 */
function setupConstants(gl) {
    var constants = {
        "FLOAT": gl.FLOAT,
        "UNSIGNED_BYTE": gl.UNSIGNED_BYTE,
        "UNSIGNED_SHORT": gl.UNSIGNED_SHORT,
        "ARRAY_BUFFER": gl.ARRAY_BUFFER,
        "ELEMENT_BUFFER": gl.ELEMENT_ARRAY_BUFFER,
        "RGBA": gl.RGBA,
        "RGB": gl.RGB,
        "TEXTURE_2D": gl.TEXTURE_2D,
        "STATIC_DRAW": gl.STATIC_DRAW,
        "DYNAMIC_DRAW": gl.DYNAMIC_DRAW,
        "TRIANGLES": gl.TRIANGLES,
        "TRIANGLE_STRIP": gl.TRIANGLE_STRIP,
        "POINTS": gl.POINTS,
        "FRAMEBUFFER": gl.FRAMEBUFFER,
        "COLOR_ATTACHMENT0": gl.COLOR_ATTACHMENT0,

        // texture related
        "CLAMP_TO_EDGE": gl.CLAMP_TO_EDGE,
        "LINEAR": gl.LINEAR,
        "MAG_FILTER": gl.TEXTURE_MAG_FILTER,
        "MIN_FILTER": gl.TEXTURE_MIN_FILTER,
        "WRAP_S": gl.TEXTURE_WRAP_S,
        "WRAP_T": gl.TEXTURE_WRAP_T,
        "TEXTURE0": gl.TEXTURE0,
        "TEXTURE1": gl.TEXTURE1,
        "TEXTURE2": gl.TEXTURE2,

        // uniform related
        "UNIFORM_BUFFER": gl.UNIFORM_BUFFER,

        // simplify some math related stuff
        "PI": 3.14149,
        "M_PI": 3.14149, // same but Cinder alternative var
        "M_2_PI": 3.14149 * 3.14149, // same but also from Cinder in case I accidentally ever get the two mixed up
        "2_PI": 3.14149 * 3.14149,
        "sin": Math.sin,
        "cos": Math.cos,
        "tan": Math.tan,
        "random": Math.random,
        "randFloat": randFloat,
        "randInt": randInt,
        "clamp": clamp,
        "range": range
    };

    /**
     * WebGL 2 contexts directly support certain constants
     * that were previously only available via extensions.
     * Add those here.
     *
     * Your context must have a "isWebGL2" property in order for this to get
     * triggered.
     *
     * TODO at some point, should look and see if there might be native way to differentiate between ES 2.0 and 3.0 contexts
     */
    if (gl.hasOwnProperty('isWebGL2')) {

        if (gl.isWebGL2) {

            // add more color attachment constants
            constants["COLOR_ATTACHMENT1"] = gl.COLOR_ATTACHMENT1;
            constants["COLOR_ATTACHMENT2"] = gl.COLOR_ATTACHMENT2;
            constants["COLOR_ATTACHMENT3"] = gl.COLOR_ATTACHMENT3;
            constants["COLOR_ATTACHMENT4"] = gl.COLOR_ATTACHMENT4;
            constants["COLOR_ATTACHMENT5"] = gl.COLOR_ATTACHMENT5;
        }
    }

    if (!window.GL_CONSTANTS_SET) {
        for (var i in constants) {
            window[i] = constants[i];
        }
        window.GL_CONSTANTS_SET = true;
    }
}

/**
 * Builds the WebGLRendering context
 * @param canvas {DomElement} an optional canvas, if you'd rather use one already in the DOM
 * @param ctxOptions {Object} options for the context
 * @param getCommonExtensions {Bool} include the common extensions for doing neat things in WebGL 1
 */
function createRenderer(canvas = null, ctxOptions = {}, getCommonExtensions = true) {
    let gl = createContext(canvas, ctxOptions);
    var format = new RendererFormat();
    let ext = null;

    if (getCommonExtensions) {
        ext = getExtensions(gl);
    }

    //setup constants
    setupConstants(gl);

    // assign some convenience functions onto the gl context
    var newProps = Object.assign(gl.__proto__, format.__proto__);
    gl.__proto__ = newProps;

    // loop through and assign extensions onto the context as well
    for (var i in ext) {
        gl[i] = ext[i];
    }

    return gl;
}

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = glMatrix.ARRAY_TYPE === window.Float32Array && 'SIMD' in window;
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function (type) {
  glMatrix.ARRAY_TYPE = type;
};

var degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
glMatrix.toRadian = function (a) {
  return a * degree;
};

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function (a, b) {
  return Math.abs(a - b) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
    scalar: {},
    SIMD: {}
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function () {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function (out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function (out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a12 = a[6],
            a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function (out, a) {
    var a0, a1, a2, a3, tmp01, tmp23, out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0, out0);
    SIMD.Float32x4.store(out, 4, out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8, out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,


    // Calculate the determinant
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function (out, a) {
    var row0,
        row1,
        row2,
        row3,
        tmp1,
        minor0,
        minor1,
        minor2,
        minor3,
        det,
        a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12);

    // Compute matrix adjugate
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    // Compute matrix determinant
    det = SIMD.Float32x4.mul(row0, minor0);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
    tmp1 = SIMD.Float32x4.reciprocalApproximation(det);
    det = SIMD.Float32x4.sub(SIMD.Float32x4.add(tmp1, tmp1), SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
    det = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
    if (!det) {
        return null;
    }

    // Compute matrix inverse
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(det, minor0));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(det, minor1));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(det, minor2));
    SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
    return out;
};

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function (out, a) {
    var a0, a1, a2, a3;
    var row0, row1, row2, row3;
    var tmp1;
    var minor0, minor1, minor2, minor3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    // Transpose the source matrix.  Sort of.  Not a true transpose operation
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    SIMD.Float32x4.store(out, 0, minor0);
    SIMD.Float32x4.store(out, 4, minor1);
    SIMD.Float32x4.store(out, 8, minor2);
    SIMD.Float32x4.store(out, 12, minor3);
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2],
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
        a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
        a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

        out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
        out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
        out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    if (a !== out) {
        out[0] = a[0];out[1] = a[1];out[2] = a[2];out[3] = a[3];
        out[4] = a[4];out[5] = a[5];out[6] = a[6];out[7] = a[7];
        out[8] = a[8];out[9] = a[9];out[10] = a[10];out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function (out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function (out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t,
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23,
        b00,
        b01,
        b02,
        b10,
        b11,
        b12,
        b20,
        b21,
        b22;

    if (Math.abs(len) < glMatrix.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function (out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t;

    if (Math.abs(len) < glMatrix.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
    // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    var trace = mat[0] + mat[5] + mat[10];
    var S = 0;

    if (trace > 0) {
        S = Math.sqrt(trace + 1.0) * 2;
        out[3] = 0.25 * S;
        out[0] = (mat[6] - mat[9]) / S;
        out[1] = (mat[8] - mat[2]) / S;
        out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
        S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
        out[3] = (mat[6] - mat[9]) / S;
        out[0] = 0.25 * S;
        out[1] = (mat[1] + mat[4]) / S;
        out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
        S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
        out[3] = (mat[8] - mat[2]) / S;
        out[0] = (mat[1] + mat[4]) / S;
        out[1] = 0.25 * S;
        out[2] = (mat[6] + mat[9]) / S;
    } else {
        S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
        out[3] = (mat[1] - mat[4]) / S;
        out[0] = (mat[8] + mat[2]) / S;
        out[1] = (mat[6] + mat[9]) / S;
        out[2] = 0.25 * S;
    }

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2],
        ox = o[0],
        oy = o[1],
        oz = o[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
    out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
    out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
    out[15] = 1;

    return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0,
        x1,
        x2,
        y0,
        y1,
        y2,
        z0,
        z1,
        z2,
        len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11],
        a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];

    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
};

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function () {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function (a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function (x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function (out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x * x + y * y + z * z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x * x + y * y + z * z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
    var factorTimes2 = t * t,
        factor1 = factorTimes2 * (2 * t - 3) + 1,
        factor2 = factorTimes2 * (t - 2) + t,
        factor3 = factorTimes2 * (t - 1),
        factor4 = factorTimes2 * (3 - 2 * t);

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
    var inverseFactor = 1 - t,
        inverseFactorTimesTwo = inverseFactor * inverseFactor,
        factorTimes2 = t * t,
        factor1 = inverseFactorTimesTwo * inverseFactor,
        factor2 = 3 * t * inverseFactorTimesTwo,
        factor3 = 3 * factorTimes2 * inverseFactor,
        factor4 = factorTimes2 * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = glMatrix.RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function (out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],


    // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = function () {
    var vec = vec3.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 3;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
        }

        return a;
    };
}();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function (a, b) {

    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);

    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);

    var cosine = vec3.dot(tempA, tempB);

    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
};

function BuildCameraBase() {
    // projection matrix.
    let proj = mat4.create();

    // view matrix
    let view = mat4.create();

    // camera position
    let pos = vec3.create(0, 0, 0);

    // camera direction
    let direction = vec3.create(0, 0, -1);

    // orientation
    let orientation = mat4.create();

    // up
    let up = vec3.create(0, 1, 0);

    // center
    let center = vec3.create();

    // eye
    let eye = vec3.create();

    return {
        type: "camera",
        position: pos,
        projection: proj,
        view: view,
        eye: eye,
        center: center,
        up: up,
        zoom: 0,
        direction: direction,
        lookAt(eye, aCenter = null) {
            this.eye = vec3.clone(eye);
            this.center = aCenter !== null ? vec3.clone(aCenter) : this.center;

            vec3.copy(this.position, eye);
            mat4.identity(this.view);
            mat4.lookAt(this.view, eye, this.center, this.up);
        },
        /**
         * Updates camera position
         * @param position {Array} position vector
         * @param direction {Array} direction vector
         * @param up {Array} up vector (note that it's unlikely this will change often)
         */
        update(position, direction, up) {
            this.up = up;
            this.direction = direction;
            this.lookAt(position);
        },

        translate(x = 1, y = 1, z = 1) {},
        setProjection(mProj) {
            this.projection = mat4.clone(mProj);
        },

        setView(mView) {
            this.view = mat4.clone(mView);
        },

        getProjection() {
            return this.projection;
        },

        getView() {
            return this.view;
        }
    };
}

function fullscreenAspectRatio() {
    return window.innerWidth / window.innerHeight;
}

/**
 * Constructs the base for a perspective camera
 * @param fov {Number} field of view
 * @param aspect {Number} aspect ratio
 * @param near {Number} near value
 * @param far {Number} far value
 * @returns {{position, projection, view, proj, eye, center, up, lookAt, setProjection, setView}|*}
 * @constructor
 */
function PerspectiveCamera(fov, aspect, near, far) {
    let camera = BuildCameraBase();
    camera.lookAt([0, 0, 0]);
    mat4.perspective(camera.projection, fov, aspect, near, far);

    // initial translation, just so we can ensure something shows up and no one thinks something's weird.
    mat4.translate(camera.view, camera.view, [0, 0, -10]);
    return camera;
}

/**
 * Function to set camera zoom.
 * @param camera a camera object. The type property will get checked for the type "camera"
 * @param zoom the zoom level
 * @returns {*}
 */
function setZoom(camera, zoom) {
    if (camera.hasOwnProperty("type") && camera.type === "camera") {
        camera.zoom = zoom;
        camera.position = [0, 0, zoom];
        mat4.translate(camera.view, camera.view, [0, 0, zoom]);
    }
    return camera;
}

/**
 * Translates the camera. Assumes that the position is a 3 component vector.
 * @param camera {Object} a camera object. The type property will get checked for the type "camera"
 * @param position {Array} an array for the new position. assumed to be 3 component array at the most.
 */

/**
 * A stand alone function for creating data based textures with TypedArrays.
 * Usable on it's own, but recommended that you use the {@link createTexture2d}
 * function
 * @param gl {WebGLRenderingContext} a WebGLRenderingContext
 * @param data {TypedArray} a TypedArray of data you want to write onto the texture
 * @param options {Object} a map of options for the texture creation. Needs the following keys
 * - width
 * - height
 * - internalFormat (gl.RGBA, etc)
 * - format (in WebGL 1, this should be the same as internalFormat, may change in WebGL2)
 * - type (gl.FLOAT, etc)
 * @returns {*}
 */
function createDataTexture(gl, data, options) {
    let texture = gl.createTexture();

    gl.bindTexture(TEXTURE_2D, texture);
    gl.texImage2D(TEXTURE_2D, 0, options.internalFormat, options.width, options.height, 0, options.format, options.type, data);

    // set min and mag filters
    gl.texParameteri(TEXTURE_2D, MAG_FILTER, options.magFilter);
    gl.texParameteri(TEXTURE_2D, MIN_FILTER, options.minFilter);

    //set wrapping
    gl.texParameteri(TEXTURE_2D, WRAP_S, options.wrapS);
    gl.texParameteri(TEXTURE_2D, WRAP_T, options.wrapT);

    // generate mipmaps if necessary
    if (options.generateMipMaps) {
        gl.generateMipmap(TEXTURE_2D);
    }

    gl.bindTexture(TEXTURE_2D, null);

    return texture;
}

function createCubemap(gl, images) {
    const targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
    for (let j = 0; j < 6; j++) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        if (images[j].shape) {
            gl.texImage2D(targets[j], 0, gl.RGBA, images[j].shape.width, images[j].shape.height, 0, gl.RGBA, gl.FLOAT, images[j].data);
        } else {
            gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[j]);
        }
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
    }
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    return texture;
}

/**
 * Create an image based texture. Usable on it's own, but recommended that you use the {@link createTexture2d}
 * function
 * @param gl {WebGLRenderingContext} a WebGLRenderingContext
 * @param image {Image} and image object
 * @param options {Object} a map of options for the texture creation
 * @returns {*}
 */
function createImageTexture(gl, image, options) {
    let texture = gl.createTexture();
    gl.bindTexture(TEXTURE_2D, texture);

    // set the image
    gl.texImage2D(TEXTURE_2D, 0, options.format, options.format, options.type, image);

    // set min and mag filters
    gl.texParameteri(TEXTURE_2D, MAG_FILTER, options.magFilter);
    gl.texParameteri(TEXTURE_2D, MIN_FILTER, options.minFilter);

    //set wrapping
    gl.texParameteri(TEXTURE_2D, WRAP_S, options.wrapS);
    gl.texParameteri(TEXTURE_2D, WRAP_T, options.wrapT);

    // generate mipmaps if necessary
    if (options.generateMipMaps) {
        gl.generateMipmap(TEXTURE_2D);
    }

    gl.bindTexture(TEXTURE_2D, null);

    return texture;
}



/**
 * Ensures that the specified width/height for the texture doesn't exceed the max for the
 * current card
 * @param gl {WebGLRenderingContext} a WebGL context
 * @param width {Number} the width
 * @param height {Number} the height
 * @returns {boolean}
 */
function checkTextureSize(gl, width, height) {
    var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    if (width < 0 || width > maxTextureSize || height < 0 || height > maxTextureSize) {
        logError('Invalid texture shape specified', true);
        return false;
    } else {
        return true;
    }
}

/**
 * Simple function for creating a basic texture
 * @param gl {WebGLRenderingContext} a WebGL context
 * @param data {Object} the initial texture data to use. Can be a TypedArray or an image.
 * @param textureOptions {Object} any options for how to process the resulting texture
 * @param width {Number} The width of the texture
 * @param height {Number} The height of the texture
 * @param randomInit {Boolean} a flag indicating whether or not we want random information written to the texture.
 * Useful for things like GPU ping-pong. False by default.
 * @returns {*}
 */
function createTexture2d(gl, { data, textureOptions, width, height, randomInit = false } = {}) {
    let texture = null;

    // NOTES
    // 1. in WebGL 1 , internalFormat and format ought to be the same value. TODO does this change in WebGL2?
    // 2. UNSIGNED_BYTE corresponds to a Uint8Array, float corresponds to a Float32Array
    let textureSettings = {
        format: RGBA,
        internalFormat: RGBA,
        type: UNSIGNED_BYTE,
        wrapS: CLAMP_TO_EDGE,
        wrapT: CLAMP_TO_EDGE,
        minFilter: LINEAR,
        magFilter: LINEAR,
        generateMipMaps: false
    };

    if (textureOptions !== undefined) {
        Object.assign(textureSettings, textureOptions);
    }

    // if we have data, process it as such, otherwise generate a blank texture of random data
    if (data === undefined) {
        width = width || 128;
        height = height || 128;

        let data = null;

        // if textureOptions isn't undefined, check to see if we've defined the "type" key.
        // if that is set to the floating point constant, make sure to use a Float32Array,
        // otherwise default to Uint8Array.
        // If the parameter isn't defined, default to Uint8Array
        /*
         if(textureOptions !== undefined){
         if(textureOptions.hasOwnProperty('type')){
         if(textureOptions.type === FLOAT){
         data = new Float32Array(width * height * 4);
         }else{
         data = new Uint8Array(width * height * 4);
         }
         }
         }else{
         data = new Uint8Array(width * height * 4);
         }
         */
        //simplify the above a bit, leaving it for testing.
        if (textureSettings.type === FLOAT) {
            data = new Float32Array(width * height * 4);
        } else {
            data = new Uint8Array(width * height * 4);
        }

        // if we just need a smattering of random data, apply that here if the flag is set
        if (randomInit) {
            for (var i = 0; i < width * height * 4; i += 4) {
                data[i] = Math.random();
                data[i + 1] = Math.random();
                data[i + 2] = Math.random();
                data[i + 3] = 1.0;
            }
        }

        textureSettings["width"] = width;
        textureSettings["height"] = height;
        texture = createDataTexture(gl, data, textureSettings);

        // if we have data
    } else {
        textureSettings["width"] = width || 128;
        textureSettings["height"] = height || 128;

        // if it's an image, build an image texture
        if (data instanceof Image) {
            texture = createImageTexture(gl, data, textureSettings);
        }

        // if it's a float 32 array we, build a data texture.
        if (data instanceof Float32Array) {
            if (textureSettings.type !== FLOAT) {
                textureSettings.type = FLOAT;
            }
            texture = createDataTexture(gl, data, textureSettings);
        }

        // if it's a float 32 array we, build a data texture.
        if (data instanceof Uint8Array) {
            if (textureSettings.type !== FLOAT) {
                textureSettings.type = FLOAT;
            }
            texture = createDataTexture(gl, data, textureSettings);
        }

        if (data instanceof Array) {
            if (textureSettings.type !== FLOAT) {
                textureSettings.type = FLOAT;
            }
            texture = createDataTexture(gl, new Float32Array(data), textureSettings);
        }
    }

    return {
        gl: gl,
        texture: texture,
        settings: textureSettings,
        getTexture() {
            return this.texture;
        },

        /**
         * Resizes a texture
         * @param w the new width
         * @param h the new height
         */
        resize(w, h) {
            let options = this.settings;
            if (checkTextureSize(this.gl, w, h)) {
                this.bind();
                gl.texImage2D(TEXTURE_2D, 0, options.internalFormat, options.width, options.height, 0, options.format, options.type, null);
                this.unbind(0);
            }
        },
        bind(index = 0) {
            let gl = this.gl;
            gl.activeTexture(TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            this.isBound = true;
        },

        unbind() {
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    };
}

/**
 * Creates a depth texture for an FBO.
 * @param gl
 * @param width
 * @param height
 */
function createDepthBuffer(gl, { width = 128, height = 128 } = {}) {
    let depthbuffer = gl.createTexture();
    let settings = {
        wrapS: CLAMP_TO_EDGE,
        wrapT: CLAMP_TO_EDGE,
        minFilter: LINEAR,
        magFilter: LINEAR
    };

    gl.bindTexture(gl.TEXTURE_2D, depthbuffer);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, settings.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, settings.minFilter);

    gl.texParameteri(TEXTURE_2D, WRAP_S, settings.wrapS);
    gl.texParameteri(TEXTURE_2D, WRAP_T, settings.wrapT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

    gl.bindTexture(gl.TEXTURE_2D, null);

    return depthbuffer;
}

function createFBOWithAttachments(gl, num = 1, { textures = [], width = 512, height = 512, floatingPoint = false, uniformMap = [] } = {}) {

    let attachments = [];
    let framebuffer = gl.createFramebuffer();

    // get the max number of color attachments.
    // we know 0 will already be occupied.
    let ext = gl.WEBGL_draw_buffers;
    let maxAttachments = ext.MAX_COLOR_ATTACHMENTS_WEBGL;

    if (textures.length > 0) {

        // ensure we don't exceed the number of use-able Color Attachments
        if (textures.length > maxAttachments) {
            logError("The number of textures passed in appears to exceed the max number of attachments", true);
        } else {
            gl.bindFramebuffer(FRAMEBUFFER, framebuffer);
            // append textures to framebuffer

            for (var i = 0; i < textures.length; ++i) {

                // attach primary drawing textures
                gl.framebufferTexture2D(FRAMEBUFFER, ext[`COLOR_ATTACHMENT${ i }_WEBGL`], TEXTURE_2D, textures[i].texture, 0);
                attachments.push(ext[`COLOR_ATTACHMENT${ i }_WEBGL`]);
            }
            ext.drawBuffersWEBGL(attachments);
            gl.bindFramebuffer(FRAMEBUFFER, null);
        }
    } else {
        textures = [];
        // if floating point is true, we create a FBO with
        // a floating point texture(meaning, a texture that can store floating point numbers), otherwise, just create a regular fbo
        // with integer based information
        if (floatingPoint) {
            for (var i = 0; i < num; ++i) {
                textures.push(createTexture2d(gl, {
                    width: width,
                    height: height,
                    textureOptions: {
                        type: FLOAT
                    }
                }));
            }
        } else {
            for (var i = 0; i < num; ++i) {
                textures.push(createTexture2d(gl, {
                    width: width,
                    height: height
                }));
            }
        }

        // append textures to framebuffer
        for (var i = 0; i < num; ++i) {
            // attach primary drawing texture.
            // TODO change to WebGL 2 code later on
            gl.bindFramebuffer(FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(FRAMEBUFFER, ext[`COLOR_ATTACHMENT${ i }_WEBGL`], TEXTURE_2D, textures[i].texture, 0);
            gl.bindFramebuffer(FRAMEBUFFER, null);
            attachments.push(ext[`COLOR_ATTACHMENT${ i }_WEBGL`]);
        }
    }

    return {
        gl: gl,
        textures: textures,
        fbo: framebuffer,
        attachments: attachments,
        ext: ext,
        maxDrawBuffers: ext.MAX_DRAW_BUFFERS_WEBGL,
        bindBuffers() {
            this.bindFbo();
            this.ext.drawBuffersWEBGL(this.attachments);
            this.unbindFbo();
        },
        /**
         * For binding the Fbo to draw onto it.
         */
        bindFbo() {
            gl.bindFramebuffer(FRAMEBUFFER, framebuffer);
        },
        /**
         * Unbinds the previously bound FBO, returning drawing commands to
         * the main context Framebuffer.
         */
        unbindFbo() {
            gl.bindFramebuffer(FRAMEBUFFER, null);
        },
        /**
         * Binds all the textures on the framebuffer.
         * the order is determined by the order of creation.
         */
        bindTextures() {
            let len = this.textures.length;
            for (var i = 0; i < len; ++i) {
                this.textures[i].bind(i);
            }
        },
        /**
         * Binds the texture of the framebuffer
         * @param index the index to bind the texture to
         */
        bindTexture(index = 0) {
            this.textures[index].bind(index);
        },
        /**
         * Unbinds the framebuffer's texture
         */
        unbindTexture(index = 0) {
            this.textures[index].unbind();
        }
    };
}

/**
 * Creates a WebGL Framebuffer object.
 * @param gl {WebGLRenderingContext} a WebGlRenderingContext
 * @param width {Number} the width for the fbo
 * @param height {Number} the height for the number
 * @param floatingPoint {Bool} whether or not the FBO should store floating point information
 * @returns {{gl: *, drawTexture: *, fbo: *, bindFbo: bindFbo, unbindFbo: unbindFbo, bind: bind, unbind: unbind}}
 */
function createFBO(gl, { width = 512, height = 512, floatingPoint = true, texture = null, depthTexture = false } = {}) {
    floatingPoint = floatingPoint;

    let framebuffer = gl.createFramebuffer();
    let t = null;

    if (texture !== null) {
        t = texture;
    } else {
        // if floating point is true, we create a FBO with
        // a floating point texture(meaning, a texture that can store floating point numbers), otherwise, just create a regular fbo
        // with integer based information
        if (floatingPoint) {
            t = createTexture2d(gl, {
                width: width,
                height: height,
                textureOptions: {
                    type: FLOAT
                }
            });
        } else {
            t = createTexture2d(gl);
        }
    }
    // attach primary drawing texture.
    gl.bindFramebuffer(FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D, t.texture, 0);

    /**
     * If we need a depth texture, build it and add.
     */
    if (depthTexture) {
        let depth = createDepthBuffer(gl, {
            width: width,
            height: height
        });
        gl.framebufferTexture2D(FRAMEBUFFER, gl.DEPTH_ATTACHMENT, TEXTURE_2D, depth, 0);
    }
    gl.bindFramebuffer(FRAMEBUFFER, null);

    return {
        gl: gl,
        drawTexture: t,
        fbo: framebuffer,
        getTexture() {
            return t;
        },
        /**
         * For binding the Fbo to draw onto it.
         * @deprecated
         */
        bindFbo() {
            gl.bindFramebuffer(FRAMEBUFFER, framebuffer);
        },

        /**
         * Unbinds the previously bound FBO, returning drawing commands to
         * the main context Framebuffer.
         * @deprecated
         */
        unbindFbo() {
            gl.bindFramebuffer(FRAMEBUFFER, null);
        },

        /**
         * For binding the Fbo to draw onto it.
         */
        bind() {
            gl.bindFramebuffer(FRAMEBUFFER, framebuffer);
        },

        /**
         * Unbinds the previously bound FBO, returning drawing commands to
         * the main context Framebuffer.
         */
        unbind() {
            gl.bindFramebuffer(FRAMEBUFFER, null);
        },

        /**
         * Binds the texture of the framebuffer
         * @param index the index to bind the texture to
         */
        bindTexture(index = 0) {
            this.drawTexture.bind(index);
        },

        /**
         * Helper function for unbinding the currently bound
         * texture.
         */
        unbindTexture() {
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    };
}

var quadvert = "\nattribute vec3 position;\nvarying vec2 uv;\nconst vec2 scale = vec2(0.5,0.5);\nvoid main(){\n    uv = position.xy * scale + scale;\n    gl_Position = vec4(position,1.0);\n}";

var quadfrag = "precision highp float;\n#ifdef USE_TEXTURE\n    uniform sampler2D debugTex;\n#endif\nvarying vec2 uv;\nvoid main(){\n  #ifdef USE_TEXTURE\n     vec4 dat = texture2D(debugTex,uv);\n     gl_FragColor = dat;\n  #else\n     gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n  #endif\n}";

/**
 * Compiles either a fragment or vertex shader
 * @param gl a webgl context
 * @param type the type of shader. Should be either gl.FRAGMENT_SHADER or gl.VERTEX_SHADER
 * @param source the source (as a string) for the shader
 * @returns {*} returns the compiled shader
 */
function compileShader(gl, type, source) {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        logError("Error in shader compilation - " + gl.getShaderInfoLog(shader), true);
        return false;
    } else {
        return shader;
    }
}

/**
 * The main function for creating a shader. Shader also manages figuring out
 * attribute and uniform location indices.
 *
 * @param gl a webgl context
 * @param vertex the source for the vertex shader
 * @param fragment the source for the fragment shader
 * @returns {*} returns the WebGLProgram compiled from the two shaders
 */
function makeShader(gl, vertex, fragment) {
    let vShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
    let fShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);

    if (vShader !== false && fShader !== false) {
        let program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            logError("Could not initialize WebGLProgram");
            throw "Couldn't link shader program - " + gl.getProgramInfoLog(program);
            return false;
        } else {
            return program;
        }
    }
}
/**
 * A function to quickly setup a WebGL shader program.
 * Modeled a bit after thi.ng
 * @param gl the webgl context to use
 * @param spec a object containing the out line of what the shader would look like.
 * @returns {*} and JS object with the shader information along with some helpful functions
 */
function createShader(gl = null, spec) {
    let vs = null;
    let fs = null;
    let uniforms = {};
    let blockBindings = 0;
    let attributes = {};
    let precision = spec.precision !== undefined ? spec.precision : "highp";
    if (gl === null) {
        console.error("");
        return false;
    }

    if (!spec.hasOwnProperty("vertex") || !spec.hasOwnProperty("fragment")) {
        logError("spec does not contain vertex and/or fragment shader", true);
        return false;
    }

    // if either of the shader sources are arrays, run the compile shader function
    if (spec.vertex instanceof Array) {
        spec.vertex = spec.vertex.join("");
    }

    if (spec.fragment instanceof Array) {
        spec.fragment = `precision ${ precision } float;` + spec.fragment.join("");
    }

    // build the shader
    let shader = makeShader(gl, spec.vertex, spec.fragment);

    // set uniforms and their locations (plus default values if specified)
    if (spec.hasOwnProperty('uniforms')) {

        // look through uniform values. Handle default values and prepare for UBOs
        let uValues = spec.uniforms.map(value => {
            if (typeof value === 'string') {
                let loc = gl.getUniformLocation(shader, value);
                uniforms[value] = loc;
            } else if (typeof value === 'object') {
                let loc = null;

                /**
                 * Handle UBOs. UBOS should look like this in the declaration
                 * {
                 *  name:"name",
                 *  buffer:true
                 * }
                 */
                if (value.hasOwnProperty("buffer")) {
                    try {
                        loc = gl.getUniformBlockIndex(shader, value.name);
                    } catch (e) {
                        logError("Attempt to get UBO location when UBOs are not yet supported by your computer", true);
                        loc = gl.getUniformLocation(shader, value.name);
                    }
                } else {
                    loc = gl.getUniformLocation(shader, value.name);
                }

                // store uniform location under it's shader name
                uniforms[value.name] = loc;
            }
        });
    }

    /**
     * Arranges all of the attribute data into neat containers
     * to allow for easy processing by a VAO.
     * Attributes should be specified as arrays
     */
    if (spec.hasOwnProperty('attributes')) {
        let attribs = spec.attributes.map(value => {

            attributes[value[0]] = {
                size: value[1],
                name: value[0]
            };

            // if a desired uniform location is set ,
            // make sure to reflect that in the information
            if (value[2] !== undefined) {
                attributes[value[0]].location = value[2];
            }
        });
    }

    return {
        gl: gl,
        program: shader,
        uniforms: uniforms,
        attributes: attributes,

        /**
         * Binds the shader for use. You can optionally pass in a object containing
         * the projection and view/modelView matrices and specify the specific uniform names
         * which default to projection and modelViewMatrix.
         * @param camera an object containing the projection and view/modelView matrices for the shader
         * @param proj the uniform name for the projection matrix
         * @param view the uniform name for the view/modelView matrix
         */
        bind(camera = null, { projection = "projectionMatrix", view = "modelViewMatrix" } = {}) {
            this.gl.useProgram(this.program);
            if (camera !== null) {
                this.set4x4Uniform(projection, camera.projection);
                this.set4x4Uniform(view, camera.view);
            }
        },
        /**
         * Sets a matrix uniform for a 4x4 matrix
         * @deprecated prepare to remove and switch to something more descriptive for a 4x4 matrix
         * @param name the name of the uniform whose value you want to set.
         */
        setMatrixUniform(name, value) {
            this.gl.uniformMatrix4fv(this.uniforms[name], false, value);
        },

        /**
         * Sets a mat4 uniform in a shader
         * @param name the name of the uniform
         * @param value the value for the uniform
         */
        set4x4Uniform(name, value) {
            this.gl.uniformMatrix4fv(this.uniforms[name], false, value);
        },

        /**
         * Sets a mat3 uniform in a shader
         * @param name  the name of the uniform
         * @param value the value of the uniform
         */
        set3x3Uniform(name, value) {
            this.gl.uniformMatrix3fv(this.uniforms[name], false, value);
        },
        /**
         * Sets the uniform value for a texture. Optionally
         * @param value
         */
        setTextureUniform(name, value) {
            this.gl.uniform1i(this.uniforms[name], value);
        },

        /**
         * Returns the uniform location of a shader's uniform
         * @param name  the name of the location you want
         * @returns {*}
         */
        getUniform(name) {
            return this.uniforms[name];
        },

        /**
         * sets a vec2 uniform
         * @param name
         * @param value
         */
        setVec2(name, v1, v2) {
            this.gl.uniform2f(this.uniforms[name], v1, v2);
        },

        /**
         * Sets a vec3 uniform
         * @param name
         * @param value
         */
        setVec3(name, value) {
            this.gl.uniform3fv(this.uniforms[name], value);
        },

        /**
         * Sends a uniform to the currently bound shader. Attempts to derive
         * the correct uniform function to use
         * @param name {String} name of the uniform
         * @param value {*} the value to send to the uniform
         */
        uniform(name, value) {

            /**
             *  "if" statement to properly figure out what uniform function to use.
             *  Assumes all matrix and vector values are in the forms of an Array object.
             *  Currently no great way to differentiate between integers and floating point values
             *  when it comes to non array values.
             *
             *  Currently works with
             *  - 4x4 matrices
             *  - 3x3 matrices
             *  - vec2 arrays represented by a array with just two values
             */
            if (value.length !== undefined && value.length === 16) {
                this.set4x4Uniform(name, value);
            } else if (value.length !== undefined && value.length === 3) {
                this.gl.uniform3fv(this.uniforms[name], value);
            } else if (value.length !== undefined && value.length === 2) {
                this.setVec2(name, value[0], value[1]);
            } else if (value.length !== undefined && value.length === 3) {
                this.setVec3(name, value);
            } else {
                this.gl.uniform1f(this.uniforms[name], value);
            }
        }

    };
}

/**
 * Creates a VertexAttributeObject aka VAO
 * @param gl a webgl context
 * @param useNative flag for whether or not to use native VAOs (which uses an extension for now)
 */
function createVAO(gl, useNative = true) {
    let vao = null;
    let ext = null;
    // TODO support cards that don't have this extension later
    if (useNative) {
        if (gl.isWebGL2) {
            vao = gl.createVertexArray();
        } else {
            if (gl.hasOwnProperty('OES_vertex_array_object')) {
                ext = gl['OES_vertex_array_object'];
                vao = ext.createVertexArrayOES();
            } else {
                ext = gl.getExtension('OES_vertex_array_object');
                vao = ext.createVertexArrayOES();
            }
        }
    }

    return {
        gl: gl,
        vao: vao,
        ext: ext,
        attributes: {},

        /**
         * Helper function to allow an attribute to become instanced.
         * For the time being until WebGL 2 is standardized, this is currently enabled as an
         * extension.
         * @param attribute {String} the name of the attribute to make instanced.
         * @returns {boolean} false if unable to utilize ANGLE_instanced_arrays.
         */
        makeInstancedAttribute(attribute) {
            let ext = null;
            if (gl.hasOwnProperty('ANGLE_instanced_arrays')) {
                ext = gl.ANGLE_instanced_arrays;
            } else {
                try {
                    ext = gl.getExtension('ANGLE_instanced_arrays');
                } catch (e) {
                    console.error("cannot utilize instanced attributes on this GPU");
                    return false;
                }
            }

            ext.vertexAttribDivisorANGLE(this.getAttribute(attribute), 1);
        },
        /**
         * Sets an attribute's location
         * @param shader {WebGLProgram} a WebGl shader program to associate with the attribute location
         * @param name {String} the name of the attribute
         * @param index {Number} an optional index. If null, will utilize the automatically assigned location
         * @returns {number} returns the location for the attribute
         */
        setAttributeLocation(shader, name, index = null) {
            let loc = 0;
            let gl = this.gl;

            // if we don't assign an index, get the automatically generated one
            if (index === null || index === undefined) {
                loc = gl.getAttribLocation(shader, name);
            } else {
                loc = gl.bindAttribLocation(shader, index, name);
            }
            return loc;
        },

        /**
         * Enable all of the attributes on a shader onto the VAO.
         * This will automatically set the attribute location to the order in which the
         * attribute was set in the shader settings, but will override that decision if the location index is
         * set in the attribute.
         *
         * @param shader a plane JS object that contains 3 things
         * 1. A WebGLProgram on the key "shader"
         * 2. an array at the key "attributes" that contains the name of all of the attributes we're looking for
         * as well as the size of each attribute.
         */
        enableAttributes(shader) {
            let gl = this.gl;
            let attribs = shader.attributes;
            for (let a in attribs) {
                let attrib = attribs[a];
                let attribLoc = this.attributes.length;

                // if the attribute has a location parameter, use that to set the attribute location,
                // otherwise use the next index in the attributes array
                if (attrib.hasOwnProperty('location')) {
                    attribLoc = attrib.location;
                }

                this.addAttribute(shader, attrib.name, attrib.size, attribLoc);
            }
            return this;
        },

        /**
         * Adds an attribute for the VAO to keep track of
         * @param shader {WebGLProgram} the shader that the attribute is a part of. Takes a WebGLProgram but also accepts a plain object created by the
         * {@link createShader} function
         * @param name {String} the name of the attribute to add/enable
         * @param size {Number} optional - the number of items that compose the attribute. For example, for something like, position, you might have xyz components, thus, 3 would be the size
         * @param location {Number} optional - the number to use as the attribute location. If it's not specified, will simply use it's index in the attributes object
         * @param setData {Boolean} optional - flag for whether or not to immediately run setData on the attribute. TODO enable by default
         * @param dataOptions {Object} optional - any options you might want to add when calling setData like an offset or stride value for the data
         * @returns {addAttribute}
         */
        addAttribute(shader, name, { size = 3, location, dataOptions = {} } = {}) {
            let attribLoc = this.attributes.length;
            let webglProg = null;

            if (shader instanceof WebGLProgram) {
                webglProg = shader;
            } else {
                webglProg = shader.program;
            }

            // if location is undefined, just set attribute location
            // to be the next index in the attribute set.
            if (location === undefined) {
                attribLoc = location;
            }

            let attribLocation = this.setAttributeLocation(webglProg, name, attribLoc);

            this.attributes[name] = {
                loc: attribLocation,
                enabled: true,
                size: size
            };
            //enable the attribute
            this.enableAttribute(name);

            // if we want to just go ahead and set the data , run that
            this.setData(name, dataOptions);
            return this;
        },

        /**
         * Returns the location of the specified attribute
         * @param name {String} the name of the attribute.
         * @returns {*|number}
         */
        getAttribute(name) {
            return this.attributes[name].loc;
        },

        /**
         * Enables a vertex attribute
         * @param name {String} the name of the attribute you want to enable
         */
        enableAttribute(name) {
            // enable vertex attribute at the location
            this.gl.enableVertexAttribArray(this.attributes[name].loc);
        },

        /**
         * Disables a vertex attribute
         * @param name {String} the name of the vertex attribute to disable
         */
        disableAttribute(name) {
            this.gl.disableVertexAttribArray(this.attributes[name].loc);
        },

        /**
         * Shorthand for calling gl.vertexAttribPointer. Essentially sets the data into the vao for the
         * currently bound buffer. Some settings are assumed, adjust as necessary
         * @param name {String} the name of the attribute to pass data to in the shader
         * @param options {Object} options for utilizing that information
         */
        setData: function (name, { options, stride = 0, offset = 0 } = {}) {
            let loc = this.attributes[name].loc;
            let size = this.attributes[name].size;

            let pointerOptions = {
                type: gl.FLOAT,
                normalized: gl.FALSE,
                stride: stride,
                offset: offset
            };

            if (options !== undefined) {
                Object.assign(pointerOptions, options);
            }
            gl.vertexAttribPointer(loc, size, pointerOptions.type, pointerOptions.normalized, pointerOptions.stride, pointerOptions.offset);
        },

        /**
         * Binds the vao
         */
        bind() {
            if (this.gl.isWebGL2) {
                this.gl.bindVertexArray(this.vao);
            } else {
                ext.bindVertexArrayOES(this.vao);
            }
        },

        /**
         * Unbinds the vao
         */
        unbind() {
            if (this.gl.isWebGL2) {
                this.gl.bindVertexArray(null);
            } else {
                ext.bindVertexArrayOES(null);
            }
        }
    };
}

/**
 * Simple function to create a VBO aka buffer
 * @param gl a WebGLRendering context
 * @param data the information for the buffer. If it's a regular array, it'll be turned into a TypedArray
 * @param indexed the type this buffer should be. By default, it's an ARRAY_BUFFER, pass in true for indexed if you're holding indices
 * @param usage the usage for the buffer. by default it's STATIC_DRAW
 */
function createVBO(gl, { data = null, indexed = false, usage = "STATIC_DRAW" } = {}) {
    let buffer = null;

    // set the buffer type
    let bufferType = "ARRAY_BUFFER";
    if (indexed === true) {
        bufferType = "ELEMENT_ARRAY_BUFFER";
    }
    let name = bufferType;
    bufferType = gl[bufferType];

    // set the usage
    usage = gl[usage];
    buffer = gl.createBuffer();

    var obj = {
        gl: gl,
        buffer: buffer,
        bufferTypeName: name,
        type: bufferType,
        usage: usage,

        raw() {
            return this.buffer;
        },
        /**
         * Updates the buffer with new information
         * @param data a array of some kind containing your new data
         */
        updateBuffer(data) {
            if (data instanceof Array) {
                if (this.bufferTypeName === "ARRAY_BUFFER") {
                    data = new Float32Array(data);
                } else {
                    data = new Uint16Array(data);
                }
            }
            this.bind();
            this.gl.bufferSubData(this.type, 0, data);
            this.unbind();
        },

        /**
         * Alternate function to fill buffer with data
         * @param data
         */
        fill(data, shader, vao, name) {
            if (data instanceof Array) {
                if (this.bufferTypeName === "ARRAY_BUFFER") {
                    data = new Float32Array(data);
                } else {
                    data = new Uint16Array(data);
                }
            }
            this.gl.bufferData(this.type, data, usage);
        },

        /**
         * Sets data onto the vbo.
         * @param data the data for the vbo. Can either be a regular array or a typed array.
         * If a regular array is used, will determine buffer type based on the settings.
         */
        bufferData(data, updatedData = false) {
            if (data instanceof Array) {
                if (this.bufferTypeName === "ARRAY_BUFFER") {
                    data = new Float32Array(data);
                } else {
                    data = new Uint16Array(data);
                }
            }
            this.gl.bufferData(this.type, data, usage);
        },

        bind() {
            this.gl.bindBuffer(this.type, this.buffer);
        },

        unbind() {
            this.gl.bindBuffer(this.type, null);
        }
    };

    // build out data if passed in as part of the options object
    if (data !== null) {
        obj.bind();
        obj.bufferData(data);
        obj.unbind();
    }

    return obj;
}

/**
 * Function used to build a multi-purpose full screen quad.
 * @param gl {WebGLRenderingContext}
 * @param withTexture {boolean} a boolean value indicating whether or not you're trying to create a rendering quad. If you are, pass in true and instead of a color
 * things will get set up to draw a texture instead.
 * @param fragmentShader {String} optional fragment shader, primarily used for ping-ponging data between textures.
 * @returns {{vao: ({gl, vao, ext, attributes, setAttributeLocation, enableAttributes, addAttribute, getAttribute, enableAttribute, disableAttribute, setData, point, bind, unbind}|*), shader: ({gl, program, uniforms, attributes, bind, setMatrixUniform, setTextureUniform, uniform}|*), buffer: *, hasTexture: boolean, gl: *, draw: draw}}
 */
function createQuad(gl, { withTexture = false, fragmentShader = false, uniforms = [], vertexShader = false } = {}) {
    let frag = quadfrag;
    let vertex = quadvert;
    let defaultUniforms = ['debugTex'];
    let vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];

    let vao = createVAO(gl);
    vao.bind();

    // if uniform map is not empty, merge with default map
    if (uniforms.length > 0) {
        uniforms.forEach(obj => {
            defaultUniforms.push(obj);
        });
    }

    // if we don't have our own fragment shader, make sure to inject
    // the texture define statement if we need to support a texture.
    if (!fragmentShader) {
        if (withTexture) {
            frag = "#define USE_TEXTURE\n" + quadfrag;
        }
    } else {
        frag = fragmentShader;
    }

    // if we aren't using the default vertex shader
    if (vertexShader) {
        vertex = vertexShader;
    }

    let shader = createShader(gl, {
        vertex: vertex,
        fragment: frag,
        attributes: [['position', 3]],
        uniforms: uniforms
    });
    // buffer data onto the buffer
    let buffer = createVBO(gl);

    // enable attributes
    buffer.bind();
    buffer.bufferData(vertices);
    vao.addAttribute(shader, 'position');
    vao.setData('position');
    buffer.unbind();
    vao.unbind();

    return {
        vao: vao,
        shader: shader,
        buffer: buffer,
        type: "quad",
        hasTexture: withTexture,
        gl: gl,
        drawWithCallback(cb) {
            this.vao.bind();
            this.shader.bind();

            this.vao.enableAttribute('position');
            cb(shader);

            this.gl.drawArrays(TRIANGLE_STRIP, 0, 4);
            this.vao.disableAttribute('position');
            this.vao.unbind();
        },
        draw(textureUnit = 0) {

            this.vao.bind();
            this.shader.bind();

            this.vao.enableAttribute('position');

            // if we need to supply a texture, set the uniform.
            // this assumes texture has already been bound.
            if (this.hasTexture) {
                this.shader.setTextureUniform('debugTex', textureUnit);
            }

            this.gl.drawArrays(TRIANGLE_STRIP, 0, 4);
            this.vao.disableAttribute('position');
            this.vao.unbind();
        }
    };
}

/**
 * Takes a Quad object made with `createQuad` and draws it
 * @param quad
 */

// Note - this is for a single pass. Some effects may need to chain together multiple
// instances in order to look correct.

class FxPass {
    constructor(gl, fragment, { uniformMap = [], width = window.innerWidth, height = window.innerHeight, inputTexture = null } = {}) {
        this.gl = gl;
        this.input = inputTexture;
        this.fbo = createFBO(gl, {
            width: width,
            height: height
        });

        let defaults = ['resolution', 'time'];

        let mapping = [...defaults, ...uniformMap];

        this.drawQuad = createQuad(gl, {
            withTexture: true,
            fragmentShader: fragment,
            uniforms: mapping
        });

        this.resolution = [width, height];
    }
    updateResolution(width, height) {
        this.resolution = [width, height];
    }
    setInput(inputTexture) {
        this.input = inputTexture;
    }

    runPass() {

        this.fbo.bind();
        this.gl.clearScreen();
        if (this.input !== null) {
            this.input.bind();
        }
        this.drawQuad.drawWithCallback(shader => {
            shader.uniform('resolution', this.resolution);

            if (this.input !== null) {
                shader.setTextureUniform('tex0', 0);
            }
        });
        this.fbo.unbind();
    }

    getOutput() {
        return this.fbo;
    }

}

var periodic = "\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\nfloat pnoise(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep);  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P);  vec3 Pf1 = Pf0 - vec3(1.0);  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n";

var simplex = "precision highp float;\nfloat noise3d(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy;  vec3 x3 = x0 - D.yyy;\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n  float n_ = 0.142857142857;  vec3  ns = n_ * D.wyz - D.xzx;\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }";

var grain$1 = "precision highp float;\nuniform vec2 resolution;\nuniform sampler2D tex0;\nvarying vec2 uv;\nvec3 blend(vec3 base, vec3 blend) {\n    return mix(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, step(base, vec3(0.5)));\n}\nfloat grain(vec2 texCoord, vec2 resolution, float frame, float multiplier) {\n    vec2 mult = texCoord * resolution;\n    float offset = noise3d(vec3(mult / multiplier, frame));\n    float n1 = pnoise(vec3(mult, offset), vec3(1.0/texCoord * resolution, 1.0));\n    return n1 / 2.0 + 0.5;\n}\nfloat grain(vec2 texCoord, vec2 resolution, float frame) {\n    return grain(texCoord, resolution, frame, 2.5);\n}\nfloat grain(vec2 texCoord, vec2 resolution) {\n    return grain(texCoord, resolution, 0.0);\n}\nvoid main(){\n    vec4 dat = texture2D(tex0,uv);\n    float fuzz = grain(uv,resolution,20.0);\n    fuzz = pow(fuzz,4.0);\n    vec3 final = mix(dat.xyz,vec3(fuzz),0.3);\n    gl_FragColor = vec4(final,1.);\n}";

var common = "vec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}";

var shader = [common, simplex, periodic, grain$1];
shader = shader.map(itm => {
    itm = itm.replace("#define GLSLIFY 1", "");
    return itm;
});

class FilmGrain extends FxPass {
    constructor(gl) {
        super(gl, shader);
    }
}

var blur = "precision highp float;\nuniform vec2 direction;\nuniform vec2 resolution;\nuniform sampler2D uScene;\nvarying vec2 uv;\nvec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.411764705882353) * direction;\n  vec2 off2 = vec2(3.2941176470588234) * direction;\n  vec2 off3 = vec2(5.176470588235294) * direction;\n  color += texture2D(image, uv) * 0.1964825501511404;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;\n  color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;\n  color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;\n  return color;\n}\nvec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\nvoid main()\n{\n    vec2 vUv = vec2(gl_FragCoord.xy / resolution.xy);\n    vec4 dat = texture2D(uScene,vUv);\n    vec4 blurScene = blur13(uScene,uv,resolution,direction);\n    vec4 blurScene2 = blur9(uScene,uv,resolution,direction);\n    gl_FragColor = blurScene2;\n}";

class HBlur extends FxPass {
    constructor(gl) {
        super(gl, blur, {
            uniformMap: ['direction']
        });
    }
    runPass() {

        this.fbo.bind();
        this.gl.clearScreen();
        if (this.input !== null) {
            this.input.bind();
        }
        this.drawQuad.drawWithCallback(shader => {
            shader.uniform('resolution', this.resolution);
            shader.uniform('direction', [1.0, 0.0]);
            if (this.input !== null) {
                shader.setTextureUniform('tex0', 0);
            }
        });
        this.fbo.unbind();
    }
}

class VBlur extends FxPass {
    constructor(gl) {
        super(gl, blur, {
            uniformMap: ['direction']
        });
    }
    runPass() {

        this.fbo.bind();
        this.gl.clearScreen();
        if (this.input !== null) {
            this.input.bind();
        }
        this.drawQuad.drawWithCallback(shader => {
            shader.uniform('resolution', this.resolution);
            shader.uniform('direction', [0.0, 1.0]);
            if (this.input !== null) {
                shader.setTextureUniform('tex0', 0);
            }
        });
        this.fbo.unbind();
    }
}

var abrasion = "precision highp float;\nuniform float time;\nuniform vec2 resolution;\nuniform sampler2D uScene;\nvarying vec2 uv;\nvoid main(){\n    vec4 scene = texture2D(uScene,uv);\n    vec2 vUv = gl_FragCoord.xy / resolution.xy;\n    float amount = 0.0;\n    amount = (1.0 + sin(time*6.0)) * 0.5;\n    amount *= 1.0 + sin(time*6.0) * 0.5;\n    amount *= 1.0 + sin(time*19.0) * 0.5;\n    amount *= 1.0 + sin(time*2.0) * 0.5;\n    amount *= 0.05;\n    scene.r = texture2D( uScene, vec2(uv.x + amount,uv.y) ).g;\n    scene.g = texture2D( uScene, uv ).g;\n    scene.b = texture2D( uScene, vec2(uv.x - amount,uv.y) ).b;\n    scene *= (1.0 - amount * 0.5);\n        \t\n    gl_FragColor = scene;\n}";

class AcsiPass$1 extends FxPass {
    constructor(gl) {
        super(gl, abrasion);
        this.time = 0.0;
    }

    runPass() {
        this.time += 0.01;
        this.fbo.bind();
        this.gl.clearScreen();
        if (this.input !== null) {
            this.input.bind();
        }
        this.drawQuad.drawWithCallback(shader => {
            shader.uniform('resolution', this.resolution);
            shader.uniform('time', this.time);
            if (this.input !== null) {
                shader.setTextureUniform('tex0', 0);
            }
        });
        this.fbo.unbind();
    }
}

class Composer {
    constructor(gl, input, ...passes) {
        this.gl = gl;
        this.passes = passes;
        this.input = input !== undefined ? input : function () {
            console.warn("Composer instance does not have an input texture");
        }();
        this._sortPasses();
    }

    /**
     * Adds a pass to the composer.
     * TODO add in functionality to specify insertion order.
     * @param pass the FxPass object to add.
     * @param index
     */
    addPass(pass, index = null) {
        this._sortPasses();
    }

    /**
     * Assigns input textures to all of the passes
     * @private
     */
    _sortPasses() {
        let passes = this.passes;
        let input = this.input;
        let index = 0;
        let finalSetup = [];
        passes.forEach(obj => {
            if (index === 0) {
                obj.input = input;
                finalSetup.push(obj);
            } else {
                obj.input = passes[index - 1].fbo.drawTexture;
                finalSetup.push(obj);
            }

            index++;
        });

        this.passes = finalSetup;
    }

    run() {
        let gl = this.gl;
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);

        this.passes.forEach(obj => {
            obj.runPass();
        });
    }

    getOutput() {
        let passes = this.passes;
        return passes[passes.length - 1].getOutput();
    }
}

/**
 * Returns an array of common uniform locations that might
 * need to be looked up.
 * @returns {[string,string,string,string]}
 */
function defaultUniforms() {
    return ["projectionMatrix", "modelMatrix", "modelViewMatrix", "viewMatrix", "time", "uTime"];
}

//TODO flush out UBO interaction when WebGL2 hits officially

class Mesh {
    constructor(gl, { vertex = "", fragment = "", uniforms = [], mode = "" } = {}) {
        this.vao = createVAO(gl);
        this.gl = gl;
        this.model = mat4.create();
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };
        this.attributes = {};
        this.numVertices = 3;
        this.mode = mode !== "" ? mode : gl.TRIANGLES;

        this.rotateAxis = vec3.create();
        vec3.set(this.rotateAxis, this.rotation.x, this.rotation.y, this.rotation.z);
        this.scale = vec3.create();
        this.position = vec3.create();

        if (vertex !== "" && fragment !== "") {
            this.setShader({
                vertex: vertex,
                fragment: fragment,
                uniforms: uniforms
            });
        }
    }

    /**
     * Sets shader for the mesh
     * @param vertex {String} vertex shader
     * @param fragment {String} fragment shader
     * @param uniforms {Array} any uniforms to save locations for
     * @param precision {String} the floating point precision to use. By default it's highp
     */
    setShader({ vertex = "", fragment = "", uniforms = [], precision = "highp" } = {}) {
        if (vertex !== "" && fragment !== "") {
            let defaults = defaultUniforms();

            if (vertex instanceof Array) {
                // when using glslify, seems like we need to pre-call join twice for some reason even
                // though the end result is the same code(createShader should automatically do this though). ¯\_(ツ)_/¯
                // get rid of the glslify statements if there
                vertex = vertex.map(itm => {
                    if (itm.search("GLSLIFY") !== -1) {
                        let lines = itm.split("\n");
                        lines.splice(0, 1);
                        return lines.join("\n");
                    } else {
                        return itm;
                    }
                }).join("");
            }

            if (fragment instanceof Array) {
                fragment = fragment.map(itm => {
                    if (itm.search("GLSLIFY") !== -1) {
                        let lines = itm.split("\n");
                        lines.splice(0, 1);

                        // add floating point precision to the start
                        lines.unshift(`precision ${ precision } float;`);
                        return lines.join("\n\n");
                    } else {
                        return itm;
                    }
                }).join("");
            }

            this.shader = createShader(this.gl, {
                vertex: vertex,
                fragment: fragment,
                uniforms: [...defaults, ...uniforms]
            });

            this.shaderSet = true;
        }
    }

    /**
     * Adds an attribute to the mesh
     * @param name name of the attribute in the shader
     * @param data data of the attribute. Can be regular or TypedArray
     * @param dataSize the size of each component for the attribute. It's assumed that
     * each component falls in line with the normal xyz schema so it's set to 3.
     * @returns {Mesh}
     */
    addAttribute(name, data, size = 3, dataOptions = {}) {
        if (this.shaderSet) {

            let gl = this.gl;
            let buffer = createVBO(gl);

            this.vao.bind();
            buffer.bind();

            buffer.bufferData(data);
            this.vao.addAttribute(this.shader, name, {
                size: size,
                dataOptions: dataOptions
            });
            buffer.unbind();
            this.vao.unbind();

            this.attributes[name] = buffer;

            return this;
        }
    }

    /**
     * Adds an attribute but also makes it instanced
     * @param name the name of the attribute
     * @param data data for the attribute
     * @returns {Mesh}
     */
    addInstancedAttribute(name, data, size = 3, dataOptions = {}) {
        if (this.shaderSet) {

            let gl = this.gl;
            let buffer = createVBO(gl);

            this.vao.bind();
            buffer.bind();

            buffer.bufferData(data);
            this.vao.addAttribute(this.shader, name, {
                size: size,
                dataOptions: dataOptions
            });
            this.vao.makeInstancedAttribute(name);
            buffer.unbind();
            this.vao.unbind();

            this.attributes[name] = buffer;

            this.instanced = true;
            return this;
        }
    }

    /**
     * Updates data for an attribute
     * @param name {String} the name of the attribute
     * @param data {Array} the new dataset to use.
     */
    updateAttribute(name, data) {
        let buffer = this.attributes[name];
        this.vao.bind();
        buffer.bind();
        buffer.updateBuffer(data);
        buffer.unbind();
        this.vao.unbind();
    }

    /**
     * Sets the number of vertices to utilize while drawing.
     * This is only for things where you are using gl.drawArrays and may mess things up
     * if you call this on a mesh with indices. This function operates under the assumption that the
     * value you pass in is the total number of items in your position(s) array and not the actual number of vertices.
     * This function divides by a divisor to figure that out
     *
     * @param num the total number of vertices in your mesh. Will divide by 3 automatically
     * as long as the value you input is greater than 10.
     *
     * Sets the numVertices attribute of the mesh which can be used in gl.drawArrays
     * @param divisor {Number} the number used to figure out how many vertices are in a mesh.
     */
    setNumVertices(num, divisor = 3) {
        if (!this.indicesSet) {

            //TODO it feels like there has to be a better way of doing this and ensuring that we need to divide
            if (num > 10) {
                num = num / divisor;
            }
            this.numVertices = num;
        }

        return num;
    }

    /**
     * Adds an indices buffer to the mesh. The number of elements to use while drawing is
     * automatically inferred by the data length
     *
     * @param data Data for the indices. Can be a regular or Typed array.
     * @returns {Mesh}
     */
    addIndices(data) {
        if (this.shaderSet) {
            let gl = this.gl;
            let buffer = createVBO(gl, {
                indexed: true
            });

            this.vao.bind();
            buffer.bind();
            buffer.bufferData(data);

            this.vao.unbind();
            buffer.unbind();
            this.indicesSet = true;
            this.numVertices = data.length;
            return this;
        }
    }

    /**
     * Sets the number of instances when using instanced attributes
     * @param num
     */
    setNumInstances(num = 1) {
        if (this.instanced) {
            this.numInstances = num;
        }
    }

    /**
     * Draws the mesh;
     */
    draw(camera, cb) {
        if (this.shaderSet) {
            this.shader.bind();

            // bind default uniforms
            this.shader.set4x4Uniform('projectionMatrix', camera.projection);
            this.shader.set4x4Uniform('viewMatrix', camera.view);
            this.shader.uniform("viewMatrix", camera.view);
            this.shader.uniform("view", camera.view);
            this.shader.uniform("modelMatrix", this.model);
            this.shader.uniform("model", this.model);

            // run callback so user can add any additional uniform values
            if (cb !== undefined) {
                cb(this.shader);
            }

            // bind vao
            this.vao.bind();

            // if we've set indices, we need to call a different draw function
            if (this.indicesSet && !this.instanced) {
                this.gl.drawElements(this.mode, this.numVertices, UNSIGNED_SHORT, 0);
            } else if (!this.instanced) {
                this.gl.drawArrays(this.mode, 0, this.numVertices);
            }

            // if we have instanced attributes
            if (this.indicesSet && this.instanced) {
                this.gl.drawInstancedElements(this.mode, this.numVertices, this.numInstances);
            } else if (this.instanced) {}

            // unbind vao
            this.vao.unbind();
        }
    }

    update() {}

    translate(x = 1, y = 1, z = 0) {
        vec3.set(this.position, x, y, z);
        mat4.translate(this.model, this.model, this.position);
    }

    translateX(x) {
        vec3.set(this.position, x, this.position.y, this.position.z);
        mat4.translate(this.model, this.model, this.position);
    }

    translateY(y) {
        vec3.set(this.position, this.position.x, y, this.position.z);
        mat4.translate(this.model, this.model, this.position);
    }

    translateZ(z) {
        vec3.set(this.position, this.position.x, this.position.y, z);
        mat4.translate(this.model, this.model, this.position);
    }

    scaleModel(x = 1, y = 1, z = 1) {
        vec3.set(this.scale, x, y, z);
        mat4.scale(this.model, this.model, this.scale);
        return this;
    }

    rotateX(angle) {
        mat4.rotateX(this.model, this.model, angle);
        return this;
    }

    rotateY(angle) {
        mat4.rotateY(this.model, this.model, angle);
        return this;
    }

    rotateZ(angle) {
        mat4.rotateZ(this.model, this.model, angle);
        return this;
    }
}

/**
 * A container for a layer in your "Scene"
 * Backed by an FBO so you can do a little post-processing, though
 * you are currently limited to one pass every frame update.
 */
class View {
    constructor(gl, {
        width = window.innerWidth,
        height = window.innerHeight,
        post = "",
        uniforms = [] } = {}) {
        this.gl = gl;
        this.buffer = createFBO(gl, {
            width: width,
            height: height,
            depthTexture: true
        });

        /**
         * If post processing is enabled on the view,
         * make sure to setup the quad with that shader.
         */
        if (post !== "") {
            this.postFx = true;
            this.quad = createQuad(gl, {
                withTexture: true,
                fragmentShader: post,
                uniforms: uniforms
            });
        } else {
            this.quad = createQuad(gl, {
                withTexture: true
            });
        }
    }

    bind() {
        this.buffer.bind();
    }

    unbind() {
        this.buffer.unbind();
    }

    getBuffer() {
        return this.buffer;
    }

    draw(unit = 0, cb = null) {
        this.buffer.bindTexture(unit);
        if (cb !== null) {
            this.quad.drawWithCallback(cb);
        } else {
            this.quad.draw(unit);
        }
        this.buffer.unbindTexture();
    }

    /**
     * Helper function in case you decide to override the draw command above.
     */
    drawView(unit = 0) {
        this.buffer.bindTexture(unit);
        this.quad.draw(unit);
        this.buffer.unbindTexture();
    }
}

var vert = "\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\nuniform float time;\nattribute vec3 position;\nattribute vec2 uvs;\nattribute vec3 normals;\nattribute vec3 centers;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vCenter;\nvarying vec4 vColor;\nconst float PI = 3.141592657;\nconst vec3 startPosition = vec3(0.0,200.0,-1.0);\nconst float waveFront = 200.0 * 2.0 + 3.0;\nconst float waveLength = 1.0;\nvoid main(){\n  \n    vec3 relativePos = position - centers;\n    vec3 axis = cross(startPosition, normals);\n    float distToStartPoint = distance(centers, startPosition);\n    const float posOffset = 0.2;\n    float distNoise = snoise(position * posOffset + time);\n    distToStartPoint += distNoise * 0.5;\n    \n    \n    float distToWaveFront = distance(distToStartPoint, waveFront);\n    float angle = 0.0;\n    if(distToWaveFront < waveLength) {\n    \tangle = (1.0 - exponentialOut(distToWaveFront/waveLength)) * PI;\n    }\n    \n    \n    relativePos = rotate(relativePos, axis, angle);\n    vec3 finalPosition = centers + relativePos;\n    vNormal = normals;\n    vCenter = centers;\n    vUv = uvs;\n    vec4 V = projectionMatrix * modelMatrix * viewMatrix * vec4(finalPosition,1.);\n    gl_Position = V;\n    float g = 1.0 - V.z / V.w;\n    vColor = vec4(g,g,g,1.);\n}";

var frag = "precision highp float;\nuniform sampler2D uGradient;\nvarying vec2 vUv;\nvarying vec4 vColor;\nvoid main(){\n    vec4 grad = texture2D(uGradient,vUv);\n    gl_FragColor = vec4(0.1,0.1,0.1,1.0);\n}";

var noise = "vec4 permute(vec4 x) {  return mod(((x*34.0)+1.0)*x, 289.0);    }\nvec4 taylorInvSqrt(vec4 r) {    return 1.79284291400159 - 0.85373472095314 * r; }\nfloat snoise(vec3 v){\n    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n    vec3 i  = floor(v + dot(v, C.yyy) );\n    vec3 x0 = v - i + dot(i, C.xxx) ;\n    vec3 g = step(x0.yzx, x0.xyz);\n    vec3 l = 1.0 - g;\n    vec3 i1 = min( g.xyz, l.zxy );\n    vec3 i2 = max( g.xyz, l.zxy );\n    vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n    vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n    vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n    i = mod(i, 289.0 );\n    vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n    float n_ = 1.0/7.0;\n    vec3  ns = n_ * D.wyz - D.xzx;\n    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n    vec4 x_ = floor(j * ns.z);\n    vec4 y_ = floor(j - 7.0 * x_ );\n    vec4 x = x_ *ns.x + ns.yyyy;\n    vec4 y = y_ *ns.x + ns.yyyy;\n    vec4 h = 1.0 - abs(x) - abs(y);\n    vec4 b0 = vec4( x.xy, y.xy );\n    vec4 b1 = vec4( x.zw, y.zw );\n    vec4 s0 = floor(b0)*2.0 + 1.0;\n    vec4 s1 = floor(b1)*2.0 + 1.0;\n    vec4 sh = -step(h, vec4(0.0));\n    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n    vec3 p0 = vec3(a0.xy,h.x);\n    vec3 p1 = vec3(a0.zw,h.y);\n    vec3 p2 = vec3(a1.xy,h.z);\n    vec3 p3 = vec3(a1.zw,h.w);\n    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n    p0 *= norm.x;\n    p1 *= norm.y;\n    p2 *= norm.z;\n    p3 *= norm.w;\n    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n    m = m * m;\n    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\nfloat snoise(float x, float y, float z){\n    return snoise(vec3(x, y, z));\n}\nmat4 rotationMatrix(vec3 axis, float angle)\n{\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}\nvec3 rotate(vec3 v, vec3 axis, float angle) {\n\tmat4 m = rotationMatrix(axis, angle);\n\treturn (m * vec4(v, 1.0)).xyz;\n}\nfloat exponentialOut(float t) {\n    return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);\n}\n";

class ImageLoader {
    constructor(list = [], cb) {
        this.queue = list;
        this.cb = cb;

        // note - this will end up in bytes
        this.bundleSize = 0;

        // request object
        this.req = new XMLHttpRequest();

        this._getSizes(() => {
            this._startLoad();
        });
    }

    /**
     * A simplified loading interface that just takes an array of images and spits out simple objects with
     * constructed textures. Doesn't do checking of any kind though.
     * @param gl a WebGLRendingContext
     * @param images the array of images. Or it can just be a string for one image.
     * @param waitTillQueueComplete option to simply pass back an array of images before or after
     * all of them have finished loading.
     * @returns {*}
     * @constructor
     */
    static SimpleLoader(gl, images, cb = null) {
        let results = [];
        if (images instanceof Array && cb === null) {
            images.forEach(img => {
                let itm = new Image();
                itm.src = img;
                itm["isLoaded"] = false;
                let result = {
                    path: img,
                    obj: itm,
                    checkLoaded: function () {
                        if (this.obj.isLoaded && !this.textureCreated) {
                            this.texture = createTexture2d(gl, {
                                data: this.obj,
                                width: this.obj.width,
                                height: this.obj.height
                            });

                            this.textureCreated = true;
                        }
                        return this.obj.isLoaded;
                    }
                };

                result.obj.onload = function () {
                    this.isLoaded = true;
                };
                results.push(result);
            });

            return results;
        } else if (images instanceof Array && cb !== null) {
            let numImages = images.length;
            images.forEach(path => {
                let img = new Image();
                img.src = path;
                img.onload = function () {
                    let texture = createTexture2d(gl, {
                        data: this,
                        width: this.width,
                        height: this.height
                    });

                    results.push(texture);
                };
            });

            let timer = setInterval(() => {
                if (results.length === numImages) {
                    cb(results);
                    clearInterval(timer);
                }
            });
        }

        if (images instanceof String) {
            let itm = new Image();
            itm.src = img;
            itm["isLoaded"] = false;
            let result = {
                path: img,
                obj: itm,
                checkLoaded: function () {
                    return this.obj.isLoaded;
                }
            };

            return result;
        }
    }

    /**
     * Pulls the total file size of all the images passed to the loader in bytes
     * @private
     */
    _getSizes(cb) {
        let queue = this.queue;
        let len = this.queue.length;
        let imgRegEx = /.(jpg|gif|png)/;
        let req = this.req;
        let self = this;

        for (var i = 0; i < len; ++i) {
            let item = queue[i];
            if (item.match(imgRegEx)) {
                req.open("HEAD", item, true);
                req.onreadystatechange = function () {
                    if (this.readyState === this.DONE) {
                        self.bundleSize += parseInt(req.getResponseHeader("Content-Length"));
                    }
                };

                req.send();
            }
        }
    }

    /**
     * Starts loading of the queue.
     * @private
     */
    _startLoad() {
        let queue = this.queue;
        let len = this.queue.length;
        let imgRegEx = /.(jpg|gif|png)/;
        let loaded = [];

        for (var i = 0; i < len; ++i) {
            let item = queue[i];
            if (item.match(imgRegEx)) {}
        }
    }
}

class Env extends View {
    constructor(gl, domeRadius = 500.0) {
        super(gl);
        this.mesh = new Mesh(gl, {
            vertex: [noise, vert],
            fragment: frag
        });
        let gradient = null;
        this.textures = ImageLoader.SimpleLoader(gl, ["./textures/gradient.png"]);

        this.domeRadius = domeRadius;
        this._build();
    }

    _build() {
        const num = 60.0;
        const uvGap = 1 / num;
        let positions = [];
        let normals = [];
        let centers = [];
        let uvs = [];
        let indices = [];
        let count = 0;

        for (var j = 0; j < num; ++j) {
            for (var i = 0; i < num; ++i) {
                let v0 = this._getPosition(i, j);
                let v1 = this._getPosition(i + 1, j);
                let v2 = this._getPosition(i + 1, j + 1);
                let v3 = this._getPosition(i, j + 1);
                let n = this._getNormal(v0, v1, v3);
                let c = this._getCenter(v0, v2);

                positions.push(v0, v1, v2, v3);
                normals.push(n, n, n, n);
                centers.push(c, c, c, c);
                uvs.push([i / num, j / num]);
                uvs.push([i / num + uvGap, j / num]);
                uvs.push([i / num + uvGap, j / num + uvGap]);
                uvs.push([i / num, j / num + uvGap]);
                indices.push(count * 4 + 0);
                indices.push(count * 4 + 1);
                indices.push(count * 4 + 2);
                indices.push(count * 4 + 0);
                indices.push(count * 4 + 2);
                indices.push(count * 4 + 3);

                count++;
            }
        }
        this.mesh.addAttribute('position', flattenArray(positions));
        this.mesh.addAttribute('uvs', flattenArray(uvs));
        this.mesh.addAttribute('normals', flattenArray(normals));
        this.mesh.addAttribute('centers', flattenArray(centers));
        this.mesh.addIndices(indices);
    }

    draw(camera) {
        let gl = this.gl;
        let gradient = this.gradient;

        if (this.textures[0].checkLoaded()) {
            this.mesh.draw(camera, shader => {
                this.textures[0].texture.bind();
                shader.setTextureUniform('uGradient', 0);
            });
        }
    }

    _getNormal(p0, p1, p2) {
        let pp0 = p0;
        let pp1 = p1;
        let pp2 = p2;

        let v0 = subArrays(pp1, pp0);
        let v1 = subArrays(pp2, pp0);
        let n = cross(v1, v0);
        n = normalizeArray(n);
        return n;
    }

    _getCenter(p0, p1) {
        return [(p0[0] + p1[0]) / 2.0, (p0[1] + p1[1]) / 2.0, (p0[2] + p1[2]) / 2.0];
    }
    _getPosition(i, j) {
        const num = 60.0;
        let pos = [0, 0, 0];
        let ry = i / num * PI * 2.0;
        let rx = j / num * PI - PI / 2;

        pos[1] = sin(rx) * this.domeRadius;
        let r = cos(rx) * this.domeRadius;
        pos[0] = cos(ry) * r;
        pos[2] = sin(ry) * r;

        return pos;
    }
}

/* eslint-disable no-unused-vars */
var _arity = function _arity(n, fn) {
    /* eslint-disable no-unused-vars */
    switch (n) {
        case 0:
            return function () {
                return fn.apply(this, arguments);
            };
        case 1:
            return function (a0) {
                return fn.apply(this, arguments);
            };
        case 2:
            return function (a0, a1) {
                return fn.apply(this, arguments);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.apply(this, arguments);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.apply(this, arguments);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.apply(this, arguments);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.apply(this, arguments);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.apply(this, arguments);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.apply(this, arguments);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.apply(this, arguments);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.apply(this, arguments);
            };
        default:
            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
    }
};

var _arrayFromIterator = function _arrayFromIterator(iter) {
    var list = [];
    var next;
    while (!(next = iter.next()).done) {
        list.push(next.value);
    }
    return list;
};

var _complement = function _complement(f) {
    return function () {
        return !f.apply(this, arguments);
    };
};

var _filter = function _filter(fn, list) {
    var idx = 0;
    var len = list.length;
    var result = [];
    while (idx < len) {
        if (fn(list[idx])) {
            result[result.length] = list[idx];
        }
        idx += 1;
    }
    return result;
};

var _forceReduced = function _forceReduced(x) {
    return {
        '@@transducer/value': x,
        '@@transducer/reduced': true
    };
};

// String(x => x) evaluates to "x => x", so the pattern may not match.
var _functionName = function _functionName(f) {
    // String(x => x) evaluates to "x => x", so the pattern may not match.
    var match = String(f).match(/^function (\w*)/);
    return match == null ? '' : match[1];
};

var _has = function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

var _isArguments = function () {
    var toString = Object.prototype.toString;
    return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
        return toString.call(x) === '[object Arguments]';
    } : function _isArguments(x) {
        return _has('callee', x);
    };
}();

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function _isArray(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

var _isFunction = function _isFunction(x) {
    return Object.prototype.toString.call(x) === '[object Function]';
};

var _isObject = function _isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
};

var _isPlaceholder = function _isPlaceholder(a) {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
};

var _isString = function _isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
};

var _isTransformer = function _isTransformer(obj) {
    return typeof obj['@@transducer/step'] === 'function';
};

var _map = function _map(fn, functor) {
    var idx = 0;
    var len = functor.length;
    var result = Array(len);
    while (idx < len) {
        result[idx] = fn(functor[idx]);
        idx += 1;
    }
    return result;
};

var _pipe = function _pipe(f, g) {
    return function () {
        return g.call(this, f.apply(this, arguments));
    };
};

// \b matches word boundary; [\b] matches backspace
var _quote = function _quote(s) {
    var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
    .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
    return '"' + escaped.replace(/"/g, '\\"') + '"';
};

var _reduced = function _reduced(x) {
    return x && x['@@transducer/reduced'] ? x : {
        '@@transducer/value': x,
        '@@transducer/reduced': true
    };
};

/**
 * An optimized, private array `slice` implementation.
 *
 * @private
 * @param {Arguments|Array} args The array or arguments object to consider.
 * @param {Number} [from=0] The array index to slice from, inclusive.
 * @param {Number} [to=args.length] The array index to slice to, exclusive.
 * @return {Array} A new, sliced array.
 * @example
 *
 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
 *
 *      var firstThreeArgs = function(a, b, c, d) {
 *        return _slice(arguments, 0, 3);
 *      };
 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
 */
var _slice = function _slice(args, from, to) {
    switch (arguments.length) {
        case 1:
            return _slice(args, 0, args.length);
        case 2:
            return _slice(args, from, args.length);
        default:
            var list = [];
            var idx = 0;
            var len = Math.max(0, Math.min(args.length, to) - from);
            while (idx < len) {
                list[idx] = args[from + idx];
                idx += 1;
            }
            return list;
    }
};

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var _toISOString = function () {
    var pad = function pad(n) {
        return (n < 10 ? '0' : '') + n;
    };
    return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
        return d.toISOString();
    } : function _toISOString(d) {
        return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
    };
}();

var _xfBase = {
    init: function () {
        return this.xf['@@transducer/init']();
    },
    result: function (result) {
        return this.xf['@@transducer/result'](result);
    }
};

var _xwrap = function () {
    function XWrap(fn) {
        this.f = fn;
    }
    XWrap.prototype['@@transducer/init'] = function () {
        throw new Error('init not implemented on XWrap');
    };
    XWrap.prototype['@@transducer/result'] = function (acc) {
        return acc;
    };
    XWrap.prototype['@@transducer/step'] = function (acc, x) {
        return this.f(acc, x);
    };
    return function _xwrap(fn) {
        return new XWrap(fn);
    };
}();

/**
 * Similar to hasMethod, this checks whether a function has a [methodname]
 * function. If it isn't an array it will execute that function otherwise it
 * will default to the ramda implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
var _checkForMethod = function _checkForMethod(methodname, fn) {
    return function () {
        var length = arguments.length;
        if (length === 0) {
            return fn();
        }
        var obj = arguments[length - 1];
        return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
    };
};

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry1 = function _curry1(fn) {
    return function f1(a) {
        if (arguments.length === 0 || _isPlaceholder(a)) {
            return f1;
        } else {
            return fn.apply(this, arguments);
        }
    };
};

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry2 = function _curry2(fn) {
    return function f2(a, b) {
        switch (arguments.length) {
            case 0:
                return f2;
            case 1:
                return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
                    return fn(a, _b);
                });
            default:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
                    return fn(_a, b);
                }) : _isPlaceholder(b) ? _curry1(function (_b) {
                    return fn(a, _b);
                }) : fn(a, b);
        }
    };
};

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry3 = function _curry3(fn) {
    return function f3(a, b, c) {
        switch (arguments.length) {
            case 0:
                return f3;
            case 1:
                return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
                    return fn(a, _b, _c);
                });
            case 2:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
                    return fn(_a, b, _c);
                }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
                    return fn(a, _b, _c);
                }) : _curry1(function (_c) {
                    return fn(a, b, _c);
                });
            default:
                return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
                    return fn(_a, _b, c);
                }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
                    return fn(_a, b, _c);
                }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
                    return fn(a, _b, _c);
                }) : _isPlaceholder(a) ? _curry1(function (_a) {
                    return fn(_a, b, c);
                }) : _isPlaceholder(b) ? _curry1(function (_b) {
                    return fn(a, _b, c);
                }) : _isPlaceholder(c) ? _curry1(function (_c) {
                    return fn(a, b, _c);
                }) : fn(a, b, c);
        }
    };
};

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curryN = function _curryN(length, received, fn) {
    return function () {
        var combined = [];
        var argsIdx = 0;
        var left = length;
        var combinedIdx = 0;
        while (combinedIdx < received.length || argsIdx < arguments.length) {
            var result;
            if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
                result = received[combinedIdx];
            } else {
                result = arguments[argsIdx];
                argsIdx += 1;
            }
            combined[combinedIdx] = result;
            if (!_isPlaceholder(result)) {
                left -= 1;
            }
            combinedIdx += 1;
        }
        return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
    };
};

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with [methodname], it will execute that
 * function (functor case). Otherwise, if it is a transformer, uses transducer
 * [xf] to return a new transformer (transducer case). Otherwise, it will
 * default to executing [fn].
 *
 * @private
 * @param {String} methodname property to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
var _dispatchable = function _dispatchable(methodname, xf, fn) {
    return function () {
        var length = arguments.length;
        if (length === 0) {
            return fn();
        }
        var obj = arguments[length - 1];
        if (!_isArray(obj)) {
            var args = _slice(arguments, 0, length - 1);
            if (typeof obj[methodname] === 'function') {
                return obj[methodname].apply(obj, args);
            }
            if (_isTransformer(obj)) {
                var transducer = xf.apply(null, args);
                return transducer(obj);
            }
        }
        return fn.apply(this, arguments);
    };
};

var _xfilter = function () {
    function XFilter(f, xf) {
        this.xf = xf;
        this.f = f;
    }
    XFilter.prototype['@@transducer/init'] = _xfBase.init;
    XFilter.prototype['@@transducer/result'] = _xfBase.result;
    XFilter.prototype['@@transducer/step'] = function (result, input) {
        return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
    };
    return _curry2(function _xfilter(f, xf) {
        return new XFilter(f, xf);
    });
}();

var _xfind = function () {
    function XFind(f, xf) {
        this.xf = xf;
        this.f = f;
        this.found = false;
    }
    XFind.prototype['@@transducer/init'] = _xfBase.init;
    XFind.prototype['@@transducer/result'] = function (result) {
        if (!this.found) {
            result = this.xf['@@transducer/step'](result, void 0);
        }
        return this.xf['@@transducer/result'](result);
    };
    XFind.prototype['@@transducer/step'] = function (result, input) {
        if (this.f(input)) {
            this.found = true;
            result = _reduced(this.xf['@@transducer/step'](result, input));
        }
        return result;
    };
    return _curry2(function _xfind(f, xf) {
        return new XFind(f, xf);
    });
}();

var _xmap = function () {
    function XMap(f, xf) {
        this.xf = xf;
        this.f = f;
    }
    XMap.prototype['@@transducer/init'] = _xfBase.init;
    XMap.prototype['@@transducer/result'] = _xfBase.result;
    XMap.prototype['@@transducer/step'] = function (result, input) {
        return this.xf['@@transducer/step'](result, this.f(input));
    };
    return _curry2(function _xmap(f, xf) {
        return new XMap(f, xf);
    });
}();

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
var bind = _curry2(function bind(fn, thisObj) {
    return _arity(fn.length, function () {
        return fn.apply(thisObj, arguments);
    });
});

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curryN = _curry2(function curryN(length, fn) {
    if (length === 1) {
        return _curry1(fn);
    }
    return _arity(length, _curryN(length, [], fn));
});

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
        if (fn(list[idx])) {
            return list[idx];
        }
        idx += 1;
    }
}));

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
// SameValue algorithm
// Steps 1-5, 7-10
// Steps 6.b-6.e: +0 != -0
// Step 6.a: NaN == NaN
var identical = _curry2(function identical(a, b) {
    // SameValue algorithm
    if (a === b) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return a !== 0 || 1 / a === 1 / b;
    } else {
        // Step 6.a: NaN == NaN
        return a !== a && b !== b;
    }
});

/**
 * Inserts the supplied element into the list, at index `index`. _Note that
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
var insert = _curry3(function insert(idx, elt, list) {
    idx = idx < list.length && idx >= 0 ? idx : list.length;
    var result = _slice(list);
    result.splice(idx, 0, elt);
    return result;
});

/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @deprecated since v0.23.0
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var isArrayLike = _curry1(function isArrayLike(x) {
    if (_isArray(x)) {
        return true;
    }
    if (!x) {
        return false;
    }
    if (typeof x !== 'object') {
        return false;
    }
    if (_isString(x)) {
        return false;
    }
    if (x.nodeType === 1) {
        return !!x.length;
    }
    if (x.length === 0) {
        return true;
    }
    if (x.length > 0) {
        return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
});

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
// cover IE < 9 keys issues
// Safari bug
var keys = function () {
    // cover IE < 9 keys issues
    var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
    // Safari bug
    var hasArgsEnumBug = function () {
        'use strict';

        return arguments.propertyIsEnumerable('length');
    }();
    var contains = function contains(list, item) {
        var idx = 0;
        while (idx < list.length) {
            if (list[idx] === item) {
                return true;
            }
            idx += 1;
        }
        return false;
    };
    return typeof Object.keys === 'function' && !hasArgsEnumBug ? _curry1(function keys(obj) {
        return Object(obj) !== obj ? [] : Object.keys(obj);
    }) : _curry1(function keys(obj) {
        if (Object(obj) !== obj) {
            return [];
        }
        var prop, nIdx;
        var ks = [];
        var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
        for (prop in obj) {
            if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
                ks[ks.length] = prop;
            }
        }
        if (hasEnumBug) {
            nIdx = nonEnumerableProps.length - 1;
            while (nIdx >= 0) {
                prop = nonEnumerableProps[nIdx];
                if (_has(prop, obj) && !contains(ks, prop)) {
                    ks[ks.length] = prop;
                }
                nIdx -= 1;
            }
        }
        return ks;
    });
}();

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
var reverse = _curry1(function reverse(list) {
    return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
});

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
var tail = _checkForMethod('tail', slice(1, Infinity));

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 */
var type = _curry1(function type(val) {
    return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

// Values of other types are only equal if identical.
var _equals = function _equals(a, b, stackA, stackB) {
    if (identical(a, b)) {
        return true;
    }
    if (type(a) !== type(b)) {
        return false;
    }
    if (a == null || b == null) {
        return false;
    }
    if (typeof a.equals === 'function' || typeof b.equals === 'function') {
        return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
    }
    switch (type(a)) {
        case 'Arguments':
        case 'Array':
        case 'Object':
            if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
                return a === b;
            }
            break;
        case 'Boolean':
        case 'Number':
        case 'String':
            if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
                return false;
            }
            break;
        case 'Date':
            if (!identical(a.valueOf(), b.valueOf())) {
                return false;
            }
            break;
        case 'Error':
            return a.name === b.name && a.message === b.message;
        case 'RegExp':
            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
                return false;
            }
            break;
        case 'Map':
        case 'Set':
            if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
                return false;
            }
            break;
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
            break;
        case 'ArrayBuffer':
            break;
        default:
            // Values of other types are only equal if identical.
            return false;
    }
    var keysA = keys(a);
    if (keysA.length !== keys(b).length) {
        return false;
    }
    var idx = stackA.length - 1;
    while (idx >= 0) {
        if (stackA[idx] === a) {
            return stackB[idx] === b;
        }
        idx -= 1;
    }
    stackA.push(a);
    stackB.push(b);
    idx = keysA.length - 1;
    while (idx >= 0) {
        var key = keysA[idx];
        if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
            return false;
        }
        idx -= 1;
    }
    stackA.pop();
    stackB.pop();
    return true;
};

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */
var _makeFlat = function _makeFlat(recursive) {
    return function flatt(list) {
        var value, jlen, j;
        var result = [];
        var idx = 0;
        var ilen = list.length;
        while (idx < ilen) {
            if (isArrayLike(list[idx])) {
                value = recursive ? flatt(list[idx]) : list[idx];
                j = 0;
                jlen = value.length;
                while (j < jlen) {
                    result[result.length] = value[j];
                    j += 1;
                }
            } else {
                result[result.length] = list[idx];
            }
            idx += 1;
        }
        return result;
    };
};

var _reduce = function () {
    function _arrayReduce(xf, acc, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
            acc = xf['@@transducer/step'](acc, list[idx]);
            if (acc && acc['@@transducer/reduced']) {
                acc = acc['@@transducer/value'];
                break;
            }
            idx += 1;
        }
        return xf['@@transducer/result'](acc);
    }
    function _iterableReduce(xf, acc, iter) {
        var step = iter.next();
        while (!step.done) {
            acc = xf['@@transducer/step'](acc, step.value);
            if (acc && acc['@@transducer/reduced']) {
                acc = acc['@@transducer/value'];
                break;
            }
            step = iter.next();
        }
        return xf['@@transducer/result'](acc);
    }
    function _methodReduce(xf, acc, obj) {
        return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
    }
    var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
    return function _reduce(fn, acc, list) {
        if (typeof fn === 'function') {
            fn = _xwrap(fn);
        }
        if (isArrayLike(list)) {
            return _arrayReduce(fn, acc, list);
        }
        if (typeof list.reduce === 'function') {
            return _methodReduce(fn, acc, list);
        }
        if (list[symIterator] != null) {
            return _iterableReduce(fn, acc, list[symIterator]());
        }
        if (typeof list.next === 'function') {
            return _iterableReduce(fn, acc, list);
        }
        throw new TypeError('reduce: list must be array or iterable');
    };
}();

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curry = _curry1(function curry(fn) {
    return curryN(fn.length, fn);
});

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
var equals = _curry2(function equals(a, b) {
    return _equals(a, b, [], []);
});

/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
// else
var filter = _curry2(_dispatchable('filter', _xfilter, function (pred, filterable) {
    return _isObject(filterable) ? _reduce(function (acc, key) {
        if (pred(filterable[key])) {
            acc[key] = filterable[key];
        }
        return acc;
    }, {}, keys(filterable)) : // else
    _filter(pred, filterable);
}));

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */
var map = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
    switch (Object.prototype.toString.call(functor)) {
        case '[object Function]':
            return curryN(functor.length, function () {
                return fn.call(this, functor.apply(this, arguments));
            });
        case '[object Object]':
            return _reduce(function (acc, key) {
                acc[key] = fn(functor[key]);
                return acc;
            }, {}, keys(functor));
        default:
            return _map(fn, functor);
    }
}));

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * `R.reduced` to shortcut the iteration.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex
 * @example
 *
 *      var numbers = [1, 2, 3];
 *      var plus = (a, b) => a + b;
 *
 *      R.reduce(plus, 10, numbers); //=> 16
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
var reduce = _curry3(_reduce);

/**
 * The complement of `filter`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var reject = _curry2(function reject(pred, filterable) {
    return filter(_complement(pred), filterable);
});

var _flatCat = function () {
    var preservingReduced = function (xf) {
        return {
            '@@transducer/init': _xfBase.init,
            '@@transducer/result': function (result) {
                return xf['@@transducer/result'](result);
            },
            '@@transducer/step': function (result, input) {
                var ret = xf['@@transducer/step'](result, input);
                return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
            }
        };
    };
    return function _xcat(xf) {
        var rxf = preservingReduced(xf);
        return {
            '@@transducer/init': _xfBase.init,
            '@@transducer/result': function (result) {
                return rxf['@@transducer/result'](result);
            },
            '@@transducer/step': function (result, input) {
                return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
            }
        };
    };
}();

// Array.prototype.indexOf doesn't exist below IE9
// manually crawl the list to distinguish between +0 and -0
// NaN
// non-zero numbers can utilise Set
// all these types can utilise Set
// null can utilise Set
// anything else not covered above, defer to R.equals
var _indexOf = function _indexOf(list, a, idx) {
    var inf, item;
    // Array.prototype.indexOf doesn't exist below IE9
    if (typeof list.indexOf === 'function') {
        switch (typeof a) {
            case 'number':
                if (a === 0) {
                    // manually crawl the list to distinguish between +0 and -0
                    inf = 1 / a;
                    while (idx < list.length) {
                        item = list[idx];
                        if (item === 0 && 1 / item === inf) {
                            return idx;
                        }
                        idx += 1;
                    }
                    return -1;
                } else if (a !== a) {
                    // NaN
                    while (idx < list.length) {
                        item = list[idx];
                        if (typeof item === 'number' && item !== item) {
                            return idx;
                        }
                        idx += 1;
                    }
                    return -1;
                }
                // non-zero numbers can utilise Set
                return list.indexOf(a, idx);
            // all these types can utilise Set
            case 'string':
            case 'boolean':
            case 'function':
            case 'undefined':
                return list.indexOf(a, idx);
            case 'object':
                if (a === null) {
                    // null can utilise Set
                    return list.indexOf(a, idx);
                }
        }
    }
    // anything else not covered above, defer to R.equals
    while (idx < list.length) {
        if (equals(list[idx], a)) {
            return idx;
        }
        idx += 1;
    }
    return -1;
};

var _xchain = _curry2(function _xchain(f, xf) {
    return map(f, _flatCat(xf));
});

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 */
var chain = _curry2(_dispatchable('chain', _xchain, function chain(fn, monad) {
    if (typeof monad === 'function') {
        return function () {
            return monad.call(this, fn.apply(this, arguments)).apply(this, arguments);
        };
    }
    return _makeFlat(false)(map(fn, monad));
}));

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
var pipe = function pipe() {
    if (arguments.length === 0) {
        throw new Error('pipe requires at least one argument');
    }
    return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
};

var _contains = function _contains(a, list) {
    return _indexOf(list, a, 0) >= 0;
};

//  mapPairs :: (Object, [String]) -> [String]
var _toString = function _toString(x, seen) {
    var recur = function recur(y) {
        var xs = seen.concat([x]);
        return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
    };
    //  mapPairs :: (Object, [String]) -> [String]
    var mapPairs = function (obj, keys) {
        return _map(function (k) {
            return _quote(k) + ': ' + recur(obj[k]);
        }, keys.slice().sort());
    };
    switch (Object.prototype.toString.call(x)) {
        case '[object Arguments]':
            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
        case '[object Array]':
            return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
                return (/^\d+$/.test(k)
                );
            }, keys(x)))).join(', ') + ']';
        case '[object Boolean]':
            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
        case '[object Date]':
            return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
        case '[object Null]':
            return 'null';
        case '[object Number]':
            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
        case '[object String]':
            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
        case '[object Undefined]':
            return 'undefined';
        default:
            if (typeof x.toString === 'function') {
                var repr = x.toString();
                if (repr !== '[object Object]') {
                    return repr;
                }
            }
            return '{' + mapPairs(x, keys(x)).join(', ') + '}';
    }
};

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
var compose$1 = function compose$1() {
    if (arguments.length === 0) {
        throw new Error('compose requires at least one argument');
    }
    return pipe.apply(this, reverse(arguments));
};

/**
 * Returns `true` if the specified value is equal, in `R.equals` terms, to at
 * least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains([42], [[42]]); //=> true
 */
var contains = _curry2(_contains);

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
var toString = _curry1(function toString(val) {
    return _toString(val, []);
});

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} a
 * @param {Array|String} b
 * @return {Array|String}
 *
 * @example
 *
 *      R.concat([], []); //=> []
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 */
var concat = _curry2(function concat(a, b) {
    if (a == null || !_isFunction(a.concat)) {
        throw new TypeError(toString(a) + ' does not have a method named "concat"');
    }
    if (_isArray(a) && !_isArray(b)) {
        throw new TypeError(toString(b) + ' is not an array');
    }
    return a.concat(b);
});

var R = {
    chain: chain,
    compose: compose$1,
    concat: concat,
    contains: contains,
    curry: curry,
    filter: filter,
    find: find,
    insert: insert,
    map: map,
    reduce: reduce
};

/**
 * More math helper functions that takes advantage of Ramda to create some
 * newer helper functions.
 */

/**
 * Randomizes the value in a array. Assumes each array has at least 2 elements and no more than 3, but
 * can also accept a regular array
 * @param amap {Array} an array of values. Can be multi-dimensional
 */
function randomize(amap) {
    return R.reduce((acc, itm) => {
        if (itm instanceof Array) {
            if (itm.length === 2) {
                itm[0] = Math.random();
                itm[1] = Math.random();
            } else if (itm.length === 3) {
                itm[0] = Math.random();
                itm[1] = Math.random();
                itm[2] = Math.random();
            }
        } else {
            itm = Math.random();
        }

        acc.push(itm);
        return acc;
    }, [], amap);
}

/**
 * Normalizes an array
 * @param amap {Array} an multi-dimensional array of values
 */
function normalize(amap) {
    return R.reduce((acc, itm) => {
        itm = normalizeArray(itm);
        acc.push(itm);
        return acc;
    }, [], amap);
}

/**
 * Creates a new list of values usable as attribute data. Assumes you want to make a "vec3" which
 * in this case is simply an array of 3 values.
 * @param count{Number} the number of vec3s to create
 * @param random{Boolean} whether or not the values ought to be random or just 0. If true, values will
 * also be normalized.
 * @returns {*} the final multi-dimensional array of values.
 */
function createList(count, random = false) {
    if (!random) {
        return R.compose(emptyVec3Array)(count);
    } else {
        return R.compose(normalize, randomize, emptyVec3Array)(count);
    }
}

/**
 * Passthrough to the flattenArray function
 * @param map an array of items that are arrays ie [[0,1,2]]
 * @returns {Array} returns the unrolled array ie [0,1,2]
 */
function unrollMap(map) {
    return flattenArray(map);
}

var vert$1 = "\nuniform mat4 projectionMatrix, modelMatrix, viewMatrix;\nuniform float time;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec3 offset;\nattribute vec2 uv;\nvarying vec3 vOffset;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying float vScale;\nvoid main () {\n    vec3 trTime = vec3(offset.x + time,offset.y + time,offset.z + time);\n    float scale =  sin( trTime.x * 2.1 ) + sin( trTime.y * 3.2 ) + sin( trTime.z * 4.3 );\n    scale = (sin(time) * (offset.x + offset.y + offset.z) * scale)  * 10.0;\n    scale = clamp(scale,0.5,5.0);\n    gl_PointSize = scale;\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);\n    vScale = scale;\n    vUv = uv;\n    vNormal = normal;\n    vOffset = offset;\n    vPosition = position;\n}\n";

var frag$1 = "precision highp float;\nuniform float time;\nuniform sampler2D uGradient;\nuniform sampler2D uParticle;\nuniform vec2 resolution;\nvarying float vScale;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvoid main() {\n    vec4 pTex = texture2D(uParticle,gl_PointCoord);\n    vec4 grad = texture2D(uGradient,gl_PointCoord);\n    vec2  px = 4.0*(-resolution.xy + 2.0* gl_FragCoord.xy) / resolution.y;\n    \n    float id = 0.5 + 0.5*cos(time + sin(dot(floor(px+0.5),vec2(113.1,17.81)))*43758.545);\n    \n    vec3  co = 0.5 + 0.5*cos(time + 3.5*id + vec3(0.0,1.57,3.14) );\n    \n    vec2  pa = smoothstep( 0.0, 0.2, id*(0.5 + 0.5*cos(6.2831*px)) );\n    vec4 color = vec4( co - pa.x + pa.y, 0.8 );\n    vec4 mixedColor = mix(grad,color,1.0) * vScale;\n    vec4 texColor = vec4(vec3(1.0 - pTex.r, 1.0 - pTex.g, 1.0 - pTex.b) * mixedColor.xyz,pTex.a);\n    gl_FragColor = texColor;\n}\n";

var fog = "precision highp float;\nfloat fogFactorExp2(\n  const float dist,\n  const float density\n) {\n  const float LOG2 = -1.442695;\n  float d = density * dist;\n  return 1.0 - clamp(exp2(d * d * LOG2), 0.0, 1.0);\n}\nfloat fogFactorLinear(\n  const float dist,\n  const float start,\n  const float end\n) {\n  return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);\n}";

const PHI = 1.0 / ((1.0 + Math.sqrt(5.0)) / 2.0);
class SpeakerSphere extends Mesh {
    constructor(gl, options) {
        super(gl, options);
        this.setShader({
            vertex: [fog, vert$1],
            fragment: [fog, frag$1],
            uniforms: options.uniforms
        });
        this.scaleModel(400, 400, 400);
        //this.scaleModel(30,30,30);
        this._build();
    }

    update() {
        this.rotateY(0.002);
        this.rotateX(0.002);
    }

    _build() {

        let subdivisions = 5;

        let positions = [[-PHI, 1.0, 0.0], [PHI, 1.0, 0.0], [-PHI, -1.0, 0.0], [PHI, -1.0, 0.0], [0.0, -PHI, 1.0], [0.0, PHI, 1.0], [0.0, -PHI, -1.0], [0.0, PHI, -1.0], [1.0, 0.0, -PHI], [1.0, 0.0, PHI], [-1.0, 0.0, -PHI], [-1.0, 0.0, PHI]];

        let normals = [[-PHI, 1.0, 0.0], [PHI, 1.0, 0.0], [-PHI, -1.0, 0.0], [PHI, -1.0, 0.0], [0.0, -PHI, 1.0], [0.0, PHI, 1.0], [0.0, -PHI, -1.0], [0.0, PHI, -1.0], [1.0, 0.0, -PHI], [1.0, 0.0, PHI], [-1.0, 0.0, -PHI], [-1.0, 0.0, PHI]];

        let indices = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 5, 11, 4, 1, 5, 9, 7, 1, 8, 10, 7, 6, 11, 10, 2, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];

        for (var j = 0; j < subdivisions; ++j) {
            const numTriangles = indices.length / 3;
            for (var i = 0; i < numTriangles; ++i) {
                let index0 = indices[i * 3 + 0];
                let index1 = indices[i * 3 + 1];
                let index2 = indices[i * 3 + 2];

                let index3 = positions.length;
                let index4 = index3 + 1;
                let index5 = index4 + 1;

                indices[i * 3 + 1] = index3;
                indices[i * 3 + 2] = index5;

                // add new triangles
                indices[i * 3 + 1] = index3;
                indices[i * 3 + 2] = index5;

                indices.push(index3);
                indices.push(index1);
                indices.push(index4);
                indices.push(index5);
                indices.push(index3);
                indices.push(index4);

                indices.push(index5);
                indices.push(index4);
                indices.push(index2);

                // add new positions
                positions.push(multiplyScalar(addArrays(positions[index0], positions[index1]), 0.5));
                positions.push(multiplyScalar(addArrays(positions[index1], positions[index2]), 0.5));
                positions.push(multiplyScalar(addArrays(positions[index2], positions[index0]), 0.5));

                // add new normals
                normals.push(multiplyScalar(addArrays(normals[index0], normals[index1]), 0.5));
                normals.push(multiplyScalar(addArrays(normals[index1], normals[index2]), 0.5));
                normals.push(multiplyScalar(addArrays(normals[index2], normals[index0]), 0.5));
            }
        }

        let uvs = Array(normals.length).fill(0).map(() => {
            return [0, 0];
        });

        positions = positions.map(itm => {
            return normalizeArray(itm);
        });
        normals = normals.map(itm => {
            return normalizeArray(itm);
        });

        // build animation offsets
        let offsets = createList(positions.length, true);

        for (var i = 0; i < normals.length; ++i) {
            let normal = normals[i];
            uvs[i][0] = 0.5 - 0.5 * Math.atan(normal[0], -normal[2]) / M_PI;
            uvs[i][1] = 1.0 - Math.acos(normal[1]) / M_PI;
        }

        function addVertex(i, uv) {
            let index = indices[i];
            indices[i] = positions.length;
            positions.push(positions[index]);
            normals.push(normals[index]);
            uvs.push(uv);
        }

        let numTriangles = indices.length / 3;
        for (var i = 0; i < numTriangles; ++i) {
            let uv0 = uvs[indices[i * 3 + 0]];
            let uv1 = uvs[indices[i * 3 + 1]];
            let uv2 = uvs[indices[i * 3 + 2]];

            let d1 = uv1[0] - uv0[0];
            let d2 = uv2[0] - uv0[0];
            if (Math.abs(d1) > 0.5 && Math.abs(d2) > 0.5) {
                addVertex(i * 3 + 0, addArrays(uv0, [d1 > 0.0 ? 1.0 : -1.0, 0.0]));
            } else if (Math.abs(d1) > 0.5) {
                addVertex(i * 3 + 1, addArrays(uv1, [d1 < 0.0 ? 1.0 : -1.0, 0.0]));
            } else if (Math.abs(d2) > 0.5) {
                addVertex(i * 3 + 2, addArrays(uv2, [d2 < 0.0 ? 1.0 : -1.0, 0.0]));
            }
        }

        this.addAttribute('position', flattenArray(positions));
        this.addAttribute('normal', flattenArray(normals));
        this.addAttribute('uv', flattenArray(uvs));
        this.addAttribute('offset', flattenArray(offsets));
        this.addIndices(indices);
    }
}

var vert$2 = "\nuniform vec3 eyeDir;\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform float time;\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 normal;\nvarying vec3 vPosition;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vEyeDir;\nconst vec2 TERRAIN_OFFSET_POSITION = vec2(10.0);\nconst float LARGE_TERRAIN_HEIGHT = 0.3;\nconst float LARGE_TERRAIN_SCALE = 2.0;\nconst float SMALL_TERRAIN_HEIGHT = 0.05;\nconst float SMALL_TERRAIN_SCALE = 7.0;\nconst float SMALLEST_TERRAIN_HEIGHT = 0.02;\nconst float SMALLEST_TERRAIN_SCALE = 13.0;\nconst float TERRAIN_SPEED = 0.02;\nconst float EPSILON = 0.01;\nvec3 terrain(vec2 coordinate) {\n  coordinate.x = (coordinate.x) - 0.5;\n  float divet = 0.3 * clamp(-1.0, 0.0, -1.0 + length(4.0 * (coordinate + vec2(0.0, 0.1))));\n  vec3 val = vec3(\n                  coordinate.x,\n                  LARGE_TERRAIN_HEIGHT\n                     * coordinate.x\n                     * noise3d(vec3(coordinate * LARGE_TERRAIN_SCALE + TERRAIN_OFFSET_POSITION, sin(time) + time * TERRAIN_SPEED)) +\n                   SMALL_TERRAIN_HEIGHT\n                     * coordinate.x\n                     * noise3d(vec3(coordinate * SMALL_TERRAIN_SCALE + TERRAIN_OFFSET_POSITION, cos(time) * TERRAIN_SPEED)) +\n                   SMALLEST_TERRAIN_HEIGHT\n                     * coordinate.y\n                     * noise3d(vec3(coordinate * SMALLEST_TERRAIN_SCALE + TERRAIN_OFFSET_POSITION, time * TERRAIN_SPEED)),\n                   coordinate.y\n                     );\n  return val;\n}\n      vec3 calculateNormal(vec3 cartesian, vec2 coordinate) {\n      \tvec3 tangent = normalize(terrain(vec2(coordinate.x, coordinate.y + EPSILON)) - cartesian);\n      \tvec3 binormal = normalize(terrain(vec2(coordinate.x + EPSILON, coordinate.y)) - cartesian);\n      \treturn cross(tangent, binormal);\n      }\nvoid main () {\n    vec3 pos = position;\n    vec2 coordinate = pos.xz;\n    vec3 cartesian = terrain(coordinate);\n    cartesian.z -= 0.5;\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(cartesian, 1.0);\n    vPosition = cartesian;\n    vEyeDir = normalize(eyeDir - vPosition);\n    vUv = uv;\n    vNormal = normal;\n}\n";

var frag$2 = "precision highp float;\nconst vec4 lightColor = vec4(1.0,0.5,0.0,1.0);\nuniform sampler2D envTex;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vEyeDir;\nvoid main(){\n   float alpha = min(0.2,\n         30.2 * (0.5 - length(2.0 * vUv - vec2(1.0)))\n    );\n    float ppEyeDiff = max( dot( vNormal, vEyeDir ), 0.0 );\n    float ppEyeFres = pow( 1.0 - ppEyeDiff, 2.0 );\n    vec3 reflectDir = reflect( vEyeDir, vNormal * vec3( 1.0, 1.5, 1.0 ) );\n    vec3 envColor = texture2D( envTex, reflectDir.xy ).rgb;\n    vec3 envSolid = vec3(1.);\n    float envGrey = envColor.r;\n    float envSpec = envColor.g;\n    float bloomShadow = vPosition.y * 0.005 + 0.8;\n    float reflectionRim = envGrey * ppEyeFres * 4.3;\n    float fres = ppEyeFres * 2.2;\n    float lighting = ( envSpec - ppEyeFres ) * 0.1;\n    float centerGlow = ppEyeDiff * 0.4 * bloomShadow;\n    vec3 col = vec3( pow(reflectionRim,5.0) + fres * pow(centerGlow,20.0));\n    vec4 finalColor = vec4(mix(col,envColor,0.8),alpha);\n    finalColor = mix(finalColor,vec4(envColor,0.5),alpha);\n    gl_FragColor = finalColor;\n }";

var noise$1 = "precision highp float;\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\nfloat noise3d(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy;  vec3 x3 = x0 - D.yyy;\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n  float n_ = 0.142857142857;  vec3  ns = n_ * D.wyz - D.xzx;\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }";

var rotate = "precision highp float; \n vec3 rotateX(vec3 p, float theta) {\n  float s = sin(theta);\n  float c = cos(theta);\n  return vec3(p.x, p.y * c - p.z * s, p.z * c + p.y * s);\n}\nvec3 rotateY(vec3 p, float theta) {\n  float s = sin(theta);\n  float c = cos(theta);\n  return vec3(p.x * c + p.z * s, p.y, p.z * c - p.x * s);\n}\nvec3 rotateZ(vec3 p, float theta) {\n  float s = sin(theta);\n  float c = cos(theta);\n  return vec3(p.x * c - p.y * s, p.y * c + p.x * s, p.z);\n}\nmat4 rotationMatrix(vec3 axis, float angle)\n{\n    axis = normalize(axis);\n    float s = sin(angle);\n    float c = cos(angle);\n    float oc = 1.0 - c;\n    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                0.0,                                0.0,                                0.0,                                1.0);\n}";

/**
 * Mixing a few things together
 * https://github.com/vorg/primitive-plane.
 * https://github.com/gregtatum/sessions/blob/gh-pages/008/terrain.js
 *
 * with styling changes
 */
class Floor extends Mesh {
    constructor(gl, { width, height, wSegments, hSegments, options } = {}) {
        super(gl, options);
        this.setShader({
            vertex: [noise$1, vert$2],
            fragment: [rotate, frag$2],
            uniforms: ['eyeDir', 'envTex', 'time']
        });

        this.translate(0, -100, 0);
        this.rotateY(toRadians(45));
        this.scaleModel(200, 200, 200);

        this._build(width, height, wSegments, hSegments, options);
        this.time = 0.0;
    }

    update(camera, env) {
        let gl = this.gl;
        let shader = this.shader;
        this.time += 0.02;

        gl.enable(gl.DEPTH_TEST);
        env.bind(0);

        shader.uniform('time', this.time);
        shader.setTextureUniform('envTex', 0);
        shader.uniform('eyeDir', camera.eye);
        env.unbind();

        this.rotateY(0.002);
    }

    _build(sx, sy, nx, ny, options) {
        let gl = this.gl;
        sx = sx || 1;
        sy = sy || 1;
        nx = nx || 1;
        ny = ny || 1;
        var quads = options && options.quads ? options.quads : false;

        var positions = [];
        var uvs = [];
        var normals = [];
        var cells = [];

        for (var iy = 0; iy <= ny; iy++) {
            for (var ix = 0; ix <= nx; ix++) {
                var u = ix / nx;
                var v = iy / ny;
                var x = -sx / 2 + u * sx; // starts on the left
                var y = sy / 2 - v * sy; // starts at the top
                positions.push([x, y, 0]);
                uvs.push([u, v]);
                normals.push([0, 0, 1]);
                if (iy < ny && ix < nx) {
                    if (quads) {
                        cells.push([iy * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix + 1, iy * (nx + 1) + ix + 1]);
                    } else {
                        cells.push([iy * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix + 1, iy * (nx + 1) + ix + 1]);
                        cells.push([(iy + 1) * (nx + 1) + ix + 1, iy * (nx + 1) + ix, (iy + 1) * (nx + 1) + ix]);
                    }
                }
            }
        }

        positions.forEach(position => {
            const [x, z, y] = position;
            position[0] = x + 0.5;
            position[1] = y;
            position[2] = z + 0.5;
        });

        // build out data for everything
        this.addAttribute('position', unrollMap(positions));
        this.addAttribute('uv', unrollMap(uvs));
        this.addAttribute('normal', unrollMap(normals));
        this.addIndices(unrollMap(cells));
    }
}

/**
 * Helper function to generate textures suitable for ping-ponging
 * @param gl {WebGLRenderingContext} a webgl context
 * @param data {Array or TypedArray} data for the texture. can either be a typed array or a regular array
 * @param width {Number} width for the texture. Defaults to 128
 * @param height {Number} height for the texture. Defaults to 128
 * @param type {Number} the datatype to use for the texture. Defaults to Floating point(gl.FLOAT)
 * @returns {*[]} an array of two textures built from the provided data
 */
function generatePingpongTexture(gl, data = null, { width = 128, height = 128, type = 5126 } = {}) {
    if (data === null) {
        console.error("generatePingpongTexture error - Need to provide texture data");
        return false;
    } else {
        return [createTexture2d(gl, {
            width: width,
            height: height,
            data: data,
            textureOptions: {
                type: type
            }
        }), createTexture2d(gl, {
            width: width,
            height: height,
            data: data,
            textureOptions: {
                type: type
            }
        })];
    }
}

/**
 * Creates a Multi attachment ping pong buffer. The difference between this one and a regular one is that you can write to a bunch
 * of textures simultaneously on just two fbos instead of having a pair of fbos for each property you want to manipulate.
 * @param gl {WebGLRenderingContext} a webgl rendering context
 * @param simulation the source GLSL for the ping pong code that you want to run
 * @param textureMap {Array} an optional texture map of initial starting data. If this is undefined, random data will be generated
 * @param uniformMap {Array} an optional map of uniforms to feed to the simulation pass. This lets the shader set values for those uniforms
 * @param numAttachments {Number} the number of attachments to create on each FBO. This is ignored if textureMap has a filled array
 * @param width {Number} The width
 * @param height
 * @returns {*}
 */
function createMultiPingpongBuffer(gl, simulation, { textureMap, uniformMap = [], numAttachments = 1, width = 128, height = 128 }) {
    let rt1, rt2;

    // for the moment, this requires the WEBGL_draw_buffers extension. First check to make sure it's enabled
    if (!gl.hasOwnProperty('WEBGL_draw_buffers') || !gl.getExtension('WEBGL_draw_buffers')) {
        console.error("The current computer does not have the WEBGL_draw_buffers extension available.");
        return false;
    }

    // if we've passed in a texture map
    if (textureMap !== undefined) {
        let texSet1 = [];
        let texSet2 = [];
        if (textureMap instanceof Array) {
            // it's assumed that each set is an array of two textures
            textureMap.forEach(set => {
                texSet1.push(set[0]);
                texSet2.push(set[1]);
            });
        } else {
            console.error("createMultiPingpongBuffer error - textureMap must be an array");
            return false;
        }

        rt1 = createFBOWithAttachments(gl, textureMap.length, {
            floatingPoint: true,
            textures: texSet1
        });

        rt2 = createFBOWithAttachments(gl, textureMap.length, {
            floatingPoint: true,
            textures: texSet2
        });
    } else {
        rt1 = createFBOWithAttachments(gl, numAttachments, {
            width: 512,
            height: 512,
            floatingPoint: true
        });

        rt2 = createFBOWithAttachments(gl, numAttachments, {
            width: 512,
            height: 512,
            floatingPoint: true
        });
    }

    // append extension to the glsl
    let extension = "#extension GL_EXT_draw_buffers : require \n";

    // build quad for drawing
    let quad = createQuad(gl, {
        fragmentShader: extension + simulation,
        uniformMap: uniformMap
    });

    rt1.bindBuffers();
    rt2.bindBuffers();

    return {
        gl: gl,
        quad: quad,
        rt1: rt1,
        rt2: rt2,
        bindTexture(index = 0) {
            this.rt2.bindTexture(index);
        },
        bindTextures() {
            this.rt2.bindTextures();
        },
        unbindTextures() {
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        },
        update(cb = null) {
            let gl = this.gl;
            let rt1 = this.rt1;
            let rt2 = this.rt2;

            // bind the write texture
            rt1.bindFbo();
            // bind previous buffer's texture
            rt2.bindTextures();
            // draw the quad
            if (cb !== null) {
                cb(this.quad.shader);
            }
            this.quad.draw();

            rt1.unbindFbo();
            // swap
            var tmp = this.rt2;
            this.rt2 = this.rt1;
            this.rt1 = tmp;
        }
    };
}

/**
 * A basic, pingpong setup. Generates it's own textures at the moment.
 * @param gl {WebGLRenderingContext} a webgl context
 * @param simulation {Number} the shader for the manipulating the texture data
 * @param width {Number} width for the textures
 * @param height {Number} height for the textures
 * @returns {{gl: *, flag: number, rt1: ({gl, drawTexture, fbo, bindFbo, unbindFbo, bindTexture, unbindTexture}|{gl: *, drawTexture: *, fbo: *, bindFbo: bindFbo, unbindFbo: unbindFbo, bind: bind, unbind: unbind}), rt2: ({gl, drawTexture, fbo, bindFbo, unbindFbo, bindTexture, unbindTexture}|{gl: *, drawTexture: *, fbo: *, bindFbo: bindFbo, unbindFbo: unbindFbo, bind: bind, unbind: unbind}), quad: ({vao, shader, buffer, type, hasTexture, gl, draw}|{vao: ({gl, vao, ext, attributes, setAttributeLocation, enableAttributes, addAttribute, getAttribute, enableAttribute, disableAttribute, setData, point, bind, unbind}|*), shader: ({gl, program, uniforms, attributes, bind, setMatrixUniform, setTextureUniform, uniform}|*), buffer: *, hasTexture: boolean, gl: *, draw: draw}), update: update, getOutput: getOutput}}
 */

var vert$3 = "\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform vec3 eyeDir;\nuniform float time;\nuniform sampler2D sphereData;\nattribute vec3 position;\nattribute vec3 offsets;\nvarying vec3 vPosition;\nvarying vec3 vEyeDir;\nconst float r = 50.0;\nvoid main(){\n    vec4 pos = vec4(position,1.);\n    vec4 sphere = texture2D(sphereData,offsets.xy);\n    float n = noise3d(offsets);\n    float x = cos(sphere.y) * sin(sphere.x) * r;\n    float y = sin(sphere.y) * sin(sphere.x) * r;\n    float z = cos(sphere.x) * r;\n    vec3 circ = vec3(x,y,z) + vec3(n);\n    vec3 offs = offsets;\n    offs += circ;\n    vec4 finalPos = pos + vec4(offs,1.);\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(finalPos);\n    vEyeDir = eyeDir;\n    vPosition = offsets;\n}\n";

var frag$3 = "precision highp float; \n#extension GL_OES_standard_derivatives : enable\nprecision highp float;\nvarying vec3 vPosition;\nvarying vec3 vEyeDir;\nuniform float time;\nuniform sampler2D uGradient;\nuniform vec2 resolution;\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    vec4 grad = texture2D(uGradient,uv);\n    vec2  px = 4.0*(-resolution.xy + 2.0* gl_FragCoord.xy) / resolution.y;\n    float id = 20.5 + 0.5 * cos(time + sin(dot(floor(px+0.5),vec2(113.1,17.81)))*43758.545);\n    vec3  co = 0.5 + 0.5*cos(time + 3.5*id + vec3(0.0,1.57,3.14) );\n    vec2  pa = smoothstep( 0.0, 0.2, id*(0.5 + 0.5*cos(6.2831*px)) );\n    pa = pow(pa,uv + resolution);\n    vec4 color = vec4( co - pa.x + pa.y, 0.8 );\n    vec4 mixedColor = mix(grad,color,0.6);\n    vec4 texColor = mixedColor + vec4(vPosition,1.);\n    vec4 finalColor = mix(texColor,vec4(uv,0.0,1.0),0.5);\n   gl_FragColor = finalColor;\n}\n";

var sim = "precision highp float;\nuniform sampler2D sphereData;\nuniform sampler2D speedData;\nvarying vec2 uv;\nvoid main() {\n    vec4 data = texture2D(sphereData, gl_FragCoord.xy / vec2(128.0));\n    vec4 speeds = texture2D(speedData, gl_FragCoord.xy / vec2(128.0));\n    data.x += speeds.x * 0.005;\n    data.y += speeds.y * 0.005;\n    if(data.x >= 10.0){\n        data.x *= 0.05;\n    }\n    if(data.y >= 10.0){\n        data.y *= 0.05;\n    }\n    if(data.z >= 10.0){\n        data.z *= 0.05;\n    }\n    gl_FragData[0] = data;\n}\n";

class SpaceShips extends Mesh {
    constructor(gl) {
        super(gl);

        this.numShips = 400;

        // rotate so centerpoint is hidden by floor
        this.rotateX(toRadians(90));

        // set the shader. SphereData is an additional uniform to keep track of.
        this.setShader({
            vertex: [noise$1, vert$3],
            fragment: frag$3,
            uniforms: ['sphereData', 'eyeDir', 'resolution', 'uGradient']
        });

        this.time = 0.0;
        this._build();
    }

    draw(camera, gradient) {
        let gl = this.gl;
        this.time += 0.01;
        this.rotateY(0.002);
        if (this.shaderSet) {

            this.shader.bind();
            gl.disable(gl.BLEND);

            if (gradient !== undefined) {
                gradient.bind(2);
                this.shader.setTextureUniform('uGradient', 2);
            }
            this.buffer.bindTextures();
            // bind default uniforms
            this.shader.uniform('time', this.time);
            this.shader.set4x4Uniform('projectionMatrix', camera.projection);
            this.shader.set4x4Uniform('viewMatrix', camera.view);
            this.shader.uniform("modelMatrix", this.model);
            this.shader.setTextureUniform("sphereData", 0);
            this.shader.uniform('eyeDir', camera.eye);
            this.shader.uniform('resolution', [window.innerWidth, window.innerHeight]);

            // bind vao
            this.vao.bind();
            this.gl.drawInstancedElements(this.mode, this.numVertices, this.numInstances);
            // unbind vao
            this.vao.unbind();
            this.buffer.unbindTextures();
        }
    }

    _build() {
        let gl = this.gl;
        let num = this.numShips;

        this._buildShape();

        // setup positions for all of the spaceships, as well as phi, theta attributes
        let positions = createList(num, true);
        var azimuth = 256 * PI / num;
        var inclination = PI / num;
        var radius = 50.0;

        let sphereData = new Float32Array(128 * 128 * 4);
        let speeds = new Float32Array(128 * 128 * 4);

        // setup sphere data
        let datalen = sphereData.length;
        for (var i = 0; i < datalen; i += 4) {
            sphereData[i] = PI * Math.random();
            sphereData[i + 1] = PI * Math.random();
        }

        // setup speed data
        let speedlen = speeds.length;
        for (var i = 0; i < speedlen; i += 4) {
            let v1 = randFloat(-0.5, 0.5);
            let v2 = randFloat(-0.5, 0.5);

            if (v1 > 0) {
                v1 -= 1;
            }

            if (v2 > 0) {
                v2 -= 1;
            }
            speeds[i] = v1;
            speeds[i + 1] = v2;
        }

        let data = generatePingpongTexture(gl, sphereData);
        let sData = generatePingpongTexture(gl, speeds);

        let buffer = createMultiPingpongBuffer(gl, sim, {
            textureMap: [data, sData],
            uniformMap: ['sphereData', 'speedData']
        });

        this.addInstancedAttribute('offsets', unrollMap(positions));

        this.setNumInstances(positions.length);

        this.buffer = buffer;
    }

    update() {
        this.buffer.update(shader => {
            shader.setTextureUniform('sphereData', 0);
            shader.setTextureUniform('speedData', 1);
        });
    }

    /**
     * Builds the base shape for each spaceship, just a pyramid.
     * @private
     */
    _buildShape() {
        var vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];

        var indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];

        this.addAttribute('position', vertices);
        this.addIndices(indices);
    }
}

// core components
// objects in the view
// import shaders
class Grid extends View {
    constructor(gl, options) {
        super(gl, {
            post: blur,
            uniforms: ['uScene', 'resolution']
        });

        this.textures = ImageLoader.SimpleLoader(gl, ['./textures/spark1.png', './textures/gradient.png'], results => {
            // allow drawing
            this.ready = true;
            this.particleTexture = results[0];
            this.gradient = results[1];
        });

        this.sphere = new SpeakerSphere(gl, {
            mode: gl.POINTS,
            uniforms: ['time', 'uParticle', 'resolution']
        });

        this.floor = new Floor(gl, {
            width: 2,
            height: 2,
            wSegments: 250,
            hSegments: 250
        });

        this.ships = new SpaceShips(gl);

        this.ready = false;
        this.angle = 0.0;
    }

    draw(camera) {
        let gl = this.gl;
        this.angle += 0.01;
        if (this.ready) {

            this.sphere.update();
            // blend the particle sphere

            gl.enable(gl.DEPTH_TEST);
            gl.setBlendFunction("SRC_ALPHA", "ONE_MINUS_SRC_ALPHA");
            this.particleTexture.bind(1);
            this.gradient.bind(2);
            this.sphere.draw(camera, shader => {
                shader.uniform('time', this.angle);
                shader.uniform('resolution', [window.innerWidth, window.innerHeight]);
                shader.setTextureUniform('uParticle', 1);
                shader.setTextureUniform('uGradient', 2);
            });

            gl.bindTexture(TEXTURE_2D, null);
            // disable blending and enable depth checking so "stars" don't mix with the land.


            gl.disable(gl.BLEND);
            gl.enable(gl.DEPTH_TEST);
            this.floor.draw(camera);
            this.floor.update(camera, this.gradient);

            this.ships.draw(camera, this.gradient);
            this.ships.update();

            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
        }
    }

}

// post processing
// import environment
const controls = orbitControls({
    position: [0, 0, -210]
});

// gl renderer
const gl$1 = createRenderer();

// main camera
var camera = PerspectiveCamera(Math.PI / 4, fullscreenAspectRatio(), 0.1, 10000);
camera = setZoom(camera, -210);

// main scene FBO
const scene = createFBO(gl$1, {
    width: window.innerWidth,
    height: window.innerHeight,
    floatingPoint: true,
    depthTexture: true
});

const sceneQuad = createQuad(gl$1, {
    withTexture: true
});

const grain = new FilmGrain(gl$1);
const hblur = new HBlur(gl$1);
const vblur = new VBlur(gl$1);
const asci = new AcsiPass$1(gl$1);
const composer = new Composer(gl$1, scene.getTexture(), grain, hblur, vblur, asci);

var anchor = document.querySelector("#GL_LAYER");
gl$1.setFullscreen().attachToScreen(anchor);
var env = new Env(gl$1);
var grid = new Grid(gl$1);

animate();

function animate() {
    window.requestAnimationFrame(animate);
    controls.update();

    camera.update(controls.position, controls.direction, controls.up);

    scene.bind();
    gl$1.clearScreen(0, 0, 0, 0);
    env.draw(camera);
    grid.draw(camera);
    scene.unbind();

    composer.run();

    gl$1.bindTexture(gl$1.TEXTURE_2D, null);

    composer.getOutput().bindTexture();
    sceneQuad.draw();
}

})));
