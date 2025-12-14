/**
 * Rounds a number to a specified number of decimal places.
 * Handles floating point precision issues.
 *
 * @param value - The number to round
 * @param decimals - Number of decimal places (default 0)
 * @returns Rounded number
 */
export function round(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) return value; // handle NaN/Infinity
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
