const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)

const directory = async (answer) => {
  // 模块路径
  const modulePath = resolve('../../src/views', answer.moduleName)
  // 生成文件
  await dotExistDirectoryCreate(modulePath)
}

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

module.exports = directory