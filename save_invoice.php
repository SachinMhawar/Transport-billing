<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "og_transport"; 

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$company = $_POST['company'];
$unit = $_POST['unit'];
$billDate = $_POST['billDate'];
$ourStateCode = $_POST['ourStateCode'];
$partyName = $_POST['partyName'];
$lockerNo = $_POST['lockerNo'];
$employee = $_POST['employee'];
$billNo = $_POST['billNo'];
$vendorStateCode = $_POST['vendorStateCode'];
$remark = $_POST['remark'];
$poNo = $_POST['poNo'];
$poDate = $_POST['poDate'];
$finYear = $_POST['finYear'];
$gstRequired = $_POST['gstRequired'];
// $totalAmount = $_POST['totalAmount'];
$cgstAmt = $_POST['cgstAmt'];
$sgstAmt = $_POST['sgstAmt'];
$igstAmt = $_POST['igstAmt'];
$grossTotal = $_POST['grossTotal'];
$fixRate = isset($_POST['fixRate']) ? 1 : 0;
$runningKm = isset($_POST['runningKm']) ? 1 : 0;


$invoice_sql = "INSERT INTO invoices (
  company, unit, billDate, ourStateCode, partyName, lockerNo, employee,
  billNo, vendorStateCode, remark, poNo, poDate, finYear, gstRequired,
  totalAmount, cgstAmt, sgstAmt, igstAmt, grossTotal, fixRate, runningKm
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($invoice_sql);

$stmt->bind_param(
  "ssssssssssssssdddddii",
  $company, $unit, $billDate, $ourStateCode, $partyName, $lockerNo, $employee,
  $billNo, $vendorStateCode, $remark, $poNo, $poDate, $finYear, $gstRequired,
  $totalAmount, $cgstAmt, $sgstAmt, $igstAmt, $grossTotal, $fixRate, $runningKm
);





$stmt->execute();
$invoice_id = $stmt->insert_id;


$travelDate = $_POST['travelDate'];
$heading = $_POST['heading'];
$particulars = $_POST['particulars'];
$hsn = $_POST['hsn'];
$cgst = $_POST['cgst'];
$sgst = $_POST['sgst'];
$igst = $_POST['igst'];
$kms = $_POST['kms'];
$rate = $_POST['rate'];
$amount = $_POST['amount'];

$item_sql = "INSERT INTO invoice_items (
  invoice_id, travelDate, heading, particulars, hsn,
  cgst, sgst, igst, kms, rate, amount
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$item_stmt = $conn->prepare($item_sql);

for ($i = 0; $i < count($travelDate); $i++) {
  $item_stmt->bind_param(
    "issssdddddd",
    $invoice_id,
    $travelDate[$i],
    $heading[$i],
    $particulars[$i],
    $hsn[$i],
    $cgst[$i],
    $sgst[$i],
    $igst[$i],
    $kms[$i],
    $rate[$i],
    $amount[$i]
  );
  $item_stmt->execute();
}

echo "<h3> Invoice submitted successfully!</h3><a href='index.html'>Back to Form</a>";
$conn->close();
?>
