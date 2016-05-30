/**
 * Created by vuji on 16/4/11.
 */

exports.getString = function(currObj,split1,split2){
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

exports.groupObjByKey = function(data,key){
    var obj = {};
    var currVal = "";
    for(var d in data){
        if(typeof obj[currVal] != "undefined"){
            obj[currVal].push(d);
        }else{
            obj[currVal] = [d];
        }
    }
    return obj;
}

exports.groupArrByKey = function(arr,key){
    var obj = {};
    var currVal = "";
    var tmpArr = Array.from(arr);
    if(tmpArr.length == 0){
        currVal = arr[key];
        if(arr["id"] == null){
            obj[currVal] = [];
        }else{
            obj[currVal] = [arr];
        }
    }else{
        tmpArr.forEach(function(item){
            currVal = item[key];
            if(typeof obj[currVal] != "undefined"){
                if(item["id"] == null){
                    obj[currVal] = [];
                }else{
                    obj[currVal].push(item);
                }
            }else{
                if(item["id"] == null){
                    obj[currVal] = [];
                }else{
                    obj[currVal] = [item];
                }
            }
        });
    }
    return obj;
}

exports.toArray = function(data){
    if(data.affectedRows == 0){
        return [];
    }else if(data.affectedRows == 1){
        return [data.resultObj];
    }else{
        return data.resultObj;
    }
}



