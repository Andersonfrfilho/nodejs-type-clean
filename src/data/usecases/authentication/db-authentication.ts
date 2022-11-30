import { Authentication, AuthenticationModel, HashComparer, LoadAccountByEmailRepository, Encrypter, UpdateAccessTokenRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository) {
  }

  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationModel.email)
    if (account) {
      await this.hashComparer.compare(authenticationModel.password, account.password)
      const accessToken = await this.tokenGenerator.encrypt(account.id)
      await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
      return accessToken
    }

    return null
  };
}
