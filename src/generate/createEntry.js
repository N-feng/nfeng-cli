const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const chalk = require('chalk')
const log = message => console.log(chalk.green(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

const createEntry = async (answer) => {
  // 模块路径
  const modulePath = resolve('../../src/views', answer.moduleName)
  // 入口路径
  const entryFilePath = resolve(modulePath, 'entry.js')
  // 生成模板
  generateFile(entryFilePath, entryTemplate(answer))
}

function entryTemplate(answer) {
  // 模块路径
  const modulePath = resolve('../../src/views', answer.moduleName)
  // 读取组件路径下所有vue文件
  const vueFiles = fs.readdirSync(modulePath).filter((item => {
    return item.includes('.vue')
  }))

  let entryData = ''
  // 引入字符串组装
  vueFiles.forEach((item, key) => {
    const fileName = item.split('.')[0]
    entryData += `import ${fileName} from './${fileName}.vue'\n`
    entryData += vueFiles.length === key + 1 ? '\n' : ''
  })
  // 文件路由组装
  vueFiles.forEach((item, key) => {
    const fileName = item.split('.')[0]
    entryData += key === 0 ? 'export default [' : ''
    entryData += `{\n`
    entryData += `  path: '${answer.moduleName}/${fileName}',\n`
    entryData += `  name: '${answer.moduleName}/${fileName}',\n`
    entryData += `  component: ${fileName}\n`
    entryData += `}`
    entryData += vueFiles.length === key + 1 ? ']' : ', '
  })
  return entryData
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

module.exports = createEntry