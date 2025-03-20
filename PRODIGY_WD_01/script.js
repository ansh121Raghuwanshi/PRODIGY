document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("navMenu");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
});
