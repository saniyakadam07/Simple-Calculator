<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parkeasy";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT);
$user_type = $_POST['user_type'];

// Validate inputs
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['error'] = "Invalid email format";
    header("Location: signup.html");
    exit();
}

// Check if the email already exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $_SESSION['error'] = "User already exists";
    header("Location: signup.html");
    exit();
}

// Insert new user into the database
$sql = "INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $password, $user_type);

if ($stmt->execute()) {
    if ($user_type == 'owner') {
        header("Location: owner.html");
    } else {
        header("Location: seeker.html");
    }
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
