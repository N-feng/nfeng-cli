const inquirer = require('inquirer')
const fs = require('fs')
// const fse = require('fs-extra')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const chalk = require('chalk')
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

// 导入模板
// const createVue = require('../template/antdesign/create.vue')

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
      mkdirs(directory, function() {
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
      mkdirs(path.dirname(directory), function() {
          fs.mkdirSync(directory)
          callback()
      })
  }
}

// 生成文件
const generateFile = (path, data) => {
  // if (fs.existsSync(path)) {
  //     errorLog(`${path}文件已存在`)
  //     return
  // }
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

/**
 * @param {string} configPath json配置路径
 * @param {string} filePath 生成文件路径（相对执行命令目录，包含文件名）
 */
const createPage = async (configPath) => {

  const promps = [{
    type: 'input',
    name: 'filePath',
    message: '请输入要生成的页面组件名称、会生成在 views/目录下',
    validate: function (input){
        if(!input) {
            return '不能为空'
        }
        return true
    }
  }]
  const {filePath} = await inquirer.prompt(promps)

  // let config
  // try {
  //   config = fse.readJsonSync(path.join(process.cwd(), configPath))
  // } catch (e) {
  //   errorLog('找不到json配置文件')
  // }

  // 组件名称
  const inputName = String(filePath).trim().toString()
  // Vue页面组件路径
  const componentPath = resolve('../../src/views', inputName)
  // vue文件
  const vueFile = resolve(componentPath, 'create.vue')

  log(`正在生成 component 目录 ${componentPath}`)
  await dotExistDirectoryCreate(componentPath)

  let componentName = ''
  try {
    // 获取组件名
    if (inputName.includes('/')) {
        const inputArr = inputName.split('/')
        componentName = inputArr[inputArr.length - 1]
    } else {
        componentName = inputName
    }
    log(`正在生成 vue 文件 ${vueFile}`)
    // 读取模板
    const pageTemplate = fs.readFileSync(path.resolve(__dirname, '../template/antdesign/create.vue'), 'utf-8')
    // 替换模板
    const page = pageTemplate.replace('\<pageConfig\>', () => {
      return `${configPath}`
    })
    await generateFile(vueFile, page)
    successLog('生成成功')


    console.log(page)
    console.log('1111\n')
    console.log(fs.readdirSync(componentPath).filter((item => {
      return item.includes('.vue')
    })))

  } catch (e) {
    errorLog(e.message)
  }
}

module.exports = createPage