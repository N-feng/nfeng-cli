#!/usr/bin/env node

const program = require('commander')
const packageJson = require('../package.json')
const createPage = require('./lib/create-page')

program.version(packageJson.version)

program
  .command('create <configPath>')
  .action(async (configPath) => {
    await createPage(configPath)
  })

program.parse(process.argv)

