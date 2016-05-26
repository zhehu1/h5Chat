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
                        //socket.sendMsg(content);
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
    addFriend : function(name){
        var html ="";
        name.forEach(function(item){
            html = '<li class="am-animation-slide-bottom" id='+item.userInfo.uId+' onmousedown="mouseClickUser(this,event)"> <img src="'+item.userInfo.picture+'" alt="" class="am-circle"> <span>'+item.userInfo.nick+'</span></li>';
            $(".messageList").append(html);
        })

    },


    /**
     * 普通消息
     * @param content
     * @param isSend
     */
    addToMsgBox : function(content,isSend){
        var html = "";
        if(isSend){
            html += '<div class="message left am-animation-slide-bottom"> <img src="'+receiveUserObj.picture+'" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
        }else{
            html += '<div class="message right am-animation-slide-bottom"><img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
        }
        console.log(html);
        $("#messageListBox").append(html);
        $("#messageListBox").scrollTop(999999999);
    },

    /**
     * 图片消息
     * @param content
     * @param isSend
     */
    addImgToMsgBox : function(content,isSend){
        var html = "";
        if(isSend){
            html += '<div class="message left am-animation-slide-bottom"> <img src="'+receiveUserObj.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+content[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
        }else{
            html += '<div class="message right am-animation-slide-bottom"><img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body"><img src="'+content[0].linkPath+'" style="width: 100%;max-width: 510px;height: auto;"</div></div>';
        }
        $("#messageListBox").append(html);
        $("#messageListBox").scrollTop(999999999);
    },

    /**
     * 文件消息
     * @param content
     * @param isSend
     */
    addFileToMsgBox : function(content,isSend){
        var html = "";
        var tpl = "";
        if(isSend){
            tpl = '<div class="message left am-animation-slide-bottom"> <img src="'+receiveUserObj.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
        }else{
            tpl = '<div class="message right am-animation-slide-bottom"> <img src="'+userObj.picture+'" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
        }
        html += content.map(function(item){
            return tpl.replace("{{linkPath}}",content.linkPath).replace("{{name}}",item.name);
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

/**
 * 用户点击
 * @param t
 * @param e
 * @returns {boolean}
 */
function mouseClickUser(t,e){
    var currEle = t;
    var mouseBtnNum = e.button;
    if(mouseBtnNum == 0){
        //鼠标左键点击
        $(currEle).addClass("active").siblings().removeClass("active");
        receiveUserObj.uId = $(currEle).attr("userId");
        receiveUserObj.nick = $(currEle).find("span").text();
        receiveUserObj.picture = $(currEle).find("img").attr("src");
        receiveUserObj.type = 1;
        $("#myNicName").text("正在与"+receiveUserObj.nick+"聊天");
    }else if(mouseBtnNum == 1){
        //鼠标中键点击

    }else if(mouseBtnNum == 2){
        //鼠标右键点击
        console.log(2)
        alert(2);
    }
    return true;
}

/**
 * 群组点击
 * @param t
 * @param e
 * @returns {boolean}
 */
function mouseClickGroup(t,e){
    var currEle = t;
    var mouseBtnNum = e.button;
    if(mouseBtnNum == 0){
        //鼠标左键点击
        $(currEle).addClass("active").siblings().removeClass("active");
        receiveUserObj.uId = $(currEle).attr("groupId");
        receiveUserObj.nick = $(currEle).find("span").text();
        receiveUserObj.picture = "";
        receiveUserObj.type = 2;
        $("#myNicName").text("正在与 "+receiveUserObj.nick+" 聊天");
    }else if(mouseBtnNum == 1){
        //鼠标中键点击

    }else if(mouseBtnNum == 2){
        //鼠标右键点击
        console.log(2)
        alert(2);
    }
    return true;
}
