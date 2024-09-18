

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

// Get form data
$name = $_POST['name'];
$age = $_POST['age'];
$contact = $_POST['contact'];
$parking_no = $_POST['parking_no'];
$area = $_POST['area'];
$city = $_POST['city'];
$state = $_POST['state'];
$charges = $_POST['charges'];
$timing = $_POST['timing'];
$availability_date = $_POST['availability_date'];
$features = implode(', ', $_POST['features']); // Convert checkbox array to string
$note = $_POST['note'];

// Insert into the database
$sql = "INSERT INTO owners (name, age, contact, parking_no, area, city, state, charges, timing, availability_date, features, note) 
        VALUES ('$name', '$age', '$contact', '$parking_no', '$area', '$city', '$state', '$charges', '$timing', '$availability_date', '$features', '$note')";

if ($conn->query($sql) === TRUE) {
    echo "Parking details saved successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

