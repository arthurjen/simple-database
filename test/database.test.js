const assert = require('assert');
const path = require('path');
const Store = require('../lib/Store');
const { rimraf, mkdirp } = require('../lib/fs');

describe('store', () => {

    const dest = path.join(__dirname, 'brain');
    let store = new Store(dest);

    beforeEach(() => {
        return rimraf(dest);
    });

    beforeEach(() => {
        return mkdirp(dest);
    });

    it('saves a file to brain with _id property', () => {
        return store.save({ thought: 'I miss Chris.' })
            .then(saved => {
                return store.get(saved._id);
            })
            .then(got => {
                assert.equal(got.thought, 'I miss Chris.');
            });
    });

    it('returns null if file does not exist', () => {
        return store.get('badId')
            .then(got => {
                assert.equal(got, null);
            });
    });

    it('deletes a file by id', () => {
        return store.save({ thought: 'ugh allergies' })
            .then(saved => {
                return store.delete(saved._id);
            })
            .then(response => {
                assert.equal(response.removed, true);
                return store.get(response._id);
            })
            .then(got => {
                assert.equal(got, null);
            });
    });
});