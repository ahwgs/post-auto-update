const express = require('express');
const app = express();
const path = require('path');
const fsUtils = require('./src/utils/fsUtils');
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname, 'public')));
const config = require('./src/utils/config');

const filePath = './src/data/README.md';

app.get('/', async (req, res) => {
  // 判断目录下是否有文件 有的话解析 没有的话去clone
  const isExit = await fsUtils.checkFileAccess(filePath);
  let data = '';
  if (isExit) {
    data = await fsUtils.readMdFile(filePath);
  } else {
    // 先去git clone
    // 然后
  }
  res.render('index', { ...config, data });
});

// github钩子触发接口 clone 最新的文件
app.get('/update', async function(req, res) {
  res.json({
    code: 0,
    msg: 'success'
  });
});
app.listen(4000, () => console.log('app listening on port 4000!'));