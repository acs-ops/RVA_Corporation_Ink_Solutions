/* =========================================================
   RVA CORPORATION - WEBSITE SEARCH
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    if (!searchInput || !searchButton) {
        return;
    }


    function performSearch() {

        const searchTerm = searchInput.value.trim();

        if (searchTerm === "") {

            alert("Please enter a product or keyword to search.");

            searchInput.focus();

            return;
        }


        // Save the search term
        localStorage.setItem("rvaSearchTerm", searchTerm);


        // Go to the Products page
        window.location.href =
            "products.html?search=" +
            encodeURIComponent(searchTerm);

    }


    // Search button

    searchButton.addEventListener("click", function () {

        performSearch();

    });


    // Press Enter to search

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            performSearch();

        }

    });

});