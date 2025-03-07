const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

const log = (message, level = 'info') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

    console.log(logMessage);
    fs.appendFileSync(logFilePath, logMessage);
};

module.exports = log;
