import { MongoClient, Collection } from 'mongodb'
import config from '../../../../main/config/env'
import { AccountModel } from '../../../../domain/models/accounts'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  dbName: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.isConnected = await this.client.db(config.dbName)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client || !this.isConnected) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  },

  map: (collection: any): AccountModel => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toString() })
  }

}
