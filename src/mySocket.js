/**
 * Created by vuji on 16/1/31.
 */
var socketIo = require('socket.io')();

var mySocket = function(){};


var users = {};
var usersId = [];

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
            console.log(data);
            var currUser = {
                userInfo:data,
                id : socket.id
            };
            console.log("currUser",currUser);
            console.log("usersId",usersId);

            console.log("currUser.userInfo.uId=====",currUser.userInfo.uId);
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

        socket.on("sendMsgToPersonal",function(data){
            console.log(data);
            if(data.to!=""){
                users[data.to].emit(data.to,data);
            }
            //console.log(users[data.to]);

        });

        socket.on('message', function (from) {
            //console.log(from,from.target);
            //socket.emit(from.target, from);
            users[from.target].emit(from.target, from);
        });

        socket.on('disconnect', function (d) {
            console.log(d);
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