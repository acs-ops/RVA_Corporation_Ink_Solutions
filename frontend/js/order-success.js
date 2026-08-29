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

        console.warn("No latest order found.");

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


    console.log(
        "RVA latest order:",
        order
    );


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
        "orderNumber",
        order.orderNumber || "-"
    );


    // -----------------------------------------------------
    // CUSTOMER INFORMATION
    // -----------------------------------------------------

    const customer =
        order.customer || {};


    setText(
        "customerName",
        customer.fullName || "-"
    );


    setText(
        "customerEmail",
        customer.email || "-"
    );


    setText(
        "customerPhone",
        customer.phone || "-"
    );


    setText(
        "customerAddress",
        customer.address || "-"
    );


    // -----------------------------------------------------
    // ORDER INFORMATION
    // -----------------------------------------------------

    setText(
        "orderType",
        order.orderType || "-"
    );


    setText(
        "paymentMethod",
        order.paymentMethod || "-"
    );


    // -----------------------------------------------------
    // ORDER STATUS
    // -----------------------------------------------------

    const statusElement =
        document.getElementById(
            "orderStatus"
        );


    if (statusElement) {

        const status =
            order.status || "Pending";


        statusElement.textContent =
            status;


        // Reset classes

        statusElement.className =
            "badge";


        // Status colors

        if (status === "Pending") {

            statusElement.classList.add(
                "bg-warning",
                "text-dark"
            );

        }

        else if (status === "Confirmed") {

            statusElement.classList.add(
                "bg-primary"
            );

        }

        else if (status === "Processing") {

            statusElement.classList.add(
                "bg-info",
                "text-dark"
            );

        }

        else if (status === "Completed") {

            statusElement.classList.add(
                "bg-success"
            );

        }

        else if (status === "Cancelled") {

            statusElement.classList.add(
                "bg-danger"
            );

        }

        else {

            statusElement.classList.add(
                "bg-secondary"
            );

        }

    }


    // -----------------------------------------------------
    // ORDER ITEMS
    // -----------------------------------------------------

    displayOrderItems(
        order.items || []
    );


    // -----------------------------------------------------
    // ORDER SUMMARY
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // ORDER NOTES
    // -----------------------------------------------------

    const notesContainer =
        document.getElementById(
            "orderNotesContainer"
        );


    const notesElement =
        document.getElementById(
            "orderNotes"
        );


    if (
        notesContainer &&
        notesElement
    ) {

        if (order.orderNotes) {

            notesElement.textContent =
                order.orderNotes;


            notesContainer.style.display =
                "block";

        }

        else {

            notesContainer.style.display =
                "none";

        }

    }


    // -----------------------------------------------------
    // ORDER DATE
    // -----------------------------------------------------

    // Your current HTML does not have a date field,
    // so we don't need to display it here.


    console.log(
        "RVA order confirmation displayed."
    );

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
                    class="text-center text-muted py-4"
                >

                    No product details available.

                </td>

            </tr>

        `;

        return;

    }


    items.forEach(function (item) {

        const productName =
            item.name || "Product";


        const brand =
            item.brand || "-";


        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const itemSubtotal =
            price * quantity;


        const row =
            document.createElement("tr");


        // -------------------------------------------------
        // PRODUCT
        // -------------------------------------------------

        const productCell =
            document.createElement("td");


        const productStrong =
            document.createElement("strong");


        productStrong.textContent =
            productName;


        productCell.appendChild(
            productStrong
        );


        // -------------------------------------------------
        // BRAND
        // -------------------------------------------------

        const brandCell =
            document.createElement("td");


        brandCell.textContent =
            brand;


        // -------------------------------------------------
        // QUANTITY
        // -------------------------------------------------

        const quantityCell =
            document.createElement("td");


        quantityCell.className =
            "text-center";


        quantityCell.textContent =
            quantity;


        // -------------------------------------------------
        // PRICE
        // -------------------------------------------------

        const priceCell =
            document.createElement("td");


        priceCell.textContent =
            formatCurrency(price);


        // -------------------------------------------------
        // SUBTOTAL
        // -------------------------------------------------

        const subtotalCell =
            document.createElement("td");


        const subtotalStrong =
            document.createElement("strong");


        subtotalStrong.textContent =
            formatCurrency(itemSubtotal);


        subtotalCell.appendChild(
            subtotalStrong
        );


        // -------------------------------------------------
        // ADD CELLS
        // -------------------------------------------------

        row.appendChild(
            productCell
        );


        row.appendChild(
            brandCell
        );


        row.appendChild(
            quantityCell
        );


        row.appendChild(
            priceCell
        );


        row.appendChild(
            subtotalCell
        );


        container.appendChild(
            row
        );

    });

}


// =========================================================
// NO ORDER
// =========================================================

function showNoOrder() {

    const orderConfirmation =
        document.getElementById(
            "orderConfirmation"
        );


    if (orderConfirmation) {

        orderConfirmation.innerHTML = `

            <div class="card-body p-5 text-center">

                <div
                    class="text-warning"
                    style="font-size:4rem;"
                >

                    <i class="bi bi-receipt"></i>

                </div>


                <h2 class="mt-3">

                    No Order Found

                </h2>


                <p class="text-muted">

                    We could not find a recent order
                    to display.

                </p>


                <a
                    href="products.html"
                    class="btn btn-primary mt-3"
                >

                    <i class="bi bi-shop"></i>

                    Continue Shopping

                </a>

            </div>

        `;

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
// GLOBAL
// =========================================================

window.loadOrderConfirmation =
    loadOrderConfirmation;
```
