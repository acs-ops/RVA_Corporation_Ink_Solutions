
// =========================================================
// RVA CORPORATION - CHECKOUT.JS
// =========================================================
// IMPORTANT:
// Products, Cart, and Checkout all use:
//
// localStorage key = "rvaCart"
// =========================================================


// =========================================================
// INITIALIZE CHECKOUT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    loadCheckout();

    setupOrderType();

    setupCheckoutForm();

    updateCartCount();

});


// =========================================================
// GET CART FROM LOCAL STORAGE
// =========================================================

function getCart() {

    try {

        const savedCart =
            localStorage.getItem("rvaCart");

        if (!savedCart) {
            return [];
        }

        const cart =
            JSON.parse(savedCart);

        if (!Array.isArray(cart)) {
            return [];
        }

        // Make sure every item has a valid quantity
        cart.forEach(function (item) {

            item.quantity =
                Number(item.quantity) || 1;

            item.price =
                Number(item.price) || 0;

        });

        return cart;

    } catch (error) {

        console.error(
            "Error reading RVA cart:",
            error
        );

        return [];

    }

}


// =========================================================
// SAVE CART
// =========================================================

function saveCart(cart) {

    localStorage.setItem(
        "rvaCart",
        JSON.stringify(cart)
    );

}


// =========================================================
// LOAD CHECKOUT
// =========================================================

function loadCheckout() {

    const cart =
        getCart();

    displayCheckoutItems(cart);

    updateCheckoutSummary(cart);

    updateCartCount();

}


// =========================================================
// DISPLAY CHECKOUT ITEMS
// =========================================================

function displayCheckoutItems(cart) {

    const checkoutContainer =
        document.getElementById("checkoutItems");

    if (!checkoutContainer) {

        console.warn("checkoutItems element not found.");

        return;
    }

    checkoutContainer.innerHTML = "";

    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cart.length === 0) {

        checkoutContainer.innerHTML =
            '<div class="text-center py-5">' +
                '<i class="bi bi-cart-x text-muted" style="font-size:3rem;"></i>' +
                '<h5 class="mt-3">Your cart is empty</h5>' +
                '<p class="text-muted">Please add products before checkout.</p>' +
                '<a href="products.html" class="btn btn-primary">' +
                    '<i class="bi bi-shop"></i> Continue Shopping' +
                '</a>' +
            '</div>';

        updateCheckoutSummary([]);

        return;
    }

    // =====================================================
    // DISPLAY PRODUCTS
    // =====================================================

    cart.forEach(function (product, index) {

        const productName =
            product.name || "Product";

        const brand =
            product.brand
                ? String(product.brand).toUpperCase()
                : "";

        const category =
            product.category || "";

        const price =
            Number(product.price) || 0;

        const quantity =
            Number(product.quantity) || 1;

        const image =
            product.image || "images/logo/logo.jpg";

        const subtotal =
            price * quantity;

        const item =
            document.createElement("div");

        item.className =
            "checkout-item border-bottom pb-3 mb-3";

        // =================================================
        // PRODUCT ROW
        // =================================================

        const row =
            document.createElement("div");

        row.className =
            "d-flex align-items-center";

        // =================================================
        // IMAGE
        // =================================================

        const img =
            document.createElement("img");

        img.src = image;

        img.alt = productName;

        img.className = "me-3";

        img.style.width = "80px";
        img.style.height = "80px";
        img.style.objectFit = "contain";
        img.style.border = "1px solid #eee";
        img.style.borderRadius = "8px";
        img.style.padding = "5px";
        img.style.background = "#fff";

        img.onerror = function () {

            this.src = "images/logo/logo.jpg";

        };

        row.appendChild(img);

        // =================================================
        // PRODUCT INFORMATION
        // =================================================

        const info =
            document.createElement("div");

        info.className =
            "flex-grow-1";

        // PRODUCT NAME

        const nameElement =
            document.createElement("h6");

        nameElement.className =
            "mb-1";

        nameElement.textContent =
            productName;

        info.appendChild(nameElement);

        // BRAND

        if (brand) {

            const brandElement =
                document.createElement("div");

            brandElement.className =
                "small text-muted mb-1";

            brandElement.textContent =
                brand;

            info.appendChild(brandElement);

        }

        // CATEGORY

        if (category) {

            const categoryElement =
                document.createElement("span");

            categoryElement.className =
                "badge bg-light text-primary mb-1";

            categoryElement.textContent =
                category;

            info.appendChild(categoryElement);

        }

        // PRICE × QUANTITY

        const priceElement =
            document.createElement("div");

        priceElement.className =
            "small text-muted mt-1";

        priceElement.textContent =
            formatCurrency(price) +
            " × " +
            quantity;

        info.appendChild(priceElement);

        // =================================================
        // QUANTITY CONTROLS
        // =================================================

        const controls =
            document.createElement("div");

        controls.className =
            "d-flex align-items-center mt-2";

        // DECREASE

        const decreaseButton =
            document.createElement("button");

        decreaseButton.type =
            "button";

        decreaseButton.className =
            "btn btn-sm btn-outline-secondary";

        decreaseButton.textContent =
            "−";

        decreaseButton.addEventListener(
            "click",
            function () {

                decreaseCheckoutQuantity(index);

            }
        );

        controls.appendChild(decreaseButton);

        // QUANTITY

        const quantityElement =
            document.createElement("span");

        quantityElement.className =
            "mx-3 fw-bold";

        quantityElement.style.minWidth =
            "20px";

        quantityElement.style.textAlign =
            "center";

        quantityElement.textContent =
            quantity;

        controls.appendChild(quantityElement);

        // INCREASE

        const increaseButton =
            document.createElement("button");

        increaseButton.type =
            "button";

        increaseButton.className =
            "btn btn-sm btn-outline-secondary";

        increaseButton.textContent =
            "+";

        increaseButton.addEventListener(
            "click",
            function () {

                increaseCheckoutQuantity(index);

            }
        );

        controls.appendChild(increaseButton);

        // REMOVE

        const removeButton =
            document.createElement("button");

        removeButton.type =
            "button";

        removeButton.className =
            "btn btn-sm btn-outline-danger ms-3";

        removeButton.title =
            "Remove product";

        removeButton.innerHTML =
            '<i class="bi bi-trash"></i>';

        removeButton.addEventListener(
            "click",
            function () {

                removeCheckoutItem(index);

            }
        );

        controls.appendChild(removeButton);

        info.appendChild(controls);

        row.appendChild(info);

        // =================================================
        // SUBTOTAL
        // =================================================

        const subtotalElement =
            document.createElement("div");

        subtotalElement.className =
            "text-end ms-3";

        subtotalElement.style.minWidth =
            "100px";

        const subtotalStrong =
            document.createElement("strong");

        subtotalStrong.textContent =
            price > 0
                ? formatCurrency(subtotal)
                : "Contact for Price";

        subtotalElement.appendChild(
            subtotalStrong
        );

        row.appendChild(
            subtotalElement
        );

        item.appendChild(row);

        checkoutContainer.appendChild(item);

    });

}


// =========================================================
// INCREASE QUANTITY
// =========================================================

function increaseCheckoutQuantity(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    let quantity =
        Number(cart[index].quantity) || 1;


    quantity++;


    cart[index].quantity =
        quantity;


    saveCart(cart);


    loadCheckout();

}


// =========================================================
// DECREASE QUANTITY
// =========================================================

function decreaseCheckoutQuantity(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    let quantity =
        Number(cart[index].quantity) || 1;


    if (quantity > 1) {

        quantity--;

        cart[index].quantity =
            quantity;

    } else {

        cart.splice(
            index,
            1
        );

    }


    saveCart(cart);


    loadCheckout();

}


// =========================================================
// REMOVE PRODUCT
// =========================================================

function removeCheckoutItem(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    const productName =
        cart[index].name ||
        "this product";


    const confirmed =
        confirm(
            `Remove "${productName}" from your cart?`
        );


    if (!confirmed) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart(cart);


    loadCheckout();

}


// =========================================================
// UPDATE CHECKOUT SUMMARY
// =========================================================

function updateCheckoutSummary(cart) {

    let itemCount = 0;

    let subtotal = 0;


    cart.forEach(function (product) {

        const price =
            Number(product.price) || 0;


        const quantity =
            Number(product.quantity) || 1;


        itemCount +=
            quantity;


        subtotal +=
            price * quantity;

    });


    // =====================================================
    // DELIVERY FEE
    // =====================================================

    // Currently FREE / ₱0.
    // You can change this later.

    let deliveryFee = 0;


    // =====================================================
    // CHECK ORDER TYPE
    // =====================================================

    const selectedOrderType =
        document.querySelector(
            'input[name="orderType"]:checked'
        );


    if (
        selectedOrderType &&
        selectedOrderType.value === "Pickup"
    ) {

        deliveryFee = 0;

    }


    // =====================================================
    // TOTAL
    // =====================================================

    const total =
        subtotal + deliveryFee;


    // =====================================================
    // ITEM COUNT
    // =====================================================

    const itemCountElement =
        document.getElementById(
            "checkoutItemCount"
        );


    if (itemCountElement) {

        itemCountElement.textContent =
            itemCount;

    }


    // =====================================================
    // SUBTOTAL
    // =====================================================

    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatCurrency(subtotal);

    }


    // =====================================================
    // DELIVERY FEE
    // =====================================================

    const deliveryElement =
        document.getElementById(
            "deliveryFee"
        );


    if (deliveryElement) {

        deliveryElement.textContent =
            formatCurrency(deliveryFee);

    }


    // =====================================================
    // TOTAL
    // =====================================================

    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            formatCurrency(total);

    }

}


// =========================================================
// DELIVERY / PICKUP
// =========================================================

function setupOrderType() {

    const delivery =
        document.getElementById(
            "delivery"
        );


    const pickup =
        document.getElementById(
            "pickup"
        );


    const addressContainer =
        document.getElementById(
            "addressContainer"
        );


    const address =
        document.getElementById(
            "address"
        );


    if (
        !delivery ||
        !pickup ||
        !addressContainer ||
        !address
    ) {

        return;

    }


    // =====================================================
    // DELIVERY
    // =====================================================

    delivery.addEventListener(
        "change",
        function () {

            if (delivery.checked) {

                addressContainer.style.display =
                    "block";

                address.required =
                    true;

            }


            updateCheckoutSummary(
                getCart()
            );

        }
    );


    // =====================================================
    // PICKUP
    // =====================================================

    pickup.addEventListener(
        "change",
        function () {

            if (pickup.checked) {

                addressContainer.style.display =
                    "none";

                address.required =
                    false;

                address.value =
                    "";

            }


            updateCheckoutSummary(
                getCart()
            );

        }
    );


    // =====================================================
    // INITIAL STATE
    // =====================================================

    if (delivery.checked) {

        addressContainer.style.display =
            "block";

        address.required =
            true;

    }


    if (pickup.checked) {

        addressContainer.style.display =
            "none";

        address.required =
            false;

    }

}


// =========================================================
// CHECKOUT FORM
// =========================================================

function setupCheckoutForm() {

    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (!form) {

        console.warn(
            "checkoutForm element not found."
        );

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            processOrder();

        }
    );

}


// =========================================================
// PROCESS ORDER
// =========================================================

function processOrder() {

    const cart =
        getCart();


    // =====================================================
    // CHECK CART
    // =====================================================

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add products before checkout."
        );

        return;

    }


    // =====================================================
    // CUSTOMER INFORMATION
    // =====================================================

    const fullName =
        document.getElementById(
            "fullName"
        )?.value.trim() || "";


    const email =
        document.getElementById(
            "email"
        )?.value.trim() || "";


    const phone =
        document.getElementById(
            "phone"
        )?.value.trim() || "";


    const address =
        document.getElementById(
            "address"
        )?.value.trim() || "";


    const paymentMethod =
        document.getElementById(
            "paymentMethod"
        )?.value || "";


    const orderNotes =
        document.getElementById(
            "orderNotes"
        )?.value.trim() || "";


    // =====================================================
    // ORDER TYPE
    // =====================================================

    const selectedOrderType =
        document.querySelector(
            'input[name="orderType"]:checked'
        );


    const orderType =
        selectedOrderType
            ? selectedOrderType.value
            : "Delivery";


    // =====================================================
    // VALIDATE NAME
    // =====================================================

    if (!fullName) {

        alert(
            "Please enter your full name."
        );

        document
            .getElementById("fullName")
            ?.focus();

        return;

    }


    // =====================================================
    // VALIDATE EMAIL
    // =====================================================

    if (!email) {

        alert(
            "Please enter your email address."
        );

        document
            .getElementById("email")
            ?.focus();

        return;

    }


    // =====================================================
    // VALIDATE PHONE
    // =====================================================

    if (!phone) {

        alert(
            "Please enter your phone number."
        );

        document
            .getElementById("phone")
            ?.focus();

        return;

    }


    // =====================================================
    // VALIDATE DELIVERY ADDRESS
    // =====================================================

    if (
        orderType === "Delivery" &&
        !address
    ) {

        alert(
            "Please enter your complete delivery address."
        );

        document
            .getElementById("address")
            ?.focus();

        return;

    }


    // =====================================================
    // VALIDATE PAYMENT
    // =====================================================

    if (!paymentMethod) {

        alert(
            "Please select a payment method."
        );

        document
            .getElementById("paymentMethod")
            ?.focus();

        return;

    }


    // =====================================================
    // CALCULATE ORDER
    // =====================================================

    let itemCount = 0;

    let subtotal = 0;


    cart.forEach(function (product) {

        const price =
            Number(product.price) || 0;


        const quantity =
            Number(product.quantity) || 1;


        itemCount +=
            quantity;


        subtotal +=
            price * quantity;

    });


    // =====================================================
    // DELIVERY FEE
    // =====================================================

    const deliveryFee =
        orderType === "Delivery"
            ? 0
            : 0;


    // =====================================================
    // TOTAL
    // =====================================================

    const total =
        subtotal + deliveryFee;


    // =====================================================
    // GENERATE ORDER NUMBER
    // =====================================================

    const orderNumber =
        "RVA-" +
        Date.now()
            .toString()
            .slice(-8);


    // =====================================================
    // CREATE ORDER OBJECT
    // =====================================================

    const order = {

        orderNumber: orderNumber,


        customer: {

            fullName: fullName,

            email: email,

            phone: phone,

            address:
                orderType === "Delivery"
                    ? address
                    : "Pickup"

        },


        orderType: orderType,


        paymentMethod:
            paymentMethod,


        orderNotes:
            orderNotes,


        items: cart,


        itemCount:
            itemCount,


        subtotal:
            subtotal,


        deliveryFee:
            deliveryFee,


        total:
            total,


        status:
            "Pending",


        orderDate:
            new Date().toISOString()

    };


    // =====================================================
    // SAVE LATEST ORDER
    // =====================================================

    localStorage.setItem(
        "latestOrder",
        JSON.stringify(order)
    );


    // =====================================================
    // SAVE ORDER HISTORY
    // =====================================================

    let orderHistory = [];


    try {

        const savedHistory =
            localStorage.getItem(
                "orderHistory"
            );


        if (savedHistory) {

            orderHistory =
                JSON.parse(
                    savedHistory
                );

        }


        if (!Array.isArray(orderHistory)) {

            orderHistory = [];

        }

    } catch (error) {

        console.error(
            "Error reading order history:",
            error
        );

        orderHistory = [];

    }


    orderHistory.push(order);


    localStorage.setItem(
        "orderHistory",
        JSON.stringify(
            orderHistory
        )
    );


    // =====================================================
    // CLEAR RVA CART
    // =====================================================

    localStorage.removeItem(
        "rvaCart"
    );


    // =====================================================
    // UPDATE CART COUNT
    // =====================================================

    updateCartCount();


    // =====================================================
    // SUCCESS MESSAGE
    // =====================================================

    alert(

        "Order placed successfully!\n\n" +

        "Order Number: " +
        orderNumber +
        "\n\n" +

        "Customer: " +
        fullName +
        "\n" +

        "Order Type: " +
        orderType +
        "\n" +

        "Payment Method: " +
        paymentMethod +
        "\n\n" +

        "Total: " +
        formatCurrency(total) +
        "\n\n" +

        "Thank you for shopping with Romeo V Austria Corporation!"

    );


    // =====================================================
    // RETURN HOME
    // =====================================================

    window.location.href =
        "index.html";

}


// =========================================================
// UPDATE CART COUNT
// =========================================================

function updateCartCount() {

    const cart =
        getCart();


    const totalItems =
        cart.reduce(
            function (total, product) {

                return (
                    total +
                    (
                        Number(
                            product.quantity
                        ) || 0
                    )
                );

            },
            0
        );


    // =====================================================
    // MAIN CART COUNT
    // =====================================================

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    // =====================================================
    // OTHER POSSIBLE CART COUNTS
    // =====================================================

    const cartCounts =
        document.querySelectorAll(
            ".cart-count"
        );


    cartCounts.forEach(function (element) {

        element.textContent =
            totalItems;

    });


    // =====================================================
    // ACCOUNT AREA CART LINK
    // =====================================================

    const cartLinks =
        document.querySelectorAll(
            '.account-area a[href="cart.html"]'
        );


    cartLinks.forEach(function (link) {

        link.innerHTML = `

            <i class="bi bi-cart3"></i>

            Cart (${totalItems})

        `;

    });

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


// =========================================================
// MAKE FUNCTIONS AVAILABLE GLOBALLY
// =========================================================

window.increaseCheckoutQuantity =
    increaseCheckoutQuantity;


window.decreaseCheckoutQuantity =
    decreaseCheckoutQuantity;


window.removeCheckoutItem =
    removeCheckoutItem;


window.processOrder =
    processOrder;



Change it to:

```javascript
window.updateCartCount =
    updateCartCount;
