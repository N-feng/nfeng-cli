const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const chalk = require('chalk')
const log = message => console.log(chalk.green(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const createVue = async (answer) => {
  // 模块路径
  const modulePath = resolve('../../src/views', answer.moduleName)
  // 模版路径
  const vueFilePath = resolve(modulePath, answer.typeTemplate)
  // 生成模板
  generateFile(vueFilePath, vueTemplate(answer))
}

function vueTemplate(answer) {
  // 读取模板
  const pageTemplate = fs.readFileSync(path.resolve(__dirname, `../template/${answer.themeTemplate}/${answer.typeTemplate}`), 'utf-8')
  // 替换模板
  const page = pageTemplate.replace('\<pageConfig\>', () => {
    return `${answer.configPath}`
  })
  return page
}

// 生成文件
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  } else {
    log(`正在生成${path}文件`)
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = createVue
