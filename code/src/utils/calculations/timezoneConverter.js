/**
 * Timezone database
 */
export const timeZones = [
  { value: '-12:00', label: '(UTC-12) International Date Line West' },
  { value: '-11:00', label: '(UTC-11) Midway Island, Samoa' },
  { value: '-10:00', label: '(UTC-10) Hawaii' },
  { value: '-09:00', label: '(UTC-09) Alaska' },
  { value: '-08:00', label: '(UTC-08) Pacific Time (US/Canada), Tijuana' },
  { value: '-07:00', label: '(UTC-07) Mountain Time (US/Canada), Chihuahua, Mazatlan' },
  { value: '-06:00', label: '(UTC-06) Central America, Central Time (US/Canada), Mexico City' },
  { value: '-05:00', label: '(UTC-05) Eastern Time (US/Canada), Colombia, Peru, Cuba' },
  { value: '-04:00', label: '(UTC-04) Atlantic Time (Canada), Caracas, La Paz, Santiago' },
  { value: '-03:00', label: '(UTC-03) Newfoundland, Brasilia, Rio, Argentina, Greenland' },
  { value: '-02:00', label: '(UTC-02) Mid-Atlantic' },
  { value: '-01:00', label: '(UTC-01) Azores, Cape Verde Island' },
  { value: '0', label: '(UTC) United Kingdom, Iceland, Ghana, Senegal, Mali' },
  { value: '+01:00', label: '(UTC+01) France, Germany, Central Europe Time, West Africa Time' },
  { value: '+02:00', label: '(UTC+02) Eastern Europe Time, Central Africa Time, Greece, Egypt' },
  { value: '+03:00', label: '(UTC+03) East Africa Time, Moscow, Iraq, Kuwait, Kenya' },
  { value: '+03:30', label: '(UTC+03:30) Iran' },
  { value: '+04:00', label: '(UTC+04) Armenia, Georgia, Oman, United Arab Emirates' },
  { value: '+04:30', label: '(UTC+04:30) Afghanistan' },
  { value: '+05:00', label: '(UTC+05) Pakistan, Kazakhstan (west), Uzbekistan' },
  { value: '+05:30', label: '(UTC+05:30) India, Sri Lanka' },
  { value: '+05:45', label: '(UTC+05:45) Nepal' },
  { value: '+06:00', label: '(UTC+06) Bangladesh, Bhutan, Kazakhstan (most)' },
  { value: '+06:30', label: '(UTC+06:30) Myanmar' },
  { value: '+07:00', label: '(UTC+07) Cambodia, Jakarta, Thailand, Vietnam' },
  { value: '+08:00', label: '(UTC+08) China, Malaysia, Philippines, Singapore' },
  { value: '+09:00', label: '(UTC+09) Japan, Korea' },
  { value: '+10:00', label: '(UTC+10) Sydney, Guam, Vladivostok, Melbourne' },
  { value: '+11:00', label: '(UTC+11) Solomon Island, Vanuatu' },
  { value: '+12:00', label: '(UTC+12) New Zealand (most), Fiji, Marshall Island' },
];

/**
 * Convert time between timezones
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @param {string} fromTimeZone - Source timezone offset (e.g., '-05:00', '+05:30')
 * @param {string} toTimeZone - Target timezone offset
 * @returns {object} - Contains original and converted date/time with formatting
 */
export const convertTimezone = (date, time, fromTimeZone, toTimeZone) => {
  if (!date || !time || !fromTimeZone || !toTimeZone) {
    return null;
  }

  try {
    // Construct a Date object from selected date and time
    const selectedDateTime = new Date(`${date}T${time}`);

    // Get day, month, year, and time
    const day = selectedDateTime.toLocaleString('en-US', { day: 'numeric' });
    const month = selectedDateTime.toLocaleString('en-US', { month: 'long' });
    const year = selectedDateTime.toLocaleString('en-US', { year: 'numeric' });
    const timeStr = selectedDateTime.toLocaleString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    const dayOfWeek = selectedDateTime.toLocaleString('en-US', { weekday: 'long' });

    // Parse timezone offsets
    const fromOffset = parseTimeZoneOffset(fromTimeZone);
    const toOffset = parseTimeZoneOffset(toTimeZone);

    // Convert time
    const fromTime = selectedDateTime.getTime();
    const convertedTime = new Date(fromTime + fromOffset - toOffset);

    // Get converted date/time
    const convertedDay = convertedTime.toLocaleString('en-US', { day: 'numeric' });
    const convertedMonth = convertedTime.toLocaleString('en-US', { month: 'long' });
    const convertedYear = convertedTime.toLocaleString('en-US', { year: 'numeric' });
    const convertedTimeStr = convertedTime.toLocaleString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });

    return {
      originalDate: `${month} ${day}, ${year}`,
      originalTime: timeStr,
      originalDayOfWeek: dayOfWeek,
      originalTimeZone: fromTimeZone,
      convertedDate: `${convertedMonth} ${convertedDay}, ${convertedYear}`,
      convertedTime: convertedTimeStr,
      convertedDayOfWeek: dayOfWeek, // Day of week typically stays same in conversion
      convertedTimeZone: toTimeZone,
      output: `${month} ${day}, ${year} ${timeStr} (${dayOfWeek}) ${fromTimeZone} → ${convertedMonth} ${convertedDay}, ${convertedYear} ${convertedTimeStr} ${toTimeZone}`,
    };
  } catch (error) {
    console.error('Timezone conversion error:', error);
    return null;
  }
};

/**
 * Parse timezone offset string to milliseconds
 * @param {string} tzOffset - Timezone offset (e.g., '-05:00', '+05:30', '0')
 * @returns {number} - Offset in milliseconds
 */
const parseTimeZoneOffset = (tzOffset) => {
  const sign = tzOffset[0] === '-' ? -1 : 1;
  const parts = tzOffset.substring(1).split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1] || '0', 10);
  const totalMinutes = hours * 60 + minutes;
  return sign * totalMinutes * 60 * 1000;
};
