/**
 * Created by vuji on 16/5/8.
 */
var forgetPwd = {
    create : "INSERT INTO `HTML5Chat`.`chat_resetPwd` (`uId`, `verifyCode`, `status`) VALUES (?, ?, '0');",
    update : "UPDATE `HTML5Chat`.`chat_resetPwd` SET `status`='1' where uId=? AND verifyCode=? AND status='0' AND UNIX_TIMESTAMP(create_in) >= UNIX_TIMESTAMP() - 2*24*3600;",
    resetPwd : "UPDATE `HTML5Chat`.`chat_login` SET `password`=? WHERE `id`=?;",
};

module.exports =  forgetPwd;