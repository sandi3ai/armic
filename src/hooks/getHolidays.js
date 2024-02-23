import holidaysData from "./holidays_slovenia_gov_si.json";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const getAndConvertHolidays = ({
  yearFilter = new Date().getFullYear(),
  workFreeDaysOnly = true,
} = {}) => {
  const fieldIds = holidaysData.fields.map((field) => field.id);

  // Start with the original records
  let records = holidaysData.records;

  // Filter by year
  records = filterByYear(records, fieldIds, yearFilter);
  console.log("After year filter", records);

  // If workFreeDaysOnly is true, filter by DELA_PROST_DAN 'da'
  if (workFreeDaysOnly) {
    records = filterByDelaProstDan(records, fieldIds);
  }
  console.log("After work free days only filter", records);

  // Finally, convert the filtered records to objects
  const holidaysList = records.map((record) => {
    return fieldIds.reduce((obj, fieldId, index) => {
      obj[fieldId] = record[index];
      return obj;
    }, {});
  });

  return holidaysList;
};

/**
 * Helpers to the main function ^
 */

const filterByDelaProstDan = (records, fieldIds) => {
  const delaProstDanIndex = fieldIds.indexOf("DELA_PROST_DAN");
  return records.filter((record) => record[delaProstDanIndex] === "da");
};

const filterByYear = (records, fieldIds, year) => {
  const dateIndex = fieldIds.indexOf("DATUM");
  return records.filter((record) => {
    // Parse the date using DayJS with the custom format 'D.M.YYYY'
    const date = dayjs(record[dateIndex], "D.M.YYYY");
    return date.isValid() && date.year() === year;
  });
};
