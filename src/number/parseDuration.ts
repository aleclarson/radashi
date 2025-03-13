import { DurationParser, type DurationString } from 'radashi'

/**
 * Parse a duration string into a number.
 *
 * By default, the following units are supported:
 * - `week`
 * - `day`
 * - `hour`
 * - `minute`
 * - `second`
 * - `millisecond`
 *
 * By default, months and years are not supported, since these aren't
 * likely to be useful in the majority of cases and they introduce
 * ambiguity due to leap years and length differences between months.
 *
 * @see https://radashi.js.org/reference/number/parseDuration
 * @version 12.4.0
 */
export function parseDuration(duration: DurationString): number

export function parseDuration<
  TUnit extends string = never,
  TShortUnit extends string = never,
>(
  duration: NoInfer<DurationString<TUnit, TShortUnit>>,
  options: DurationParser.Options<TUnit, TShortUnit>,
): number

export function parseDuration(
  duration: DurationString<string, string>,
  options?: DurationParser.Options<string, string>,
): number {
  return new DurationParser(options).parse(duration)
}
