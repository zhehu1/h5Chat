/**
 * Created by vuji on 16/5/11.
 */
var sql = {
    query : "SELECT a.*,b.setName,b.isDefault FROM HTML5Chat.chat_friend as a left join HTML5Chat.chat_friendSet as b on a.setId=b.setId where a.status=0 and  a.userId = ? order by a.setId;"
};

module.exports = sql;