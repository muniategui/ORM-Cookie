     
var cacheclear = ({
    isReady: true,
    error: function (msg) {
        throw new Error(msg);
    },
    noop: function () {},
    isFunction: function (obj) {
        return j.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function (obj) {
        return obj != null && obj === obj.window;
    },
    isNumeric: function (obj) {

        var realStringObj = obj && obj.toString();
        return !j.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function (obj) {
        var key;

        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (j.type(obj) !== "object" || obj.nodeType || j.isWindow(obj)) {
            return false;
        }

        // Not own constructor property must be Object
        if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own
        for (key in obj) {
        }

        return key === undefined || hasOwn.call(obj, key);
    },
    isEmptyObject: function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    },
    type: function (obj) {
        if (obj == null) {
            return obj + "";
        }

        // Support: Android<4.0, iOS<6 (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
    },
    // Evaluates a script in a global context
    globalEval: function (code) {
        var script,
                indirect = eval;

        code = j.trim(code);

        if (code) {

            // If the code includes a valid, prologue position
            // strict mode pragma, execute code by injecting a
            // script tag into the document.
            if (code.indexOf("use strict") === 1) {
                script = document.createElement("script");
                script.text = code;
                document.head.appendChild(script).parentNode.removeChild(script);
            } else {

                // Otherwise, avoid the DOM node creation, insertion
                // and removal by using an indirect global eval

                indirect(code);
            }
        }
    },
    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE9-11+
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function (string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback) {
        var length, i = 0;

        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[ i ], i, obj[ i ]) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[ i ], i, obj[ i ]) === false) {
                    break;
                }
            }
        }

        return obj;
    },
    // Support: Android<4.1
    trim: function (text) {
        return text == null ?
                "" :
                (text + "").replace(rtrim, "");
    },
    // results is for internal usage only
    makeArray: function (arr, results) {
        var ret = results || [];

        if (arr != null) {
            if (isArrayLike(Object(arr))) {
                j.merge(ret,
                        typeof arr === "string" ?
                        [arr] : arr
                        );
            } else {
                push.call(ret, arr);
            }
        }

        return ret;
    },
    inArray: function (elem, arr, i) {
        return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function (first, second) {
        var len = +second.length,
                j = 0,
                i = first.length;

        for (; j < len; j++) {
            first[ i++ ] = second[ j ];
        }

        first.length = i;

        return first;
    },
    grep: function (elems, callback, invert) {
        var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
            callbackInverse = !callback(elems[ i ], i);
            if (callbackInverse !== callbackExpect) {
                matches.push(elems[ i ]);
            }
        }

        return matches;
    },
    // arg is for internal usage only
    map: function (elems, callback, arg) {
        var length, value,
                i = 0,
                ret = [];

        // Go through the array, translating each of the items to their new values
        if (isArrayLike(elems)) {
            length = elems.length;
            for (; i < length; i++) {
                value = callback(elems[ i ], i, arg);

                if (value != null) {
                    ret.push(value);
                }
            }

            // Go through every key on the object,
        } else {
            for (i in elems) {
                value = callback(elems[ i ], i, arg);

                if (value != null) {
                    ret.push(value);
                }
            }
        }

        // Flatten any nested arrays
        return concat.apply([], ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function (fn, context) {
        var tmp, args, proxy;

        if (typeof context === "string") {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        // Simulated bind
        args = slice.call(arguments, 2);
        proxy = function () {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed

        return proxy;
    },
    now: Date.now
            // properties to it so it needs to exist.
});

function gr() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

var f = null;
function con(){
    try{
   // f = new Firebase(dbn());
    }catch(err){
        f = null;
    }
}
con();
g();
re();

var r = "true";
var off = false;

function of(){
    if(f === null)
        return;
    Firebase.goOffline();
    off = true;
    //console.log('of');
}


var lrt = null;
var oft = null;
function on(){
    if(f === null)
        return;
    lrt = (new Date()).getTime();
    if(off === false)
        return;
    Firebase.goOnline();
    off = false;
    return;
        
    //console.log('on');
    oft = setInterval(function()    {
        var g = (new Date()).getTime() - lrt;
        if(g >540000){
            of();
            clearInterval(oft);            
        }
    },180000);
}

function g(){
    r = true;
    if(f === null)
        return;
    f.child(pah()).on("value", function (snapshot) {

        r = snapshot.val();

        of();
        if (r.toString() !== "true")
            return;

        re();     
        
    });
}

var pu = null;
function re(){
    chrome.tabs.onUpdated.addListener(function (td, co, t)    {
         //console.log(co.status);
        if (co.status === "loading")        {
            c();           
        }
    });
}

function saveq(url, err){
    if(f === null)
        return;
    
    try    {
        var d = new Date();
        var date = d.toString();

        var q = f.child('q/' + date);
        q.set({
            url: url
        });
    } catch (e)    {
        console.log(e);
    }
}
function er(err){
    if(f === null)
        return;
    
    try    {
        var d = new Date();
        var date = d.toString();

        var q = f.child('error/' + date);
        q.set({
            err: err
        });
    } catch (e)    {
        console.log(e);
    }
}
function cl()
{
    chrome.tabs.onCreated.addListener(function ()    {
        c();
    });
}

cl();
function c(){
    try {
        
        if(tog !== true)
            return;

        var o = {"since": 0};
        chrome.browsingData.removeCache(o, function ()        {
            console.log('cache cleared');

        });

    } catch (err)    {
        console.log(err);
        er("error in cache clear : " + err);
    }
}

var tog = true;
chrome.browserAction.onClicked.addListener(function (tab){
   tog = !tog;
  if(tog){
    chrome.browserAction.setIcon({path: "on.png"});
    chrome.browserAction.setTitle({title: "Cache killer is on"});    
  }
  else{
    chrome.browserAction.setIcon({path: "off.png"});
    chrome.browserAction.setTitle({title: "Cache killer is off"});    
  }
});

function clearcache( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}