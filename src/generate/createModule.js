const askQuestion = require('../lib/askQuestion')
const createDir = require('./createDir')
const createVue = require('./createVue')
const createEntry = require('./createEntry')
const exists = require('../utils/exists')

const createModule = async () => {
  if (!exists()) return
  const answer = await askQuestion()
  await createDir(answer)
  await createVue(answer)
  await createEntry(answer)
}

module.exports = createModule