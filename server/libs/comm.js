const crypto = require('crypto');

class comm {
    constructor () {
        this.secret = 'h5Chat password';
    };

    passwordSecret (pwd) {
        return crypto.createHmac('sha256', this.secret)
        .update(pwd)
        .digest('hex')
        .toLocaleUpperCase();
    }
}

module.exports = exports = new comm();