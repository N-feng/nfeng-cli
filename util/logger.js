// util/logger.js

const { createLogger, format, transports } = require('winston')

const {
  combine, colorize, timestamp, printf,
} = format
const day = require('dayjs')

const myFormat = printf((info) => `${day(info.timestamp).format('YYYY-MM-DD HH:mm:ss:SSS')} ${info.level}: ${info.message}`)

module.exports = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    myFormat,
  ),
  transports: [new transports.Console()],
})
