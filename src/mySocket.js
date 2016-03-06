/**
 * Created by vuji on 16/1/31.
 */
var socketIo = require('socket.io')();

var mySocket = function(){};


var users = {};

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
        //socket.emit('private', { will: 'be received by everyone'});

        //socket.on("private123",function(data){
        //    console.log(socket.id +":connection");
        console.log(socket);
            //console.log('I received a private message by ',data);
            //console.log('I received a private message by '+data.target +" say:"+data.message);
        //})

        socket.on("login",function(data){
            users[data] = socket;
            console.log(data.from,"login");
        });

        socket.on('message', function (from) {
            console.log(from,from.target);
            //socket.emit(from.target, from);
            users[from.target].emit(from.target, from);
        });

        socket.on('disconnect', function (d) {
            console.log("disconnect");
            console.log(d);
            socket.emit('user disconnected');
        });
    });
};