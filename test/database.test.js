const assert = require('assert');
const path = require('path');
const Store = require('../lib/Store');
const { rimraf, mkdirp, readdir, readFile } = require('../lib/fs');

describe('store', () => {

    let store = null;
    const dest = path.join(__dirname, 'brain');

    beforeEach(() => {
        store = new Store(dest);
        return rimraf(dest);

    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it.only('saves a file to brain with _id property', () => {
        return store.save({ thought: 'I\'m so hungry!' })
            .then(() => {
                return readdir(dest);
            })
            .then(contents => {
                const savedFileName = path.join(dest, contents[0]);
                return readFile(savedFileName, 'utf8');
            })
            .then(saved => {
                const test = JSON.parse(saved);
                assert.ok(test._id);
            });
    });

});