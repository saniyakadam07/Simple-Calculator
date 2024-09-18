

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

// Collect form data
$name = $_POST['name'];
$age = $_POST['age'];
$contact = $_POST['contact'];
$parking_no = $_POST['parking_no'];
$area = $_POST['area'];
$city = $_POST['city'];
$state = $_POST['state'];
$charges = $_POST['charges'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$availability_date = $_POST['availability_date'];
$features = isset($_POST['features']) ? implode(', ', $_POST['features']) : '';
$note = $_POST['note'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO parking_spaces (name, age, contact, parking_no, area, city, state, charges, start_time, end_time, availability_date, features, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissssssssss", $name, $age, $contact, $parking_no, $area, $city, $state, $charges, $start_time, $end_time, $availability_date, $features, $note);

// Execute the query
if ($stmt->execute()) {
    echo "Parking details saved successfully.";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>

