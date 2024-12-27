import * as _ from 'radashi'

describe('parseHumanDuration', () => {
  bench('with string', () => {
    _.parseHumanDuration('5 minutes')
  })

  bench('with number', () => {
    _.parseHumanDuration(500)
  })
})
