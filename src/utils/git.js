const git = require('simple-git/promise');
const config = require('../utils/config');
const localPath = '../data';

const simpleGit = git(localPath);
const { gitUrl } = config;
