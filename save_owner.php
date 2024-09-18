<?php
// Database configuration
$servername = "localhost"; // Change to your database server
$username = "root";        // Change to your database username
$password = "";            // Change to your database password
$dbname = "parkeasy";    // Change to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect and sanitize form data
$name = $conn->real_escape_string(trim($_POST['name']));
$age = (int)$_POST['age']; // Cast to integer for safety
$contact = $conn->real_escape_string(trim($_POST['contact']));
$parking_no = $conn->real_escape_string(trim($_POST['parking_no']));
$area = $conn->real_escape_string(trim($_POST['area']));
$city = $conn->real_escape_string(trim($_POST['city']));
$state = $conn->real_escape_string(trim($_POST['state']));
$charges = (float)$_POST['charges']; // Cast to float for monetary values
$start_time = $conn->real_escape_string(trim($_POST['start_time']));
$end_time = $conn->real_escape_string(trim($_POST['end_time']));
$availability_date = $conn->real_escape_string(trim($_POST['availability_date']));
$features = isset($_POST['features']) ? implode(', ', $_POST['features']) : '';
$note = $conn->real_escape_string(trim($_POST['note']));

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO parking_spaces (name, age, contact, parking_no, area, city, state, charges, start_time, end_time, availability_date, features, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissssssssss", $name, $age, $contact, $parking_no, $area, $city, $state, $charges, $start_time, $end_time, $availability_date, $features, $note);

// Execute the query
if ($stmt->execute()) {
    echo "Parking details saved successfully.";
} else {
    // Log the error for debugging instead of showing to user
    error_log("Error: " . $stmt->error);
    echo "An error occurred while saving your details. Please try again.";
}

// Close connections
$stmt->close();
$conn->close();
?>
