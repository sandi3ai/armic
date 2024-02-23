import React, { useEffect, useState } from "react";
import ToggleButtonGroup from "./ToggleButtons";
import { getAndConvertHolidays } from "../../hooks/getHolidays";
import HolidaysList from "./HolidaysList";

export const Dopust = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const holidaysList = getAndConvertHolidays({});
    setHolidays(holidaysList);
    // Now you have holidays as an array of objects
    console.log("Holidays list", holidaysList);
  }, []);

  return (
    <div>
      <div className="content">
        <h2>ODSOTNOSTI:</h2>
        <ToggleButtonGroup holidays={holidays} />
      </div>
      <HolidaysList holidays={holidays} />
    </div>
  );
};
