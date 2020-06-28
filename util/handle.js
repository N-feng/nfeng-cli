const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const assert = require('assert')
const log = require('./logger')
const ejs = require('ejs')
const { exec } = require('child_process')

/**
 * @param {string} configPath json配置路径
 * @param {string} filePath 生成文件路径（相对执行命令目录，包含文件名）
 */
module.exports = (configPath, filePath) => {
  assert(configPath, '-c <config> or --config <config>,The JSON configuration path must exist')
  assert(!filePath || /\.vue$/.test(filePath), '-p <path> or --path <path>,The path must end with .vue')
  const startTime = Date.now()

  const cPath = path.join(process.cwd(), configPath)
  const fPath = path.join(process.cwd(), filePath || 'Unknown.vue')

  let config
  try {
    config = fse.readJsonSync(cPath)
  } catch (e) {
    assert.ifError(e)
  }
  const tplPath = path.join(__dirname, '../src/template/a.vue')
  const str = ejs.render(fs.readFileSync(tplPath, 'utf-8'), config)
  if (fse.pathExists(fPath)) {
    // 文件路径存在则先删除原文件
    fse.removeSync(fPath)
  }
  // 确保文件被创建
  fse.ensureFileSync(fPath)
  fs.writeFileSync(fPath, str)
  log.info(`生成位置：${fPath}`)
  const cmdStr = `${path.join(process.cwd(), 'node_modules/.bin/eslint')} --fix ${fPath}`
  exec(cmdStr, (err) => {
    if (err) {
      log.warn('eslint修复失败，请检查是否在根目录执行命令以及eslint是否安装')
    }
    log.info(`执行结束，用时${(Date.now() - startTime) / 1000}s`)
  })
}
