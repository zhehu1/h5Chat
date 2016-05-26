/**
 * Created by vuji on 16/5/24.
 */
localStorage.setItem("userObj","");
var userObj = {
    nick:"",
    uId:"",
    picture : ""
}

var receiveUserObj = {
    nick:"" ,
    uId:"" ,
    picture : "",
    type : "1"
}

var socketHandle;

jQuery(document).ready(function () {
    $("#login-model").modal({
        closeViaDimmer:false
    });
});

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
            $('#userAdd').on('click', function() {
                $('#mySearch').modal();
            });
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
                document.querySelector("#friendList-collapase").innerHTML = listHandle.compileFriendList(returnData.resultObj);
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
 *
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
        url = "/friend/searchById";
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
    console.log("setId"+setId);
    console.log("uId"+uId);
}

/**
 * 渲染群组搜索结果
 * @param data
 */
function renderSearchGroup(data){

}
