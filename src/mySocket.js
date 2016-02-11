/**
 * Created by vuji on 16/1/31.
 */
var socketIo = require('socket.io')();

socketIo.serveClient(false);

var mySocket = function(){};

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
        socket.emit('private', { will: 'be received by everyone'});

        socket.on('private123', function (from) {
            console.log(socket.id +":connection");
            //console.log(socket.id);
            console.log('I received a private message by ',from);
            console.log('I received a private message by '+from.target +" say:"+from.message);
        });

        socket.on('disconnect', function () {
            socket.emit('user disconnected');
        });
    });
};