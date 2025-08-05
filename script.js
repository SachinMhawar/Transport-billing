   
//  add function for add row 
   function addRow() {
          const table = document.getElementById('invoice-rows');
          const newRow = table.rows[0].cloneNode(true);
          newRow.querySelectorAll("input").forEach(input => input.value = "");
          table.appendChild(newRow);
        }


    // add function for Calculate tax 
    function calculateRowTotal(elem) {
      const row = elem.parentNode.parentNode;
      const rate = parseFloat(row.querySelector('.rate')?.value) || 0;
      const kms = parseFloat(row.querySelector('.kms')?.value) || 0;
      const cgst = parseFloat(row.querySelector('.cgst')?.value) || 0;
      const sgst = parseFloat(row.querySelector('.sgst')?.value) || 0;
      const igst = parseFloat(row.querySelector('.igst')?.value) || 0;

      const baseTotal = rate * kms;
      const cgstAmount = (baseTotal * cgst) / 100;
      const sgstAmount = (baseTotal * sgst) / 100;
      const igstAmount = (baseTotal * igst) / 100;
      const total = baseTotal + cgstAmount + sgstAmount + igstAmount;

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




//  add function for  Search invoice 
function searchInvoiceRows() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.getElementById("invoice-rows");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const inputs = rows[i].getElementsByTagName("input");
    let rowText = "";

    for (let j = 0; j < inputs.length; j++) {
      rowText += inputs[j].value.toLowerCase() + " ";
    }

    if (rowText.includes(filter)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}