/**
 * Created by vuji on 16/1/31.
 */
var socketIo = require('socket.io')();
var ChatRecord = require('../chatMessage/service/chatMessageService');
var chatRecord = new ChatRecord();

var mySocket = function(){};


var users = {};
var usersId = [];

var getUidRegex = /[0-9]+/;

/**
 * module export
 * @type {mySocket}
 */
module.exports = mySocket;

mySocket.prototype.init = function(port){
    socketIo = socketIo.listen(port || 3001);
    //socket部分
    socketIo.on('connection', function(socket) {


        //接收并处理客户端发送的foo事件

        //socketIo.emit("aaa","连接测试");   //发送给所有客户端

        //socket.emit("aaa","124");   发送给自己

        //socket.broadcast.emit("aaa","13"); 广播,不包含自己

        socket.on("login",function(data){
            var currUser = {
                userInfo:data,
                id : socket.id
            };
            users[currUser.userInfo.uId] = socket;

            socket.emit("joinIn",usersId);
            socket.broadcast.emit("joinIn",[currUser]);
            usersId.push(currUser);
            socket.emit("errorMsg","这是一个来自服务器的错误信息!---测试使用");
        });

        socket.on("msg",function(data){
            //console.log(usersId);
            //console.log(socket.id);
            //socket.broadcast.emit("aaa",data);
        });

        /**
         * 接收并发送文本文件消息
         */
        socket.on("sendTextMsgToPersonal",function(data){
            if(data.to.uId!=""){
                chatRecord.insertMsg([data.from.uId.match(getUidRegex)[0],data.to.uId.match(getUidRegex)[0],JSON.stringify(data),1,0],function(code,execData){
                    if(typeof users[data.to.uId] == "undefined"){
                        return;
                    }
                    users[data.to.uId].emit(data.to.uId,{
                        data:data,
                        type:"text",
                        messageId:execData.resultObj.insertId
                    });
                });
            }
        });

        /**
         * 接收并发送图片文件消息
         */
        socket.on("sendImgMsgToPersonal",function(data){
            if(data.to.uId!=""){
                chatRecord.insertMsg([data.from.uId.match(getUidRegex)[0],data.to.uId.match(getUidRegex)[0],JSON.stringify(data),2,0],function(code,execData){
                    if(typeof users[data.to.uId] == "undefined"){
                        return;
                    }
                    users[data.to.uId].emit(data.to.uId,{
                        data:data,
                        type:"img",
                        messageId:execData.resultObj.insertId
                    });
                })

            }
        });

        /**
         * 接收并发送个人文件消息
         */
        socket.on("sendFileMsgToPersonal",function(data){
            //将消息插入到数据库
            if(data.to.uId!=""){
                chatRecord.insertMsg([data.from.uId.match(getUidRegex)[0],data.to.uId.match(getUidRegex)[0],JSON.stringify(data),3,0],function(code,execData){
                    if(typeof users[data.to.uId] == "undefined"){
                        return;
                    }
                    users[data.to.uId].emit(data.to.uId,{
                        data:data,
                        type:"file",
                        messageId:execData.resultObj.insertId
                    });
                });
            }
        });

        /**
         * 接收群组文本消息
         */
        socket.on("sendTextMsgToGroup",function(data){
            if(data.to.uId!=""){
                chatRecord.insertMsg([data.from.uId.match(getUidRegex)[0],data.to.uId.match(getUidRegex)[0],JSON.stringify(data),1,1],function(code,execData){
                    socket.broadcast.emit(data.to.uId, {
                        data: data,
                        type: "text",
                        messageId: execData.resultObj.insertId
                    });
                });
            }
        });

        /**
         * 接收群组图片消息
         */
        socket.on("sendImgMsgToGroup",function(data){
            if(data.to.uId!="") {
                chatRecord.insertMsg([data.from.uId.match(getUidRegex)[0], data.to.uId.match(getUidRegex)[0], JSON.stringify(data), 2, 1], function (code, execData) {
                    socket.broadcast.emit(data.to.uId, {
                        data: data,
                        type: "img",
                        messageId: execData.resultObj.insertId
                    });

                });
            }
        });

        /**
         * 接收群组文件消息
         */
        socket.on("sendFileMsgToGroup",function(data){
            if(data.to.uId!="") {
                chatRecord.insertMsg([data.from.uId.match(getUidRegex)[0], data.to.uId.match(getUidRegex)[0], JSON.stringify(data), 3, 1], function (code, execData) {
                    socket.broadcast.emit(data.to.uId, {
                        data: data,
                        type: "file",
                        messageId: execData.resultObj.insertId
                    });

                });
            }

        });



        socket.on('message', function (from) {
            users[from.target].emit(from.target, from);
        });

        socket.on('disconnect', function (d) {
            //console.log(d);
            var currUser;
            usersId.forEach(function(item,index){
                if(item.id == socket.id){
                    //socket.broadcast.emit('userDisconnected',item);
                    usersId.splice(index,1);
                    socket.broadcast.emit('userDisconnected',item);
                }
            });

        });
    });
};
