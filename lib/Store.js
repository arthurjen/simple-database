const { writeFile, readFile, deleteFile, readDir } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    
    save(data) {
        data._id = shortid.generate();
        const destFileName = path.join(this.path, `${data._id}.json`);
        const content = JSON.stringify(data);
        return writeFile(destFileName, content)
            .then(() => data);
    }

    get(id) {
        const filePath = path.join(this.path, `${id}.json`);
        return readFile(filePath)
            .then(got => {
                return JSON.parse(got);
            })
            .catch(err => {
                if(err.code === 'ENOENT') return null;
                else throw err;
            });
    }

    delete(id) {
        const filePath = path.join(this.path, `${id}.json`);
        return deleteFile(filePath)
            .then(() => {
                return {
                    removed: true,
                    _id: id
                };
            })
            .catch(err => {
                if(err.code === 'ENOENT') return { removed: false };
                else throw err;
            });
    }

    getAll() {
        return readDir(this.path)
            .then(files => {
                return Promise.all(files.map(fileName => {
                    return this.get(fileName.substring(0, 10));
                }));
            });
    }
};