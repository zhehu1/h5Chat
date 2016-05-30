/**
 * Created by vuji on 16/5/11.
 */
var sql = {
    query : "SELECT a.*,b.setName,c.nickName,c.picture,c.birthday,c.address,c.email,c.tel,c.sex "
            +"FROM HTML5Chat.chat_friend as a "
            +"right join HTML5Chat.chat_friendSet as b on a.setId = b.setId "
            +"left join HTML5Chat.chat_info  as c on c.id = a.friendId "
            +"where b.userId=? "
            +"order by a.setId;",
    add : "INSERT INTO `HTML5Chat`.`chat_friend` (`userId`, `friendId`, `setId`) VALUES (?, ?, ?);",
    verifyIsExist : "SELECT * FROM HTML5Chat.chat_friend where userId=? and friendId=?;",
    addFriend : "INSERT INTO `HTML5Chat`.`chat_friend` (`userId`, `friendId`, `setId`) VALUES (?, ?, ?);",
    changeSet : "UPDATE `HTML5Chat`.`chat_friend` SET `setId`=? WHERE `friendId`=? AND `userId`=?;",
    deleteFriend : "DELETE FROM `HTML5Chat`.`chat_friend` WHERE `friendId`=? AND `userId`=?;",
    //query : "SELECT a.*,b.setName,c.nickName,c.picture,c.birthday,c.address,c.email,c.tel,c.sex "
    //        +"FROM HTML5Chat.chat_friendSet as b "
    //        +"left join HTML5Chat.chat_friend as a  on a.setId = b.setId "
    //        +"left join HTML5Chat.chat_info  as c on c.id = a.friendId "
    //        +"where b.userId=?"
    //        +"order by a.setId",
};

module.exports = sql;
