```javascript
// =========================================================
// RVA CORPORATION - ORDER SUCCESS
// =========================================================
// Displays the customer's completed order confirmation
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("RVA Order Success initialized.");

    loadOrderConfirmation();

});


// =========================================================
// LOAD LATEST ORDER
// =========================================================

function loadOrderConfirmation() {

    const savedOrder =
        localStorage.getItem("latestOrder");

    if (!savedOrder) {

        showNoOrder();

        return;

    }


    let order;

    try {

        order =
            JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "Unable to read latest order:",
            error
        );

        showNoOrder();

        return;

    }


    displayOrder(order);

}


// =========================================================
// DISPLAY ORDER
// =========================================================

function displayOrder(order) {

    // -----------------------------------------------------
    // ORDER NUMBER
    // -----------------------------------------------------

    setText(
        "successOrderNumber",
        order.orderNumber || "-"
    );


    // -----------------------------------------------------
    // CUSTOMER
    // -----------------------------------------------------

    if (order.customer) {

        setText(
            "successCustomerName",
            order.customer.fullName || "-"
        );

        setText(
            "successCustomerEmail",
            order.customer.email || "-"
        );

        setText(
            "successCustomerPhone",
            order.customer.phone || "-"
        );

        setText(
            "successCustomerAddress",
            order.customer.address || "-"
        );

    }


    // -----------------------------------------------------
    // ORDER INFORMATION
    // -----------------------------------------------------

    setText(
        "successOrderType",
        order.orderType || "-"
    );


    setText(
        "successPaymentMethod",
        order.paymentMethod || "-"
    );


    setText(
        "successStatus",
        order.status || "Pending"
    );


    // -----------------------------------------------------
    // DATE
    // -----------------------------------------------------

    if (order.orderDate) {

        setText(
            "successOrderDate",
            formatDate(order.orderDate)
        );

    }


    // -----------------------------------------------------
    // PRODUCTS
    // -----------------------------------------------------

    displayOrderItems(
        order.items || []
    );


    // -----------------------------------------------------
    // SUMMARY
    // -----------------------------------------------------

    setText(
        "successItemCount",
        Number(order.itemCount) || 0
    );


    setText(
        "successSubtotal",
        formatCurrency(order.subtotal)
    );


    setText(
        "successDeliveryFee",
        formatCurrency(order.deliveryFee)
    );


    setText(
        "successTotal",
        formatCurrency(order.total)
    );


    // -----------------------------------------------------
    // NOTES
    // -----------------------------------------------------

    const notesContainer =
        document.getElementById(
            "successOrderNotesContainer"
        );


    const notesElement =
        document.getElementById(
            "successOrderNotes"
        );


    if (
        notesContainer &&
        notesElement &&
        order.orderNotes
    ) {

        notesElement.textContent =
            order.orderNotes;

        notesContainer.style.display =
            "block";

    }


    // -----------------------------------------------------
    // SHOW ORDER
    // -----------------------------------------------------

    const orderContainer =
        document.getElementById(
            "orderConfirmation"
        );


    if (orderContainer) {

        orderContainer.style.display =
            "block";

    }

}


// =========================================================
// DISPLAY ORDER ITEMS
// =========================================================

function displayOrderItems(items) {

    const container =
        document.getElementById(
            "successOrderItems"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (!Array.isArray(items) || items.length === 0) {

        container.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted py-4"
                >

                    No product details available.

                </td>

            </tr>

        `;

        return;

    }


    items.forEach(function (item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const subtotal =
            price * quantity;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <strong>
                    ${escapeHTML(
                        item.name || "Product"
                    )}
                </strong>

            </td>


            <td>

                ${escapeHTML(
                    item.brand || "-"
                )}

            </td>


            <td class="text-center">

                ${quantity}

            </td>


            <td>

                ${formatCurrency(price)}

            </td>


            <td>

                <strong>
                    ${formatCurrency(subtotal)}
                </strong>

            </td>

        `;


        container.appendChild(row);

    });

}


// =========================================================
// NO ORDER
// =========================================================

function showNoOrder() {

    const orderContainer =
        document.getElementById(
            "orderConfirmation"
        );


    const noOrderContainer =
        document.getElementById(
            "noOrderMessage"
        );


    if (orderContainer) {

        orderContainer.style.display =
            "none";

    }


    if (noOrderContainer) {

        noOrderContainer.style.display =
            "block";

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
// FORMAT DATE
// =========================================================

function formatDate(dateValue) {

    if (!dateValue) {

        return "-";

    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {

        return "-";

    }


    return date.toLocaleString(
        "en-PH",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
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
