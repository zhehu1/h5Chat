/**
 * Created by vuji on 16/5/11.
 */

exports.sql = {
    createSet : "INSERT INTO `HTML5Chat`.`chat_friendSet` (`userId`, `setName`) VALUES (?, ?);",
    updateSetName : "UPDATE `HTML5Chat`.`chat_friendSet` SET `setName`=? WHERE `setId`=?;",
    delete : ""
};