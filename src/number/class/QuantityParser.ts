import { isNumber } from 'radashi'

export type QuantityString<
  Unit extends string,
  ShortUnit extends string = never,
> = `1 ${Unit}` | `${number} ${Unit}s` | `${number}${ShortUnit}`



export class QuantityParser<Unit extends string, ShortUnit extends string = never> {
  private units: Record<Unit, number>
  private short?: Record<ShortUnit, Unit>

  constructor({ units, short }: QuantityParserOptions<Unit, ShortUnit>) {
    this.units = units
    this.short = short
  }

  /**
   * Parse a quantity string into its numeric value
   * 
   * @throws {Error} If the quantity string is invalid or contains an unknown unit
   */
  parse(quantity: QuantityString<Unit, ShortUnit>): number {
    const match = quantity.match(/^(-?\d+(?:\.\d+)?) ?(\w+)?s?$/)
    if (!match) {
      throw new Error(`Invalid quantity, cannot parse: ${quantity}`)
    }

    let unit = match[2] as Unit | ShortUnit
    unit = this.short && unit in this.short 
      ? this.short[unit as ShortUnit] 
      : (unit as Unit)

    const count = Number.parseFloat(match[1])
    if (Math.abs(count) > 1 && unit.endsWith('s')) {
      unit = unit.substring(0, unit.length - 1) as Unit
    }

    if (!this.units[unit]) {
      throw new Error(
        `Invalid unit: ${unit}, makes sure it is one of: ${Object.keys(this.units).join(', ')}`,
      )
    }

    return count * this.units[unit]
  }

  static DurationParser = 

  static createDurationParser(): QuantityParser.DurationParser {
    return new QuantityParser.DurationParser()
  }
}

export type HumanDuration = QuantityString
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
export function parseHumanDuration(
  humanDuration: HumanDuration | number,
): number {
  if (isNumber(humanDuration)) {
    return humanDuration
  }

  const parser = QuantityParser.createDurationParser()
  return parser.parse(humanDuration)
}