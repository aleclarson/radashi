import { QuantityParser, type QuantityString } from './QuantityParser'

/**
 * The default duration units supported by `DurationParser`.
 */
export type DurationUnit = keyof typeof DurationParser.units

/**
 * The default aliases for `DurationUnit`.
 */
export type DurationShortUnit = keyof typeof DurationParser.shortUnits

/**
 * A human-readable duration string.
 */
export type DurationString<
  TUnit extends string = never,
  TShortUnit extends string = never,
> = QuantityString<DurationUnit | TUnit, DurationShortUnit | TShortUnit>

/**
 * Parses a duration string into its numeric value.
 *
 * You can use `parseDuration` instead for a light wrapper that
 * doesn't require the `new` keyword.
 *
 * See {@link parseDuration} for more information.
 *
 * @version 12.4.0
 */
export class DurationParser<
  TUnit extends string = never,
  TShortUnit extends string = never,
> extends QuantityParser<DurationUnit | TUnit, DurationShortUnit | TShortUnit> {
  constructor(options?: DurationParser.Options<TUnit, TShortUnit>) {
    super({
      units: {
        ...DurationParser.units,
        ...options?.units,
      },
      short: {
        ...DurationParser.shortUnits,
        ...options?.short,
      },
    } as QuantityParser.Options<
      DurationUnit | TUnit,
      DurationShortUnit | TShortUnit
    >)
  }

  static units = {
    week: 604_800_000,
    day: 86_400_000,
    hour: 3_600_000,
    minute: 60_000,
    second: 1_000,
    millisecond: 1,
  } as const

  static shortUnits = {
    w: 'week',
    d: 'day',
    h: 'hour',
    m: 'minute',
    s: 'second',
    ms: 'millisecond',
  } as const
}

export declare namespace DurationParser {
  /**
   * The options for a `DurationParser` instance.
   */
  export type Options<TUnit extends string, TShortUnit extends string> = {
    units?: Record<TUnit, number>
    short?: Record<TShortUnit, TUnit | DurationUnit>
  }
}
