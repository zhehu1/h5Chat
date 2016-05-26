/**
 * Created by vuji on 16/4/27.
 */

var chatMessageSql = {
    insertChatMsg : "INSERT INTO `HTML5Chat`.`chat_msgRecord` (`from`, `to`, `msg`, `type`,`isGroup`) VALUES (?, ?, ?, ? , ?);"
};

module.exports =  chatMessageSql;
