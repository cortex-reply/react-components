export class TimeUtil {
    public static toUtcMidnight(input: string | Date): Date {
       const d = new Date(input)
   
       if (d.getUTCHours() === 23 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0) {
         return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1))
       }
   
       return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
     }
   }