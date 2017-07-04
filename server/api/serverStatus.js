const os = require('os');

class ServerStatus {
    constructor() {};
    getRouters() {
        return {
            'get:/Server/AllStatus': this.getAllStatus,
            'get:/Server/Cpus': this.getCPUS,
            'get:/Server/TotalMem': this.getTotalMem,
            'get:/Server/FreeMem': this.getFreeMem,
        }
    };

    getAllStatus() {
       return new Promise((resolve, reject) => {
           resolve({
            cpus: os.cpus(),
            totalmem: os.totalmem(),
            freemem: os.freemem()
        })
       });
    }

    getCPUS() {
        return new Promise((resolve, reject) => {
            try {
                resolve({cpus: os.cpus()})
            } catch (err) {
                reject(err);
            };
        });
    };

    getTotalMem() {
        return new Promise((resolve, reject) => {
            try {
                resolve({totalmem: os.totalmem(),})
            } catch (err) {
                reject(err);
            };
        });
    };

    getFreeMem() {
        return new Promise((resolve, reject) => {
            try {
                resolve({freemem: os.freemem()})
            } catch (err) {
                reject(err);
            };
        });
    }
}

module.exports = exports = new ServerStatus().getRouters();