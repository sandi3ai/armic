<?php

include_once '../rest/db.php';
//TODO: Should I include auth.php here?
require_once 'getHolidays.php';
require_once 'checkVacation.php';

$today = new DateTime();
$users = [];
var_dump("TODAY: ", $today->format('d.m.Y'));
$holidayFilePath = __DIR__ . "/../hooks/holidays_slovenia_gov_si.json";

$isWorkFreeDay = isHolidayOrAWeekend($today, $holidayFilePath);

if ($isWorkFreeDay) {
    echo "It's a holiday or a weekend, no email today!";
    exit;
} else {
    echo "It's a work day, let's check if other conditions are met!\n";
}

// selecting users that didn't yet receive email and have estimated start time before current time
$sql = "SELECT zaposlen.zaposleniID, zaposlen.zaposleniIme, zaposlen.predvidenZacetek
FROM zaposlen
WHERE zaposlen.emailZaUrePoslan = 0
AND (
  CASE
    WHEN zaposlen.predvidenZacetek < '22:00:00' THEN
      ADDTIME(zaposlen.predvidenZacetek, '02:00:00') <= CURRENT_TIME()
    WHEN zaposlen.predvidenZacetek >= '22:00:00' AND CURDATE() = DATE(ADDTIME(CURRENT_TIME(), '02:00:00')) THEN
      ADDTIME(zaposlen.predvidenZacetek, '26:00:00') >= CURRENT_TIME()
    ELSE
      ADDTIME(zaposlen.predvidenZacetek, '02:00:00') <= ADDTIME(CURRENT_TIME(), '24:00:00')
  END);";

$stmt = $conn->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll();

foreach ($results as $row) {
    $users[] = $row['zaposleniID'];
}

var_dump($users);

var_dump(isOnVacation($users, $today));