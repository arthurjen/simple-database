const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const { promisify } = require('util');

module.exports = {
    writeFile: promisify(fs.writeFile),
    readFile: promisify(fs.readFile),
    deleteFile: promisify(fs.unlink),
    readdir: promisify(fs.readdir),
    rimraf: promisify(rimraf),
    mkdirp: promisify(mkdirp)
};