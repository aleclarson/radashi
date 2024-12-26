import * as _ from 'radashi'

describe('parseHumanDuration', () => {
  test('returned values', () => {
    // milliseconds
    expect(_.parseHumanDuration('1 millisecond')).toBe(1)
    expect(_.parseHumanDuration('1.5 milliseconds')).toBe(1.5)
    expect(_.parseHumanDuration('2 milliseconds')).toBe(2)
    expect(_.parseHumanDuration('1ms')).toBe(1)
    expect(_.parseHumanDuration('-2ms')).toBe(-2)

    // seconds
    expect(_.parseHumanDuration('1 second')).toBe(1_000)
    expect(_.parseHumanDuration('1.5 seconds')).toBe(1_500)
    expect(_.parseHumanDuration('2 seconds')).toBe(2_000)
    expect(_.parseHumanDuration('1s')).toBe(1_000)
    expect(_.parseHumanDuration('-2s')).toBe(-2_000)

    // minutes
    expect(_.parseHumanDuration('1 minute')).toBe(60_000)
    expect(_.parseHumanDuration('1.5 minutes')).toBe(90_000)
    expect(_.parseHumanDuration('2 minutes')).toBe(120_000)
    expect(_.parseHumanDuration('1m')).toBe(60_000)
    expect(_.parseHumanDuration('-2m')).toBe(-120_000)

    // hours
    expect(_.parseHumanDuration('1 hour')).toBe(3_600_000)
    expect(_.parseHumanDuration('1.5 hours')).toBe(5_400_000)
    expect(_.parseHumanDuration('2 hours')).toBe(7_200_000)
    expect(_.parseHumanDuration('1h')).toBe(3_600_000)
    expect(_.parseHumanDuration('-2h')).toBe(-7_200_000)

    // days
    expect(_.parseHumanDuration('1 day')).toBe(86_400_000)
    expect(_.parseHumanDuration('1.5 days')).toBe(129_600_000)
    expect(_.parseHumanDuration('2 days')).toBe(172_800_000)
    expect(_.parseHumanDuration('1d')).toBe(86_400_000)
    expect(_.parseHumanDuration('-2d')).toBe(-172_800_000)

    // weeks
    expect(_.parseHumanDuration('1 week')).toBe(604_800_000)
    expect(_.parseHumanDuration('1.5 weeks')).toBe(907_200_000)
    expect(_.parseHumanDuration('2 weeks')).toBe(1_209_600_000)
    expect(_.parseHumanDuration('1w')).toBe(604800000)
    expect(_.parseHumanDuration('-2w')).toBe(-1_209_600_000)
  })

  test('failures on invalid input', () => {
    // @ts-expect-error
    expect(() => _.parseHumanDuration('An invalid string')).toThrow(/Invalid quantity, cannot parse: An invalid string/)
    // @ts-expect-error
    expect(() => _.parseHumanDuration('abc weeks')).toThrow(/Invalid quantity, cannot parse: abc weeks/)
    // @ts-expect-error
    expect(() => _.parseHumanDuration('3 unknown')).toThrow(/Invalid unit: unknown, makes sure it is one of: week, day, hour, minute, second, millisecond/)
  })

  test('is does nothing when parameter is alaready a number', () => {
    expect(_.parseHumanDuration(50)).toBe(50)
  })
})


describe('defineHumanQuantityParser', () => {
  const distanceParser = _.defineHumanQuantityParser({
    units: {
      kilometer: 1_000,
      mile: 1_852,
      yard: 0.9144,
      foot: 0.3048,
      meter: 1,
    },
    short: {
      km: 'kilometer',
      mi: 'mile',
      yd: 'yard',
      ft: 'foot',
      m: 'meter',
    },
  })

  test('returned values', () => {
    expect(distanceParser("1 kilometer")).toBe(1_000)
    expect(distanceParser("1km")).toBe(1_000)
    expect(distanceParser("1 mile")).toBe(1_852)
    expect(distanceParser("1mi")).toBe(1_852)
    expect(distanceParser("1 yard")).toBe(0.9144)
    expect(distanceParser("1yd")).toBe(0.9144)
    expect(distanceParser("1 foot")).toBe(0.3048)
    expect(distanceParser("1ft")).toBe(0.3048)
    expect(distanceParser("1 meter")).toBe(1)
  })
})
