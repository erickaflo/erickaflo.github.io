// Gentle reveal of sections + "back to room" button + hotspot flash.
(function () {
	"use strict";

	var sections = document.querySelectorAll("section");
	var backToRoom = document.getElementById("to-room");

	if ("IntersectionObserver" in window) {
		var reveal = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) { e.target.classList.add("revealed"); reveal.unobserve(e.target); }
			});
		}, { threshold: 0.15 });
		sections.forEach(function (s) { reveal.observe(s); });

		var room = document.getElementById("room");
		var showBack = new IntersectionObserver(function (entries) {
			backToRoom.classList.toggle("show", !entries[0].isIntersecting);
		}, { threshold: 0.1 });
		showBack.observe(room);
	} else {
		sections.forEach(function (s) { s.classList.add("revealed"); });
	}

	// Flash the target section when navigating from a hotspot.
	document.querySelectorAll(".hotspot").forEach(function (h) {
		h.addEventListener("click", function () {
			var target = document.querySelector(h.getAttribute("href"));
			if (!target) return;
			target.classList.add("flash");
			setTimeout(function () { target.classList.remove("flash"); }, 1400);
		});
	});
})();
