#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const { loadTemplate } = require('../src/lib/writeTemp');

const log = data => console.log(chalk.green(data));

log('初始化模板配置');

program
    .command('create')
    .description('create template')
    .option('-d')
    .action(async function () {
        const result = await loadTemplate();
        result ? null : log('配置完毕');
    });

program.parse(process.argv);
