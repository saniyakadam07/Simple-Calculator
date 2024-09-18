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

// Get and sanitize form data
$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
$user_type = filter_var(trim($_POST['user_type']), FILTER_SANITIZE_STRING);

// Check if the email already exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User already exists
    $_SESSION['error'] = "User already exists";
    header("Location: login.html"); // Redirect to login page
    exit();
}

// Insert new user into the database
$sql = "INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $password, $user_type);

if ($stmt->execute()) {
    // Redirect based on user type
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
