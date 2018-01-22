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
            //console.log("socket 连接成功");
        });

        //接收单对单消息
        this.socket.on(userObj.uId,function(data){
            if(data!==""){
                console.log(data);
                var from = data.data.from;
                from.type = 1;
                addToMsgTab(from,false);
                if(data.type == "file"){
                    that.msgHandle.addFileToMsgBox(data.data.msg,true,from);
                }else if(data.type == "img"){
                    that.msgHandle.addImgToMsgBox(data.data.msg,true,data.data.from)
                }else{
                    that.msgHandle.addToMsgBox(data.data.msg,true,data.data.from);
                }

            }
        });

        //接收上线通知
        this.socket.on('joinIn', function(data) {
            //连接到服务器后，显示昵称输入框
            that.msgHandle.userLogin(data);
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
     * 群组socket监听
     * @param arr
     */
    listenGroupMsg:function(arr){
        var that = this;
        arr.forEach(function(item){
            that.socket.on("groupId"+item.groupId,function(data){
                if(data!==""){
                    var to = data.data.to;
                    to.type = 2;
                    addToMsgTab(to,false);
                    if (data.data.to.type === 2) {
                        data.data.to.picture = data.data.from.picture;
                    }
                    if(data.type == "file"){
                        that.msgHandle.addFileToMsgBox(data.data.msg,true,data.data.to);
                    }else if(data.type == "img"){
                        that.msgHandle.addImgToMsgBox(data.data.msg,true,data.data.to)
                    }else{
                        that.msgHandle.addToMsgBox(data.data.msg,true,data.data.to);
                    }

                }
            });
        })
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
    sendTextMsg : function(msg){
        if(receiveUserObj.type === "1" || receiveUserObj.type === 1){
            this.socket.emit("sendTextMsgToPersonal",{
                from:userObj,
                msg:msg,
                to:receiveUserObj
            })
        }else{
            this.socket.emit("sendTextMsgToGroup",{
                from:userObj,
                msg:msg,
                to:receiveUserObj
            })
        }
    },

    /**
     * 发送图片
     * @param msg
     */
    sendImgMsg : function(msg){
        if(receiveUserObj.type === "1" || receiveUserObj.type === 1){
            this.socket.emit("sendImgMsgToPersonal",{
                from:userObj,
                msg:msg,
                to:receiveUserObj
            })
        }else{
            this.socket.emit("sendImgMsgToGroup",{
                from:userObj,
                msg:msg,
                to:receiveUserObj
            })
        }
    },

    /**
     * 发送文件消息
     * @param msg
     */
    sendFileMsg : function(msg){
        if(receiveUserObj.type === "1" || receiveUserObj.type === 1){
            this.socket.emit("sendFileMsgToPersonal",{
                from:userObj,
                msg:msg,
                to:receiveUserObj
            })
        }else{
            this.socket.emit("sendFileMsgToGroup",{
                from:userObj,
                msg:msg,
                to:receiveUserObj
            })
        }

    }
};