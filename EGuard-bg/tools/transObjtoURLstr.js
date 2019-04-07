'use strict';

function transObjtoURLstr(obj){
    var str = JSON.stringify(obj);
    var content = str.substr(0,str.length-1).substr(1);
    var URLstr = content.replace(/\"/g,'').replace(/\:/g,'=').replace(/\,/g,'&');
    return URLstr;
}

module.exports = transObjtoURLstr;