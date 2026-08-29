// =========================================================
// RVA CORPORATION - ADMIN AUTHENTICATION
// =========================================================
// Protects admin pages from users who are not authorized.
// =========================================================

document.addEventListener("DOMContentLoaded", async function () {

    console.log("RVA Admin Authentication initialized.");

    // =====================================================
    // AUTHORIZED ADMIN ACCOUNTS
    // =====================================================

    const ADMIN_EMAILS = [
        "gufyaripsu@gmail.com",
        "rvahelpdesk18@gmail.com"
    ];


    // =====================================================
    // CHECK SUPABASE SESSION
    // =====================================================

    try {

        const {
            data,
            error
        } = await supabaseClient.auth.getSession();


        if (error) {

            console.error(
                "Admin session check failed:",
                error
            );

            window.location.href = "admin-login.html";

            return;
        }


        const session =
            data.session;


        // =================================================
        // NO LOGIN SESSION
        // =================================================

        if (!session || !session.user) {

            console.warn(
                "No admin login session found."
            );

            window.location.href =
                "admin-login.html";

            return;
        }


        // =================================================
        // GET USER EMAIL
        // =================================================

        const user =
            session.user;


        const email =
            (user.email || "")
                .toLowerCase()
                .trim();


        console.log(
            "Logged-in user:",
            email
        );


        // =================================================
        // CHECK ADMIN EMAIL
        // =================================================

        if (!ADMIN_EMAILS.includes(email)) {

            console.warn(
                "Unauthorized user attempted to access admin page:",
                email
            );


            await supabaseClient.auth.signOut();


            alert(
                "You are not authorized to access the Admin Orders page."
            );


            window.location.href =
                "admin-login.html";


            return;
        }


        // =================================================
        // ADMIN VERIFIED
        // =================================================

        console.log(
            "RVA ADMIN ACCESS GRANTED:",
            email
        );


        // Show the page after authentication
        document.body.style.display = "";


    } catch (error) {

        console.error(
            "Admin authentication error:",
            error
        );


        window.location.href =
            "admin-login.html";

    }

});