import { Express } from 'express'
import { bodyParser, contentTypeJson, cors } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentTypeJson)
  app.use(cors)
}
