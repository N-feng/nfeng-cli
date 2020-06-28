// 遍历问题模板，输出提问

const inquirer = require('inquirer')

const askQuestion = async (prompts) => {
  const promptsArr = Object.keys(prompts).map((key) => ({
    name: key,
    ...prompts[key],
  }))
  return inquirer.prompt(promptsArr)
}

module.exports.askQuestion = askQuestion
