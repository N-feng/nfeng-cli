const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const chalk = require('chalk')
const errorLog = error => console.log(chalk.red(`${error}`))

const exists = () => {
  if (!fs.existsSync(resolve('../../src', 'pageConfig'))) {
    errorLog(`pageConfig文件夹不存在`)
    return false
  }
  return true
}

module.exports = exists