/**
 * Created by vuji on 16/4/11.
 */
var ajaxResult = function(){};


var successObj = {
    reusltCode : 1,
    message : "",
    resultObj:{}
}

function getError(data){
    return {
        reusltCode : 0,
        message : data,
        resultObj:{}
    }
}


function getSuccess(data){
    return {
        reusltCode : 1,
        message : "",
        resultObj:data
    }
}

function getUnLogin(){
    return {
        reusltCode : 2,
        message : "用户未登录!",
        resultObj:{}
    }
}

ajaxResult.prototype.returnError  = function(data){
    return getError(data);
}


ajaxResult.prototype.returnSuccess = function(data){
    return getSuccess(data);
}

ajaxResult.prototype.unLogin = function(data){
    return getUnLogin();
}




module.exports = ajaxResult;