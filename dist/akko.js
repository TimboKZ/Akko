var Akko =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

module.exports = {
  BarVisualiser: __webpack_require__(14),
  RingVisualiser: __webpack_require__(19)
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var Akko = __webpack_require__(7);
var Visualiser = __webpack_require__(15);
var Visualisers = __webpack_require__(2);

module.exports = Akko;
module.exports.Visualiser = Visualiser;
module.exports.visualisers = Visualisers;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var THREE = __webpack_require__(0);

var MusicPlayer = __webpack_require__(8);
var VisualisationCore = __webpack_require__(20);
var UI = __webpack_require__(12);

/**
 * @type {{containerId: string, useDefaultVisualisers: boolean, autoPlay: boolean}}
 */
var defaultOptions = {
    containerId: 'akko',
    useDefaultVisualisers: true,
    autoPlay: false
};

/**
 * @return {{containerId: string, useDefaultVisualisers: boolean, autoPlay: boolean}}
 */
var mergeOptions = function mergeOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var result = {};
    for (var key in defaultOptions) {
        if (!defaultOptions.hasOwnProperty(key)) continue;
        result[key] = options[key] !== undefined ? options[key] : defaultOptions[key];
    }
    return result;
};

var Akko = function () {
    function Akko(options) {
        _classCallCheck(this, Akko);

        if (!THREE) throw new Error('Akko could not find three.js (`THREE`)!');
        if (!window) throw new Error('Akko could not find `window` variable! Are you running Akko in browser?');
        if (!document) throw new Error('Akko could not find `document` variable! Are you running Akko in browser?');

        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!this.AudioContext) throw new Error('Akko could not find `AudioContext`! Is it supported in your browser?');

        this.options = mergeOptions(options);

        this.container = document.getElementById(this.options.containerId);
        if (!this.container) throw new Error('Could not find element with ID \'' + this.options.containerId + '\'!');

        this.musicPlayer = new MusicPlayer({
            audioContext: new this.AudioContext(),
            autoPlay: options.autoPlay
        });
        this.visCore = new VisualisationCore({
            parentElement: this.container,
            useDefaultVisualisers: this.options.useDefaultVisualisers,
            analyser: this.musicPlayer.getAnalyser()
        });
    }

    _createClass(Akko, [{
        key: 'start',
        value: function start() {
            this.bootstrapUI();
            this.visCore.prepare();
            this.visCore.useVisualiser(0);
            this.musicPlayer.start();
            this.visCore.start();
            this.setupListeners();
        }
    }, {
        key: 'bootstrapUI',
        value: function bootstrapUI() {
            this.ui = new UI({
                container: this.container,
                musicPlayer: this.musicPlayer,
                visCore: this.visCore
            });
            this.ui.start();
        }

        /**
         * @param {Visualiser} visualiser
         */

    }, {
        key: 'addVisualiser',
        value: function addVisualiser(visualiser) {
            this.visCore.addVisualiser(visualiser);
        }

        /**
         * @param {string|File|ArrayBuffer} source
         * @param {string} [title]
         */

    }, {
        key: 'addTrack',
        value: function addTrack(source, title) {
            this.musicPlayer.addTrack(source, title);
        }

        /**
         * @private
         */

    }, {
        key: 'setupListeners',
        value: function setupListeners() {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                this.container.addEventListener('dragover', this.onDragOver.bind(this), false);
                this.container.addEventListener('drop', this.onDrop.bind(this), false);
            } else {
                console.warn('The File APIs are not fully supported your browser. Drag & drop disabled in Akko.');
            }
        }

        /**
         * @private
         */

    }, {
        key: 'onDragOver',
        value: function onDragOver(event) {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        }

        /**
         * @private
         */

    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            event.stopPropagation();
            event.preventDefault();
            var files = event.dataTransfer.files;

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.type.match(/audio.*/)) {
                    this.musicPlayer.addTrack(file);
                }
            }
        }
    }]);

    return Akko;
}();

module.exports = Akko;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var Promise = __webpack_require__(9);
var Track = __webpack_require__(18);

var PlayerStates = {
    LOADING: 'Loading...',
    READY: 'Ready!',
    PLAYING: 'Playing...',
    PAUSED: 'Paused.',
    FINISHED: 'Finished!'
};

var MusicPlayer = function () {

    /**
     * @param data
     * @param {AudioContext} data.audioContext
     * @param {boolean} data.autoPlay
     */
    function MusicPlayer(data) {
        _classCallCheck(this, MusicPlayer);

        this.context = data.audioContext;
        this.autoPlay = data.autoPlay;
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
        this.analyser = this.context.createAnalyser();
        this.analyser.connect(this.context.destination);

        this.buffer = null;
        this.sourceNode = this.context.createBufferSource();
        this.startedAt = 0;
        this.pausedAt = 0;
        this.playing = false;

        /**
         * @callback playbackListener
         * @param {string} playerState
         * @param {Track[]} trackList
         * @param {int} currentTrackIndex
         */
        /** @type {playbackListener[]} */
        this.listeners = [];

        /** @type {Track[]} */
        this.trackList = [];
        this.currentTrackIndex = -1;

        this.setState(PlayerStates.READY);
    }

    _createClass(MusicPlayer, [{
        key: 'setState',
        value: function setState(newState) {
            this.state = newState;
            this.notifyListeners();
        }
    }, {
        key: 'notifyListeners',
        value: function notifyListeners() {
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];
                listener(this.state, this.trackList, this.currentTrackIndex);
            }
        }

        /**
         * @param {playbackListener} listener
         */

    }, {
        key: 'addListener',
        value: function addListener(listener) {
            this.listeners.push(listener);
        }
    }, {
        key: 'start',
        value: function start() {
            this.setState(PlayerStates.READY);
            if (this.autoPlay) this.playNextTrack();
            this.started = true;
        }
    }, {
        key: 'playNextTrack',
        value: function playNextTrack() {
            var nextTrackIndex = this.currentTrackIndex + 1;
            if (nextTrackIndex >= this.trackList.length) {
                return this.setState(PlayerStates.FINISHED);
            }
            this.playTrack(nextTrackIndex);
        }
    }, {
        key: 'playTrack',
        value: function playTrack(index) {
            var _this = this;

            this.setState(PlayerStates.LOADING);
            var track = this.trackList[index];
            Promise.resolve().then(function () {
                return track.prepareArrayBuffer();
            }).then(function (arrayBuffer) {
                return _this.context.decodeAudioData(arrayBuffer);
            }).then(function (audioBuffer) {
                _this.buffer = audioBuffer;
                _this.stop();
                _this.play();
                _this.currentTrackIndex = index;
                _this.setState(PlayerStates.PLAYING);
            }).catch(function (error) {
                console.error('Error preparing track:', error);
                console.warn('Skipping \'' + track.title + '\'!');
                return _this.playNextTrack();
            });
        }
    }, {
        key: 'togglePlayback',
        value: function togglePlayback() {
            if (this.playing) {
                this.pause();
            } else {
                if (this.buffer === null) this.playNextTrack();else this.play();
            }
            return this.playing;
        }
    }, {
        key: 'play',
        value: function play() {
            var offset = this.pausedAt;
            this.sourceNode = this.context.createBufferSource();
            this.sourceNode.connect(this.gain);
            this.sourceNode.connect(this.analyser);
            this.sourceNode.buffer = this.buffer;
            this.sourceNode.onended = this.ended.bind(this);
            this.sourceNode.start(0, offset);
            this.startedAt = this.context.currentTime - offset;
            this.pausedAt = 0;
            this.playing = true;
            this.setState(PlayerStates.PLAYING);
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this.playing) return;
            var elapsed = this.context.currentTime - this.startedAt;
            this.stop();
            this.pausedAt = elapsed;
            this.setState(PlayerStates.PAUSED);
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.playing) return;
            if (this.sourceNode) {
                this.sourceNode.disconnect();
                this.sourceNode.stop(0);
                this.sourceNode = null;
            }
            this.pausedAt = 0;
            this.startedAt = 0;
            this.playing = false;
        }
    }, {
        key: 'ended',
        value: function ended() {
            this.playNextTrack();
        }
    }, {
        key: 'addTrack',
        value: function addTrack(source, title) {
            var track = new Track({
                source: source,
                title: title
            });
            var length = this.trackList.push(track);
            this.notifyListeners();
            if (this.started) this.playTrack(length - 1);
        }
    }, {
        key: 'getAnalyser',
        value: function getAnalyser() {
            return this.analyser;
        }
    }]);

    return MusicPlayer;
}();

module.exports = MusicPlayer;
module.exports.States = PlayerStates;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = Promise;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

var requestFrame = (function () {
  var window = this
  var raf = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function fallbackRAF(func) {
      return window.setTimeout(func, 20)
    }
  return function requestFrameFunction(func) {
    return raf(func)
  }
})()

var cancelFrame = (function () {
  var window = this
  var cancel = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.clearTimeout
  return function cancelFrameFunction(id) {
    return cancel(id)
  }
})()

function resizeListener(e) {
  var win = e.target || e.srcElement
  if (win.__resizeRAF__) {
    cancelFrame(win.__resizeRAF__)
  }
  win.__resizeRAF__ = requestFrame(function () {
    var trigger = win.__resizeTrigger__
    trigger.__resizeListeners__.forEach(function (fn) {
      fn.call(trigger, e)
    })
  })
}

var exports = function exports(element, fn) {
  var window = this
  var document = window.document
  var isIE

  var attachEvent = document.attachEvent
  if (typeof navigator !== 'undefined') {
    isIE = navigator.userAgent.match(/Trident/) ||
      navigator.userAgent.match(/Edge/)
  }

  function objectLoad() {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
  }

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    if (attachEvent) {
      element.__resizeTrigger__ = element
      element.attachEvent('onresize', resizeListener)
    } else {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative'
      }
      var obj = (element.__resizeTrigger__ = document.createElement('object'))
      obj.setAttribute(
        'style',
        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;'
      )
      obj.setAttribute('class', 'resize-sensor')
      obj.__resizeElement__ = element
      obj.onload = objectLoad
      obj.type = 'text/html'
      if (isIE) {
        element.appendChild(obj)
      }
      obj.data = 'about:blank'
      if (!isIE) {
        element.appendChild(obj)
      }
    }
  }
  element.__resizeListeners__.push(fn)
}

module.exports = typeof window === 'undefined' ? exports : exports.bind(window)

module.exports.unbind = function (element, fn) {
  var attachEvent = document.attachEvent
  if (fn) {
    element.__resizeListeners__.splice(
      element.__resizeListeners__.indexOf(fn),
      1
    )
  } else {
    element.__resizeListeners__ = []
  }
  if (!element.__resizeListeners__.length) {
    if (attachEvent) {
      element.detachEvent('onresize', resizeListener)
    } else {
      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener(
        'resize',
        resizeListener
      )
      delete element.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__
      element.__resizeTrigger__ = !element.removeChild(
        element.__resizeTrigger__
      )
    }
    delete element.__resizeListeners__
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

// eslint-disable-next-line
var _require = __webpack_require__(1),
    render = _require.render,
    h = _require.h;
// eslint-disable-next-line


var UIComponent = __webpack_require__(13);

var UI = function () {

    /**
     * @param {object} data
     * @param {Element} data.container
     * @param {MusicPlayer} data.musicPlayer
     * @param {VisualisationCore} data.visCore
     */
    function UI(data) {
        _classCallCheck(this, UI);

        this.container = data.container;
        this.musicPlayer = data.musicPlayer;
        this.visCore = data.visCore;
    }

    _createClass(UI, [{
        key: 'start',
        value: function start() {
            render(h(UIComponent, { musicPlayer: this.musicPlayer, visCore: this.visCore }), this.container);
        }
    }]);

    return UI;
}();

module.exports = UI;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

// eslint-disable-next-line
var _require = __webpack_require__(1),
    Component = _require.Component,
    h = _require.h;

var PlayerStates = __webpack_require__(8).States;

var UIComponent = function (_Component) {
    _inherits(UIComponent, _Component);

    function UIComponent(props) {
        _classCallCheck(this, UIComponent);

        var _this = _possibleConstructorReturn(this, (UIComponent.__proto__ || Object.getPrototypeOf(UIComponent)).call(this, props));

        _this.state = {
            playerState: null,
            trackList: [],
            currentTrackIndex: null,
            visualisers: [],
            currentVisualiserIndex: null
        };
        props.musicPlayer.addListener(_this.playbackListener.bind(_this));
        props.visCore.addListener(_this.visualiserListener.bind(_this));
        return _this;
    }

    _createClass(UIComponent, [{
        key: 'playbackListener',
        value: function playbackListener(playerState, trackList, currentTrackIndex) {
            this.setState({
                playerState: playerState,
                trackList: trackList,
                currentTrackIndex: currentTrackIndex
            });
        }
    }, {
        key: 'visualiserListener',
        value: function visualiserListener(visualisers, currentVisualiserIndex) {
            this.setState({
                visualisers: visualisers,
                currentVisualiserIndex: currentVisualiserIndex
            });
        }
    }, {
        key: 'playTrack',
        value: function playTrack(index, event) {
            event.preventDefault();
            this.props.musicPlayer.playTrack(index);
        }
    }, {
        key: 'togglePlayback',
        value: function togglePlayback(event) {
            event.preventDefault();
            var state = this.state;
            state.playing = this.props.musicPlayer.togglePlayback();
            this.setState(state);
        }
    }, {
        key: 'addTrackByUrl',
        value: function addTrackByUrl(event) {
            event.preventDefault();
            var audioUrl = prompt('Enter the URL of an audio file');
            if (audioUrl) {
                this.props.musicPlayer.addTrack(audioUrl);
            }
        }
    }, {
        key: 'uploadAudioFile',
        value: function uploadAudioFile(event) {
            event.preventDefault();
            if (!this.fileInput) return;
            if (!this.fileInput.onchange) this.fileInput.onchange = this.addAudioFile.bind(this);
            this.fileInput.click();
        }
    }, {
        key: 'addAudioFile',
        value: function addAudioFile() {
            var files = this.fileInput.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.type.match(/audio.*/)) {
                    this.props.musicPlayer.addTrack(file);
                }
            }
        }
    }, {
        key: 'getTrackList',
        value: function getTrackList() {
            var trackList = this.state.trackList;
            if (trackList) {
                var trackComponents = [];
                for (var i = 0; i < trackList.length; i++) {
                    var track = trackList[i];
                    var isActive = this.state.currentTrackIndex === i;
                    var activeClass = isActive ? 'active' : '';
                    var symbol = isActive ? this.getPlaybackSymbol() : '#' + (i + 1);
                    trackComponents.push(h(
                        'a',
                        { href: '#', alt: 'Play track #' + (i + 1), onClick: this.playTrack.bind(this, i),
                            className: 'akko-ui-container-list-item ' + activeClass },
                        h(
                            'span',
                            null,
                            symbol
                        ),
                        ' ',
                        track.title
                    ));
                }
                return h(
                    'div',
                    { className: 'akko-ui-container-list' },
                    trackComponents
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'getPlaybackSymbol',
        value: function getPlaybackSymbol() {
            return !this.isPlaying() ? '❚❚' : '►';
        }
    }, {
        key: 'getPlaybackButtonSymbol',
        value: function getPlaybackButtonSymbol() {
            return this.isPlaying() ? '❚❚' : '►';
        }
    }, {
        key: 'isPlaying',
        value: function isPlaying() {
            return this.state.playerState === PlayerStates.PLAYING;
        }
    }, {
        key: 'useVisualiser',
        value: function useVisualiser(index, event) {
            event.preventDefault();
            this.props.visCore.useVisualiser(index);
        }
    }, {
        key: 'getVisualiserList',
        value: function getVisualiserList() {
            var visualisers = this.state.visualisers;
            if (visualisers) {
                var visualiserComponents = [];
                for (var i = 0; i < visualisers.length; i++) {
                    var visualiser = visualisers[i];
                    var isActive = this.state.currentVisualiserIndex === i;
                    var activeClass = isActive ? 'active' : '';
                    var symbol = visualiser.code;
                    visualiserComponents.push(h(
                        'a',
                        { href: '#', alt: 'Use visualiser #' + (i + 1),
                            onClick: this.useVisualiser.bind(this, i),
                            className: 'akko-ui-container-list-item ' + activeClass },
                        h(
                            'span',
                            null,
                            symbol
                        ),
                        ' ',
                        visualiser.name
                    ));
                }
                return h(
                    'div',
                    { className: 'akko-ui-container-list' },
                    visualiserComponents
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return h(
                'div',
                { className: 'akko-ui' },
                h(
                    'div',
                    { className: 'akko-ui-container akko-ui-tracks' },
                    h(
                        'div',
                        { className: 'akko-ui-container-title' },
                        'Player: ',
                        this.state.playerState
                    ),
                    this.getTrackList(),
                    h(
                        'div',
                        { className: 'akko-ui-add-tracks' },
                        h('input', { ref: function ref(input) {
                                return _this2.fileInput = input;
                            }, type: 'file', style: 'display: none;' }),
                        h(
                            'a',
                            { href: '#', alt: 'Add a track by URL', onClick: this.addTrackByUrl.bind(this) },
                            'Add track by URL'
                        ),
                        ' or ',
                        h(
                            'a',
                            { href: '#', alt: 'Upload an audio file', onClick: this.uploadAudioFile.bind(this) },
                            'upload audio file'
                        ),
                        h('br', null),
                        'or drag & drop a file into the visualiser.'
                    )
                ),
                h(
                    'div',
                    { className: 'akko-ui-container akko-ui-visualisers' },
                    h(
                        'div',
                        { className: 'akko-ui-container-title' },
                        'Visualisers'
                    ),
                    this.getVisualiserList()
                ),
                h(
                    'div',
                    { className: 'akko-ui-controls' },
                    h(
                        'a',
                        { href: '#', alt: 'Toggle playback', onClick: this.togglePlayback.bind(this),
                            className: 'akko-ui-controls-play ' + (this.isPlaying() ? 'active' : '') },
                        this.getPlaybackButtonSymbol()
                    ),
                    h(
                        'div',
                        { className: 'akko-ui-controls-progress' },
                        h('div', { className: 'akko-ui-controls-progress-indicator' })
                    ),
                    h('div', { className: 'akko-ui-controls-volume' })
                )
            );
        }
    }]);

    return UIComponent;
}(Component);

module.exports = UIComponent;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var THREE = __webpack_require__(0);
var Visualiser = __webpack_require__(15);

var BAR_COUNT = 32;

var BarVisualiser = function (_Visualiser) {
    _inherits(BarVisualiser, _Visualiser);

    function BarVisualiser() {
        _classCallCheck(this, BarVisualiser);

        return _possibleConstructorReturn(this, (BarVisualiser.__proto__ || Object.getPrototypeOf(BarVisualiser)).call(this, {
            code: 'Ba',
            name: 'Bars 3D',
            fftSize: BAR_COUNT * 2,
            smoothingTimeConstant: 0.9
        }));
    }

    _createClass(BarVisualiser, [{
        key: 'onInit',
        value: function onInit(data) {
            this.setupSceneAndCamera(data);
            this.setupLights(data);
            this.setupPlane(data);
            this.setupBars(data);
        }
    }, {
        key: 'setupSceneAndCamera',
        value: function setupSceneAndCamera(data) {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(60, data.width / data.height, 0.1, 100);
            this.camera.position.set(0, 15, 17);
            this.camera.rotation.x = -Math.PI / 4;
            this.cameraPivot = new THREE.Object3D();
            this.cameraPivot.add(this.camera);
            this.cameraPivot.castShadow = true;
            this.scene.add(this.cameraPivot);
        }
    }, {
        key: 'setupLights',
        value: function setupLights() {
            var ambientLight = new THREE.AmbientLight(0x404040, 0.8);
            this.scene.add(ambientLight);
        }
    }, {
        key: 'setupPlane',
        value: function setupPlane() {
            var planeGeometry = new THREE.PlaneGeometry(200, 200, 1);
            var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x444444, side: THREE.DoubleSide });
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            plane.rotation.x = Math.PI / 2;
            this.scene.add(plane);
        }
    }, {
        key: 'setupBars',
        value: function setupBars() {
            this.bars = [];
            this.lights = [];
            this.cubeLights = [];
            var step = 2 * Math.PI / BAR_COUNT;
            var geometry = new THREE.BoxGeometry(0.5, 10, 0.5);
            var radius = 5;
            for (var i = 0; i < BAR_COUNT; i++) {
                var color = 0xff0000 + i * 5;
                var bar = new THREE.Object3D();
                var material = new THREE.MeshLambertMaterial({ color: color });
                var cube = new THREE.Mesh(geometry, material);
                var cubeLight = new THREE.PointLight(color, 0, 4);
                cubeLight.position.y = 7;
                cubeLight.position.x = -1;
                cube.add(cubeLight);
                var light = new THREE.PointLight(color, 0, 10);
                light.position.y = 1;
                light.position.x = 10;
                bar.add(light);
                bar.add(cube);
                bar.position.x = radius;
                cube.position.y = -4.8;
                var pivot = new THREE.Object3D();
                pivot.rotation.y = step * i;
                pivot.add(bar);
                this.scene.add(pivot);
                this.bars.push(cube);
                this.lights.push(light);
                this.cubeLights.push(cubeLight);
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(data) {
            for (var i = 0; i < BAR_COUNT; i++) {
                var bar = this.bars[i];
                var light = this.lights[i];
                var cubeLight = this.cubeLights[i];
                var frequency = Math.abs(data.frequencyData[i]);
                var timeDomain = data.timeDomainData[i];

                var value = frequency * timeDomain;
                if (value === Infinity || value === -Infinity) continue;
                var newY = bar.position.y + (value - bar.position.y) / 30;
                if (isNaN(newY)) continue;

                light.intensity = Math.max(0, newY);
                cubeLight.intensity = Math.max(0, newY) * 0.5;
                bar.position.y = newY;
            }
            this.cameraPivot.rotation.y += 0.01;
            data.renderer.render(this.scene, this.camera);
        }
    }, {
        key: 'onResize',
        value: function onResize(data) {
            this.camera.aspect = data.width / data.height;
            this.camera.updateProjectionMatrix();
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            delete this.scene;
            delete this.camera;
        }
    }]);

    return BarVisualiser;
}(Visualiser);

module.exports = BarVisualiser;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var Helper = __webpack_require__(16);

/**
 * @abstract
 */

var Visualiser = function (_Helper) {
    _inherits(Visualiser, _Helper);

    /**
     * @param {object} data
     * @param {string} data.code
     * @param {string} data.name
     * @param {int} data.fftSize
     * @param {number} data.smoothingTimeConstant
     */
    function Visualiser(data) {
        _classCallCheck(this, Visualiser);

        var _this = _possibleConstructorReturn(this, (Visualiser.__proto__ || Object.getPrototypeOf(Visualiser)).call(this));

        _this.code = data.code || 'UV';
        _this.name = data.name || 'Untitled Visualiser';
        _this.fftSize = data.fftSize || 128;
        _this.smoothingTimeConstant = data.smoothingTimeConstant || 0;
        _this.initialised = false;
        _this.paused = false;
        return _this;
    }

    /**
     * @param {object} data
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {number} data.height
     * @param {number} data.width
     */


    _createClass(Visualiser, [{
        key: 'init',
        value: function init(data) {
            this.onInit(data);
            this.initialised = true;
        }

        /**
         * @abstract
         * @param {object} data
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {number} data.height
         * @param {number} data.width
         */
        // eslint-disable-next-line

    }, {
        key: 'onInit',
        value: function onInit(data) {
            throw new Error('The \'onInit\' method was not defined on ' + this.name + '!');
        }

        /**
         * @param {object} data
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {number} data.height
         * @param {number} data.width
         */

    }, {
        key: 'revive',
        value: function revive(data) {
            this.onRevive(data);
            this.paused = false;
        }

        /**
         * @abstract
         * @param {object} data
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {number} data.height
         * @param {number} data.width
         */
        // eslint-disable-next-line

    }, {
        key: 'onRevive',
        value: function onRevive(data) {}

        /**
         * @param {object} data
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {Float32Array} data.frequencyData
         * @param {Float32Array} data.timeDomainData
         */

    }, {
        key: 'update',
        value: function update(data) {
            this.onUpdate(data);
        }

        /**
         * @abstract
         * @param {object} data
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {Float32Array} data.frequencyData
         * @param {Float32Array} data.timeDomainData
         */
        // eslint-disable-next-line

    }, {
        key: 'onUpdate',
        value: function onUpdate(data) {
            throw new Error('The \'onUpdate\' method was not defined on ' + this.name + '!');
        }

        /**
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {number} data.height
         * @param {number} data.width
         */

    }, {
        key: 'resize',
        value: function resize(data) {
            this.onResize(data);
        }

        /**
         * @abstract
         * @param {THREE.WebGLRenderer} data.renderer
         * @param {number} data.height
         * @param {number} data.width
         */
        // eslint-disable-next-line

    }, {
        key: 'onResize',
        value: function onResize(data) {}
    }, {
        key: 'pause',
        value: function pause() {
            this.onPause();
            this.paused = true;
        }

        /**
         * @abstract
         */

    }, {
        key: 'onPause',
        value: function onPause() {}
    }, {
        key: 'destroy',
        value: function destroy() {
            this.onDestroy();
        }

        /**
         * @abstract
         */

    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            throw new Error('The \'onDestroy\' method was not defined on ' + this.name + '!');
        }
    }, {
        key: 'error',
        value: function error(message) {
            // TODO: Draw error message on canvas
            throw new Error(message);
        }
    }, {
        key: 'isInitialised',
        value: function isInitialised() {
            return this.initialised;
        }
    }, {
        key: 'isPaused',
        value: function isPaused() {
            return this.paused;
        }
    }]);

    return Visualiser;
}(Helper);

module.exports = Visualiser;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, [{
        key: "lerp",
        value: function lerp(current, target, fraction) {
            if (isNaN(target) || target === Infinity || target === -Infinity) return current;
            return current + (target - current) * fraction;
        }
    }, {
        key: "constrain",
        value: function constrain(max, min, value) {
            return Math.min(max, Math.max(min, value));
        }
    }]);

    return Helper;
}();

module.exports = Helper;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var SourceTypes = {
    URL: 'url',
    FILE: 'file',
    ARRAY_BUFFER: 'arrayBuffer'
};

var Track = function () {

    /**
     * @param {object} data
     * @param {string|File} data.source
     * @param {string} [data.title]
     */
    function Track(data) {
        _classCallCheck(this, Track);

        this.source = data.source;
        this.title = data.title;
        this.arrayBufferCache = null;
        this.analyseSource();
    }

    _createClass(Track, [{
        key: 'analyseSource',
        value: function analyseSource() {
            if (typeof this.source === 'string') {
                this.sourceType = SourceTypes.URL;
                this.title = this.title || decodeURIComponent(this.source.split('/').pop().replace(/\.[a-zA-Z0-9]+$/, ''));
            } else if (this.source instanceof File) {
                this.sourceType = SourceTypes.FILE;
                this.title = this.title || this.source.name.replace(/\.[a-zA-Z0-9]+$/, '');
            } else if (this.source instanceof ArrayBuffer) {
                this.sourceType = SourceTypes.ARRAY_BUFFER;
                this.title = this.title || 'Untitled';
            } else {
                throw new Error('\'Unsupported Track source type: ' + this.source);
            }
        }

        /**
         * @return {Promise.<ArrayBuffer>}
         */

    }, {
        key: 'prepareArrayBuffer',
        value: function prepareArrayBuffer() {
            var _this = this;

            if (this.arrayBufferCache) return Promise.resolve(this.arrayBufferCache);
            switch (this.sourceType) {
                case SourceTypes.URL:
                    return window.fetch(this.source).then(function (response) {
                        var arrayBuffer = response.arrayBuffer();
                        _this.arrayBufferCache = arrayBuffer;
                        return arrayBuffer;
                    });
                case SourceTypes.FILE:
                    return new Promise(function (resolve, reject) {
                        var reader = new window.FileReader();
                        reader.onload = function (fileEvent) {
                            var arrayBuffer = fileEvent.target.result;
                            _this.arrayBufferCache = arrayBuffer;
                            resolve(arrayBuffer);
                        };
                        reader.onerror = function (error) {
                            reject(error);
                        };
                        reader.readAsArrayBuffer(_this.source);
                    });
                case SourceTypes.ARRAY_BUFFER:
                    return Promise.resolve(this.source);
                default:
                    return Promise.reject(new Error('\'Unsupported track source type: ' + this.sourceType));
            }
        }
    }]);

    return Track;
}();

module.exports = Track;
module.exports.SourceTypes = SourceTypes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var THREE = __webpack_require__(0);
var Visualiser = __webpack_require__(15);

var RING_COUNT = 16;

var RingVisualiser = function (_Visualiser) {
    _inherits(RingVisualiser, _Visualiser);

    function RingVisualiser() {
        _classCallCheck(this, RingVisualiser);

        return _possibleConstructorReturn(this, (RingVisualiser.__proto__ || Object.getPrototypeOf(RingVisualiser)).call(this, {
            code: 'Rn',
            name: 'Rings 2D',
            fftSize: RING_COUNT * 2,
            smoothingTimeConstant: 0.9
        }));
    }

    _createClass(RingVisualiser, [{
        key: 'onInit',
        value: function onInit(data) {
            this.setupSceneAndCamera(data);
            this.setupRings();
        }
    }, {
        key: 'setupSceneAndCamera',
        value: function setupSceneAndCamera(data) {
            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(60, data.width / data.height, 0.1, 100);
            this.camera.position.z = 20;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.scene.add(this.camera);
        }
    }, {
        key: 'setupRings',
        value: function setupRings() {
            this.rings = [];
            var hslStep = 1 / RING_COUNT;
            for (var i = 0; i < RING_COUNT; i++) {
                var radius = 2 + i;
                var segments = 64;
                var material = new THREE.LineBasicMaterial({ color: 0x0000ff * i });
                material.color.setHSL(hslStep * i, 1, 0.5);
                var geometry = new THREE.CircleGeometry(radius, segments);
                var ring = new THREE.Line(geometry, material);
                this.scene.add(ring);
                this.rings.push(ring);
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(data) {
            for (var i = 0; i < RING_COUNT; i++) {
                var ring = this.rings[i];
                var timeDomain = data.timeDomainData[i];
                var frequency = Math.abs(data.frequencyData[i]);
                var scale = this.lerp(ring.scale.x, frequency * timeDomain, 0.01);
                scale = this.constrain(2, 0.5, scale);
                ring.scale.set(scale, scale, scale);
                ring.rotation.z += 0.002 * i;
            }
            data.renderer.render(this.scene, this.camera);
        }
    }, {
        key: 'onResize',
        value: function onResize(data) {
            this.camera.aspect = data.width / data.height;
            this.camera.updateProjectionMatrix();
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            delete this.scene;
            delete this.camera;
        }
    }]);

    return RingVisualiser;
}(Visualiser);

module.exports = RingVisualiser;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

var THREE = __webpack_require__(0);
var elementResizeEvent = __webpack_require__(11);

var Visualisers = __webpack_require__(2);

var VisualisationCore = function () {

    /**
     * @param {object} data
     * @param {Element} data.parentElement
     * @param {boolean} data.useDefaultVisualisers
     * @param {object} data.analyser
     */
    function VisualisationCore(data) {
        _classCallCheck(this, VisualisationCore);

        this.parentElement = data.parentElement;

        this.frequencyDataArray = null;
        this.analyser = data.analyser;

        /**
         * @callback visualiserListener
         * @param {Track[]} visualisers
         * @param {int} currentVisualiserIndex
         */
        /** @type {visualiserListener[]} */
        this.listeners = [];

        this.visualisers = data.useDefaultVisualisers ? this.prepareDefaultVisualisers() : [];
        this.currentVisualiserIndex = -1;
    }

    _createClass(VisualisationCore, [{
        key: 'prepareDefaultVisualisers',
        value: function prepareDefaultVisualisers() {
            var visualisers = [];
            for (var key in Visualisers) {
                if (!Visualisers.hasOwnProperty(key)) continue;
                var visualiserClass = Visualisers[key];
                visualisers.push(new visualiserClass());
            }
            return visualisers;
        }
    }, {
        key: 'notifyListeners',
        value: function notifyListeners() {
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];
                listener(this.visualisers, this.currentVisualiserIndex);
            }
        }

        /**
         * @param {visualiserListener} listener
         */

    }, {
        key: 'addListener',
        value: function addListener(listener) {
            this.listeners.push(listener);
        }

        /**
         * @param {Visualiser} visualiser
         */

    }, {
        key: 'addVisualiser',
        value: function addVisualiser(visualiser) {
            this.visualisers.push(visualiser);
        }
    }, {
        key: 'prepare',
        value: function prepare() {
            var width = this.parentElement.offsetWidth;
            var height = this.parentElement.offsetHeight;

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(width, height);
            this.canvas = this.renderer.domElement;
            this.parentElement.appendChild(this.canvas);
        }
    }, {
        key: 'start',
        value: function start() {
            this.setupListeners();
            this.renderLoop();
            this.notifyListeners();
        }

        /**
         * @param {int} index
         */

    }, {
        key: 'useVisualiser',
        value: function useVisualiser(index) {
            var visualiser = this.visualisers[index];
            if (visualiser) this.prepareVisualiser(visualiser);
            if (this.visualiser) this.visualiser.pause();
            this.currentVisualiserIndex = index;
            this.visualiser = visualiser;
            this.notifyListeners();
        }

        /**
         * @param {Visualiser} visualiser
         */

    }, {
        key: 'prepareVisualiser',
        value: function prepareVisualiser(visualiser) {
            this.analyser.fftSize = visualiser.fftSize;
            this.analyser.smoothingTimeConstant = visualiser.smoothingTimeConstant;
            this.frequencyDataArray = new Float32Array(this.analyser.frequencyBinCount);
            this.timeDomainDataArray = new Float32Array(this.analyser.frequencyBinCount);
            var data = {
                renderer: this.renderer,
                width: this.canvas.clientWidth,
                height: this.canvas.clientHeight
            };
            if (!visualiser.isInitialised()) visualiser.init(data);else if (visualiser.isPaused()) visualiser.revive(data);
            visualiser.resize(data);
        }
    }, {
        key: 'setupListeners',
        value: function setupListeners() {
            elementResizeEvent(this.parentElement, this.onParentResize.bind(this));
        }
    }, {
        key: 'renderLoop',
        value: function renderLoop() {
            var _this = this;

            if (this.visualiser) {
                if (this.analyser) {
                    this.analyser.getFloatFrequencyData(this.frequencyDataArray);
                    this.analyser.getFloatTimeDomainData(this.timeDomainDataArray);
                }
                this.visualiser.update({
                    renderer: this.renderer,
                    frequencyData: this.frequencyDataArray,
                    timeDomainData: this.timeDomainDataArray
                });
            } else {
                // TODO: Display warning about no visualiser
            }
            setTimeout(function () {
                requestAnimationFrame(_this.renderLoop.bind(_this));
            }, 1000 / 30);
        }
    }, {
        key: 'onParentResize',
        value: function onParentResize() {
            var width = this.parentElement.offsetWidth;
            var height = this.parentElement.offsetHeight;
            this.renderer.setSize(width, height);
            if (this.visualiser) this.visualiser.resize({
                renderer: this.renderer,
                width: width,
                height: height
            });
        }
    }]);

    return VisualisationCore;
}();

module.exports = VisualisationCore;

/***/ })
/******/ ]);