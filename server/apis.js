const users = require('./api/users');
const serverStatus = require('./api/serverStatus');

const apis = Object.assign(
    {}, 
    users, 
    serverStatus
);

exports = module.exports = apis;