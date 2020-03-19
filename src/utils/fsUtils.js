const fs = require('fs');
const marked = require('marked');
const https = require('https');
const path = require('path');
const checkFileAccess = filePath => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, err => {
      if (!err) resolve(true);
      else resolve(false);
    });
  });
};

const readMdFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject('文件不存在');
      } else {
        str = marked(data.toString());
        console.log(`${new Date().getTime()} md file read`);
        resolve(str);
      }
    });
  });
};

const downloadFileToLocalPath = (url, dirPath, fileName) => {
  return new Promise((resolve, reject) => {
    // 确保dest路径存在
    const file = fs.createWriteStream(path.join(dirPath, fileName));
    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(response.statusCode);
        return;
      }
      res.on('end', () => {
        console.log('download end');
      });
      file
        .on('finish', () => {
          console.log('finish write file');
          file.close();
          resolve();
        })
        .on('error', err => {
          fs.unlink(dest);
          reject(err.message);
        });

      res.pipe(file);
    });
  });
};

const deleteFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) reject(err);
      console.log(`${filePath}文件已删除`);
      resolve('文件已删除');
    });
  });
};

module.exports = {
  checkFileAccess,
  readMdFile,
  downloadFileToLocalPath,
  deleteFile
};
