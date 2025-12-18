import { app } from './app'
import { logger } from './logger'
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT ? parseInt(process.env.PORT) : app.get('port')
const host = app.get('host')

process.on('unhandledRejection', reason => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
