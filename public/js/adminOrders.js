document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".delete-order-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const orderId = event.target.getAttribute("data-order-id");

      if (confirm("Are you sure you want to delete this order?")) {
        try {
          const response = await fetch(`/orders/${orderId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            window.location.href = "/adminPage/orders";
          } else {
            console.error("Failed to delete order");
            alert("Failed to delete order");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while deleting the order");
        }
      }
    });
  });

  const updateForm = document.getElementById("update-order-form");
  if (updateForm) {
    updateForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      const orderId = document.getElementById("order-id").value; // Get the workout ID from the hidden input field

      try {
        const response = await fetch(`/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          window.location.href = "/adminPage/adminOrders";
        } else {
          console.error("Failed to update order");
          alert("Failed to update order");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the order");
      }
    });
  }
});
