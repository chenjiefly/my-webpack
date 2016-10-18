const del = require('del')

del([
  'dist/**', '!dist'
]).then(function(paths) {
  console.log('下面文件即将被删除：\n', paths.join('\n'))
})