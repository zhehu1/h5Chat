/**
 * Created by vuji on 16/5/24.
 */
localStorage.setItem("userObj","");
var userObj = {
    nick:"",
    uId:"",
    picture : "/images/shuijiao.jpg",
};

var receiveUserObj = {
    nick:"" ,
    uId:"" ,
    picture : "/images/shuijiao.jpg",
    type : "1"
};

var clickUserObj = {
    nick:"" ,
    uId:"" ,
    picture : "/images/shuijiao.jpg",
    type : "1"
};

var socketHandle;

jQuery(document).ready(function () {
    $("#login-model").modal({
        closeViaDimmer:false
    });
});

document.oncontextmenu=function(){
    return false;
}

$(document).click(function(){
    $(".mouseRightClick").css({"display":"none"});
})

/**
 * 登录实现
 */
function login() {
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    $.post("/users/loginCheck",{username:username,password:password},function(data){
        if(data.resultCode != 0){
            alert(data.message);
        }else{
            //初始化用户对象
            userObj.nick = data.resultObj.nickName;
            userObj.uId = "uId"+data.resultObj.id;
            userObj.picture = data.resultObj.picture;
            $("#myId").text(userObj.nick);
            localStorage.setItem("userObj",JSON.stringify(data.resultObj));

            //初始化socket连接
            socketHandle = new SocketHandle();
            socketHandle.init();
            userObj.id = socketHandle.getSocketId();
            socketHandle.login(userObj);

            $('#login-model').modal("toggle");
            //初始化文件处理
            var fileHandle = new FileHandle();
            fileHandle.init();
            renderDataToUserForm(localStorage.getItem("userObj"));
            $(".myUserInfo").click(function(){
                $("#personalInfo").modal();
            })
            $("#searchById").on("click",function(){
                var id = $(this).parent().prev().val();
                var type = $("#mySearchSelect").val();
                if(id == ""){
                    alert("id不能为空");
                    return;
                }
                searchById(id,type);
            });
            initFriendList();
            initGroupList(socketHandle);
        }
    })
}

/**
 * 更新用户信息
 */
function saveUserInfo(){
    $.ajax({
        url: '/users/updateInfo',
        type: 'get',
        data: $("#userInfo").serialize(),
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function (data) {
            progress.set(0.4);
        },
        complete: function (data) {
            progress.done(true);
        },
        success: function (returnData) {
            progress.inc();
            if(returnData.resultCode == 0){
                localStorage.setItem("userObj",JSON.stringify(returnData.resultObj));
            }else{
                alert(returnData.message);
            }
            renderDataToUserForm(localStorage.getItem("userObj"));
            $("#personalInfo").modal("toggle");
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 初始化进度条
 */
var progress = $.AMUI.progress;
progress.configure({
    minimum: 0.1,
    easing: 'ease-in-out',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="nprogress-bar"]',
    spinnerSelector: '[role="nprogress-spinner"]',
    parent: 'body',
    template: '<div class="nprogress-bar" role="nprogress-bar">' +
    '<div class="nprogress-peg"></div></div>' +
    '<div class="nprogress-spinner" role="nprogress-spinner">' +
    '<div class="nprogress-spinner-icon"></div></div>'
});

var birthdayView;
$(document).ready(function(){
    initEmjoyPanel();
    //初始化日期选择控件
    $(function() {
        var nowTemp = new Date();
        var nowDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).valueOf();
        var nowMoth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).valueOf();
        var nowYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf();
        var $birthday = $('#birthday');
        birthdayView = $birthday.datepicker({
            onRender: function(date, viewMode) {
                // 默认 days 视图，与当前日期比较
                var viewDate = nowDay;
                switch (viewMode) {
                    // moths 视图，与当前月份比较
                    case 1:
                        viewDate = nowMoth;
                        break;
                    // years 视图，与当前年份比较
                    case 2:
                        viewDate = nowYear;
                        break;
                }
                return date.valueOf() > viewDate ? 'am-disabled' : '';
            }
        }).data('amui.datepicker');
    })
});

/**
 * 初始化表情选择
 **/
function initEmjoyPanel(){
    var html = "";
    for(var i=0;i<=170;i++){
        if(i%40===0){
            html += "<li>";
        }
        if(i%8===0){
            html += "<img src='/emjoy/"+i+".png' class='isLeft' emjoy-target='[:emjoy"+i+"]'/>";
        }else{
            html += "<img src='/emjoy/"+i+".png' emjoy-target='[:emjoy"+i+"]'/>";
        }
        if(i%40 === 39 || i===170){
            html += "</li>"
        }
    }
    $("#emjoy-slider ul").html(html);
    $("#emjoy-slider").flexslider({
        animation: "slide",
        easing: "swing",
        direction: "horizontal",
        animationLoop: false,
        slideshow:false,
        directionNav:false
    })
    $("#emjoy-slider ul li img").click(function(){
        document.getElementById("chatText").value += $(this).attr("emjoy-target");
    })
    $("#emjoy-slider").mouseleave(function(){
        $("#emjoy-slider").hide();
    })
    $("#selectEmjoy").click(function(){
        $("#emjoy-slider").toggle();
    })

}

/**
 * 将数据渲染到个人信息弹窗
 */
function renderDataToUserForm(data){
    var userObj = JSON.parse(data);
    $(".myUserInfo img").attr("src",userObj.picture || "");
    $("#myId").text(userObj.nickName || "");
    document.querySelector("#userInfo input[name='userId']").value = userObj.id || "";
    document.querySelector("#userInfo input[name='picture']").value = userObj.picture || "";
    document.querySelector("#userInfo img").src = userObj.picture || "";
    document.querySelector("#userInfo input[name='nickName']").value = userObj.nickName || "";
    birthdayView.setValue(userObj.birthday  || "");
    document.querySelector("#userInfo input[name='address']").value = userObj.address || "";
    document.querySelector("#userInfo input[name='email']").value = userObj.email || "";
    document.querySelector("#userInfo input[name='tel']").value = userObj.tel || "";
    if(userObj.sex != null){
        document.querySelectorAll("#userInfo input[name='sex']")[userObj.sex-1].checked = true;
    }
}

/**
 * 初始化好友列表
 */
var currMouseClickSet;
var currMouseClickSetName;
function initFriendList(){
    $.ajax({
        url: '/friend',
        type: 'get',
        data: "",
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                document.querySelector("#friendList-collapase").innerHTML = listHandle.compileFriendList(returnData.resultObj.friend,returnData.resultObj.set);
                $("[setId]").on('mousedown',function(e){
                    if(e.button === 2){
                        currMouseClickSet = $(this).attr("setId").match(/[0-9]+/)[0];
                        currMouseClickSetName = $(this).attr("setName");
                        $("#setRightClick").css({"left": e.pageX,"top": e.pageY,"display":"block"});
                    }
                })
                $("#friendList-collapase").collapse({
                    toggle: true
                })
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}


/**
 * 用户点击
 * @param t
 * @param e
 * @returns {boolean}
 */
var currMouseClickUser;
function mouseClickUser(t,e){
    var currEle = t;
    var mouseBtnNum = e.button;
    clickUserObj.uId = $(currEle).attr("userId");
    clickUserObj.nick = $(currEle).find("span").text();
    clickUserObj.picture = $(currEle).find("img").attr("src");
    clickUserObj.type = 1;
    if(mouseBtnNum == 0){
        //鼠标左键点击
        //$(currEle).addClass("active").siblings().removeClass("active");
        //receiveUserObj.uId = $(currEle).attr("userId");
        //receiveUserObj.nick = $(currEle).find("span").text();
        //receiveUserObj.picture = $(currEle).find("img").attr("src");
        //receiveUserObj.type = 1;
        //$("#myNicName").text("正在与"+receiveUserObj.nick+"聊天");
        //$('[receiveuser]').css({"display":"none"});
        //$('[receiveuser="'+receiveUserObj.uId+'"]').css({"display":"block"});
        receiveUserObj.uId = clickUserObj.uId;
        receiveUserObj.nick = clickUserObj.nick;
        receiveUserObj.picture = clickUserObj.picture;
        receiveUserObj.type = clickUserObj.type;
        sendFriendMsg();
        $("#userTab").tabs('open', 0);
    }else if(mouseBtnNum == 1){
        //鼠标中键点击

    }else if(mouseBtnNum == 2){
        //鼠标右键点击
        //alert(e.x+"===="+ e.y);
        currMouseClickUser = clickUserObj.uId.match(/[0-9]+/)[0];
        $("#friendRightClick").css({"left": e.x,"top": e.y,"display":"block"});
    }
    return true;
}

/**
 * 群组点击
 * @param t
 * @param e
 * @returns {boolean}
 */
var currMouseClickGroup;
var currMouseClickGroupName;
function mouseClickGroup(t,e){
    var currEle = t;
    var mouseBtnNum = e.button;
    clickUserObj.uId = $(currEle).attr("groupId");
    clickUserObj.nick = $(currEle).find("span").text();
    clickUserObj.picture = "";
    clickUserObj.type = 2;
    if(mouseBtnNum == 0){
        //receiveUserObj.uId = $(currEle).attr("groupId");
        //receiveUserObj.nick = $(currEle).find("span").text();
        //receiveUserObj.picture = "";
        //receiveUserObj.type = 2;
        //鼠标左键点击
        receiveUserObj.uId = clickUserObj.uId;
        receiveUserObj.nick = clickUserObj.nick;
        receiveUserObj.picture = clickUserObj.picture;
        receiveUserObj.type = clickUserObj.type;
        sendFriendMsg();
        $("#userTab").tabs('open', 0);
    }else if(mouseBtnNum == 1){
        //鼠标中键点击

    }else if(mouseBtnNum == 2){
        //鼠标右键点击
        currMouseClickGroup = clickUserObj.uId.match(/[0-9]+/)[0];
        currMouseClickGroupName = clickUserObj.nick;
        var isSelfGroup = $(currEle).attr("isSelfGroup");
        if(isSelfGroup === "1" ||isSelfGroup === 1){
            $($("#groupRightClick button")[1]).css({"display":"block"});
        }else{
            $($("#groupRightClick button")[1]).css({"display":"none"});
        }
        $("#groupRightClick").css({"left": e.x,"top": e.y,"display":"block"});
    }
    return true;
}

/**
 * 初始化群组列表
 * @param socketHandel
 */
function initGroupList(socketHandel){
    $.ajax({
        url: '/group/getGroupNoMember',
        type: 'get',
        data: "",
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                document.querySelector(".groupList").innerHTML = listHandle.compileGroupList(returnData.resultObj);
                socketHandel.listenGroupMsg(Array.from(returnData.resultObj));
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}


/**
 * 切换tab
 * @param tabIndex
 */
function changeTab(tabIndex){
    if(tabIndex == 1){
        $("#BoxList h3").text("消息列表");
        $(".friend-left-nav li").removeClass("am-active");
        $(".friend-left-nav li")[0].classList.add("am-active");
        $("#BoxList .am-panel-bd ul").removeClass("active");
        $("#BoxList .am-panel-bd ul")[0].classList.add("active");
    }else if(tabIndex == 2){
        $("#BoxList h3").text("好友列表");
        $(".friend-left-nav li").removeClass("am-active");
        $(".friend-left-nav li")[1].classList.add("am-active");
        $("#BoxList .am-panel-bd ul").removeClass("active");
        $("#BoxList .am-panel-bd ul")[1].classList.add("active");
    }else{
        $("#BoxList h3").text("群组列表");
        $(".friend-left-nav li").removeClass("am-active");
        $(".friend-left-nav li")[2].classList.add("am-active");

        $("#BoxList .am-panel-bd ul").removeClass("active");
        $("#BoxList .am-panel-bd ul")[2].classList.add("active");
    }
}

/**
 * 通过id搜索好友和群组
 * @param id
 * @param type
 */
function searchById(id,type){
    var url = "";
    if(type === 1 || type === "1"){
        url = "/friend/searchById";
    }else{
        url = "/group/searchGroupById";
    }
    $.ajax({
        url: url,
        type: 'get',
        data: "id="+id,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                if(type == 1){
                    renderSearchFriend(returnData.resultObj);
                }else{
                    renderSearchGroup(returnData.resultObj);
                }
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 渲染好友搜索结果
 * @param data
 */
function renderSearchFriend(data){
    if(typeof  data.userInfo.id == "undefined"){
        $(".searchResult").html("该用户不存在!");
        return;
    }
    var tmpHTML = "<span class='am-align-left'>分组: </span><select data-am-selected id=\"mySearchSelectSet\" class=\"am-align-left\">";
    var setArr = Array.from(data.set);
    var currUserInfo = data.userInfo;
    setArr.forEach(function(item){
        tmpHTML += '<option value="'+item.setId+'">'+item.setName+'</option>';
    });
    tmpHTML += "</select>";
    tmpHTML += '<img src="'+currUserInfo.picture+'" alt="" class="am-circle"/>';
    tmpHTML += "<span>"+currUserInfo.nickName+"</span>";
    tmpHTML += '<button class="am-btn am-btn-primary am-align-right" type="button" onclick="addSelect(\''+currUserInfo.id+'\')"><span class="am-icon-plus"></span></button>';
    $(".searchResult").html(tmpHTML);
    $("#mySearchSelectSet").selected({
        btnWidth: '20%',
        btnSize: 'sm'
    });
}

/**
 * 添加好友到好友列表
 * @param id
 */
function addSelect(id){
    var setId = $("#mySearchSelectSet").val();
    var uId = id;
    $("#mySearch input").val("");
    $.ajax({
        url: "/friend/addFriend",
        type: 'get',
        data: "friendId="+uId+"&setId="+setId,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                $("#mySearch").modal();
                $(".searchResult").html("");
                setTimeout(function(){
                    alert("添加成功!");
                },0);
                initFriendList();
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 渲染群组搜索结果
 * @param data
 */
function renderSearchGroup(data){
    var groupInfoArr = Array.from(data);
    var tmpHTML = "";
    groupInfoArr.forEach(function(item){
        tmpHTML += '<div style="height: 5rem;">群组:&nbsp;&nbsp;&nbsp;&nbsp;<i class="am-icon-group am-icon-fw"></i>';
        tmpHTML += '<span>'+item.groupName+'(id:'+item.groupId+')</span>';
        tmpHTML += '<button class="am-btn am-btn-primary am-align-right" type="button" onclick="addSelectGroup(\''+item.groupId+'\')"><span class="am-icon-plus"></span></button></div>';
    });
    $(".searchResult").html(tmpHTML);
}

/**
 * 加入群组
 * @param id
 */
function addSelectGroup(id){
    var groupId = id;
    $("#mySearch input").val("");
    $.ajax({
        url: "/group/addUserToGroup",
        type: 'get',
        data: "id="+groupId,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                $("#mySearch").modal();
                setTimeout(function(){
                    alert("添加成功!");
                },0);
                initGroupList(socketHandle);
            }else{
                alert(returnData.message);
            }
            $(".searchResult").html("");
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 添加到消息列表
 * @param data
 */
function addToMsgTab(data,active){
    var ele = "";
    if(data.type === 1 || data.type === "1"){
        $(".messageList").find("[userId='"+data.uId+"']").remove();
        ele += '<li class="" userId='+data.uId+' onclick="clickChatMsg(this)"> <img src="'+data.picture+'" alt="" class="am-circle"> <span>'+data.nick+'</span></li>'
    }else{
        $(".messageList").find("[groupId='"+data.uId+"']").remove();
        ele += '<li class="am-animation-slide-bottom" groupId='+data.uId+' onclick="clickChatMsg(this)"> <i class="am-icon-group am-icon-fw"></i><span>'+data.nick+'</span></li>'
    }
    $(".messageList").prepend(ele);
    if(active && (data.type === 1 || data.type === "1")){
        //$(".messageList").find("[userId='"+data.uId+"']").click();
        $('.messageList [userId="'+data.uId+'"]').click()
    }else{
        $(".messageList [groupId='"+data.uId+"']").click();
    }
}

/**
 * 发送消息(好友)
 */
function sendFriendMsg(){
    receiveUserObj.uId = clickUserObj.uId;
    receiveUserObj.nick = clickUserObj.nick;
    receiveUserObj.picture = clickUserObj.picture;
    receiveUserObj.type = clickUserObj.type;
    addToMsgTab(receiveUserObj,true);
    $("#userTab").tabs('open', 0);
}

/**
 * 查看资料(好友)
 */
function showFriendInfo(){
    var uId = "uId"+currMouseClickUser;
    var friendInfo = JSON.parse(localStorage.getItem("friendInfo"));
    var userObj = friendInfo[uId];

    document.querySelector("#friendInfo #userInfo input[name='userId']").value = userObj.friendId || "";
    document.querySelector("#friendInfo #userInfo img").src = userObj.picture || "";
    document.querySelector("#friendInfo #userInfo input[name='nickName']").value = userObj.nickName || "";
    document.querySelector("#friendInfo #userInfo input[name='birthday']").value = userObj.birthday== null?"":userObj.birthday.slice(0,10);
    document.querySelector("#friendInfo #userInfo input[name='address']").value = userObj.address || "";
    document.querySelector("#friendInfo #userInfo input[name='email']").value = userObj.email || "";
    document.querySelector("#friendInfo #userInfo input[name='tel']").value = userObj.tel || "";
    if(userObj.sex != null){
        if(userObj.sex == 1){
            document.querySelector("#friendInfo #userInfo [name='sex']").textContent = "男";
        }else{
            document.querySelector("#friendInfo #userInfo [name='sex']").textContent = "女";
        }
    }
    $("#friendInfo").modal();
}

/**
 * 修改分组
 */
function changeSet(){
    $.ajax({
        url: "/friend/getFriendSet",
        type: 'get',
        data: "",
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                var tmpHTML = "";
                Array.from(returnData.resultObj).forEach(function(item){
                    tmpHTML += "<option value="+item.setId+">"+item.setName+"</option>";
                });
                $("#changeFriendSetSelect").html(tmpHTML);
                $("#changeFriendSetSelect").selected();
                $("#changeFriendSet").modal();
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 修改分组
 */
function changeFriendSet(){
    var setId = $("#changeFriendSetSelect").val();
    $.ajax({
        url: "/friend/changeSet",
        type: 'get',
        data: "setId="+setId+"&friendId="+currMouseClickUser,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                setTimeout(function(){
                   alert("修改成功!");
                },0);
                initFriendList();
                $("#changeFriendSet").modal();
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 删除好友
 */
function deleteFriend(){
    $.ajax({
        url: "/friend/deleteFriend",
        type: 'get',
        data: "friendId="+currMouseClickUser,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                //$("#mySearch").modal();
                //$(".searchResult").html("");
                setTimeout(function(){
                    alert("删除成功!");
                },0);
                initFriendList();
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 发送消息(群组)
 */
function sendGroupMsg(){
    receiveUserObj.uId = clickUserObj.uId;
    receiveUserObj.nick = clickUserObj.nick;
    receiveUserObj.picture = clickUserObj.picture;
    receiveUserObj.type = clickUserObj.type;
    addToMsgTab(receiveUserObj,true);
    $("#userTab").tabs('open', 0);
}

/**
 * 点击消息标签页用户
 */
function clickChatMsg(ele){
    var userId = $(ele).attr("userId");
    var groupId = $(ele).attr("groupId");

    receiveUserObj.uId = typeof userId!="undefined"?userId:groupId;
    receiveUserObj.nick = $(ele).find("span").text();
    receiveUserObj.picture = typeof userId!="undefined"!=""?$(ele).find("img").attr("src"):"";
    receiveUserObj.type = typeof userId!="undefined"!=""?1:2;

    $(ele).addClass("active").siblings().removeClass("active");
    $("#myNicName").text("正在与"+receiveUserObj.nick+"聊天");
    $('[receiveuser]').css({"display":"none"});
    $('[receiveuser="'+(userId || groupId)+'"]').css({"display":"block"});
}


/**
 * 退出群组
 */
function exitGroup(){
    $.ajax({
        url: "/group/exitGroup",
        type: 'get',
        data: "groupId="+currMouseClickGroup,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                setTimeout(function(){
                    alert("退出成功!");
                },0);
                initGroupList(socketHandle);
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 创建群组或分组
 * @param ele
 */
function createSetOrGroup(ele) {
    var currEle = $(ele);
    var name = $(currEle).parent().prev().val();
    var type = $("#myCreateSelectType").val();
    var url = "";
    if(type === 1 || type === "1"){
        url = "/friend/createSet";
    }else{
        url = "/group/createGroup";
    }
    $.ajax({
        url: url,
        type: 'get',
        data: "name="+name,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                setTimeout(function(){
                    alert("创建成功!");
                },0);
                $("#newSetOrGroup").modal();
                $(currEle).parent().prev().val("");
                if(type === 1 || type === "1"){
                    initFriendList();
                }else{
                    initGroupList(socketHandle);
                }
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 点击修改群名称
 */
function changeGroupNameClick(){
    $("#changeName input").val(currMouseClickGroupName).attr("typeId","2");
    $("#changeName").modal();
}

/**
 * 点击修改分组名称
 */
function changeSetName(){
    $("#changeName input").val(currMouseClickSetName).attr("typeId","1");
    $("#changeName").modal();
}

/**
 * 修改名称
 */
function changeName(){
    var type = $("#changeName input").attr("typeId");
    var name = $("#changeName input").val();
    var url = "";
    var id = "";
    if(name == ""){
        alert("名称不能为空!");
        return;
    }
    if(type === 1 || type === "1"){
        url = "/friend/changeSetName";
        id = currMouseClickSet;
    }else{
        url = "/group/changeGroupName";
        id = currMouseClickGroup;
    }
    $.ajax({
        url: url,
        type: 'get',
        data: "id="+id+"&name="+name,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                setTimeout(function(){
                    alert("修改成功!");
                },0);
                $("#changeName").modal();
                if(type === 1 || type === "1"){
                    initFriendList();
                }else{
                    initGroupList(socketHandle);
                }
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 删除分组
 */
function deleteSet(){
    $.ajax({
        url: "/friend/deleteSet",
        type: 'get',
        data: "id="+currMouseClickSet,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                setTimeout(function(){
                    alert("删除成功!");
                },0);
                $("#Name").modal();
                initFriendList();
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 刷新聊天记录
 */
function refreshRecord(){
    $.ajax({
        url: "/chatMessage/getMsgRecord",
        type: 'get',
        data: "from="+receiveUserObj.uId.match(/[0-9]+/)[0]+"&type="+receiveUserObj.type,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            if(returnData.resultCode == 0){
                var currArr = Array.from(returnData.resultObj);
                currArr.forEach(function(item){
                    renderMsgRecord(item);
                });
            }else{
                alert(returnData.message);
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 聊天记录下载
 */
function downloadChatRecord(){
    var type = receiveUserObj.type;
    var uId = receiveUserObj.uId;
    window.open(location.origin + "/chatMessage/downloadRecord/"+(+receiveUserObj.type-1)+"/"+receiveUserObj.uId.match(/[0-9]+/)[0])
}
