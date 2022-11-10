import { MongoClient, Collection } from 'mongodb'
import { AccountModel } from '../../../../domain/models/accounts'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): AccountModel => {
    const { _id, ...colectionWhitoutId } = collection
    return Object.assign({}, colectionWhitoutId, { id: _id.toString() })
  }

}
