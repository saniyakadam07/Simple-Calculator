<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parking_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the city from the POST request
$city = $_POST['city'];

// Prepare the SQL statement
$stmt = $conn->prepare("SELECT * FROM owners WHERE city = ? AND availability_date >= CURDATE()");
$stmt->bind_param("s", $city);

// Execute the statement
$stmt->execute();
$result = $stmt->get_result();

// Check if there are any results
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Parking No: " . htmlspecialchars($row["parking_no"]) . " - Location: " . htmlspecialchars($row["area"]) . ", " . htmlspecialchars($row["city"]) . "<br>";
    }
} else {
    echo "No parking spaces available in this city.";
}

// Close connections
$stmt->close();
$conn->close();
?>
