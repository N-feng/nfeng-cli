// 把模板中的变量替换为用户输入的变量，输出模板到制定文件夹
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')
const { askQuestion } = require('./askQuestion')

const fse = require('fs-extra')
// const assert = require('assert')
const chalk = require('chalk')

// const log = require('../../util/logger')

/**
 * @param {string} configPath json配置路径
 * @param {string} filePath 生成文件路径（相对执行命令目录，包含文件名）
 */
const loadTemplate = async (configPath, filePath) => {
  // 从toolrc.json文件读取配置
  const dirPath = process.cwd()
  if (!fs.existsSync('toolrc.json')) {
    throw new Error('toolrc.json配置文件不存在')
  }

  let answer = {}
  if (!configPath) {
    const configJson = path.join(dirPath, 'toolrc.json')
    const config = fs.readFileSync(configJson)
    const { questionConfig } = JSON.parse(config)
    answer = await askQuestion(questionConfig)
  }

  // const metalsmith = Metalsmith(__dirname)

  // const source = '/src/template'
  const jsonPath = path.join(process.cwd(), answer.configPath || configPath)

  let config
  try {
    config = fse.readJsonSync(jsonPath)
  } catch (e) {
    // log.warn(e)
    console.log(chalk.red('找不到json配置文件'))
    // assert.ifError(e)
  }
  console.log(config.formSchema.properties.roleId)

  // const fPath = path.join(process.cwd(), answer.filePath || 'Unknown.vue')

  // console.log(fPath)

  // metalsmith
  //   .metadata(answer)
  //   .source(path.join(dirPath, source))
  //   .destination(path.join(dirPath, filePath))
  //   .use((files, metalsmith, done) => {
  //     // 遍历替换模板
  //     Object.keys(files).forEach((fileName) => {
  //       const fileContentsString = files[fileName].contents.toString()
  //       // Handlebar compile 前需要转换为字符串
  //       files[fileName].contents = Buffer.from(Handlebars.compile(fileContentsString)(metalsmith.metadata()))
  //     })
  //     done()
  //   })
  //   .build((err) => {
  //     if (err) throw err
  //   })
}

module.exports.loadTemplate = loadTemplate
