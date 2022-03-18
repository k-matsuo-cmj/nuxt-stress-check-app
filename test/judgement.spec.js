import judgement from '~/plugins/judgement'

const testAnswers = require('./judgement.spec.json')

describe('judement.getTotalByCategory', () => {
  test('合計の値が正しいこと', () => {
    expect(judgement.getTotalByCategory(testAnswers.A['54'], 'A')).toBe(54)
    expect(judgement.getTotalByCategory(testAnswers.A['55'], 'A')).toBe(55)
    expect(judgement.getTotalByCategory(testAnswers.B['77'], 'B')).toBe(77)
    expect(judgement.getTotalByCategory(testAnswers.B['76'], 'B')).toBe(76)
    expect(judgement.getTotalByCategory(testAnswers.B['63'], 'B')).toBe(63)
    expect(judgement.getTotalByCategory(testAnswers.B['62'], 'B')).toBe(62)
    expect(judgement.getTotalByCategory(testAnswers.C['21'], 'C')).toBe(21)
    expect(judgement.getTotalByCategory(testAnswers.C['22'], 'C')).toBe(22)
    expect(judgement.getTotalByCategory(testAnswers.D['3'], 'D')).toBe(3)
  })
})

describe('judement.isHighStress', () => {
  test('領域Bの合計点数が77点・A+Cが75点のときのときtrueとなること', () => {
    const answers = {}
    Object.assign(
      answers,
      testAnswers.A['54'],
      testAnswers.B['77'],
      testAnswers.C['21'],
      testAnswers.D['3']
    )
    expect(Object.keys(answers).length).toBe(57)
    expect(judgement.getTotalByCategory(answers, 'B')).toBe(77)
    expect(
      judgement.getTotalByCategory(answers, 'A') +
        judgement.getTotalByCategory(answers, 'C')
    ).toBe(75)
    expect(judgement.isHighStress(answers)).toBeTruthy()
  })
  test('領域Bの合計点数が76点・A+Cが75点のときfalseとなること', () => {
    const answers = {}
    Object.assign(
      answers,
      testAnswers.A['54'],
      testAnswers.B['76'],
      testAnswers.C['21'],
      testAnswers.D['3']
    )
    expect(Object.keys(answers).length).toBe(57)
    expect(judgement.getTotalByCategory(answers, 'B')).toBe(76)
    expect(
      judgement.getTotalByCategory(answers, 'A') +
        judgement.getTotalByCategory(answers, 'C')
    ).toBe(75)
    expect(judgement.isHighStress(answers)).toBeFalsy()
  })
  test('領域Bの合計点数が63点・A+Cが76点のときtrueとなること', () => {
    const answers = {}
    Object.assign(
      answers,
      testAnswers.A['55'],
      testAnswers.B['63'],
      testAnswers.C['21'],
      testAnswers.D['3']
    )
    expect(Object.keys(answers).length).toBe(57)
    expect(judgement.getTotalByCategory(answers, 'B')).toBe(63)
    expect(
      judgement.getTotalByCategory(answers, 'A') +
        judgement.getTotalByCategory(answers, 'C')
    ).toBe(76)
    expect(judgement.isHighStress(answers)).toBeTruthy()
  })
  test('領域Bの合計点数が63点・A+Cが75点のときfalseとなること', () => {
    const answers = {}
    Object.assign(
      answers,
      testAnswers.A['54'],
      testAnswers.B['63'],
      testAnswers.C['21'],
      testAnswers.D['3']
    )
    expect(Object.keys(answers).length).toBe(57)
    expect(judgement.getTotalByCategory(answers, 'B')).toBe(63)
    expect(
      judgement.getTotalByCategory(answers, 'A') +
        judgement.getTotalByCategory(answers, 'C')
    ).toBe(75)
    expect(judgement.isHighStress(answers)).toBeFalsy()
  })
  test('領域Bの合計点数が62点・A+Cが76点のときfalseとなること', () => {
    const answers = {}
    Object.assign(
      answers,
      testAnswers.A['54'],
      testAnswers.B['62'],
      testAnswers.C['22'],
      testAnswers.D['3']
    )
    expect(Object.keys(answers).length).toBe(57)
    expect(judgement.getTotalByCategory(answers, 'B')).toBe(62)
    expect(
      judgement.getTotalByCategory(answers, 'A') +
        judgement.getTotalByCategory(answers, 'C')
    ).toBe(76)
    expect(judgement.isHighStress(answers)).toBeFalsy()
  })
})
