/**
 * Created by vuji on 16/1/31.
 */
var socketIo = require('socket.io');

var mySocket = function(){};

mySocket.prototype.init = function(port){
    socketIo = socketIo.listen(port || 3001);
    //socket部分
    socketIo.on('connection', function(socket) {
        //接收并处理客户端发送的foo事件
        socket.on('foo', function(id,msg) {
            //将消息输出到控制台
            console.log(id);
            console.log(msg);
        })

        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
};

module.exports = mySocket;