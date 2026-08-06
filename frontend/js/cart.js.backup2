// =========================================================
// RVA CORPORATION - CART.JS
// =========================================================
// Cart management
// CART STORAGE KEY: rvaCart
// =========================================================

const CART_KEY = "rvaCart";


// =========================================================
// GET CART
// =========================================================

function getCart() {

    try {

        const savedCart = localStorage.getItem(CART_KEY);

        if (!savedCart) {
            return [];
        }

        const cart = JSON.parse(savedCart);

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        console.error("RVA Cart Error:", error);

        return [];

    }

}


// =========================================================
// SAVE CART
// =========================================================

function saveCart(cart) {

    try {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Unable to save RVA cart:",
            error
        );

    }

}


// =========================================================
// GET TOTAL ITEMS
// =========================================================

function getCartItemCount() {

    const cart = getCart();

    return cart.reduce(
        function (total, item) {

            return total +
                (Number(item.quantity) || 0);

        },
        0
    );

}


// =========================================================
// FORMAT PRICE
// =========================================================

function formatCartPrice(price) {

    const numericPrice = Number(price) || 0;

    if (numericPrice <= 0) {
        return "Contact for Price";
    }

    return "₱" +
        numericPrice.toLocaleString("en-PH");
}


// =========================================================
// UPDATE CART COUNT
// =========================================================

function updateCartCount() {

    const totalItems =
        getCartItemCount();


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    const cartBadges =
        document.querySelectorAll(
            ".cart-count, .cart-badge"
        );


    cartBadges.forEach(
        function (badge) {

            badge.textContent =
                totalItems;

        }
    );


    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    cartLinks.forEach(
        function (link) {

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

        }
    );

}


// =========================================================
// DISPLAY CART
// =========================================================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) {

        updateCartCount();

        return;

    }


    const cart =
        getCart();


    cartItems.innerHTML = "";


    // -----------------------------------------------------
    // EMPTY CART
    // -----------------------------------------------------

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (cartSubtotal) {
            cartSubtotal.textContent = "₱0";
        }

        if (cartTotal) {
            cartTotal.textContent = "₱0";
        }

        updateCartCount();

        return;

    }


    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    let subtotal = 0;


    // -----------------------------------------------------
    // CREATE CART ITEMS
    // -----------------------------------------------------

    cart.forEach(
        function (item, index) {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                Number(item.price) || 0;

            const itemTotal =
                price * quantity;


            subtotal += itemTotal;


            const card =
                document.createElement("div");

            card.className =
                "card mb-3 shadow-sm";


            const row =
                document.createElement("div");

            row.className =
                "row g-0 align-items-center";


            // -------------------------------------------------
            // IMAGE
            // -------------------------------------------------

            const imageCol =
                document.createElement("div");

            imageCol.className =
                "col-md-2 text-center";


            const image =
                document.createElement("img");

            image.className =
                "img-fluid p-3";

            image.style.maxHeight =
                "150px";

            image.style.objectFit =
                "contain";

            image.alt =
                item.name || "Product";

            image.src =
                item.image ||
                "images/logo/logo.jpg";


            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "images/logo/logo.jpg";

                };


            imageCol.appendChild(image);


            // -------------------------------------------------
            // PRODUCT INFORMATION
            // -------------------------------------------------

            const infoCol =
                document.createElement("div");

            infoCol.className =
                "col-md-4";


            const infoBody =
                document.createElement("div");

            infoBody.className =
                "card-body";


            const title =
                document.createElement("h5");

            title.className =
                "card-title mb-1";

            title.textContent =
                item.name || "Product";


            const brand =
                document.createElement("p");

            brand.className =
                "text-muted mb-1";

            brand.textContent =
                String(
                    item.brand || ""
                ).toUpperCase();


            const category =
                document.createElement("small");

            category.className =
                "text-muted";

            category.textContent =
                item.category || "Product";


            infoBody.appendChild(title);
            infoBody.appendChild(brand);
            infoBody.appendChild(category);

            infoCol.appendChild(infoBody);


            // -------------------------------------------------
            // PRICE
            // -------------------------------------------------

            const priceCol =
                document.createElement("div");

            priceCol.className =
                "col-md-2 text-center";


            const priceText =
                document.createElement("strong");

            priceText.textContent =
                formatCartPrice(price);


            priceCol.appendChild(priceText);


            // -------------------------------------------------
            // QUANTITY
            // -------------------------------------------------

            const quantityCol =
                document.createElement("div");

            quantityCol.className =
                "col-md-2 text-center";


            const quantityWrapper =
                document.createElement("div");

            quantityWrapper.className =
                "d-flex justify-content-center align-items-center gap-2";


            const decreaseButton =
                document.createElement("button");

            decreaseButton.type =
                "button";

            decreaseButton.className =
                "btn btn-outline-secondary btn-sm";

            decreaseButton.innerHTML =
                '<i class="bi bi-dash"></i>';


            decreaseButton.addEventListener(
                "click",
                function () {

                    updateCartItemQuantity(
                        index,
                        quantity - 1
                    );

                }
            );


            const quantityText =
                document.createElement("span");

            quantityText.className =
                "fw-bold";

            quantityText.textContent =
                quantity;


            const increaseButton =
                document.createElement("button");

            increaseButton.type =
                "button";

            increaseButton.className =
                "btn btn-outline-secondary btn-sm";

            increaseButton.innerHTML =
                '<i class="bi bi-plus"></i>';


            increaseButton.addEventListener(
                "click",
                function () {

                    updateCartItemQuantity(
                        index,
                        quantity + 1
                    );

                }
            );


            quantityWrapper.appendChild(
                decreaseButton
            );

            quantityWrapper.appendChild(
                quantityText
            );

            quantityWrapper.appendChild(
                increaseButton
            );


            quantityCol.appendChild(
                quantityWrapper
            );


            // -------------------------------------------------
            // REMOVE
            // -------------------------------------------------

            const removeCol =
                document.createElement("div");

            removeCol.className =
                "col-md-2 text-center";


            const removeButton =
                document.createElement("button");

            removeButton.type =
                "button";

            removeButton.className =
                "btn btn-outline-danger btn-sm";

            removeButton.innerHTML =
                '<i class="bi bi-trash"></i> Remove';


            removeButton.addEventListener(
                "click",
                function () {

                    removeFromCart(index);

                }
            );


            removeCol.appendChild(
                removeButton
            );


            // -------------------------------------------------
            // BUILD
            // -------------------------------------------------

            row.appendChild(imageCol);
            row.appendChild(infoCol);
            row.appendChild(priceCol);
            row.appendChild(quantityCol);
            row.appendChild(removeCol);


            card.appendChild(row);


            cartItems.appendChild(card);

        }
    );


    // -----------------------------------------------------
    // TOTALS
    // -----------------------------------------------------

    if (cartSubtotal) {

        cartSubtotal.textContent =
            "₱" +
            subtotal.toLocaleString("en-PH");

    }


    if (cartTotal) {

        cartTotal.textContent =
            "₱" +
            subtotal.toLocaleString("en-PH");

    }


    updateCartCount();

}


// =========================================================
// UPDATE QUANTITY
// =========================================================

function updateCartItemQuantity(
    index,
    newQuantity
) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    newQuantity =
        Number(newQuantity);


    if (newQuantity <= 0) {

        cart.splice(index, 1);

    } else {

        cart[index].quantity =
            newQuantity;

    }


    saveCart(cart);

    displayCart();

}


// =========================================================
// REMOVE FROM CART
// =========================================================

function removeFromCart(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    const productName =
        cart[index].name ||
        "this product";


    if (
        !confirm(
            'Remove "' +
            productName +
            '" from your cart?'
        )
    ) {

        return;

    }


    cart.splice(index, 1);

    saveCart(cart);

    displayCart();

}


// =========================================================
// CLEAR CART
// =========================================================

function clearCart() {

    const cart =
        getCart();


    if (cart.length === 0) {

        return;

    }


    if (
        !confirm(
            "Are you sure you want to clear your cart?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        CART_KEY
    );


    displayCart();

}


// =========================================================
// CHECKOUT
// =========================================================

function proceedToCheckout() {

    const cart =
        getCart();


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
// INITIALIZE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "RVA Cart.js loaded successfully."
        );

        displayCart();

        updateCartCount();

    }
);


// =========================================================
// STORAGE CHANGE
// =========================================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === CART_KEY
        ) {

            displayCart();

            updateCartCount();

        }

    }
);


// =========================================================
// GLOBAL FUNCTIONS
// =========================================================

window.getCart =
    getCart;

window.saveCart =
    saveCart;

window.getCartItemCount =
    getCartItemCount;

window.updateCartCount =
    updateCartCount;

window.displayCart =
    displayCart;

window.updateCartItemQuantity =
    updateCartItemQuantity;

window.removeFromCart =
    removeFromCart;

window.clearCart =
    clearCart;

window.proceedToCheckout =
    proceedToCheckout;
