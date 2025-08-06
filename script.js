
function calculateRowTotal(input) {
  const row = input.closest("tr");
  const cgst = parseFloat(row.querySelector('input[name="cgst[]"]').value) || 0;
  const sgst = parseFloat(row.querySelector('input[name="sgst[]"]').value) || 0;
  const igst = parseFloat(row.querySelector('input[name="igst[]"]').value) || 0;
  const kms = parseFloat(row.querySelector('input[name="kms[]"]').value) || 0;
  const rate = parseFloat(row.querySelector('input[name="rate[]"]').value) || 0;

  const fixRateChecked = document.querySelector('input[name="fixRate"]').checked;
  const runningKmChecked = document.querySelector('input[name="runningKm"]').checked;

  let baseAmount = 0;

  if (fixRateChecked) {
    baseAmount = rate;
  } else if (runningKmChecked) {
    baseAmount = kms * rate;
  } else {
    baseAmount = kms * rate;
  }

  const taxPercent = cgst + sgst + igst;
  const taxAmount = (baseAmount * taxPercent) / 100;
  const total = baseAmount + taxAmount;

  row.querySelector('input[name="amount[]"]').value = total.toFixed(2);

  calculateTotals();
}



function calculateTotals() {
  let totalBase = 0, cgstAmt = 0, sgstAmt = 0, igstAmt = 0;

  const fixRateChecked = document.querySelector('input[name="fixRate"]').checked;
  const runningKmChecked = document.querySelector('input[name="runningKm"]').checked;

  document.querySelectorAll('#invoice-rows tr').forEach(row => {
    const kms = parseFloat(row.querySelector('input[name="kms[]"]').value) ||  0;
    const rate = parseFloat(row.querySelector('input[name="rate[]"]').value) || 0;
    const cgst = parseFloat(row.querySelector('input[name="cgst[]"]').value) || 0;
    const sgst = parseFloat(row.querySelector('input[name="sgst[]"]').value) || 0;
    const igst = parseFloat(row.querySelector('input[name="igst[]"]').value) || 0;

    let base = 0;

    if (fixRateChecked) {
      base = rate;
    } else if (runningKmChecked) {
      base = kms * rate;
    } else {
      base = kms * rate;
    }

    totalBase += base;
    cgstAmt += (base * cgst) / 100;
    sgstAmt += (base * sgst) / 100;
    igstAmt += (base * igst) / 100;
  });

  const grossTotal = totalBase + cgstAmt + sgstAmt + igstAmt;

  document.querySelector('input[name="cgstAmt"]').value = cgstAmt.toFixed(2);
  document.querySelector('input[name="sgstAmt"]').value = sgstAmt.toFixed(2);
  document.querySelector('input[name="igstAmt"]').value = igstAmt.toFixed(2);
  document.querySelector('input[name="grossTotal"]').value = grossTotal.toFixed(2);
}


function addRow() {
  const table = document.getElementById('invoice-rows');
  const newRow = table.rows[0].cloneNode(true);

  newRow.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  table.appendChild(newRow);
}




function searchInvoiceRows() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#invoice-rows tr');

  rows.forEach(row => {
    const inputValues = Array.from(row.querySelectorAll('input'))
      .map(input => input.value.toLowerCase())
      .join(" ");

    row.style.display = inputValues.includes(query) ? "" : "none";
  });
}


document.querySelector('input[name="fixRate"]').addEventListener('change', calculateTotals);
document.querySelector('input[name="runningKm"]').addEventListener('change', calculateTotals);




