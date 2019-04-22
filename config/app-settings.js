'use strict';

const winston = require('winston');


const appSettings = {
    db_file_name:'./data/kindlesNotes.db',
    create_sql: {
        books: './scripts/books.sql',
        cites: './scripts/cites.sql'
    },
    test_html: './data/test.html',
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