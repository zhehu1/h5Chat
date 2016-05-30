/**
 * Created by vuji on 16/4/27.
 */

var chatMessageSql = {
    insertChatMsg : "INSERT INTO `HTML5Chat`.`chat_msgRecord` (`from`, `to`, `msg`, `type`,`isGroup`) VALUES (?, ?, ?, ? , ?);",
    getChatRecord : "SELECT * FROM HTML5Chat.chat_msgRecord WHERE ((`from`=? AND `to`=?) OR (`to`=? AND `from`=?)) AND isGroup = ?  order by time desc;"
};

module.exports =  chatMessageSql;
