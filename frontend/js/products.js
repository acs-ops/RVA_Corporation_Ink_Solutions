// =========================================================
// RVA CORPORATION - PRODUCTS.JS
// =========================================================
// Product display, search, filtering and cart functions
// CART STORAGE KEY: rvaCart
// =========================================================


// =========================================================
// PRODUCTS
// =========================================================

const products = [

    // =====================================================
    // HP PRINTERS
    // =====================================================

    {
        name: "HP LaserJet M880",
        brand: "hp",
        category: "Printer",
        price: 12990,
        image: "images/hp/printer/hp-m880.JPG"
    },

    {
        name: "HP LaserJet M830",
        brand: "hp",
        category: "Printer",
        price: 48990,
        image: "images/hp/printer/hp-m830.JPG"
    },

    {
        name: "HP LaserJet M775",
        brand: "hp",
        category: "Printer",
        price: 37990,
        image: "images/hp/printer/hp-m775.JPG"
    },

    {
        name: "HP LaserJet Pro M137fnw",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-137fnw.JPG"
    },

    {
        name: "HP LaserJet Pro 402dn",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-402dn.jpg"
    },

    {
        name: "HP LaserJet M3303",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-3303.JPG"
    },

    {
        name: "HP LaserJet Pro 4103fdw",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-4103Fdw.JPG"
    },

    {
        name: "HP LaserJet Enterprise 82540",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-82540.JPG"
    },

    {
        name: "HP LaserJet E400",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-e400.jpg"
    },

    {
        name: "HP LaserJet E4250",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-e4250.JPG"
    },

    {
        name: "HP LaserJet M127",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m127.JPG"
    },

    {
        name: "HP LaserJet M251",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m251.JPG"
    },

    {
        name: "HP LaserJet M377",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m377.JPG"
    },

    {
        name: "HP LaserJet Pro M404dn",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m404dn.JPG"
    },

    {
        name: "HP LaserJet Pro M426",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m426.JPG"
    },

    {
        name: "HP LaserJet Pro M428",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m428.JPG"
    },

    {
        name: "HP LaserJet Pro M477",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m477.JPG"
    },

    {
        name: "HP LaserJet Pro M479",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m479.JPG"
    },

    {
        name: "HP LaserJet Enterprise M506",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m506.JPG"
    },

    {
        name: "HP LaserJet Enterprise M521dw",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-M521dw.JPG"
    },

    {
        name: "HP LaserJet Enterprise M577",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-m577.JPG"
    },

    {
        name: "HP LaserJet P1102",
        brand: "hp",
        category: "Printer",
        price: 0,
        image: "images/hp/printer/hp-p1102.jpg"
    },


    // =====================================================
    // HP TONERS
    // =====================================================

    {
        name: "HP M521dw Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m521dw-toner.JPG"
    },

    {
        name: "HP E40040 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-e40040-toner.jpg"
    },

    {
        name: "HP E42540 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-e42540-toner.JPG"
    },

    {
        name: "HP M127 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m127-toner.JPG"
    },

    {
        name: "HP M137fnw Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m137fnw-toner.JPG"
    },

    {
        name: "HP M251 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m251-toner.JPG"
    },

    {
        name: "HP M377 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m377-toners.JPG"
    },

    {
        name: "HP M402dn Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m402dn-toner.jpg"
    },

    {
        name: "HP M404dn Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m404dn-toner.jpg"
    },

    {
        name: "HP M426fdn Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m426fdn-toner.JPG"
    },

    {
        name: "HP M428fdw Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m428fdw-toner.JPG"
    },

    {
        name: "HP M477fdw Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m477fdw-toner.JPG"
    },

    {
        name: "HP M479 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m479-toner.JPG"
    },

    {
        name: "HP M506dn Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m506dn-toner.JPG"
    },

    {
        name: "HP M577dn Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m577dn-toner.JPG"
    },

    {
        name: "HP M775dn Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m775dn-toner.JPG"
    },

    {
        name: "HP M830 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m830-toner.JPG"
    },

    {
        name: "HP M880 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m880-toner.JPG"
    },

    {
        name: "HP M3303 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m3303-toner.JPG"
    },

    {
        name: "HP M4103FDW Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-m4103Fdw-toner.JPG"
    },

    {
        name: "HP E82540/E82550/E82560 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-me82540e82550e82560-toner.jpg"
    },

    {
        name: "HP P1102 Toner",
        brand: "hp",
        category: "Toner",
        price: 0,
        image: "images/hp/toner/hp-p1102-toner.jpg"
    },


    // =====================================================
    // EPSON PRINTERS
    // =====================================================

    {
        name: "Epson L1300",
        brand: "epson",
        category: "Printer",
        price: 0,
        image: "images/epson/printer/epson L1300.JPG"
    },

    {
        name: "Epson L3210",
        brand: "epson",
        category: "Printer",
        price: 0,
        image: "images/epson/printer/epson L3210.JPG"
    },

    {
        name: "Epson L3250",
        brand: "epson",
        category: "Printer",
        price: 0,
        image: "images/epson/printer/epson L3250.JPG"
    },

    {
        name: "Epson L5290",
        brand: "epson",
        category: "Printer",
        price: 0,
        image: "images/epson/printer/epson L5290.JPG"
    },

    {
        name: "Epson L14150",
        brand: "epson",
        category: "Printer",
        price: 0,
        image: "images/epson/printer/epson L14150.JPG"
    },

    {
        name: "Epson L15150",
        brand: "epson",
        category: "Printer",
        price: 0,
        image: "images/epson/printer/epson L15150.JPG"
    },

    {
        name: "Epson L3216",
        brand: "epson",
        category: "Printer",
        price: 8990,
        image: "images/epson/printer/epson-L3216.JPG"
    },


    // =====================================================
    // EPSON INKS
    // =====================================================

    {
        name: "Epson L1300 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L1300-ink.JPG"
    },

    {
        name: "Epson L3210 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L3210-ink.JPG"
    },

    {
        name: "Epson L3216 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L3216-ink.JPG"
    },

    {
        name: "Epson L3250 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L3250-ink.JPG"
    },

    {
        name: "Epson L5290 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L5290-ink.JPG"
    },

    {
        name: "Epson L14150 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L14150-ink.JPG"
    },

    {
        name: "Epson L15150 Ink",
        brand: "epson",
        category: "Ink",
        price: 0,
        image: "images/epson/ink/epson-L15150-ink.JPG"
    },


    // =====================================================
    // BROTHER
    // =====================================================

    {
        name: "Brother DCP-L2540DW",
        brand: "brother",
        category: "Printer",
        price: 10990,
        image: "images/brother/printer/brother dcp-L2540DW.JPG"
    },

    {
        name: "Brother DCP-L2540DW Toner",
        brand: "brother",
        category: "Toner",
        price: 0,
        image: "images/brother/toner/brother dcp- L2540dw-toner.JPG"
    },


    // =====================================================
    // CANON PRINTERS
    // =====================================================

    {
        name: "Canon LBP6030",
        brand: "canon",
        category: "Printer",
        price: 0,
        image: "images/canon/printer/canon-LBP6030.jpg"
    },

    {
        name: "Canon MF284DW",
        brand: "canon",
        category: "Printer",
        price: 0,
        image: "images/canon/printer/canon-MF284DW.JPG"
    },

    {
        name: "Canon MF644Cdw",
        brand: "canon",
        category: "Printer",
        price: 0,
        image: "images/canon/printer/canon-MF644Cdw.JPG"
    },

    {
        name: "Canon MF3010",
        brand: "canon",
        category: "Printer",
        price: 9990,
        image: "images/canon/printer/canon-MF3010.jpg"
    },

    {
        name: "Canon MF643Cdw",
        brand: "canon",
        category: "Printer",
        price: 0,
        image: "images/canon/printer/canonMF643Cdw.JPG"
    },


    // =====================================================
    // CANON TONERS
    // =====================================================

    {
        name: "Canon MF644Cdw Toner",
        brand: "canon",
        category: "Toner",
        price: 0,
        image: "images/canon/toner/canon mf644cdw-toner.JPG"
    },

    {
        name: "Canon LBP6030 Toner",
        brand: "canon",
        category: "Toner",
        price: 0,
        image: "images/canon/toner/canon-lbp6030-toner.jpg"
    },

    {
        name: "Canon MF284DW Toner",
        brand: "canon",
        category: "Toner",
        price: 0,
        image: "images/canon/toner/canon-mf284dw-toner.jpg"
    },

    {
        name: "Canon MF643Cdw Toner",
        brand: "canon",
        category: "Toner",
        price: 0,
        image: "images/canon/toner/canon-mf643cdw-toner.JPG"
    },

    {
        name: "Canon MF3010 Toner",
        brand: "canon",
        category: "Toner",
        price: 0,
        image: "images/canon/toner/canon-mf3010-toner.jpg"
    },


    // =====================================================
    // INK BOTTLES
    // =====================================================

    {
        name: "Epson 003 Black Ink Bottle",
        brand: "epson",
        category: "Ink",
        price: 350,
        image: "images/toner/epson-003-black.jpg"
    },

    {
        name: "Canon GI-71 Ink Bottle",
        brand: "canon",
        category: "Ink",
        price: 450,
        image: "images/toner/canon-gi71.jpg"
    },

    {
        name: "Brother BT5000 Ink Bottle",
        brand: "brother",
        category: "Ink",
        price: 380,
        image: "images/toner/brother-bt5000.jpg"
    }

];


// =========================================================
// RVA CORPORATION - PRODUCTS.JS
// PRODUCT FUNCTIONS
// =========================================================
// CART STORAGE KEY: rvaCart
// =========================================================

const CART_KEY = "rvaCart";


// =========================================================
// INITIALIZE PRODUCTS PAGE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("RVA Products.js loaded successfully.");
    console.log("Total products:", products.length);

    initializeProductsPage();

});


// =========================================================
// INITIALIZE
// =========================================================

function initializeProductsPage() {

    const productList =
        document.getElementById("product-list");

    if (!productList) {

        console.warn(
            "product-list element was not found."
        );

        return;

    }

    setupSearch();

    setupClearSearch();

    displayProducts();

    updateSearchMessage();

    updateProductPageCartCount();

}


// =========================================================
// GET URL PARAMETERS
// =========================================================

function getProductParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return {

        brand:
            params.get("brand"),

        search:
            params.get("search")

    };

}


// =========================================================
// FILTER PRODUCTS
// =========================================================

function getFilteredProducts() {

    const parameters =
        getProductParameters();

    let results =
        Array.isArray(products)
            ? [...products]
            : [];


    // -----------------------------------------------------
    // BRAND FILTER
    // -----------------------------------------------------

    if (
        parameters.brand &&
        parameters.brand.trim() !== ""
    ) {

        const selectedBrand =
            parameters.brand
                .trim()
                .toLowerCase();

        results =
            results.filter(function (product) {

                return (

                    product.brand &&
                    product.brand
                        .toLowerCase() ===
                    selectedBrand

                );

            });

    }


    // -----------------------------------------------------
    // SEARCH FILTER
    // -----------------------------------------------------

    if (
        parameters.search &&
        parameters.search.trim() !== ""
    ) {

        const search =
            parameters.search
                .trim()
                .toLowerCase();

        results =
            results.filter(function (product) {

                const name =
                    String(
                        product.name || ""
                    ).toLowerCase();

                const brand =
                    String(
                        product.brand || ""
                    ).toLowerCase();

                const category =
                    String(
                        product.category || ""
                    ).toLowerCase();

                return (

                    name.includes(search) ||

                    brand.includes(search) ||

                    category.includes(search)

                );

            });

    }


    return results;

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null
            ? ""
            : String(value);

    return div.innerHTML;

}


// =========================================================
// FORMAT PRICE
// =========================================================

function formatPrice(price) {

    const numericPrice =
        Number(price) || 0;

    if (numericPrice <= 0) {

        return "Contact for Price";

    }

    return (
        "₱" +
        numericPrice.toLocaleString(
            "en-PH"
        )
    );

}


// =========================================================
// DISPLAY PRODUCTS
// =========================================================

function displayProducts() {

    const productList =
        document.getElementById(
            "product-list"
        );

    const noProducts =
        document.getElementById(
            "noProducts"
        );


    if (!productList) {

        console.error(
            "ERROR: #product-list was not found."
        );

        return;

    }


    const filteredProducts =
        getFilteredProducts();


    console.log(
        "Products being displayed:",
        filteredProducts.length
    );


    productList.innerHTML = "";


    // -----------------------------------------------------
    // NO PRODUCTS
    // -----------------------------------------------------

    if (
        filteredProducts.length === 0
    ) {

        if (noProducts) {

            noProducts.style.display =
                "block";

        }

        return;

    }


    if (noProducts) {

        noProducts.style.display =
            "none";

    }


    // -----------------------------------------------------
    // CREATE PRODUCT CARDS
    // -----------------------------------------------------

    filteredProducts.forEach(
        function (product, index) {

            const card =
                document.createElement("div");

            card.className =
                "col-sm-6 col-md-4 col-lg-3 mb-4";


            const productCard =
                document.createElement("div");

            productCard.className =
                "card shadow-sm h-100 product-card";


            // -------------------------------------------------
            // IMAGE
            // -------------------------------------------------

            const image =
                document.createElement("img");

            image.className =
                "card-img-top";

            image.alt =
                product.name || "Product";

            image.loading =
                "lazy";

            image.style.height =
                "250px";

            image.style.objectFit =
                "contain";

            image.style.padding =
                "15px";

            image.src =
                product.image || "images/logo/logo.jpg";


            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "images/logo/logo.jpg";

                };


            // -------------------------------------------------
            // CARD BODY
            // -------------------------------------------------

            const body =
                document.createElement("div");

            body.className =
                "card-body text-center";


            // -------------------------------------------------
            // CATEGORY
            // -------------------------------------------------

            const category =
                document.createElement("span");

            category.className =
                "badge bg-light text-primary mb-2";

            category.textContent =
                product.category || "Product";


            // -------------------------------------------------
            // PRODUCT NAME
            // -------------------------------------------------

            const title =
                document.createElement("h5");

            title.className =
                "card-title";

            title.textContent =
                product.name || "Unnamed Product";


            // -------------------------------------------------
            // BRAND
            // -------------------------------------------------

            const brand =
                document.createElement("p");

            brand.className =
                "text-muted mb-2";

            brand.textContent =
                String(
                    product.brand || ""
                ).toUpperCase();


            // -------------------------------------------------
            // PRICE
            // -------------------------------------------------

            const price =
                document.createElement("p");

            price.className =
                "text-primary fw-bold fs-5";

            price.textContent =
                formatPrice(
                    product.price
                );


            // -------------------------------------------------
            // ADD TO CART BUTTON
            // IMPORTANT:
            // NO INLINE ONCLICK
            // -------------------------------------------------

            const button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "btn btn-primary w-100";

            button.innerHTML =
                '<i class="bi bi-cart-plus"></i> Add to Cart';


            // Store product index safely
            button.dataset.productIndex =
                index;


            button.addEventListener(
                "click",
                function () {

                    addToCart(
                        product
                    );

                }
            );


            // -------------------------------------------------
            // BUILD CARD
            // -------------------------------------------------

            body.appendChild(
                category
            );

            body.appendChild(
                title
            );

            body.appendChild(
                brand
            );

            body.appendChild(
                price
            );

            body.appendChild(
                button
            );


            productCard.appendChild(
                image
            );

            productCard.appendChild(
                body
            );


            card.appendChild(
                productCard
            );


            productList.appendChild(
                card
            );

        }
    );

}


// =========================================================
// GET CART
// =========================================================

function getCart() {

    try {

        const savedCart =
            localStorage.getItem(
                CART_KEY
            );


        if (!savedCart) {

            return [];

        }


        const cart =
            JSON.parse(
                savedCart
            );


        return Array.isArray(cart)
            ? cart
            : [];


    } catch (error) {

        console.error(
            "RVA Cart Error:",
            error
        );

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
// ADD TO CART
// =========================================================

function addToCart(product) {

    if (!product) {

        console.error(
            "Invalid product."
        );

        return;

    }


    console.log(
        "Adding product to cart:",
        product.name
    );


    const cart =
        getCart();


    // -----------------------------------------------------
    // CHECK EXISTING PRODUCT
    // -----------------------------------------------------

    const existingProduct =
        cart.find(
            function (item) {

                return (
                    item.name ===
                    product.name
                );

            }
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity || 0
            ) + 1;

    } else {

        cart.push({

            name:
                product.name,

            brand:
                product.brand,

            category:
                product.category,

            price:
                Number(product.price) || 0,

            image:
                product.image,

            quantity:
                1

        });

    }


    // -----------------------------------------------------
    // SAVE
    // -----------------------------------------------------

    saveCart(cart);


    // -----------------------------------------------------
    // UPDATE CART
    // -----------------------------------------------------

    updateProductPageCartCount();


    // -----------------------------------------------------
    // CONFIRM
    // -----------------------------------------------------

    alert(
        product.name +
        " has been added to your cart!"
    );


    console.log(
        "Current RVA Cart:",
        getCart()
    );

}


// =========================================================
// UPDATE CART COUNT
// =========================================================

function updateProductPageCartCount() {

    const cart =
        getCart();


    const totalItems =
        cart.reduce(
            function (total, item) {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    console.log(
        "RVA Cart Count:",
        totalItems
    );


    // -----------------------------------------------------
    // #cartCount
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
    // OTHER CART BADGES
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // CART LINKS
    // -----------------------------------------------------

    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    cartLinks.forEach(
        function (link) {

            const existingBadge =
                link.querySelector(
                    "#cartCount, .cart-count, .cart-badge"
                );


            if (existingBadge) {

                existingBadge.textContent =
                    totalItems;

                return;

            }


            link.innerHTML =
                '<i class="bi bi-cart3"></i> Cart (' +
                totalItems +
                ')';

        }
    );

}


// =========================================================
// SEARCH
// =========================================================

function performSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        return;

    }


    const searchValue =
        searchInput.value.trim();


    // -----------------------------------------------------
    // EMPTY SEARCH
    // -----------------------------------------------------

    if (searchValue === "") {

        window.location.href =
            "products.html";

        return;

    }


    const parameters =
        getProductParameters();


    let url =
        "products.html?search=" +
        encodeURIComponent(
            searchValue
        );


    // Preserve brand
    if (
        parameters.brand &&
        parameters.brand.trim() !== ""
    ) {

        url +=
            "&brand=" +
            encodeURIComponent(
                parameters.brand
            );

    }


    window.location.href =
        url;

}


// =========================================================
// SETUP SEARCH
// =========================================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const searchButton =
        document.getElementById(
            "searchButton"
        );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    performSearch();

                }

            }
        );


        // Show current search
        const parameters =
            getProductParameters();


        if (parameters.search) {

            searchInput.value =
                parameters.search;

        }

    }

}


// =========================================================
// CLEAR SEARCH
// =========================================================

function setupClearSearch() {

    const clearButton =
        document.getElementById(
            "clearSearch"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "products.html";

            }
        );

    }

}


// =========================================================
// SEARCH RESULT MESSAGE
// =========================================================

function updateSearchMessage() {

    const searchResult =
        document.getElementById(
            "searchResult"
        );


    if (!searchResult) {

        return;

    }


    const parameters =
        getProductParameters();


    if (
        parameters.search &&
        parameters.search.trim() !== ""
    ) {

        const results =
            getFilteredProducts();


        searchResult.innerHTML = `

            <div class="alert alert-primary text-center">

                <i class="bi bi-search"></i>

                Showing

                <strong>
                    ${results.length}
                </strong>

                result(s) for

                <strong>
                    "${escapeHTML(parameters.search)}"
                </strong>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-primary ms-2"
                    id="showAllProducts"
                >
                    Show All Products
                </button>

            </div>

        `;


        const showAllButton =
            document.getElementById(
                "showAllProducts"
            );


        if (showAllButton) {

            showAllButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "products.html";

                }
            );

        }

    } else {

        searchResult.innerHTML = "";

    }

}


// =========================================================
// STORAGE CHANGE
// =========================================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === CART_KEY
        ) {

            updateProductPageCartCount();

        }

    }
);


// =========================================================
// GLOBAL FUNCTIONS
// =========================================================

window.addToCart =
    addToCart;

window.updateProductPageCartCount =
    updateProductPageCartCount;
