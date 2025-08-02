<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "transport-billing";

// Connect
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$c = $_POST['customerName'];
$p = $_POST['phone'];
$v = $_POST['vehicleNumber'];
$s = $_POST['source'];
$d = $_POST['destination'];
$dist = floatval($_POST['distance']);
$r = floatval($_POST['rate']);
$l = floatval($_POST['loadCharge']);
$u = floatval($_POST['unloadCharge']);
$g = floatval($_POST['gst']);

// Calculate
$base = ($dist * $r) + $l + $u;
$tax = $base * ($g / 100);
$total = $base + $tax;

// Insert
// $sql = "INSERT INTO invoices (customerName, phone, vehicleNumber, source, destination, distance, rate, loadCharge, unloadCharge, gst, totalAmount)
//         VALUES ('$c', '$p', '$v', '$s', '$d', $dist, $r, $l, $u, $g, $total)";



$sql = "INSERT INTO invoices (customerName, phone, vehicleNumber, source, destination, distance, rate, loadCharge, unloadCharge, gst, totalAmount)
        VALUES ('$c', '$p', '$v', '$s', '$d', $dist, $r, $l, $u, $g, $total)";

if ($conn->query($sql) === TRUE) {
  echo "<h3>✅ Invoice submitted successfully!</h3><a href='index.html'>Back to Form</a>";
} else {
  echo "❌ Error: " . $conn->error;
}
$conn->close();
?>
