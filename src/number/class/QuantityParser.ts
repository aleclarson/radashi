/**
 * A human-readable quantity string.
 */
export type QuantityString<
  Unit extends string,
  ShortUnit extends string = never,
> = `1 ${Unit}` | `${number} ${Unit}s` | `${number}${ShortUnit}`

/**
 * Parses a quantity string into its numeric value.
 *
 * You can use `parseQuantity` instead for a light wrapper that
 * doesn't require the `new` keyword.
 *
 * @version 12.4.0
 */
export class QuantityParser<
  Unit extends string,
  ShortUnit extends string = never,
> {
  private units: Record<Unit, number>
  private short?: Record<ShortUnit, Unit> | undefined

  constructor({ units, short }: QuantityParser.Options<Unit, ShortUnit>) {
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
    unit = this.short?.[unit as ShortUnit] || (unit as Unit)

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
}

export declare namespace QuantityParser {
  /**
   * The options for a `QuantityParser` instance.
   */
  export type Options<Unit extends string, ShortUnit extends string = never> = {
    units: Record<Unit, number>
    short?: Record<ShortUnit, Unit>
  }

  /**
   * Convert a `QuantityParser` instance to a human-readable quantity string.
   */
  export type ToString<T extends QuantityParser<string, string>> =
    T extends QuantityParser<infer Unit, infer ShortUnit>
      ? QuantityString<Unit, ShortUnit>
      : never
}
