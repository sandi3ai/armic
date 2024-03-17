<?php

include_once '../rest/db.php';
//TODO: Should I include auth.php here?
require_once 'getHolidays.php';
require_once 'checkVacation.php';
require_once 'checkLoggedHours.php';
require_once 'sendEmail.php';
require_once 'setEmailSent.php';

echo "Starting task scheduler\n";

$today = new DateTime();
$holidayFilePath = __DIR__ . "/../hooks/holidays_slovenia_gov_si.json";

$isWorkFreeDay = isHolidayOrAWeekend($today, $holidayFilePath);

if ($isWorkFreeDay) {
    echo "It's a holiday or a weekend, no email today!";
    exit;
} else {
    echo "It's a work day, let's check if other conditions are met!\n";
}

// selecting users that didn't yet receive email and have estimated start time before current time
$sql = "SELECT zaposlen.zaposleniID, zaposlen.zaposleniIme, zaposlen.predvidenZacetek, zaposlen.email
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
echo "Users selected\n";
$stmt = $conn->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Results fetched: " . count($results) . "\n";

foreach ($results as $user) {
    if (!isOnVacation($user['zaposleniID'], $today) && !hasLoggedHours($user['zaposleniID'], $today)) {
        echo "Sending email to: " . $user['zaposleniIme'] . "\n";
        echo "Email: " . $user['email'] . "\n";
        // Here you would send the email
        sendEmailNotification($user['email']);   
        //markEmailAsSent($user['zaposleniID']);
    }
}

$conn = null;