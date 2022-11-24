import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('fieldName', 'fieldToCompareName')
}
describe('CompareFields validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldName: 'any_value', fieldToCompareName: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompareName'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldName: 'any_value', fieldToCompareName: 'any_value' })
    expect(error).toBeFalsy()
  })
})
