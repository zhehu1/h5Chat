/**
 * Created by vuji on 16/4/14.
 */
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '3299475089@qq.com',
        pass: ''
    }
});

var mailOptions = {
    from: '3299475089@qq.com', // sender address
    to: '286808713@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});