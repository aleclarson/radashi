import { QuantityParser } from "./QuantityParser"

export type DurationUnit = keyof typeof DurationParser.units

export type DurationShortUnit = keyof typeof DurationParser.shortUnits

export class DurationParser<
  TUnit extends string = never,
  TShortUnit extends string = never,
> extends QuantityParser<
    DurationUnit | TUnit,
    DurationShortUnit | TShortUnit
  > {
    constructor(options?: {
      units?: Record<TUnit, number>
      shortUnits?: Record<TShortUnit, TUnit>
    }) {
      super({
        units: {
          ...DurationParser.units,
          ...options?.units,
        },
        short: {
          ...DurationParser.shortUnits,
          ...options?.shortUnits,
        },
      })
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