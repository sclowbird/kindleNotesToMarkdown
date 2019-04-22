'use strict';

const winston = require('winston');


const appSettings = {
    winston: {
        logConfig: {
            transports: [
                new winston.transports.File({
                    filename: './logs/kindlenotes.log'
                }),
                new winston.transports.Console()
            ]
        }
    }
};


module.exports = appSettings;