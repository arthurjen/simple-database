const { writeFile, readFile } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    get(id) {
        const filePath = path.join(this.path, `${id}.json`);
        return readFile(filePath)
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                else throw err;
            });
    }

    save(data) {
        const id = shortid.generate();
        data._id = id;
        const destFileName = path.join(this.path, `${id}.json`);
        const content = JSON.stringify(data);
        return writeFile(destFileName, content)
            .then(() => content);
    }
};