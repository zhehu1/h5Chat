/**
 * Created by vuji on 16/4/11.
 */
var ajaxResult = function(){};

function getError(data){
    return {
        resultCode : 1,
        message : data,
        resultObj:{}
    }
}


function getSuccess(data){
    return {
        resultCode : 0,
        message : "",
        resultObj:data
    }
}

function getUnLogin(){
    return {
        resultCode : 2,
        message : "用户未登录!请登陆后再试!",
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