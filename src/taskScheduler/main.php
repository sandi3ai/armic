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
    $logFileContent .= "It's a holiday or a weekend, no email today!\n";
    exit;
} else {
    echo "It's a work day, let's check if other conditions are met!\n";
}

// selecting users that didn't yet receive email and have estimated start time before current time
$sql = "SELECT 
  z.zaposleniID, 
  z.zaposleniIme, 
  z.predvidenZacetek, 
  z.email
FROM 
  zaposlen z 
WHERE 
  z.emailZaUrePoslan = 0
  AND z.`deleted` = 0
  AND (
    -- Consider the time range from two to four hours ago
    CAST(CONCAT(CASE 
                  WHEN CURRENT_TIME() <= '03:00:00' AND z.predvidenZacetek >= '03:00:00' THEN 
                    ADDDATE(CURRENT_DATE(), INTERVAL -1 DAY)
                  ELSE 
                    CURRENT_DATE() 
                END, 
                ' ', 
                z.predvidenZacetek) AS DATETIME
    ) BETWEEN 
    CAST(ADDTIME(CURRENT_TIMESTAMP(), '-03:00:00') AS DATETIME) AND 
    CAST(ADDTIME(CURRENT_TIMESTAMP(), '-02:00:00') AS DATETIME)
  );
";

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