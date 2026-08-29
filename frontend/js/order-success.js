```javascript
// =========================================================
// RVA CORPORATION
// ORDER SUCCESS / RECEIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("RVA Order Success initialized.");

    loadLatestOrder();

});


// =========================================================
// LOAD LATEST ORDER
// =========================================================

function loadLatestOrder() {

    const savedOrder =
        localStorage.getItem("latestOrder");


    console.log(
        "Latest order from localStorage:",
        savedOrder
    );


    if (!savedOrder) {

        console.error(
            "No latestOrder found in localStorage."
        );

        return;

    }


    let order;


    try {

        order =
            JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "Could not parse latestOrder:",
            error
        );

        return;

    }


    console.log(
        "Parsed RVA order:",
        order
    );


    // =====================================================
    // ORDER NUMBER
    // =====================================================

    setText(
        "orderNumber",
        order.orderNumber || "-"
    );


    // =====================================================
    // CUSTOMER INFORMATION
    // =====================================================

    const customer =
        order.customer || {};


    setText(
        "customerName",
        customer.fullName || "-"
    );


    setText(
        "customerPhone",
        customer.phone || "-"
    );


    setText(
        "customerEmail",
        customer.email || "-"
    );


    setText(
        "customerAddress",
        customer.address || "-"
    );


    // =====================================================
    // ORDER INFORMATION
    // =====================================================

    setText(
        "orderType",
        order.orderType || "-"
    );


    setText(
        "paymentMethod",
        order.paymentMethod || "-"
    );


    // =====================================================
    // ORDER STATUS
    // =====================================================

    const status =
        order.status || "Pending";


    const statusElement =
        document.getElementById(
            "orderStatus"
        );


    if (statusElement) {

        statusElement.textContent =
            status;


        statusElement.className =
            "badge " +
            getStatusClass(status);

    }


    // =====================================================
    // ORDER ITEMS
    // =====================================================

    displayOrderItems(
        order.items || []
    );


    // =====================================================
    // TOTALS
    // =====================================================

    setText(
        "totalItems",
        order.itemCount || 0
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
    // ORDER NOTES
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
// DISPLAY PRODUCTS
// =========================================================

function displayOrderItems(items) {

    const container =
        document.getElementById(
            "orderItems"
        );


    if (!container) {

        console.error(
            "orderItems element not found."
        );

        return;

    }


    container.innerHTML = "";


    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {

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
            item.brand || "-";


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

    } else {

        console.error(
            "Element not found:",
            elementId
        );

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
