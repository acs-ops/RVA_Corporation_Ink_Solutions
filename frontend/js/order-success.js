```javascript
// =========================================================
// RVA CORPORATION - ORDER SUCCESS
// =========================================================
// Displays the latest successfully placed order
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("RVA Order Success initialized.");

    loadOrderConfirmation();

});


// =========================================================
// LOAD ORDER
// =========================================================

function loadOrderConfirmation() {

    const savedOrder =
        localStorage.getItem("latestOrder");

    if (!savedOrder) {

        console.error(
            "No latestOrder found in localStorage."
        );

        showNoOrderMessage();

        return;
    }


    let order;

    try {

        order =
            JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "Could not read latestOrder:",
            error
        );

        showNoOrderMessage();

        return;
    }


    if (!order) {

        showNoOrderMessage();

        return;
    }


    console.log(
        "RVA latest order:",
        order
    );


    // =====================================================
    // CUSTOMER INFORMATION
    // =====================================================

    setText(
        "orderNumber",
        order.orderNumber || "-"
    );


    setText(
        "customerName",
        order.customer?.fullName || "-"
    );


    setText(
        "customerPhone",
        order.customer?.phone || "-"
    );


    setText(
        "customerEmail",
        order.customer?.email || "-"
    );


    setText(
        "orderType",
        order.orderType || "-"
    );


    setText(
        "customerAddress",
        order.customer?.address || "-"
    );


    setText(
        "paymentMethod",
        order.paymentMethod || "-"
    );


    // =====================================================
    // STATUS
    // =====================================================

    const statusElement =
        document.getElementById("orderStatus");


    if (statusElement) {

        const status =
            order.status || "Pending";

        statusElement.textContent =
            status;

        statusElement.className =
            "badge " + getStatusClass(status);

    }


    // =====================================================
    // PRODUCTS
    // =====================================================

    displayOrderItems(
        order.items
    );


    // =====================================================
    // TOTALS
    // =====================================================

    setText(
        "totalItems",
        Number(order.itemCount) || 0
    );


    setText(
        "subtotal",
        formatCurrency(order.subtotal)
    );


    setText(
        "deliveryFee",
        formatCurrency(order.deliveryFee)
    );


    setText(
        "total",
        formatCurrency(order.total)
    );


    // =====================================================
    // NOTES
    // =====================================================

    const notesContainer =
        document.getElementById(
            "orderNotesContainer"
        );


    const notesElement =
        document.getElementById(
            "orderNotes"
        );


    if (
        order.orderNotes &&
        notesContainer &&
        notesElement
    ) {

        notesElement.textContent =
            order.orderNotes;

        notesContainer.style.display =
            "block";

    }

}


// =========================================================
// DISPLAY ORDER ITEMS
// =========================================================

function displayOrderItems(items) {

    const container =
        document.getElementById(
            "orderItems"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (typeof items === "string") {

        try {

            items =
                JSON.parse(items);

        } catch (error) {

            items = [];

        }

    }


    if (!Array.isArray(items)) {

        items = [];

    }


    if (items.length === 0) {

        container.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted"
                >

                    No product details available.

                </td>

            </tr>

        `;

        return;
    }


    items.forEach(function (item) {

        const name =
            item.name || "Product";

        const brand =
            item.brand || "";

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const subtotal =
            price * quantity;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(name)}
            </td>

            <td>
                ${escapeHTML(brand)}
            </td>

            <td class="text-center">
                ${quantity}
            </td>

            <td>
                ${formatCurrency(price)}
            </td>

            <td>
                ${formatCurrency(subtotal)}
            </td>

        `;


        container.appendChild(row);

    });

}


// =========================================================
// NO ORDER MESSAGE
// =========================================================

function showNoOrderMessage() {

    const container =
        document.getElementById(
            "orderConfirmation"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="card-body p-5 text-center">

            <i
                class="bi bi-receipt text-muted"
                style="font-size:4rem;"
            ></i>

            <h2 class="mt-3">
                No Order Found
            </h2>

            <p class="text-muted">
                There is no recent order available to display.
            </p>

            <a
                href="products.html"
                class="btn btn-primary"
            >

                <i class="bi bi-shop"></i>

                Continue Shopping

            </a>

        </div>

    `;

}


// =========================================================
// STATUS CLASS
// =========================================================

function getStatusClass(status) {

    switch (status) {

        case "Confirmed":
            return "bg-primary";

        case "Processing":
            return "bg-info text-dark";

        case "Completed":
            return "bg-success";

        case "Cancelled":
            return "bg-danger";

        case "Pending":
        default:
            return "bg-warning text-dark";

    }

}


// =========================================================
// SET TEXT
// =========================================================

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


// =========================================================
// FORMAT CURRENCY
// =========================================================

function formatCurrency(amount) {

    return (

        "₱" +

        Number(
            amount || 0
        ).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )

    );

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}
```
