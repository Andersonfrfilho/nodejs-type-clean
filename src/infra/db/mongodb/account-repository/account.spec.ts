import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

let accountCollection: Collection

describe('Accont Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account.email).toEqual('any_email@mail.com')
    expect(account.name).toEqual('any_name')
    expect(account.password).toEqual('any_password')
  })

  test('should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account.email).toEqual('any_email@mail.com')
    expect(account.name).toEqual('any_name')
    expect(account.password).toEqual('any_password')
  })

  test('should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeFalsy()
  })

  test('should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const response = await accountCollection.findOne(res)
    expect(response.accessToken).toBeFalsy()
    await sut.updateAccessToken(response._id.toString(), 'any_token')
    const account = await accountCollection.findOne({ _id: response._id.toString() })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
