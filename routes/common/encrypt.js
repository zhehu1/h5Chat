/**
 * Created by vuji on 16/4/18.
 */
var crypto = require('crypto');

/**
 * 使用md5加密
 * @param str
 * @returns {*}
 */
exports.md5 = function(str){
    return crypto.createHash('md5').update(str).digest('hex');
};

/**
 * sha1加密
 * @param str
 * @returns {*}
 */
exports.sha1 = function(str){
    return crypto.createHash("sha1").update(str).digest("hex");
}

/**
 * 使用aes192加密方式加密
 * @param str
 * @param secret
 * @returns {*}
 */
exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * 生成随机字符串
 * @param size
 * @returns {string}
 */
exports.randomString = function (size) {
    size = size || 16;
    var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var max_num = code_string.length + 1;
    var new_pass = '';
    while (size > 0) {
        new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
        size--;
    }
    return new_pass;
};


/**
 * 使用aes192进行解密
 * @param str
 * @param secret
 * @returns {*}
 */
exports.encrypt = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};
