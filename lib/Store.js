const { writeFile } = require('./fs');
const path = require('path');
const shortid = require('shortid');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    // get(id) {
    //     console.log(id);
    // }

    save(data) {
        const id = shortid.generate();
        data._id = id;
        const destFileName = path.join(this.path, `${id}.json`);
        const content = JSON.stringify(data);
        return writeFile(destFileName, content)
            .then(() => {
                return content;
            });
    }
};