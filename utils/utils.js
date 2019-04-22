'use strict';

const fs = require('fs');
const winston = require ('winston');
const appSettings = require('../config/app-settings')
const FILEPATH = appSettings.writeFileLocation;

const logger = winston.createLogger(appSettings.winston.logConfig);

function loadFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                logger.error('File' + filename + 'can not be loaded, message: ' + err.message);
            }
            resolve(data);
        });
    });
};

function writeToFile(filename, string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(FILEPATH+filename, string, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                logger.error('File' + filename + 'can not be written, message: ' + err.message);
            };
            resolve(data);
        });
    });
};


module.exports.loadFile = loadFile;
module.exports.writeToFile = writeToFile;
module.exports.FILEPATH = FILEPATH;