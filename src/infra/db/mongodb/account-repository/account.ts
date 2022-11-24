import { LoadAccountByEmailRepository } from '../../../../data/protocol/db/load-account-by-email-repository'
import { AddAccountRepository } from '../../../../data/usecases/add-account/db-add-account-protocols'
import { AccountModel } from '../../../../domain/models/accounts'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne(result.insertedId)

    return MongoHelper.map(account)
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id }, {
      $set: {
        accessToken: token
      }
    })
  }
}
