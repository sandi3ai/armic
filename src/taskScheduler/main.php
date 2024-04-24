<?php

//TODO: Should I include auth.php here?
include_once __DIR__ . '/../rest/db.php';
require_once __DIR__ . '/getHolidays.php';
require_once __DIR__ . '/checkVacation.php';
require_once __DIR__ . '/checkLoggedHours.php';
require_once __DIR__ . '/sendEmail.php';
require_once __DIR__ . '/setEmailSent.php';

$logDate = date('Y-m-d');
$logFile = "C:\\xampp\\htdocs\\reactProjects\\armic\\src\\taskScheduler\\logs\\log-{$logDate}.txt";
touch($logFile);//creates file if it doesn't exist
$currentContent = file_get_contents($logFile);
$currentDateTime = date('Y-m-d H:i:s');
$currentDate = date('d.m.Y');
$currentTime = date('H:i');

$logFileContent = "***Pošiljanje opomnikov - začetek: {$currentDate}, {$currentTime}\n";

// Security check (second argument must be the secret key)
if (!isset($argv[1])) {
    $logFileContent .= "Varnostna preverba ni uspela: drugi argument ni podan.\nIzhod...\n";
    file_put_contents($logFile, $logFileContent);
    exit;
} elseif ($argv[1] !== 'GhjqT@0}W2}&(@!YO@NLmt]zY;}') {
    $logFileContent .= "Varnostna preverba ni uspela: napačen drugi argument.\nIzhod...\n";
    file_put_contents($logFile, $logFileContent);
    exit;
}

try {
$today = new DateTime();
$holidayFilePath = __DIR__ . "/../hooks/holidays_slovenia_gov_si.json";

$isWorkFreeDay = isHolidayOrAWeekend($today, $holidayFilePath);

if ($isWorkFreeDay) {
    echo "It's a holiday or a weekend, no email today!";
    $logFileContent .= "Praznik ali vikend je, danes ni opomnikov!\n";
    exit;
} else {
    echo "It's a work day, let's check if other conditions are met!\n";
}

// selecting users that didn't yet receive email and have estimated start time before current time
$sql = "SELECT 
  z.zaposleniID, 
  z.zaposleniIme,
  z.zaposleniSkupinaID, 
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
    CAST(ADDTIME(CURRENT_TIMESTAMP(), '-01:59:00') AS DATETIME)
  );
";

echo "Users selected\n";
$stmt = $conn->prepare($sql);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($results as $user) {
    echo "User suitable for email: " . $user['zaposleniIme'] . "\n";
}
echo "Results fetched: " . count($results) . "\n";

foreach ($results as $user) {
    if (!isOnVacation($user['zaposleniID'], $today) && !hasLoggedHours($user['zaposleniID'], $today)) {
      if(!empty($user['email'])) {
        echo "Sending email to: " . $user['zaposleniIme'] . "\n";
        $logFileContent .= "Pošiljanje emaila: " . $user['zaposleniIme'] . "\n";

        // Sending email
        sendEmailNotification($user['email'], $user['zaposleniIme'], $logFile);   
        markEmailAsSent($user['zaposleniID'], $logFile);
      }else {
        $logFileContent .= "Napaka: Ni emaila za: " . $user['zaposleniIme'] . "\n"; // Če je email prazen
      }
    }
    //If a user is on vacation, but the hours aren't logged the email will be sent to group leader
    /*else if (!hasLoggedHours($user['zaposleniID'], $today)) {
        $groupEmail = selectGroupEmail($user['zaposleniSkupinaID'], $logFileContent, $user['zaposleniIme']);
        if (!empty($groupEmail)) {
          sendEmailNotification($groupEmail, $user['zaposleniIme'], $logFile, true);
           $logFileContent .= "User " . $user['zaposleniIme'] . " is on vacation,sending email to a group leader\n";
          markEmailAsSent($user['zaposleniID'], $logFile);
        } else {
          $logFileContent .= "Error at {$currentDateTime}: No group leader email found for user " . $user['zaposleniIme'] . "\n";
        }
    }*/
}
} catch (PDOException $e) {
    $logFileContent .= "Error at {$currentDateTime}: " . $e->getMessage() . "\n"; // For catching exceptions
    echo "Server error: " . $e->getMessage();
}


$logFileContent .= "Pošiljanje opomnikov - konec: {$currentTime}.\n***";
$finalContent = $currentContent . $logFileContent;
file_put_contents($logFile, $finalContent);

$conn = null;