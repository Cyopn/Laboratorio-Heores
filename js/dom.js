document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById("hamburger")) {
		const navMenu = document.getElementById("nav-menu");
		navMenu.addEventListener("click", function () {
			navMenu.classList.remove("active");
		});
		const hamburger = document.getElementById("hamburger");
		hamburger.addEventListener("click", function () {
			navMenu.classList.toggle("active");
		});
	}
})