/**
 * Created by vuji on 16/4/13.
 */

var userSQL = {
    getUserInfo :  "select a.* from `chat_info` a,`chat_login` b where a.id = b.id and loginName=? and password = ?",
    getUserInfoByLoginName : "select a.* from `chat_info` a,`chat_login` b where a.id = b.id and loginName=?",
};

module.exports =  userSQL;
