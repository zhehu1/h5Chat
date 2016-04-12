/**
 * Created by vuji on 16/2/6.
 */

//登录实体类
var loginBean = {
    uId:'',
    username:'',
    password:'',
    getUId : function(){
        return this.uId;
    },
    setUId : function(uId){
        this.uId = uId;
    },
    getUsername : function(){
        return this.username;
    },
    setUsername : function(username){
        this.username = username;
    },
    getPassword : function(){
        return this.password;
    },
    setPassword : function(password){
        this.password = password;
    },
    toString : function(){
        return "uId="+this.uId+";username="+this.username+";password"+this.password;
    },
    toObj : function(){
        return {
            uId:this.uId,
            username:this.username,
            password:this.password
        }
    }
};

module.exports = loginBean;