/**
 * Returns a new Date object representing the start of the day in UTC (00:00:00.000Z).
 * 
 * @param {Date|string|number} date 
 * @returns {Date} Start of day UTC
 */
export const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
};

/**
 * Returns a new Date object representing the end of the day in UTC (23:59:59.999Z).
 * 
 * @param {Date|string|number} date 
 * @returns {Date} End of day UTC
 */
export const getEndOfDay = (date = new Date()) => {
  const d = new Date(date);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999));
};

/**
 * Returns a date string formatted as YYYY-MM-DD in UTC.
 * 
 * @param {Date|string|number} date 
 * @returns {string} ISO Date String YYYY-MM-DD
 */
export const getUTCDateString = (date = new Date()) => {
  const d = new Date(date);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
};

/**
 * Compares two dates to see if they fall on the same UTC calendar day.
 * 
 * @param {Date|string|number} date1 
 * @param {Date|string|number} date2 
 * @returns {boolean} True if same day UTC
 */
export const isSameDay = (date1, date2) => {
  return getUTCDateString(date1) === getUTCDateString(date2);
};

/**
 * Checks if a date falls exactly on UTC yesterday relative to reference date.
 * 
 * @param {Date|string|number} date 
 * @param {Date|string|number} referenceDate 
 * @returns {boolean} True if date is yesterday in UTC
 */
export const isYesterday = (date, referenceDate = new Date()) => {
  const yesterday = new Date(getStartOfDay(referenceDate));
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return isSameDay(date, yesterday);
};

/**
 * Calculates absolute difference in UTC days between two dates.
 * 
 * @param {Date|string|number} date1 
 * @param {Date|string|number} date2 
 * @returns {number} Difference in days
 */
export const diffInDays = (date1, date2) => {
  const d1 = getStartOfDay(date1).getTime();
  const d2 = getStartOfDay(date2).getTime();
  return Math.round(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24));
};
