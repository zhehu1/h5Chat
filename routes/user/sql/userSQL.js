/**
 * Created by vuji on 16/4/13.
 */

var userSQL = {
    getUserInfo :  "select a.* from `chat_info` a,`chat_login` b where a.id = b.id and loginName=? and password = ?",
    getUserInfoByLoginName : "select a.id,a.nickName,a.picture,a.birthday,a.address,a.email,a.tel,a.sex from `chat_info` a,`chat_login` b where a.id = b.id and loginName=?",
    getUserInfoById : "SELECT id,nickName,picture FROM HTML5Chat.chat_info where id = ?;",
    checkIsExit : "SELECT id,loginName FROM `chat_login` WHERE loginName=?",
    updateUserInfo : "UPDATE `HTML5Chat`.`chat_info` SET `picture`=? ,`nickName`=?, `birthday`=?, `address`=?, `email`=?, `tel`=?, `sex`=? ,updateTime=DEFAULT WHERE `id`=?;",
};

module.exports =  userSQL;
