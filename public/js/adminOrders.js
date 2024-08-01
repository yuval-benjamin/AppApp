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

      const orderId = event.target.getAttribute("data-order-id");
      console.log(orderId)
      try {
        const response = await fetch(`/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }});

        if (response.ok) {
          window.location.href = "/adminPage/orders";
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
