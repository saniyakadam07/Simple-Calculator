<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parkeasy";

$conn = new mysqli($servername, $username, $password, $dbname);

// Enable MySQLi error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get and sanitize form data
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$password = trim($_POST['password']);
$user_type = $_POST['user_type'];

// Validate inputs
if (empty($name) || empty($email) || empty($password) || empty($user_type)) {
    $_SESSION['error'] = "All fields are required.";
    header("Location: signup.html");
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['error'] = "Invalid email format.";
    header("Location: signup.html");
    exit();
}

// Check password strength
if (strlen($password) < 8) {
    $_SESSION['error'] = "Password must be at least 8 characters long.";
    header("Location: signup.html");
    exit();
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Check if the email already exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $_SESSION['error'] = "User already exists.";
    header("Location: signup.html");
    exit();
}

// Insert new user into the database
$sql = "INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $hashed_password, $user_type);

if ($stmt->execute()) {
    if ($user_type == 'owner') {
        header("Location: owner.html");
    } else {
        header("Location: seeker.html");
    }
    exit(); // Ensure script stops after redirection
} else {
    $_SESSION['error'] = "An error occurred while creating your account.";
    header("Location: signup.html");
}

$stmt->close();
$conn->close();
?>
