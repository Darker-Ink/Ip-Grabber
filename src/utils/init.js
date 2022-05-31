const path = require('node:path');
const fs = require('node:fs');

const init = () => {

    if (!fs.existsSync(path.join(__dirname, '../config.json'))) {
        throw new Error('config.json does not exist, please fill out the config.json file');
    }

    if (!fs.existsSync(path.join(__dirname, '../data'))) {
        console.log('directory data/ does not exist, creating it');
        fs.mkdirSync(path.join(__dirname, '../data'));
        console.log('Created data/ directory');
    }

}