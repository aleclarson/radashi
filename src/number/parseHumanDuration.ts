export type HumanQuantity<
  Unit extends string,
  ShortUnit extends string = never,
> = `1 ${Unit}` | `${number} ${Unit}s` | `${number}${ShortUnit}`

export type HumanQuantityOptions<
  Unit extends string = string,
  ShortUnit extends string = string,
> = {
  /**
   * Time units mapping
   */
  units: Record<Unit, number>
  /**
   * Aliases for time units
   */
  short?: Record<ShortUnit, Unit>
}

/**
 * Defines a parser for human quantity strings
 *
 * @see https://radashi.js.org/reference/number/parseHumanDuration
  * @example
  * ```ts
  * const distanceParser = _.defineHumanQuantityParser({
  *   units: {
  *     kilometer: 1_000,
  *     mile: 1_852,
  *     yard: 0.9144,
  *     foot: 0.3048,
  *     meter: 1,
  *   },
  *   short: {
  *     km: 'kilometer',
  *     mi: 'mile',
  *     yd: 'yard',
  *     ft: 'foot',
  *     m: 'meter',
  *   },
  * })
  *
  * distanceParser("1 kilometer") // => 1_000
  * distanceParser("1 mile") // => 1_852
  * distanceParser("1 yard") // => 0.9144
  * distanceParser("1ft") // => 0.3048
  * distanceParser("1 meter") // => 1
  * ```
  */
export function defineHumanQuantityParser<
  Unit extends string,
  ShortUnit extends string = never,
>({ units, short }: HumanQuantityOptions<Unit, ShortUnit>) {

  return (quantity: HumanQuantity<Unit, ShortUnit>): number => {
    const match = quantity.match(/^(-?\d+(?:\.\d+)?) ?(\w+)?s?$/)
    if (!match) throw new Error(`Invalid quantity, cannot parse: ${quantity}`)

    let unit = match[2] as Unit | ShortUnit
    unit = short && unit in short ? short[unit as ShortUnit] : (unit as Unit)

    let count = Number.parseFloat(match[1])
    if (Math.abs(count) > 1 && unit.endsWith('s'))
      unit = unit.substring(0, unit.length - 1) as Unit

    if (!units[unit]) throw new Error(`Invalid unit: ${unit}, makes sure it is one of: ${Object.keys(units).join(', ')}`)

    return count * units[unit]
  }
}

export type HumanDuration = HumanQuantity<
  'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond',
  'w' | 'd' | 'h' | 'm' | 's' | 'ms'
>

/**
 * Parses a human duration string into milliseconds
 *
 * @see https://radashi.js.org/reference/number/parseHumanDuration
 * @example
 * ```ts
 * parseHumanDuration("1 second") // => 1_000
 * parseHumanDuration("1h") // => 3_600_000
 * parseHumanDuration("1 hour") // => 3_600_000
 * parseHumanDuration("1.5 hours") // => 5_400_000
 * parseHumanDuration("-1h") // => -3_600_000
 * parseHumanDuration(500) // => 500
 * ```
 */
export function parseHumanDuration(humanDuration: HumanDuration | number): number {
  if (typeof humanDuration === 'number') return humanDuration

  const parser = defineHumanQuantityParser({
    units: {
      week: 7 * 24 * 60 * 60 * 1_000,
      day: 24 * 60 * 60 * 1_000,
      hour: 60 * 60 * 1_000,
      minute: 60 * 1_000,
      second: 1_000,
      millisecond: 1,
    },
    short: {
      w: 'week',
      d: 'day',
      h: 'hour',
      m: 'minute',
      s: 'second',
      ms: 'millisecond',
    },
  })

  return parser(humanDuration)
}
