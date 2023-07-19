// Smooth scroll to the selected target
function smoothScroll(target) {
	const element = document.querySelector(target);
	const position = element.getBoundingClientRect().top;
	window.scrollBy({
		top: position,
		left: 0,
		behavior: 'smooth'
	});
}

// Add click event listeners to the navbar links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		const target = link.getAttribute('href');
		smoothScroll(target);
	});
});