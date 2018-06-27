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

    it('saves a file to brain with _id property', () => {
        return store.save({ thought: 'I\'m so hungry!' })
            .then(saved => {
                assert.ok(JSON.parse(saved)._id);
            });
    });

    it('gets a file based on _id', () => {
        return store.get('badId')
            .then(got => {
                assert.equal(got, null);
            });
    });
});