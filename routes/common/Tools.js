/**
 * Created by vuji on 16/4/11.
 */
var TOOLS = function(){}


TOOLS.prototype.getString = function(currObj,split1,split2){
    var sp1 = split1 || "=";
    var sp2 = split2 || ",";
    var str = [];
    for(var k in currObj){
        if(typeof  currObj != "function"){
            str.push(k+sp1+currObj[k]);
        }
    }
    return str.join(sp2);
}