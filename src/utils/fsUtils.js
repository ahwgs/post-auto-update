const fs = require('fs');
const marked = require('marked');

const checkFileAccess = filePath => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, err => {
      console.log(`${filePath} ${err ? '不存在' : '存在'}`);
      if (!err) resolve(true);
      else reject(err);
    });
  });
};

const readMdFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        reject('文件不存在');
      } else {
        str = marked(data.toString());
        console.log('readMdFile', str);
        resolve(str);
      }
    });
  });
};

module.exports = {
  checkFileAccess,
  readMdFile
};
