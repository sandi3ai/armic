<?php

// Database connection setup
$db = new mysqli('your_host', 'your_username', 'your_password', 'your_database');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Load public holidays from JSON
$publicHolidays = json_decode(file_get_contents('path/to/public_holidays.json'), true);

// Helper function to check if today is a public holiday
function isPublicHoliday($today, $publicHolidays) {
    $todayFormatted = $today->format('Y-m-d');
    return in_array($todayFormatted, $publicHolidays);
}

// Helper function to check if today is a weekend
function isWeekend($today) {
    return $today->format('N') >= 6;
}

// Check if today is a weekend or a public holiday
$today = new DateTime();
if (isWeekend($today) || isPublicHoliday($today, $publicHolidays)) {
    exit(); // Don't proceed further
}

// Prepare your SQL statement for checking users
$sql = "SELECT * FROM zaposleni WHERE NOT emailZaUrePoslan AND estimatedStartTime <= ?";
$currentTime = $today->format('H:i:s');
$stmt = $db->prepare($sql);
$stmt->bind_param('s', $currentTime);
$stmt->execute();
$users = $stmt->get_result();

while ($user = $users->fetch_assoc()) {
    // Check if user is on vacation today
    if (isOnVacation($user['userID'], $today) || hasLoggedHours($user['userID'], $today)) {
        continue;
    }

    // Send email notification
    sendEmailNotification($user['email']);
    markEmailAsSent($user['userID']);
}

// you will need two task schedulers, one for main.php and the other to set emailZaUrePoslan to 0 at 18:00:00