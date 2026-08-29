```javascript
document.addEventListener("DOMContentLoaded", function () {

    console.log("ORDER SUCCESS PAGE LOADED");

    const saved = localStorage.getItem("latestOrder");

    console.log("LATEST ORDER:", saved);

    if (!saved) {
        console.error("No latestOrder found.");
        return;
    }

    let order;

    try {
        order = JSON.parse(saved);
    } catch (error) {
        console.error("Could not read latestOrder:", error);
        return;
    }

    console.log("ORDER DATA:", order);


    // ORDER NUMBER
    document.getElementById("orderNumber").textContent =
        order.orderNumber || "-";


    // CUSTOMER
    document.getElementById("customerName").textContent =
        order.customer?.fullName || "-";

    document.getElementById("customerPhone").textContent =
        order.customer?.phone || "-";

    document.getElementById("customerEmail").textContent =
        order.customer?.email || "-";

    document.getElementById("customerAddress").textContent =
        order.customer?.address || "-";


    // ORDER INFORMATION
    document.getElementById("orderType").textContent =
        order.orderType || "-";

    document.getElementById("paymentMethod").textContent =
        order.paymentMethod || "-";


    // STATUS
    const statusElement =
        document.getElementById("orderStatus");

    statusElement.textContent =
        order.status || "Pending";


    // PRODUCTS
    const itemsContainer =
        document.getElementById("orderItems");

    itemsContainer.innerHTML = "";


    if (Array.isArray(order.items)) {

        order.items.forEach(function (item) {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                Number(item.price) || 0;

            const itemSubtotal =
                quantity * price;


            const row =
                document.createElement("tr");


            row.innerHTML = `
                <td>${item.name || "Product"}</td>

                <td>${item.brand || "-"}</td>

                <td class="text-center">
                    ${quantity}
                </td>

                <td>
                    ₱${price.toLocaleString("en-PH", {
                        minimumFractionDigits: 2
                    })}
                </td>

                <td>
                    ₱${itemSubtotal.toLocaleString("en-PH", {
                        minimumFractionDigits: 2
                    })}
                </td>
            `;


            itemsContainer.appendChild(row);

        });

    }


    // TOTALS
    document.getElementById("totalItems").textContent =
        order.itemCount || 0;


    document.getElementById("subtotal").textContent =
        formatMoney(order.subtotal);


    document.getElementById("deliveryFee").textContent =
        formatMoney(order.deliveryFee);


    document.getElementById("total").textContent =
        formatMoney(order.total);


    // NOTES
    if (order.orderNotes) {

        document.getElementById(
            "orderNotesContainer"
        ).style.display = "block";


        document.getElementById(
            "orderNotes"
        ).textContent =
            order.orderNotes;

    }

});


function formatMoney(value) {

    return "₱" +
        Number(value || 0).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}
```
