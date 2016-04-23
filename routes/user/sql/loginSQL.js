/**
 * Created by vuji on 16/4/12.
 */

var loginSQL = {
    add :  "INSERT INTO `chat_login` (`loginName`,`password`,`last_login_time`) values(?,?,0000)",
    verifyUser : "UPDATE chat_login SET `last_login_time`=now() WHERE `loginName`=? AND `password`=?",
    changePwd :  "UPDATE `HTML5Chat`.`chat_login` SET `password`=? WHERE `loginName`=?",
};

module.exports =  loginSQL;
