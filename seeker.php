

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parking_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$city = $_POST['city'];
$sql = "SELECT * FROM owners WHERE city='$city' AND availability_date >= CURDATE()";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Parking No: " . $row["parking_no"] . " - Location: " . $row["area"] . ", " . $row["city"] . "<br>";
    }
} else {
    echo "No parking spaces available in this city.";
}

$conn->close();
?>
