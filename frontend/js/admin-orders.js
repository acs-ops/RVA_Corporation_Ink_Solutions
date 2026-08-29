// =========================================================
// RVA CORPORATION - ADMIN ORDERS
// =========================================================
// Displays customer orders from Supabase
// =========================================================


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("RVA Admin Orders initialized.");

    loadOrders();

    setupAdminControls();

});


// =========================================================
// GLOBAL ORDERS
// =========================================================

let allOrders = [];


// =========================================================
// LOAD ORDERS FROM SUPABASE
// =========================================================

async function loadOrders() {

    const tableBody =
        document.getElementById("ordersTableBody");


    if (!tableBody) {
        console.error("ordersTableBody not found.");
        return;
    }


    tableBody.innerHTML = `
        <tr>
            <td colspan="9" class="text-center py-5">
                <div
                    class="spinner-border text-primary"
                    role="status">
                </div>

                <div class="mt-2">
                    Loading orders...
                </div>
            </td>
        </tr>
    `;


    try {

        console.log("Loading RVA orders from Supabase...");


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
                "Failed to load orders:",
                error
            );


            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-5">

                        <i
                            class="bi bi-exclamation-triangle text-danger"
                            style="font-size:2rem;">
                        </i>

                        <div class="mt-3 text-danger">
                            Failed to load orders.
                        </div>

                        <div class="small text-muted mt-2">
                            ${escapeHTML(error.message)}
                        </div>

                    </td>
                </tr>
            `;

            return;
        }


        allOrders = data || [];


        console.log(
            "RVA orders loaded:",
            allOrders
        );


        updateStatistics();

        displayOrders(allOrders);

    } catch (error) {

        console.error(
            "Admin orders error:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-5">

                    <i
                        class="bi bi-wifi-off text-danger"
                        style="font-size:2rem;">
                    </i>

                    <div class="mt-3">
                        Unable to connect to order database.
                    </div>

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


    // =====================================================
    // NO ORDERS
    // =====================================================

    if (!orders || orders.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="9"
                    class="text-center py-5 text-muted">

                    <i
                        class="bi bi-inbox"
                        style="font-size:3rem;">
                    </i>

                    <div class="mt-3">
                        No orders found.
                    </div>

                </td>
            </tr>
        `;

        return;
    }


    // =====================================================
    // CREATE ROWS
    // =====================================================

    orders.forEach(function (order) {

        const row =
            document.createElement("tr");


        // ORDER NUMBER

        const orderNumber =
            order.order_number || "-";


        // CUSTOMER

        const customer =
            order.full_name || "-";


        const email =
            order.email || "";


        const phone =
            order.phone || "";


        // ORDER TYPE

        const orderType =
            order.order_type || "-";


        // PAYMENT

        const payment =
            order.payment_method || "-";


        // ITEMS

        const itemCount =
            Number(order.total_items) || 0;


        // TOTAL

        const total =
            formatCurrency(order.total);


        // STATUS

        const status =
            order.status || "Pending";


        // DATE

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
                    ${escapeHTML(customer)}
                </strong>

                <br>

                <small class="text-muted">
                    ${escapeHTML(email)}
                </small>

                <br>

                <small class="text-muted">
                    ${escapeHTML(phone)}
                </small>

            </td>


            <td>

                <span class="badge bg-light text-dark">

                    ${escapeHTML(orderType)}

                </span>

            </td>


            <td>

                ${escapeHTML(payment)}

            </td>


            <td class="text-center">

                ${itemCount}

            </td>


            <td>

                <strong>
                    ${total}
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
                    class="btn btn-sm btn-primary"
                    onclick="viewOrderDetails(${order.id})">

                    <i class="bi bi-eye"></i>

                    View

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

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
            "bg-primary";

    }


    if (status === "Processing") {

        badgeClass =
            "bg-info text-dark";

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
// VIEW ORDER DETAILS
// =========================================================

// =========================================================
// VIEW ORDER DETAILS
// =========================================================

function viewOrderDetails(orderId) {

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


    const container =
        document.getElementById(
            "orderDetails"
        );


    if (!container) {
        return;
    }


    let itemsHTML = "";


    // =====================================================
    // ORDER ITEMS
    // =====================================================

    let items = order.items;


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


    items.forEach(function (item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const subtotal =
            price * quantity;


        itemsHTML += `

            <tr>

                <td>
                    ${escapeHTML(
                        item.name || "Product"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        item.brand || ""
                    )}
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

            </tr>

        `;

    });


    // =====================================================
    // CURRENT STATUS
    // =====================================================

    const currentStatus =
        order.status || "Pending";


    // =====================================================
    // ORDER DETAILS HTML
    // =====================================================

    container.innerHTML = `

        <div class="row g-3 mb-4">

            <div class="col-md-6">

                <strong>
                    Order Number
                </strong>

                <div>
                    ${escapeHTML(
                        order.order_number || "-"
                    )}
                </div>

            </div>


            <div class="col-md-6">

                <strong>
                    Order Date
                </strong>

                <div>
                    ${formatDate(order.created_at)}
                </div>

            </div>


            <div class="col-md-6">

                <strong>
                    Customer
                </strong>

                <div>
                    ${escapeHTML(
                        order.full_name || "-"
                    )}
                </div>

            </div>


            <div class="col-md-6">

                <strong>
                    Phone
                </strong>

                <div>
                    ${escapeHTML(
                        order.phone || "-"
                    )}
                </div>

            </div>


            <div class="col-md-6">

                <strong>
                    Email
                </strong>

                <div>
                    ${escapeHTML(
                        order.email || "-"
                    )}
                </div>

            </div>


            <div class="col-md-6">

                <strong>
                    Order Type
                </strong>

                <div>
                    ${escapeHTML(
                        order.order_type || "-"
                    )}
                </div>

            </div>


            <div class="col-12">

                <strong>
                    Address
                </strong>

                <div>
                    ${escapeHTML(
                        order.address || "-"
                    )}
                </div>

            </div>


            <div class="col-md-6">

                <strong>
                    Payment Method
                </strong>

                <div>
                    ${escapeHTML(
                        order.payment_method || "-"
                    )}
                </div>

            </div>


            <!-- =================================================
                 STATUS
                 ================================================= -->

            <div class="col-md-6">

                <label
                    for="orderStatusSelect"
                    class="form-label fw-bold"
                >

                    Order Status

                </label>


                <select
                    id="orderStatusSelect"
                    class="form-select"
                >

                    <option
                        value="Pending"
                        ${currentStatus === "Pending" ? "selected" : ""}
                    >
                        Pending
                    </option>

                    <option
                        value="Confirmed"
                        ${currentStatus === "Confirmed" ? "selected" : ""}
                    >
                        Confirmed
                    </option>

                    <option
                        value="Processing"
                        ${currentStatus === "Processing" ? "selected" : ""}
                    >
                        Processing
                    </option>

                    <option
                        value="Completed"
                        ${currentStatus === "Completed" ? "selected" : ""}
                    >
                        Completed
                    </option>

                    <option
                        value="Cancelled"
                        ${currentStatus === "Cancelled" ? "selected" : ""}
                    >
                        Cancelled
                    </option>

                </select>


                <button
                    type="button"
                    class="btn btn-primary btn-sm mt-2"
                    id="updateOrderStatusButton"
                >

                    <i class="bi bi-check-circle"></i>

                    Update Status

                </button>

            </div>

        </div>


        <hr>


        <h5 class="mb-3">

            <i class="bi bi-cart3"></i>

            Ordered Products

        </h5>


        <div class="table-responsive">

            <table class="table table-bordered">

                <thead class="table-light">

                    <tr>

                        <th>
                            Product
                        </th>

                        <th>
                            Brand
                        </th>

                        <th>
                            Qty
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Subtotal
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${itemsHTML || `

                        <tr>

                            <td
                                colspan="5"
                                class="text-center text-muted"
                            >

                                No product details available.

                            </td>

                        </tr>

                    `}

                </tbody>

            </table>

        </div>


        <hr>


        <div class="row justify-content-end">

            <div class="col-md-5">

                <div class="d-flex justify-content-between mb-2">

                    <span>
                        Items
                    </span>

                    <strong>
                        ${Number(order.total_items) || 0}
                    </strong>

                </div>


                <div class="d-flex justify-content-between mb-2">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ${formatCurrency(order.subtotal)}
                    </strong>

                </div>


                <div class="d-flex justify-content-between mb-2">

                    <span>
                        Delivery
                    </span>

                    <strong>
                        ${formatCurrency(order.delivery_fee)}
                    </strong>

                </div>


                <hr>


                <div class="d-flex justify-content-between">

                    <strong class="fs-5">
                        Total
                    </strong>

                    <strong class="fs-5 text-primary">

                        ${formatCurrency(order.total)}

                    </strong>

                </div>

            </div>

        </div>


        ${
            order.order_notes
                ? `
                    <div class="alert alert-light mt-4">

                        <strong>

                            <i class="bi bi-chat-left-text"></i>

                            Order Notes

                        </strong>

                        <div class="mt-2">

                            ${escapeHTML(
                                order.order_notes
                            )}

                        </div>

                    </div>
                `
                : ""
        }

    `;


    // =====================================================
    // STATUS UPDATE BUTTON
    // =====================================================

    const updateStatusButton =
        document.getElementById(
            "updateOrderStatusButton"
        );


    const statusSelect =
        document.getElementById(
            "orderStatusSelect"
        );


    if (updateStatusButton && statusSelect) {

        updateStatusButton.addEventListener(
            "click",
            function () {

                updateOrderStatus(
                    order.id,
                    statusSelect.value
                );

            }
        );

    }


    // =====================================================
    // OPEN MODAL
    // =====================================================

    const modalElement =
        document.getElementById(
            "orderDetailsModal"
        );


    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();

    }

}


// =========================================================
// UPDATE ORDER STATUS
// =========================================================

async function updateOrderStatus(
    orderId,
    newStatus
) {

    if (!orderId || !newStatus) {

        alert(
            "Invalid order status."
        );

        return;

    }


    const confirmed =
        confirm(
            "Change this order status to " +
            newStatus +
            "?"
        );


    if (!confirmed) {
        return;
    }


    const button =
        document.getElementById(
            "updateOrderStatusButton"
        );


    if (button) {

        button.disabled = true;

        button.innerHTML = `

            <span
                class="spinner-border spinner-border-sm"
                role="status"
            ></span>

            Updating...

        `;

    }


    try {

        console.log(
            "Updating order status:",
            orderId,
            newStatus
        );


        const {
            data,
            error
        } = await supabaseClient
            .from("orders")
            .update({
                status: newStatus
            })
            .eq("id", orderId)
            .select()
            .single();


        // =================================================
        // ERROR
        // =================================================

        if (error) {

            console.error(
                "Order status update failed:",
                error
            );


            alert(
                "Order status could not be updated.\n\n" +
                "Error: " +
                error.message
            );


            if (button) {

                button.disabled = false;

                button.innerHTML = `

                    <i class="bi bi-check-circle"></i>

                    Update Status

                `;

            }

            return;

        }


        console.log(
            "Order status updated:",
            data
        );


        // =================================================
        // UPDATE LOCAL ORDER
        // =================================================

        const order =
            allOrders.find(function (item) {

                return item.id === orderId;

            });


        if (order) {

            order.status =
                newStatus;

        }


        // =================================================
        // REFRESH STATISTICS
        // =================================================

        updateStatistics();


        // =================================================
        // REFRESH TABLE
        // =================================================

        filterOrders();


        // =================================================
        // SUCCESS
        // =================================================

        alert(
            "Order status updated successfully!\n\n" +
            "New Status: " +
            newStatus
        );


        // =================================================
        // CLOSE MODAL
        // =================================================

        const modalElement =
            document.getElementById(
                "orderDetailsModal"
            );


        if (modalElement) {

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );


            modal.hide();

        }


    } catch (error) {

        console.error(
            "Order status update error:",
            error
        );


        alert(
            "There was a problem updating the order status."
        );


        if (button) {

            button.disabled = false;

            button.innerHTML = `

                <i class="bi bi-check-circle"></i>

                Update Status

            `;

        }

    }

}


// =========================================================
// SEARCH + FILTER
// =========================================================

function filterOrders() {

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
                .toLowerCase()
                .trim()
            : "";


    const status =
        statusFilter
            ? statusFilter.value
            : "all";


    const filtered =
        allOrders.filter(function (order) {

            const searchableText = (

                (order.order_number || "") +
                " " +
                (order.full_name || "") +
                " " +
                (order.email || "") +
                " " +
                (order.phone || "")

            ).toLowerCase();


            const matchesSearch =
                !search ||
                searchableText.includes(search);


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
// ADMIN CONTROLS
// =========================================================

function setupAdminControls() {

    const refreshButton =
        document.getElementById(
            "refreshOrdersButton"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                loadOrders();

            }
        );

    }


    const searchInput =
        document.getElementById(
            "searchOrders"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterOrders();

            }
        );

    }


    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                filterOrders();

            }
        );

    }

}


// =========================================================
// HELPER - SET TEXT
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
            month: "short",
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


// =========================================================
// GLOBAL FUNCTION
// =========================================================

window.loadOrders =
    loadOrders;


window.viewOrderDetails =
    viewOrderDetails;


window.updateOrderStatus =
    updateOrderStatus;