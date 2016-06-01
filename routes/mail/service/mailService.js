/**
 * Created by vuji on 16/4/14.
 */
var nodemailer = require('nodemailer');

var mailConf = {
    // service: 'qq',
    // auth: {
    //     user: '3299475089@qq.com',
    //     pass: ''
    // }
    host: "smtp.163.com", // 主机
    secure: true, // 使用 SSL
    port: 994, // SMTP 端口
    auth: {
        user: "h5ChatService@163.com", // 账号
        pass: "aaa1234" // 密码
    }
}

var transporter = nodemailer.createTransport(mailConf);

var mailOptions = {
    from: 'h5ChatService <h5ChatService@163.com>', // sender address
    to: '286808713@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>这是一封测试邮件</b>' // html body
}

var forgetPwdMail = '<div style="text-align:center">'
                        +'<p style="text-align:left">nickName,你好：</p><p>'
                        +'</p><p style="text-align: left; text-indent: 2em;">请<a target="link">点击此处</a>找回密码！若点击无效，复制一下路径到浏览器中</p>'
                        +'<p style="text-align: left; text-indent: 2em;">link</p>'
                    +'</div>';

exports.sendMail = function(to,subject,text,html,callback){
    mailOptions.to = to;
    mailOptions.subject = to;
    mailOptions.text = text;
    mailOptions.html = to;

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            callback("fail",error);
        }else{
            callback("success",info);
            console.log('Message sent: ' + info.response);
        }
    });
}

exports.sendForgetPwdMail = function(to,nickName,link,callback){
    mailOptions.to = to;
    mailOptions.subject = "找回密码-基于HTML5的聊天系统";
    mailOptions.text = "";
    mailOptions.html = forgetPwdMail.replace((/nickName/g),nickName).replace((/link/g),link);
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            //console.log(error);
            callback(1,error);
        }else{
            callback(0,info);
            //console.log('Message sent: ' + info.response);
        }
    });
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
