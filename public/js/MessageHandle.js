/**
 * 消息处理
 * Created by vuji on 16/4/4.
 */

var MessageHandle = function(){}
MessageHandle.prototype = {
    init : function(socket){
        var that = this;
        $("#sendBtn").on('click',function(){
            if(receiveUserObj.uId == ""){
                alert("请选择聊天对象!");
                return;
            }
            var content = emjoyObj.returnMsg($(this).parent().prev().val());
            $("#chatText").val("");
            if(content != ""){
                that.addToMsgBox(content,false);
                socket.sendMsg(content);
                socket.sendTextMsg(content);
            }
        });

        $("#chatText").on('focus',function(){
            document.onkeydown=function(event){
                var e = event ? event :(window.event ? window.event : null);
                if(e.keyCode==13){
                    if(receiveUserObj.uId == ""){
                        alert("请选择聊天对象!");
                        return;
                    }
                    var content = emjoyObj.returnMsg($("#chatText").val());
                    $("#chatText").val("");
                    if(content != ""){
                        that.addToMsgBox(content,false);
                        socket.sendTextMsg(content);
                    }
                }
            }
        })
    },

    /**
     * 添加用户
     * @param name
     */
    userLogin : function(name){
        var html ="";
        //name.forEach(function(item){
        //    html = '<li class="am-animation-slide-bottom" id='+item.userInfo.uId+'> <img src="'+item.userInfo.picture+'" alt="" class="am-circle"> <span>'+item.userInfo.nick+'</span></li>';
        //    $(".messageList").append(html);
        //})
    },


    /**
     * 普通消息
     * @param content
     * @param isSend
     */
    addToMsgBox : function(content,isSend,from){
        var html = "";
        var isCurrUser = typeof from == "undefined"?true:receiveUserObj.uId != from.uId?false:true;
        if(isCurrUser){
            if(isSend){
                html += '<div class="message left am-animation-slide-bottom" receiveUser="'+from.uId+'"> <img src="'+from.picture+'" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
            }else{
                html += '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
            }
        }else{
            if(isSend){
                html += '<div class="message left am-animation-slide-bottom" receiveUser="'+from.uId+'" style="display: none"> <img src="'+from.picture+'" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
            }else{
                html += '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'" style="display: none"><img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
            }
        }
        $("#messageListBox").append(html);
        $("#messageListBox").scrollTop(999999999);
    },

    /**
     * 图片消息
     * @param content
     * @param isSend
     */
    addImgToMsgBox : function(content,isSend,from){
        var html = "";
        var isCurrUser = typeof from == "undefined"?true:receiveUserObj.uId != from.uId?false:true;
        if(isCurrUser){
            if(isSend){
                html += '<div class="message left am-animation-slide-bottom" receiveUser="'+from.uId+'"> <img src="'+from.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+content[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
            }else{
                html += '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+content[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
            }
        }else{
            if(isSend){
                html += '<div class="message left am-animation-slide-bottom" receiveUser="'+from.uId+'" style="display: none"> <img src="'+from.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+content[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
            }else{
                html += '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'" style="display: none"><img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+content[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
            }
        }
        $("#messageListBox").append(html);
        $("#messageListBox").scrollTop(999999999);
    },

    /**
     * 文件消息
     * @param content
     * @param isSend
     */
    addFileToMsgBox : function(content,isSend,from){
        var html = "";
        var tpl = "";
        var isCurrUser = typeof from == "undefined"?true:receiveUserObj.uId != from.uId?false:true;
        if(isCurrUser){
            if(isSend){
                tpl = '<div class="message left am-animation-slide-bottom" receiveUser="'+from.uId+'"><img src="'+from.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
            }else{
                tpl = '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+userObj.picture+'" alt="" class="am-circle"/> <div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
            }
        }else{
            if(isSend){
                tpl = '<div class="message left am-animation-slide-bottom" receiveUser="'+from.uId+'" style="display: none"><img src="'+from.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
            }else{
                tpl = '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'" style="display: none"> <img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
            }
        }
        html += content.map(function(item){
            return tpl.replace("{{linkPath}}",item.linkPath).replace("{{name}}",item.name);
        }).join("");

        $("#messageListBox").append(html);
        $("#messageListBox").scrollTop(999999999)
    },

    /**
     * 删除用户
     * @param data
     */
    deleteUser : function(data){
        console.log(data)
        $("#"+data.userInfo.uId).remove();
        if(receiveUserObj.uId == data.userInfo.uId){
            receiveUserObj.uId = "";
            receiveUserObj.nick = "";
        }
        $("#myNicName").text("昵称");
    }
}

function renderMsgRecord(data){
    var msg = JSON.parse(data.msg);
    var currUserObj = msg.from;
    var currReceiveObj = msg.to;
    var isSend = currUserObj.uId === userObj.uId?false:true;
    var type = data.type;
    var isGroup = data.isGroup;
    var html = "";
    var tpl = "";
    if(type === 1 || type === "1"){
        if(isSend){
            console.log("currReceiveObj",currReceiveObj)
            html += '<div class="message left am-animation-slide-bottom"  receiveUser="'+receiveUserObj.uId+'"> <img src="'+currUserObj.picture+'" alt="" class="am-circle"/><div class="body">'+msg.msg+'</div></div>';
        }else{
            console.log("currUserObj",currUserObj)
            html += '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+currUserObj.picture+'" alt="" class="am-circle"/><div class="body">'+msg.msg+'</div></div>';
        }
    }else if(type === 2 || type === "2"){
        if(isSend){
            html += '<div class="message left am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"> <img src="'+currUserObj.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+msg.msg[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
        }else{
            html += '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+currUserObj.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+msg.msg[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
        }
    }else{
        if(isSend){
            tpl = '<div class="message left am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+currUserObj.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
        }else{
            tpl = '<div class="message right am-animation-slide-bottom" receiveUser="'+receiveUserObj.uId+'"><img src="'+currUserObj.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
        }
        html += Array.from(msg.msg).map(function(item){
            return tpl.replace("{{linkPath}}",item.linkPath).replace("{{name}}",item.name);
        }).join("");
    }
    $("#messageListBox").prepend(html);
}
