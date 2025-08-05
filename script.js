  function addRow() {
      const table = document.getElementById("invoice-rows");
      const newRow = table.rows[0].cloneNode(true);
      newRow.querySelectorAll("input").forEach(input => input.value = "");
      table.appendChild(newRow);
    }

    function calculateRowTotal(element) {
      const row = element.closest("tr");
      const kms = parseFloat(row.querySelector('input[name="kms[]"]').value) || 0;
      const rate = parseFloat(row.querySelector('input[name="rate[]"]').value) || 0;
      const cgst = parseFloat(row.querySelector('input[name="cgst[]"]').value) || 0;
      const sgst = parseFloat(row.querySelector('input[name="sgst[]"]').value) || 0;
      const igst = parseFloat(row.querySelector('input[name="igst[]"]').value) || 0;

      const base = kms * rate;
      const tax = base * (cgst + sgst + igst) / 100;
      const total = base + tax;

      row.querySelector('.row-total').value = total.toFixed(2);

      calculateGrandTotal();
    }

    function calculateGrandTotal() {
      let grandTotal = 0;
      document.querySelectorAll('.row-total').forEach(input => {
        grandTotal += parseFloat(input.value) || 0;
      });
      document.querySelector('input[name="grossTotal"]').value = grandTotal.toFixed(2);
    }



function searchInvoiceRows() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#invoice-rows tr');

  rows.forEach(row => {
    let match = false;
    const inputs = row.querySelectorAll('input');

    inputs.forEach(input => {
      if (input.value.toLowerCase().includes(query)) {
        match = true;
      }
    });

    row.style.display = match ? '' : 'none';
  });
}
