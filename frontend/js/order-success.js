document.addEventListener("DOMContentLoaded", function () {

    console.log("ORDER SUCCESS PAGE LOADED");

    var savedOrder = localStorage.getItem("latestOrder");

    console.log("LATEST ORDER:", savedOrder);

    if (!savedOrder) {
        console.error("No latestOrder found.");
        return;
    }

    var order;

    try {
        order = JSON.parse(savedOrder);
    } catch (error) {
        console.error("Could not parse latestOrder:", error);
        return;
    }

    console.log("ORDER DATA:", order);


    // ORDER NUMBER
    document.getElementById("orderNumber").textContent =
        order.orderNumber || "-";


    // CUSTOMER INFORMATION
    if (order.customer) {

        document.getElementById("customerName").textContent =
            order.customer.fullName || "-";

        document.getElementById("customerPhone").textContent =
            order.customer.phone || "-";

        document.getElementById("customerEmail").textContent =
            order.customer.email || "-";

        document.getElementById("customerAddress").textContent =
            order.customer.address || "-";
    }


    // ORDER INFORMATION
    document.getElementById("orderType").textContent =
        order.orderType || "-";

    document.getElementById("paymentMethod").textContent =
        order.paymentMethod || "-";


    // STATUS
    var statusElement =
        document.getElementById("orderStatus");

    if (statusElement) {
        statusElement.textContent =
            order.status || "Pending";
    }


    // PRODUCTS
    var itemsContainer =
        document.getElementById("orderItems");

    if (itemsContainer) {

        itemsContainer.innerHTML = "";

        if (Array.isArray(order.items)) {

            order.items.forEach(function (item) {

                var quantity =
                    Number(item.quantity) || 1;

                var price =
                    Number(item.price) || 0;

                var itemSubtotal =
                    quantity * price;

                var row =
                    document.createElement("tr");

                var productCell =
                    document.createElement("td");

                productCell.textContent =
                    item.name || "Product";

                var brandCell =
                    document.createElement("td");

                brandCell.textContent =
                    item.brand || "-";

                var quantityCell =
                    document.createElement("td");

                quantityCell.className =
                    "text-center";

                quantityCell.textContent =
                    quantity;

                var priceCell =
                    document.createElement("td");

                priceCell.textContent =
                    formatMoney(price);

                var subtotalCell =
                    document.createElement("td");

                subtotalCell.textContent =
                    formatMoney(itemSubtotal);

                row.appendChild(productCell);
                row.appendChild(brandCell);
                row.appendChild(quantityCell);
                row.appendChild(priceCell);
                row.appendChild(subtotalCell);

                itemsContainer.appendChild(row);

            });

        }
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


    // ORDER NOTES
    if (order.orderNotes) {

        var notesContainer =
            document.getElementById("orderNotesContainer");

        var notesElement =
            document.getElementById("orderNotes");

        if (notesContainer && notesElement) {

            notesElement.textContent =
                order.orderNotes;

            notesContainer.style.display =
                "block";
        }
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