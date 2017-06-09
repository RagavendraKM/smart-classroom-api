module.exports = {
    mode: 'DEV', // [DEV/PROD]
    log: 'smart-classroom-api.log',
    dev: {
      port: 8080,
      host: 'localhost',
      protocol: 'http'
    },
    prod: {
      port: 443,
      host: 'sample.com',
      protocol: 'https'
    },
    api: {
      version: 'v1'
    }
};
