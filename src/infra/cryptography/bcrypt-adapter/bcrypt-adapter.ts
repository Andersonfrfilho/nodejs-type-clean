import bcrypt from 'bcrypt'
import { HashComparer } from '../../../data/protocol/criptography/hash-compare'
import { Hasher } from '../../../data/protocol/criptography/hasher'
export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
