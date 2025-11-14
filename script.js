
  function addItem(name, price) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // Prevent duplicate entry
      if (!cart.find(item => item.name === name)) {
        cart.push({ name, price });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function goNext(page) {
      window.location.href = page;
    }

    function submitOrder() {
      window.location.href = "payment.html"; // Go to summary page
    }
