// import { width } from './js/js-module.js';

width = $(window).innerWidth();
height = $(window).innerHeight();
naviHeight = $('#navigation').innerHeight();

document.body.addEventListener('resize', function() {
	width = $(window).innerWidth();
	height = $(window).innerHeight();
})


function work() {
	$('.naviHeight').css('height', ' ' + naviHeight + 'px');

	ScrollTrigger.create({
		trigger: '.section1',
		start: "top 72px",
		pin: true, 
		pinSpacing: false,
	});

	let panels = gsap.utils.toArray(".section2 .panel");
	
	panels.forEach((panel, i) => {
		ScrollTrigger.create({
			trigger: panel,
			start: "top 71px",
			pin: true, 
			pinSpacing: false,
		});
	});
}

window.addEventListener('load', function() {
	work();
})