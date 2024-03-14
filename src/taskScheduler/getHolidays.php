<?php
function getWorkFreeHolidays($pathToJson, $workFreeDaysOnly = true) {
    $jsonData = json_decode(file_get_contents($pathToJson), true);
    $holidaysList = [];

    foreach ($jsonData['records'] as $record) {
        // Check if DELA_PROST_DAN (index 4 based on JSON structure) is 'da'
        if ($record[4] === "da") {
            // Construct a simplified array for each holiday, that includes the date and name
            $holidaysList[] = [
                'date' => $record[1],
                'name' => $record[2],
            ];
        }
    }

    return $holidaysList;
}

function isHolidayOrAWeekend(DateTime $date, $pathToJson) {
    //j ensures that the day has no leading zero
    $formattedPassedDate = $date->format('j.m.Y');

    $holidays = getWorkFreeHolidays($pathToJson);

    // Check if the formatted date is in the array of holidays
    foreach ($holidays as $holiday) {
        if ($formattedPassedDate === $holiday['date']) {
            return true; // It's a holiday
        }
    }

    // Check if it's a weekend (Saturday = 6, Sunday = 7)
    if ($date->format('N') >= 6) {
        return true; // It's a weekend
    }

    return false; // It's not a holiday or a weekend
}