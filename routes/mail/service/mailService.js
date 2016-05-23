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
