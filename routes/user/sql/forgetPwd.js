/**
 * Created by vuji on 16/5/8.
 */
var forgetPwd = {
    create : "INSERT INTO `HTML5Chat`.`chat_resetPwd` (`uId`, `verifyCode`, `status`) VALUES ('?', '?', '0');",
    query :  "SELECT id,uid FROM HTML5Chat.chat_resetPwd where verifyCode=? AND status=0 and UNIX_TIMESTAMP(create_in) >= UNIX_TIMESTAMP() - 2*24*3600;"
};

module.exports =  forgetPwd;