<?php

//TODO: Should I include auth.php here?
include_once __DIR__ . '/../rest/db.php';
require_once __DIR__ . '/getHolidays.php';
require_once __DIR__ . '/checkVacation.php';
require_once __DIR__ . '/checkLoggedHours.php';
require_once __DIR__ . '/sendEmail.php';
require_once __DIR__ . '/setEmailSent.php';


$logFile = "C:\\xampp\\htdocs\\reactProjects\\armic\\src\\taskScheduler\\log.txt";
$currentContent = file_get_contents($logFile);
$currentDateTime = date('Y-m-d H:i:s');

$logFileContent = "Script started at {$currentDateTime}\n";

try {
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

$emailSentCounter = 0;

foreach ($results as $user) {
    if (!isOnVacation($user['zaposleniID'], $today) && !hasLoggedHours($user['zaposleniID'], $today)) {
      if(!empty($user['email'])) {
        echo "Sending email to: " . $user['zaposleniIme'] . "\n";
        $logFileContent .= "Sending email to: " . $user['zaposleniIme'] . "\n";

        // Sending email
        sendEmailNotification($user['email'], $user['zaposleniIme'], $logFile);   
        markEmailAsSent($user['zaposleniID'], $logFile);
        $emailSentCounter++;
      }else {
        $logFileContent .= "Error at {$currentDateTime}: Email for user " . $user['zaposleniIme'] . " is empty\n"; // If an email is empty
      }

    }
}
} catch (PDOException $e) {
    $logFileContent .= "Error at {$currentDateTime}: " . $e->getMessage() . "\n"; // For catching exceptions
    echo "Server error: " . $e->getMessage();
}


$logFileContent .= "Script ended at {$currentDateTime}\n***\n"; // At the end of your script
$finalContent = $logFileContent . $currentContent;
file_put_contents($logFile, $finalContent);

$conn = null;