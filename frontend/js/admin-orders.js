```javascript
// =========================================================
// RVA CORPORATION - ADMIN ORDERS
// =========================================================
// Displays customer orders from Supabase
// =========================================================


// =========================================================
// VARIABLES
// =========================================================

let allOrders = [];


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    loadOrders();

    setupSearch();

    setupStatusFilter();

    setupRefreshButton();

});


// =========================================================
// LOAD ORDERS
// =========================================================

async function loadOrders() {

    const tableBody =
        document.getElementById("ordersTableBody");

    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = `
        <tr>
            <td colspan="9" class="text-center py-5">

                <div
                    class="spinner-border text-primary"
                    role="status"
                ></div>

                <div class="mt-2">
                    Loading orders...
                </div>

            </td>
        </tr>
    `;


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("orders")
            .select("*")
            .order("created_at", {
                ascending: false
            });


        if (error) {

            console.error(
                "Error loading orders:",
                error
            );

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="9"
                        class="text-center text-danger py-5"
                    >

                        <i class="bi bi-exclamation-triangle fs-2"></i>

                        <div class="mt-2">
                            Unable to load orders.
                        </div>

                        <small>
                            ${escapeHTML(error.message)}
                        </small>

                    </td>
                </tr>
            `;

            return;
        }


        allOrders =
            Array.isArray(data)
                ? data
                : [];


        updateStatistics();

        displayOrders(allOrders);

    } catch (error) {

        console.error(
            "Unexpected error loading orders:",
            error
        );

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="9"
                    class="text-center text-danger py-5"
                >

                    An unexpected error occurred.

                </td>
            </tr>
        `;

    }

}


// =========================================================
// DISPLAY ORDERS
// =========================================================

function displayOrders(orders) {

    const tableBody =
        document.getElementById(
            "ordersTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    if (!orders.length) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="9"
                    class="text-center text-muted py-5"
                >

                    <i class="bi bi-inbox fs-1"></i>

                    <div class="mt-2">
                        No orders found.
                    </div>

                </td>
            </tr>
        `;

        return;
    }


    orders.forEach(function (order) {

        const row =
            document.createElement("tr");


        const orderNumber =
            order.order_number || "-";


        const customerName =
            order.full_name || "-";


        const orderType =
            order.order_type || "-";


        const payment =
            order.payment_method || "-";


        const itemCount =
            Number(order.total_items) || 0;


        const total =
            Number(order.total) || 0;


        const status =
            order.status || "Pending";


        const date =
            formatDate(order.created_at);


        row.innerHTML = `

            <td>

                <strong>
                    ${escapeHTML(orderNumber)}
                </strong>

            </td>


            <td>

                <strong>
                    ${escapeHTML(customerName)}
                </strong>

                <br>

                <small class="text-muted">

                    ${escapeHTML(order.email || "")}

                </small>

            </td>


            <td>

                ${escapeHTML(orderType)}

            </td>


            <td>

                ${escapeHTML(payment)}

            </td>


            <td>

                ${itemCount}

            </td>


            <td>

                <strong>

                    ${formatCurrency(total)}

                </strong>

            </td>


            <td>

                ${createStatusBadge(status)}

            </td>


            <td>

                <small>
                    ${date}
                </small>

            </td>


            <td>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    onclick="viewOrder(${order.id})"
                >

                    <i class="bi bi-eye"></i>

                    View

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// =========================================================
// VIEW ORDER
// =========================================================

function viewOrder(orderId) {

    const order =
        allOrders.find(function (item) {

            return item.id === orderId;

        });


    if (!order) {

        alert(
            "Order could not be found."
        );

        return;

    }


    const details =
        document.getElementById(
            "orderDetails"
        );


    if (!details) {
        return;
    }


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    let itemsHTML = "";


    if (items.length) {

        itemsHTML = items.map(function (item) {

            const name =
                item.name || "Product";


            const quantity =
                Number(item.quantity) || 1;


            const price =
                Number(item.price) || 0;


            const subtotal =
                price * quantity;


            return `

                <div
                    class="d-flex justify-content-between border-bottom py-2"
                >

                    <div>

                        <strong>
                            ${escapeHTML(name)}
                        </strong>

                        <br>

                        <small class="text-muted">

                            ${formatCurrency(price)}
                            ×
                            ${quantity}

                        </small>

                    </div>


                    <strong>

                        ${formatCurrency(subtotal)}

                    </strong>

                </div>

            `;

        }).join("");

    } else {

        itemsHTML = `
            <p class="text-muted">
                No product details available.
            </p>
        `;

    }


    details.innerHTML = `

        <div class="row g-4">


            <div class="col-md-6">

                <h6>
                    Customer Information
                </h6>

                <hr>

                <p>
                    <strong>Name:</strong><br>
                    ${escapeHTML(order.full_name || "-")}
                </p>

                <p>
                    <strong>Email:</strong><br>
                    ${escapeHTML(order.email || "-")}
                </p>

                <p>
                    <strong>Phone:</strong><br>
                    ${escapeHTML(order.phone || "-")}
                </p>

                <p>
                    <strong>Address:</strong><br>
                    ${escapeHTML(order.address || "-")}
                </p>

            </div>


            <div class="col-md-6">

                <h6>
                    Order Information
                </h6>

                <hr>

                <p>
                    <strong>Order Number:</strong><br>
                    ${escapeHTML(order.order_number || "-")}
                </p>

                <p>
                    <strong>Order Type:</strong><br>
                    ${escapeHTML(order.order_type || "-")}
                </p>

                <p>
                    <strong>Payment:</strong><br>
                    ${escapeHTML(order.payment_method || "-")}
                </p>

                <p>
                    <strong>Status:</strong><br>
                    ${createStatusBadge(order.status || "Pending")}
                </p>

            </div>


            <div class="col-12">

                <h6>
                    Products
                </h6>

                <hr>

                ${itemsHTML}

            </div>


            <div class="col-12">

                <hr>

                <div class="d-flex justify-content-between">

                    <strong>
                        Subtotal
                    </strong>

                    <strong>
                        ${formatCurrency(order.subtotal)}
                    </strong>

                </div>


                <div class="d-flex justify-content-between">

                    <strong>
                        Delivery
                    </strong>

                    <strong>
                        ${formatCurrency(order.delivery_fee)}
                    </strong>

                </div>


                <div class="d-flex justify-content-between mt-2">

                    <strong class="fs-5">
                        Total
                    </strong>

                    <strong class="text-primary fs-4">

                        ${formatCurrency(order.total)}

                    </strong>

                </div>

            </div>


            <div class="col-12">

                <h6>
                    Order Notes
                </h6>

                <p class="text-muted">

                    ${escapeHTML(order.order_notes || "No notes.")}

                </p>

            </div>

        </div>

    `;


    const modalElement =
        document.getElementById(
            "orderDetailsModal"
        );


    if (modalElement) {

        const modal =
            new bootstrap.Modal(
                modalElement
            );

        modal.show();

    }

}


// =========================================================
// STATISTICS
// =========================================================

function updateStatistics() {

    const total =
        allOrders.length;


    const pending =
        allOrders.filter(function (order) {

            return order.status === "Pending";

        }).length;


    const confirmed =
        allOrders.filter(function (order) {

            return order.status === "Confirmed";

        }).length;


    const completed =
        allOrders.filter(function (order) {

            return order.status === "Completed";

        }).length;


    setText(
        "totalOrders",
        total
    );


    setText(
        "pendingOrders",
        pending
    );


    setText(
        "confirmedOrders",
        confirmed
    );


    setText(
        "completedOrders",
        completed
    );

}


// =========================================================
// SEARCH
// =========================================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchOrders"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


// =========================================================
// STATUS FILTER
// =========================================================

function setupStatusFilter() {

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    if (!statusFilter) {
        return;
    }


    statusFilter.addEventListener(
        "change",
        applyFilters
    );

}


// =========================================================
// APPLY FILTERS
// =========================================================

function applyFilters() {

    const searchInput =
        document.getElementById(
            "searchOrders"
        );


    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const status =
        statusFilter
            ? statusFilter.value
            : "all";


    const filtered =
        allOrders.filter(function (order) {

            const matchesSearch =
                !search ||

                String(
                    order.order_number || ""
                )
                .toLowerCase()
                .includes(search)

                ||

                String(
                    order.full_name || ""
                )
                .toLowerCase()
                .includes(search)

                ||

                String(
                    order.email || ""
                )
                .toLowerCase()
                .includes(search)

                ||

                String(
                    order.phone || ""
                )
                .toLowerCase()
                .includes(search);


            const matchesStatus =
                status === "all" ||
                order.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    displayOrders(filtered);

}


// =========================================================
// REFRESH
// =========================================================

function setupRefreshButton() {

    const button =
        document.getElementById(
            "refreshOrdersButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            loadOrders();

        }
    );

}


// =========================================================
// STATUS BADGE
// =========================================================

function createStatusBadge(status) {

    let badgeClass =
        "bg-secondary";


    if (status === "Pending") {

        badgeClass =
            "bg-warning text-dark";

    }


    if (status === "Confirmed") {

        badgeClass =
            "bg-info text-dark";

    }


    if (status === "Processing") {

        badgeClass =
            "bg-primary";

    }


    if (status === "Completed") {

        badgeClass =
            "bg-success";

    }


    if (status === "Cancelled") {

        badgeClass =
            "bg-danger";

    }


    return `

        <span class="badge ${badgeClass}">

            ${escapeHTML(status)}

        </span>

    `;

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


    if (Number.isNaN(date.getTime())) {
        return "-";
    }


    return date.toLocaleString(
        "en-PH",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );

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


// =========================================================
// GLOBAL
// =========================================================

window.viewOrder =
    viewOrder;
```
