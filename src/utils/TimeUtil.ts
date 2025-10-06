export class TimeUtil {
  public static toUtcMidnight(input: string | Date): Date {
    const d = new Date(input)

    if (d.getUTCHours() === 23 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0) {
      return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1))
    }

    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  }

  public static toUtcEndOfDay(input: string | Date): Date {
    const d = new Date(input)
    // Normalize to start of day UTC first (handles potential 23:00Z inputs)
    const startOfDayUtc = this.toUtcMidnight(d)
    // End of day is 1 day minus 1 millisecond from midnight
    return new Date(startOfDayUtc.getTime() + 24 * 60 * 60 * 1000 - 1)
  }
}