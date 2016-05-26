/**
 * Created by vuji on 16/5/11.
 */

var sql = {
    createSet : "INSERT INTO `HTML5Chat`.`chat_friendSet` (`userId`, `setName`) VALUES (?, ?);",
    updateSetName : "UPDATE `HTML5Chat`.`chat_friendSet` SET `setName`=? WHERE `setId`=?;",
    querySet : "SELECT * FROM HTML5Chat.chat_friendSet where userId = ?;"
};

module.exports = sql;