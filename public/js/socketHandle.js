/**
 * socket连接
 * Created by vuji on 16/4/4.
 */

var SocketHandle = function(){
    this.socket = null;
    this.msgHandel = null;
};

SocketHandle.prototype = {
    init : function(){
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect();
        //监听socket的connect事件，此事件表示连接已经建立
        this.msgHandle = new MessageHandle();
        this.msgHandle.init(that);

        //连接提示
        this.socket.on('connect', function(data) {
            //连接到服务器后，显示昵称输入框
            console.log("socket 连接成功");
        });

//            //接所有人消息
//            this.socket.on('aaa', function(data) {
//                //连接到服务器后，显示昵称输入框
//                console.log("socket 连接测试")
//                console.log(data);
//                if(data!=""){
//                    that.msgHandel.addToMsgBox(data,true);
//                }
//            })

        //接收单对单消息
        this.socket.on(userObj.uId,function(data){
            //console.log("userObj.uId"+JSON.stringify(data));
            if(data!==""){
                if(data.type == "file"){
                    that.msgHandle.addFileToMsgBox(data.data.msg,true);
                }else if(data.type == "img"){
                    that.msgHandle.addImgToMsgBox(data.data.msg,true)
                }else{
                    that.msgHandle.addToMsgBox(data.data.msg,true);
                }

            }
        });

        //接收上线通知
        this.socket.on('joinIn', function(data) {
            //连接到服务器后，显示昵称输入框
            console.log('joinIn',data);
            that.msgHandle.addFriend(data);
        });

        //接收服务器错误信息
        this.socket.on("errorMsg",function(data){
            console.error(data);

        });

        //用户离线
        this.socket.on('userDisconnected',function(data){
            that.msgHandle.deleteUser(data);
        });
    },

    /**
     * 获得socketId
     * @returns {*}
     */
    getSocketId:function(){
        return this.socket.id;
    },

    /**
     * 登录
     * @param data
     */
    login : function(data){
        this.socket.emit("login",data);
    },

    /**
     * 系统错误消息
     * @param data
     */
    error:function(data){
        console.error("error function",data);
    },

    /**
     * 系统消息
     * @param data
     */
    sendMsg : function(data){
        this.socket.emit("msg",data);
    },

    /**
     * 发送文本消息
     * @param msg
     */
    sendMsgToPersonal : function(msg){
        this.socket.emit("sendMsgToPersonal",{
            from:userObj.uId,
            msg:msg,
            to:receiveUserObj.uId
        })
    },

    /**
     * 发送图片
     * @param msg
     */
    sendImgMsgToPersonal : function(msg){
        this.socket.emit("sendImgMsgToPersonal",{
            from:userObj.uId,
            msg:msg,
            to:receiveUserObj.uId
        })
    },

    /**
     * 发送文件消息
     * @param msg
     */
    sendFileMsgToPersonal : function(msg){
        this.socket.emit("sendFileMsgToPersonal",{
            from:userObj.uId,
            msg:msg,
            to:receiveUserObj.uId
        });
    }
};