// 遍历问题模板，输出提问
const fs = require('fs')
const path = require('path')
const resolve = (...file) => path.resolve(__dirname, ...file)
const inquirer = require('inquirer')

const askQuestion = async () => {
  // 模版配置路径
  const configPath = fs.readdirSync(resolve('../../src', 'pageConfig'))
  // 模板主题路径
  const themePath = fs.readdirSync(resolve('../../src', 'template'))

  let promptsArr = [{
    type: 'list',
    name: 'configPath',
    message: '想用哪个配置文件呢',
    choices: configPath.length ? configPath : [{
      name: '没有配置文件吧',
      value: ''
    }]
  }, {
    type: 'list',
    name: 'themeTemplate',
    message: '想用哪种主题模板呢',
    choices: themePath
  }, {
    type: 'list',
    name: 'typeTemplate',
    message: '想用哪种类型模板呢',
    choices: function (answer) {
      // 模板类型路径
      return fs.readdirSync(resolve('../../src/template', answer.themeTemplate))
    }
  }, {
    type: 'input',
    name: 'moduleName',
    message: '请输入新的模块名称',
    validate: function (input) {
      if (!input) {
        return '不能为空'
      }
      return true
    }
  }]

  return inquirer.prompt(promptsArr)
}


module.exports = askQuestion