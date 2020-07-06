const askQuestion = require('../lib/askQuestion')
const createDir = require('./createDir')
const createVue = require('./createVue')
const createEntry = require('./createEntry')

const createModule = async () => {
  const answer = await askQuestion()
  await createDir(answer)
  await createVue(answer)
  await createEntry(answer)
}

module.exports = createModule