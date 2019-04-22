'use strict';

const winston = require('winston');


const appSettings = {
    importFilePath: '/Users/gregor/documents/',
    writeFileLocation: '/Users/gregor/Library/Mobile Documents/com~apple~CloudDocs/KindleExports/',
    importFileFormat: '.html',
    exportFileFormat: '.md',
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