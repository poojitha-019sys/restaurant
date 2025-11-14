const form = document.querySelector("form");
  const selectedCountEl = document.getElementById("selectedCount");
  const totalAmountEl = document.getElementById("totalAmount");
  const orderBtn = document.getElementById("orderBtn");

  function updateTotals() {
    let totalCount = 0;
    let totalPrice = 0;

    // Only target quantity inputs inside .menu-item divs
    form.querySelectorAll(".menu-item input[type='number']").forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty < 0) input.value = 0;

      if (qty > 0) {
        const itemDiv = input.closest(".menu-item");
        if (!itemDiv) return;

        const price = parseInt(itemDiv.getAttribute("data-price")) || 0;
        const name = itemDiv.querySelector("label") ? itemDiv.querySelector("label").textContent : "Unknown Item";

        totalCount += qty;
        totalPrice += qty * price;
      }
    });

    selectedCountEl.textContent = totalCount;
    totalAmountEl.textContent = totalPrice;
  }

  // Add input event listener safely (only menu-item inputs)
  form.querySelectorAll(".menu-item input[type='number']").forEach(input => {
    input.addEventListener("input", updateTotals);
  });

  orderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const tableNumber = document.getElementById("tableNumber").value.trim();
    if (!tableNumber) {
      alert("Please enter your table number.");
      return;
    }

    const items = [];
    let totalItems = 0;
    let totalAmount = 0;

    form.querySelectorAll(".menu-item input[type='number']").forEach(input => {
      const qty = parseInt(input.value) || 0;
      if (qty > 0) {
        const itemDiv = input.closest(".menu-item");
        const name = itemDiv.querySelector('h3').textContent;
        const price = parseInt(itemDiv.getAttribute("data-price")) || 0;
        const total = qty * price;
        totalItems += qty;
        totalAmount += total;
        items.push({ name, qty, total });
      }
    });

    if (items.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const orderDetails = { tableNumber, totalItems, totalAmount, items };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    alert("Order placed successfully!\nTable: " + tableNumber + "\nTotal: ₹" + totalAmount);
    window.location.href = "payment.html";
  });
