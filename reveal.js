/*
	Scroll reveal — added 2026-10-30.

	Progressive enhancement only: the .reveal class (which hides the box)
	is applied by this script, so if JS is disabled or this file fails to
	load, every box renders normally and nothing is ever hidden.
*/
(function () {
	'use strict';

	var boxes = document.querySelectorAll('#content > div');
	if (!boxes.length) {
		return;
	}

	// No IntersectionObserver (old browser) — leave everything visible.
	if (!('IntersectionObserver' in window)) {
		return;
	}

	// Honor the OS "reduce motion" setting.
	if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	var i;
	for (i = 0; i < boxes.length; i++) {
		boxes[i].classList.add('reveal');
	}

	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

	for (i = 0; i < boxes.length; i++) {
		observer.observe(boxes[i]);
	}
}());
