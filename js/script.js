document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("hamburger");
	const navMenu = document.getElementById("nav-menu");

	hamburger.addEventListener("click", function () {
		navMenu.classList.toggle("active");
    });
    
    document.addEventListener("click", function (event) {
		const target = event.target;
		if (!navMenu.contains(target) && !hamburger.contains(target)) {
			navMenu.classList.remove("active");
		}
	});
});


