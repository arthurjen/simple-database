const { writeFile } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(data) {
        const id = shortid.generate();
        data.id = id;
        const destFileName = path.join(this.path, `${id}.json`);
        const content = JSON.stringify(data);
        return writeFile(destFileName, content);
    }
};