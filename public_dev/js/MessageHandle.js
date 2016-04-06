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
            var content = $(this).parent().prev().val();
            $("#chatText").val("");
            if(content != ""){
                that.addToMsgBox(content,false);
                socket.sendMsg(content);
                socket.sendMsgToPersonal(content);
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
                    var content = $("#chatText").val();
                    $("#chatText").val("");
                    if(content != ""){
                        that.addToMsgBox(content,false);
                        //socket.sendMsg(content);
                        socket.sendMsgToPersonal(content);
                    }
                }
            }
        })
    },
    addFriend : function(name){
        var html ="";
        console.log(name);
        name.forEach(function(item){
            html = '<li class="am-animation-slide-bottom" id='+item.userInfo.uId+'> <img src="/images/shuijiao.jpg" alt="" class="am-circle"> <span>'+item.userInfo.nick+'</span></li>';
            $(".friendList").append(html);
            $("#"+item.userInfo.uId).click(function(){
                $(this).addClass("active").siblings().removeClass("active");
                receiveUserObj.uId = $(this).attr("id");
                receiveUserObj.nick = $(this).find("span").text();
                console.log(receiveUserObj);
                $("#myNicName").text("正在与"+receiveUserObj.nick+"聊天");
            })
        })

    },
    addToMsgBox : function(content,isSend){
        var html = "";
        if(isSend){
            html += '<div class="message left am-animation-slide-bottom"><img src="/images/shuijiao.jpg" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
        }else{
            html += '<div class="message right am-animation-slide-bottom"> <img src="/images/shuijiao.jpg" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
        }
        $("#messageList").append(html);
    },
    addImgToMsgBox : function(content,isSend){
        var html = "";
        if(isSend){
            html += '<div class="message left am-animation-slide-bottom"><img src="/images/shuijiao.jpg" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
        }else{
            html += '<div class="message right am-animation-slide-bottom"> <img src="/images/shuijiao.jpg" alt="" class="am-circle"/><div class="body">'+content+'</div></div>';
        }
        $("#messageList").append(html);
    },
    addFileToMsgBox : function(content,isSend){
        console.log(content);
        var html = "";
        var tpl = "";
        if(isSend){
            tpl = '<div class="message left am-animation-slide-bottom"><img src="/images/shuijiao.jpg" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
        }else{
            tpl = '<div class="message right am-animation-slide-bottom"> <img src="/images/shuijiao.jpg" alt="" class="am-circle"/><div class="body">[文件]:<a href="{{linkPath}}" target="_blank">{{name}}</a></div></div>';
        }
        html += content.map(function(item){
            return tpl.replace("{{linkPath}}",item.linkPath).replace("{{name}}",item.name);
        }).join("");

        console.log(html);
        $("#messageList").append(html);
    },
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