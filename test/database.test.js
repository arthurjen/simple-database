const assert = require('assert');
const path = require('path');
const Store = require('../lib/database');
const { rimraf, mkdirp } = require('../lib/fs');

describe('store', () => {

    let store = null;
    const dest = path.join(__dirname, 'save-dir');

    beforeEach(() => {
        store = new Store(dest);
        return rimraf(dest);

    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves a file', () => {
        return store.save({
            thought: 'I\'m so hungry!'
        });
        // has _id property
    });
});