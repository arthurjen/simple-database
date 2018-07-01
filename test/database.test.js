const assert = require('assert');
const path = require('path');
const Store = require('../lib/Store');
const { rimraf, mkdirp } = require('../lib/fs');

function sortID(a, b) {
    const a_id = a._id.toUpperCase();
    const b_id = b._id.toUpperCase();
    if(a_id < b_id) return -1;
    if(a_id > b_id) return 1;
    return 0;
    
}

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
        return store.get('a job')
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

    it('fails to delete a nonexistent file', () => {
        return store.delete('all my problems')
            .then(response => {
                assert.equal(response.removed, false);
            });
    });

    it('returns [] when getAll is called on an empty directory', () => {
        return store.getAll()
            .then(got => {
                assert.deepEqual(got, []);
            });
    });

    it('returns an array of objects when using getAll', () => {
    
        const thoughts = [
            { thought: 'Thin mints are delicious.' },
            { thought: 'What time is it?' },
            { thought: 'Sort this, bitch.' },
            { thought: 'What\'s for lunch?' }
        ];
        return Promise.all(thoughts.map(thought => {
            return store.save(thought);
        }))
            .then(() => {
                return store.getAll();
            })
            .then(gotAll => {
                assert.deepEqual(gotAll.sort(sortID), thoughts.sort(sortID));
            });
    });

    it('updates an item by id', () => {
        return store.save({ thought: 'Should I do the readings?' })
            .then(saved => {
                return store.update(saved._id, { thought: 'nah' });
            })
            .then(updated => {
                return store.get(updated._id);
            })
            .then(got => {
                assert.equal(got.thought, 'nah');
            });
    });
});