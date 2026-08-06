```javascript
// =========================================================
// RVA CORPORATION - CART.JS
// =========================================================
// IMPORTANT:
// This file uses ONLY "rvaCart".
// Products.js and Checkout.js must use the same key.
// =========================================================


// =========================================================
// GET CART
// =========================================================

function getCart() {

    try {

        const savedCart =
            localStorage.getItem("rvaCart");

        if (!savedCart) {
            return [];
        }

        const parsedCart =
            JSON.parse(savedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        // Make sure every item has a valid quantity
        return parsedCart.map(function (item) {

            return {

                ...item,

                quantity:
                    Math.max(
                        1,
                        Number(item.quantity) || 1
                    )

            };

        });

    } catch (error) {

        console.error(
            "Error loading RVA cart:",
            error
        );

        return [];

    }

}


// =========================================================
// CART VARIABLE
// =========================================================

let cart = getCart();


// =========================================================
// SAVE CART
// =========================================================

function saveCart() {

    localStorage.setItem(
        "rvaCart",
        JSON.stringify(cart)
    );

}


// =========================================================
// GET TOTAL QUANTITY
// =========================================================

function getCartItemCount() {

    return cart.reduce(

        function (total, item) {

            return (
                total +
                (Number(item.quantity) || 0)
            );

        },

        0

    );

}


// =========================================================
// UPDATE CART COUNT
// =========================================================

function updateCartCount() {

    // Reload cart from storage
    cart = getCart();

    const totalItems =
        getCartItemCount();


    // -----------------------------------------------------
    // MAIN CART COUNT
    // -----------------------------------------------------

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    // -----------------------------------------------------
    // CART LINKS
    // -----------------------------------------------------

    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    cartLinks.forEach(function (link) {

        // Don't destroy an existing icon unnecessarily
        const icon =
            link.querySelector("i");


        if (icon) {

            link.innerHTML =
                icon.outerHTML +
                " Cart (" +
                totalItems +
                ")";

        } else {

            link.textContent =
                "Cart (" +
                totalItems +
                ")";

        }

    });

}


// =========================================================
// FORMAT PRICE
// =========================================================

function formatCartPrice(price) {

    const numericPrice =
        Number(price) || 0;


    if (numericPrice <= 0) {

        return "Contact for Price";

    }


    return (
        "₱" +
        numericPrice.toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}


// =========================================================
// DISPLAY CART
// =========================================================

function displayCart() {

    // Refresh cart from localStorage
    cart = getCart();


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const emptyCart =
        document.getElementById(
            "emptyCart"
        );


    const summaryItems =
        document.getElementById(
            "summaryItems"
        );


    const cartSubtotal =
        document.getElementById(
            "cartSubtotal"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    // -----------------------------------------------------
    // CART CONTAINER NOT FOUND
    // -----------------------------------------------------

    if (!cartItems) {

        updateCartCount();

        return;

    }


    // -----------------------------------------------------
    // EMPTY CART
    // -----------------------------------------------------

    if (cart.length === 0) {

        cartItems.innerHTML = "";


        if (emptyCart) {

            emptyCart.style.display =
                "block";

        }


        if (summaryItems) {

            summaryItems.textContent =
                "0";

        }


        if (cartSubtotal) {

            cartSubtotal.textContent =
                "₱0.00";

        }


        if (cartTotal) {

            cartTotal.textContent =
                "₱0.00";

        }


        updateCartCount();

        return;

    }


    // Hide empty-cart message
    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    cartItems.innerHTML = "";


    let subtotal = 0;

    let totalItems = 0;


    // =====================================================
    // DISPLAY EACH PRODUCT
    // =====================================================

    cart.forEach(function (item, index) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const itemTotal =
            price * quantity;


        subtotal +=
            itemTotal;


        totalItems +=
            quantity;


        const priceText =
            formatCartPrice(price);


        const totalText =
            price > 0
                ? formatCartPrice(itemTotal)
                : "Contact for Price";


        const image =
            item.image ||
            "images/logo/logo.jpg";


        const brand =
            item.brand
                ? item.brand.toUpperCase()
                : "";


        const category =
            item.category || "";


        const card =
            document.createElement("div");


        card.className =
            "card shadow-sm border-0 mb-3";


        card.innerHTML = `

            <div class="card-body">

                <div class="row align-items-center">

                    <!-- =================================
                         IMAGE
                    ================================== -->

                    <div
                        class="col-12 col-md-2 text-center mb-3 mb-md-0"
                    >

                        <img
                            src="${escapeCartHTML(image)}"
                            alt="${escapeCartHTML(item.name || "Product")}"
                            style="
                                width:100px;
                                height:100px;
                                object-fit:contain;
                            "
                            onerror="
                                this.src='images/logo/logo.jpg';
                            "
                        >

                    </div>


                    <!-- =================================
                         PRODUCT INFORMATION
                    ================================== -->

                    <div
                        class="col-12 col-md-4 text-center text-md-start"
                    >

                        <h5 class="mb-1">

                            ${escapeCartHTML(
                                item.name || "Product"
                            )}

                        </h5>


                        ${
                            brand
                                ? `
                                    <p class="text-muted mb-1">
                                        ${escapeCartHTML(brand)}
                                    </p>
                                  `
                                : ""
                        }


                        ${
                            category
                                ? `
                                    <span
                                        class="
                                            badge
                                            bg-light
                                            text-primary
                                            mb-2
                                        "
                                    >
                                        ${escapeCartHTML(category)}
                                    </span>
                                  `
                                : ""
                        }


                        <p
                            class="
                                text-primary
                                fw-bold
                                mb-0
                            "
                        >

                            ${priceText}

                        </p>

                    </div>


                    <!-- =================================
                         QUANTITY
                    ================================== -->

                    <div
                        class="col-12 col-md-3 mt-3 mt-md-0"
                    >

                        <label
                            class="small text-muted"
                        >

                            Quantity

                        </label>


                        <div
                            class="
                                input-group
                                mt-1
                            "
                        >

                            <button
                                type="button"
                                class="
                                    btn
                                    btn-outline-secondary
                                "
                                onclick="
                                    changeQuantity(
                                        ${index},
                                        -1
                                    )
                                "
                            >

                                −

                            </button>


                            <input
                                type="text"
                                class="
                                    form-control
                                    text-center
                                "
                                value="${quantity}"
                                readonly
                            >


                            <button
                                type="button"
                                class="
                                    btn
                                    btn-outline-secondary
                                "
                                onclick="
                                    changeQuantity(
                                        ${index},
                                        1
                                    )
                                "
                            >

                                +

                            </button>

                        </div>

                    </div>


                    <!-- =================================
                         TOTAL / REMOVE
                    ================================== -->

                    <div
                        class="
                            col-12
                            col-md-3
                            text-center
                            text-md-end
                            mt-3
                            mt-md-0
                        "
                    >

                        <strong
                            class="fs-5"
                        >

                            ${totalText}

                        </strong>


                        <br>


                        <button
                            type="button"
                            class="
                                btn
                                btn-sm
                                btn-outline-danger
                                mt-2
                            "
                            onclick="
                                removeFromCart(
                                    ${index}
                                )
                            "
                        >

                            <i
                                class="bi bi-trash"
                            ></i>

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        `;


        cartItems.appendChild(card);

    });


    // =====================================================
    // UPDATE SUMMARY
    // =====================================================

    if (summaryItems) {

        summaryItems.textContent =
            totalItems;

    }


    if (cartSubtotal) {

        cartSubtotal.textContent =
            subtotal > 0
                ? formatCartPrice(subtotal)
                : "Contact for Price";

    }


    if (cartTotal) {

        cartTotal.textContent =
            subtotal > 0
                ? formatCartPrice(subtotal)
                : "Contact for Price";

    }


    // Update header cart number
    updateCartCount();

}


// =========================================================
// CHANGE QUANTITY
// =========================================================

function changeQuantity(index, amount) {

    cart = getCart();


    if (!cart[index]) {

        return;

    }


    let quantity =
        Number(cart[index].quantity) || 1;


    quantity +=
        Number(amount) || 0;


    // -----------------------------------------------------
    // REMOVE IF ZERO
    // -----------------------------------------------------

    if (quantity <= 0) {

        cart.splice(index, 1);

    } else {

        cart[index].quantity =
            quantity;

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// =========================================================
// REMOVE PRODUCT
// =========================================================

function removeFromCart(index) {

    cart = getCart();


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


    cart.splice(index, 1);


    saveCart();

    displayCart();

    updateCartCount();

}


// =========================================================
// CLEAR CART
// =========================================================

function clearCart() {

    cart = getCart();


    if (cart.length === 0) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmed) {

        return;

    }


    cart = [];


    saveCart();

    displayCart();

    updateCartCount();

}


// =========================================================
// CLEAR CART BUTTON
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const clearCartButton =
            document.getElementById(
                "clearCartButton"
            );


        if (clearCartButton) {

            clearCartButton.addEventListener(
                "click",
                clearCart
            );

        }

    }
);


// =========================================================
// CHECKOUT
// =========================================================

function goToCheckout() {

    cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// =========================================================
// CHECKOUT BUTTON
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const checkoutButton =
            document.getElementById(
                "checkoutButton"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                goToCheckout
            );

        }

    }
);


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeCartHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// =========================================================
// LISTEN FOR STORAGE CHANGES
// =========================================================

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === "rvaCart") {

            cart = getCart();

            displayCart();

            updateCartCount();

        }

    }
);


// =========================================================
// MAKE FUNCTIONS GLOBAL
// =========================================================

window.getCart =
    getCart;


window.saveCart =
    saveCart;


window.updateCartCount =
    updateCartCount;


window.displayCart =
    displayCart;


window.changeQuantity =
    changeQuantity;


window.removeFromCart =
    removeFromCart;


window.clearCart =
    clearCart;


window.goToCheckout =
    goToCheckout;


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cart = getCart();

        displayCart();

        updateCartCount();

    }
);
```
