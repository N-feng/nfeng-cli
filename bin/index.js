#!/usr/bin/env node

const program = require('commander')
const packageJson = require('../package.json')
const createModule = require('../src/generate/createModule')
const chalk = require('chalk')
const log = data => console.log(chalk.green(data))
program.version(packageJson.version)

program
  .command('module')
  .alias('m')
  .description('创建新的模块')
  .action(async () => {
    await createModule()
  })

program.parse(process.argv)

