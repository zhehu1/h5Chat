const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const log = require('./utils').log;

log("log is ok!");
