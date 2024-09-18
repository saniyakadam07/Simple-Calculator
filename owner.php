<?php
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "parking_system"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get and sanitize form data
$name = $conn->real_escape_string(trim($_POST['name']));
$age = (int)$_POST['age']; // Cast to integer
$contact = $conn->real_escape_string(trim($_POST['contact']));
$parking_no = $conn->real_escape_string(trim($_POST['parking_no']));
$area = $conn->real_escape_string(trim($_POST['area']));
$city = $conn->real_escape_string(trim($_POST['city']));
$state = $conn->real_escape_string(trim($_POST['state']));
$charges = (float)$_POST['charges']; // Cast to float
$timing = $conn->real_escape_string(trim($_POST['timing']));
$availability_date = $conn->real_escape_string(trim($_POST['availability_date']));
$features = isset($_POST['features']) ? implode(', ', $_POST['features']) : ''; // Handle case where no features are selected
$note = $conn->real_escape_string(trim($_POST['note']));

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO owners (name, age, contact, parking_no, area, city, state, charges, timing, availability_date, features, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissssssssss", $name, $age, $contact, $parking_no, $area, $city, $state, $charges, $timing, $availability_date, $features, $note);

// Execute the statement
if ($stmt->execute()) {
    echo "Parking details saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
