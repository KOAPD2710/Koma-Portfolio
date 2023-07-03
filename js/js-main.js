function main() {

}
function lightDarkMode(){

	const darkmode = gsap.timeline({paused:true});

	const tl = gsap.timeline();

	tl.to('html, body', {backgroundColor: '#222', duration:0.2});
	tl.to("#ldmode svg", {fill: '#EDEDED', duration:0.2}, "<");
	tl.to("svg", {fill: '#EDEDED', duration:0.2}, "<");
	tl.to("h1, h2, h3, h, h5, p", {color: '#EDEDED', duration: .5}, "<");
	tl.set("a", {color: '#EDEDED'}, "<");
	tl.to("div, a", {borderColor: '#EDEDED', duration:0.2}, "<");
	// tl.to("#navigation .square .text p", {background: '-webkit-linear-gradient(#EDEDED 0%, #EDEDED 50%, #222 50%, #222 100%)', backgroundClip: 'text', duration:0.2}, "<");

	darkmode.add(tl);
	var ease = "power1.inOut",
			duration = .5;
	const button = document.getElementById("ldmode"),
		naviSqare = document.querySelector('#navigation .square');

	button.addEventListener("click", () => {
		if (!button.classList.contains("darkmode")) {
			// Play Timeline
			darkmode.play();
			button.classList.toggle("darkmode");
			naviSqare.classList.toggle("clicked");
			gsap.to('#LD1', {yPercent: 95, ease: ease, duration: duration});
			gsap.to('#LD2', {yPercent: -95, ease: ease, duration: duration});
		} else {
			// Reverse Timeline
			darkmode.reverse();
			button.classList.toggle("darkmode");
			naviSqare.classList.toggle("clicked");
			gsap.to('#LD1', {yPercent: 0, ease: ease, duration: duration});
			gsap.to('#LD2', {yPercent: 0, ease: ease, duration: duration});
		}
	});
}
function setUpscrollBar() {
	const scrollbar = document.getElementById('scrollbar'),
		bar = $('#scrollitem');

	height = $(window).innerHeight();
	barH = 0;
	scroll = $(window).scrollTop();
	root = (bar.offset().top - scroll)+barH;
	full = $('body').innerHeight();
	scrollPlus = height - root - (bar.offset().top-scroll);
	scrollPercent = scroll/(full - height);
	barHeight = barH + scrollPercent*(scrollPlus);

	gsap.to(bar, {
		height: barHeight,
		ease: 'none',
		duration: .1
	});
}


function scrollBar() {
	const scrollbar = document.getElementById('scrollbar'),
		bar = $('#scrollitem');

	height = $(window).innerHeight();
	barH = 100;

	window.addEventListener('scroll', function() {


		gsap.to(scrollbar, {
			opacity: 1,
			filter: "blur(0px)",
			duration: .1,
			ease: 'power1.inOut',
			onUpdate: setUpscrollBar(),
			onComplete: hideScroolBar(scrollbar),
		})
	
	});
	function hideScroolBar(o) {
		gsap.to(o, {
			opacity: 0,
			filter: "blur(8px)",
			delay: 1,
			duration: .5,
			ease: "power4.in",
		})
	}


}

window.addEventListener('load', function() {
	main();
	lightDarkMode();
	scrollBar();
	setUpscrollBar();
})