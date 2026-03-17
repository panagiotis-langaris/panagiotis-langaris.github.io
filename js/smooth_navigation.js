const navbar = document.querySelector('.navbar');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navbarToggle = document.querySelector('.navbar-toggle');
const backToTopButton = document.querySelector('#mobile-back-to-top');
const navLinks = Array.from(document.querySelectorAll('.navbar a.page-scroll'));
const trackedLinks = navLinks.filter((link) => {
	const href = link.getAttribute('href') || '';
	return href.startsWith('#');
});
const trackedSections = trackedLinks
	.map((link) => document.querySelector(link.getAttribute('href')))
	.filter(Boolean);

function updateNavbarState() {
	if (!navbar) {
		return;
	}

	navbar.classList.toggle('navbar-shrink', window.scrollY > 32);
}

function updateBackToTopState() {
	if (!backToTopButton) {
		return;
	}

	const shouldShow = window.innerWidth < 768 && window.scrollY > 280;
	backToTopButton.classList.toggle('is-visible', shouldShow);
}

function setActiveLink() {
	if (!trackedSections.length) {
		return;
	}

	const scrollPosition = window.scrollY + 140;
	let currentSectionId = trackedSections[0].id;

	trackedSections.forEach((section) => {
		if (scrollPosition >= section.offsetTop) {
			currentSectionId = section.id;
		}
	});

	trackedLinks.forEach((link) => {
		const parent = link.parentElement;
		const isActive = link.getAttribute('href') === `#${currentSectionId}`;

		if (parent) {
			parent.classList.toggle('active', isActive);
		}
	});
}

function smoothScrollTo(targetSelector) {
	const target = document.querySelector(targetSelector);
	if (!target) {
		return;
	}

	const navbarHeight = navbar ? navbar.offsetHeight : 0;
	const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12;

	window.scrollTo({
		top: targetTop,
		behavior: 'smooth'
	});
}

function closeMobileMenu() {
	if (!navbarCollapse || window.innerWidth >= 768) {
		return;
	}

	navbarCollapse.classList.remove('in');
	navbarCollapse.setAttribute('aria-expanded', 'false');

	if (navbarToggle) {
		navbarToggle.classList.add('collapsed');
		navbarToggle.setAttribute('aria-expanded', 'false');
	}
}

if (backToTopButton) {
	backToTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

trackedLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		smoothScrollTo(link.getAttribute('href'));
		closeMobileMenu();
	});
});

window.addEventListener('scroll', () => {
	updateNavbarState();
	setActiveLink();
	updateBackToTopState();
});

window.addEventListener('load', () => {
	updateNavbarState();
	setActiveLink();
	updateBackToTopState();
});

window.addEventListener('resize', updateBackToTopState);
