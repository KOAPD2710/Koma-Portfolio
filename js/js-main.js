	height = $(window).innerHeight();

function main() {
	const scrollHandler = new ScrollHandler('#scrollitem', '#scrollbar');
	const jellyBlob 	= new JellyBlobCursor("#cursorTarget", "#cursorTarget .text");
	const hoverHandler 	= new HoverHandler('.visHovering', '.thumbHovering', '#cursorTarget');

	const naviHeight = $(".naviSticky").innerHeight();
	document.documentElement.style.setProperty("--naviHeight", ' ' +naviHeight+ 'px');

	gsap.to('#cursorTarget .goLink .circleprj-container', {
		rotate: 360,
		duration: 8,
		repeat: -1,
		ease: 'none',
	})

	let marquee = gsap.utils.toArray(".marquee-format");
	marquee.forEach((marquee, i) => {
		new MarqueeCloner(marquee, 10);
		new Marquee(marquee, 250);
	})
	// let marqueeSmallText = gsap.utils.toArray(".marqueeSmallText");
	// marqueeSmallText.forEach((marquee, i) => {
	// 	new MarqueeSmall(marquee, 150);
	// })


	let marqueeLogo = gsap.utils.toArray(".marquee-logo");
	marqueeLogo.forEach((marqueeLogo, i) => {
		new MarqueeLogo(marqueeLogo, 1)
	})

	var hoveringTargets = ['.visHovering', '.thumbHovering', '.naviHovering', '.wwmHovering', '.goLinkHovering'];
	hoveringTargets.forEach(function(hoveringTarget) {
		new HoverHandler(hoveringTarget, '#cursorTarget');
	});

	var mainHeight = $("#bodycontainer").innerHeight();
	$("#navigation").css('height', ' ' + mainHeight + 'px');

	$('.workWithMe').hover(function() {
		$(this).find('.arrowContainer').toggleClass('hovering');
	})

	pTags = gsap.utils.toArray('p');
	const classNameToFilter = 'notThis';
	const filteredPTags = pTags.filter(pTag => !pTag.classList.contains(classNameToFilter));

	filteredPTags.forEach((target) =>  {
		gsap.from(target, {
			scrollTrigger: {
				trigger: target,
				start: 'top bottom',
				toggleActions: 'play resume resume reset',
			},
			y: 40,
			opacity: 0,
			ease: 'Power1.out',
			duration: .5,
		})
	})
}
function appendToHTML() {
	const svgK = `<span>
	<svg class="kNav" viewBox="0 0 28.7 28.7"><path d="m16.6,14.3c8.5-2.3,11.4-7.6,12-13.1C28.7.3,28.5,0,27.5,0c-8.8,0-17.5,0-26.3,0C.2,0,0,.3,0,1.2v26.2c0,.9.2,1.2,1.2,1.2,8.8,0,17.5,0,26.3,0,1,0,1.2-.3,1.1-1.2-.6-5.5-3.5-10.8-12-13.1Z" />
	</svg></span>`;
	const curtain = `<div class="loadCurtain"></div>`

	$('.body-ts.svg-text').prepend(svgK);
	$('.appendCurtain').append(curtain);
}
class Marquee {
	constructor(selector, speed) {
		this.selector = $(selector);
		this.container = this.selector.find('.marquee-container');
		this.target = this.selector.find('.marquee-content');
		this.targetWidth = this.target.innerWidth();
		this.speed = speed || 400;

		this.runSpeed = this.speed;

		if (this.selector.hasClass('marqueeSmallText')) {
			this.runSpeed = this.speed/1.2;
		}

		if (this.selector.hasClass('reverseMarquee')) {
			this.upstream();
		} else {
			this.downstream();
		}
	}

	downstream() {
		gsap.to(this.target, {
			scrollTrigger: {
				trigger: this.selector,
				start: 'top bottom',
				end: 'bottom top',
			},
			// onStart: () => {
			// 	gsap.from(this.container, {
			// 		yPercent: 150,
			// 		opacity: 0,
			// 		ease: "expo.out",
			// 		duration: 1,
			// 		delay: .2
			// 	})
			// },
			x: -this.targetWidth,
			repeat: -1,
			ease: 'none',
			duration: this.targetWidth / this.runSpeed,
		})
	}
	upstream() {
		gsap.fromTo(this.target, {
			x: -this.targetWidth,
		},{
			scrollTrigger: {
				trigger: this.selector,
				start: 'top bottom',
				end: 'bottom top',
			},
			// onStart: () => {
			// 	gsap.from(this.container, {
			// 		yPercent: 150,
			// 		opacity: 0,
			// 		ease: "expo.out",
			// 		duration: 1,
			// 	})
			// },
			x: 0,
			repeat: -1,
			ease: 'none',
			duration: this.targetWidth / this.runSpeed,
		})
	}
}
class MarqueeCloner {
	constructor(selector, numClones) {
		this.target = $(selector);
		this.numClones = numClones || 6;
		this.container = this.target.find('.marquee-container');
		this.clone = this.target.find('.marquee-content');


		for (let i = 1; i < this.numClones; i++) {
			this.clone.clone().appendTo(this.container)
		}
		
	}
}
class MarqueeLogo {
	constructor(selector, time) {
		this.target = $(selector);
		this.kWord = this.target.find('.logoMarqueeK');
		this.oWord = this.target.find('.logoMarqueeO');
		this.mWord = this.target.find('.logoMarqueeM');
		this.aWord = this.target.find('.logoMarqueeA');
		this.time = time || 2;

		gsap.defaults({ease: "power1.inOut", duration: this.time});

		const logoMarqueeTL = gsap.timeline();

		logoMarqueeTL.fromTo(this.kWord,
			{xPercent: 0},
			{xPercent: -100, delay: this.time,})
		.fromTo(this.oWord,
			{yPercent: 0},
			{yPercent: 100}, 3*this.time)
		.fromTo(this.oWord,
			{xPercent: -100},
			{xPercent: 0}, this.time)
		.fromTo(this.mWord,
			{yPercent: 0},
			{yPercent: 100}, 5*this.time)
		.fromTo(this.mWord,
			{yPercent: 100},
			{yPercent: 0}, 3*this.time)
		.fromTo(this.aWord,
			{yPercent: 0},
			{yPercent: 100}, 7*this.time)
		.fromTo(this.aWord,
			{yPercent: 100},
			{yPercent: 0}, 5*this.time)
		.fromTo(this.kWord,
			{xPercent: -100},
			{xPercent: 0}, 7*this.time);

		gsap.set(this.kWord, {xPercent: 0,})

		logoMarqueeTL.eventCallback('onComplete', function() {
			logoMarqueeTL.play(0)
		})
	}
}
function lightDarkMode(){
	const white = "#FDFBF3";
	const dark = "#222";
	const button = document.getElementById("ldMode");
	const activeCycle = $('#ldMode .activeCycle');

	button.addEventListener("click", () => {
		if (!button.classList.contains("darkMode")) {
			// Play Timeline
			// darkmode.play();
			darkMode();
		} else {
			// Reverse Timeline
			// darkmode.reverse();
			lightMode();
		}
	});

	var ease = "power4.out",
		duration = .6,
		svgSize = 22,
		padding = 5,
		gapsvg = 16;
	$('#ldMode').css("--svgSize", svgSize + "px");
	$('#ldMode').css("--padding", padding + "px");
	$('#ldMode').css("--gapsvg", gapsvg + "px");
	function lightMode() {
		document.documentElement.style.setProperty("--fillColor", white);
		document.documentElement.style.setProperty("--strokeColor", dark);
		document.documentElement.style.setProperty("--text", dark);
		localStorage.setItem('mode', 'lightMode');
		mode = localStorage.getItem('mode');
		console.log(mode);

		$('body').addClass('lightMode');
		$("#ldMode").addClass('lightMode');
		$('body').removeClass('darkMode');
		$("#ldMode").removeClass('darkMode');
		gsap.to(activeCycle, {x: .9*svgSize+gapsvg, ease: ease, duration: duration});
	}
	function darkMode() {
		document.documentElement.style.setProperty("--fillColor", dark);
		document.documentElement.style.setProperty("--strokeColor", white);
		document.documentElement.style.setProperty("--text", white);
		localStorage.setItem('mode', 'darkMode');
		mode = localStorage.getItem('mode');
		console.log(mode);

		$('body').addClass('darkMode');
		$("#ldMode").addClass('darkMode');
		$('body').removeClass('lightMode');
		$("#ldMode").removeClass('lightMode');
		gsap.to(activeCycle, {x: 0, ease: ease, duration: duration});
	}

	// localStorage.clear();
	// localStorage.setItem('mode', 'none');
	mode = localStorage.getItem('mode');
	if (mode == null) {
		prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
		
		if (prefersDarkMode === true) {
			darkMode()
		} else {
			lightMode();
		}
	} if (mode === 'darkMode') {
		darkMode();
	} if (mode === 'lightMode') {
		lightMode();
	}
	console.log(mode)
	// const 	whiteColor = '#EDEDED',
	// 		blackColor = '#222',
	// 		whiteBlur = 'rgba(239, 239, 239, .1)',
	// 		blackBlur = 'rgba(34, 34, 34, .1)';
	
	// const darkmode = gsap.timeline({paused:true});
	// const tl = gsap.timeline();
	// tl.to('html, body, #navigation', {backgroundColor: blackColor, duration:0.2});
	// // tl.to("#ldmode svg", {fill: whiteColor, duration:0.2}, "<");
	// tl.to("svg", {fill: whiteColor, stroke: whiteColor, duration:0.2}, "<");
	// tl.to("h1, h2, h3, h, h5, p", {color: whiteColor, duration: .5}, "<");
	// tl.set("a", {color: whiteColor}, "<");
	// tl.to(".activeCycle", {backgroundColor: whiteColor, duration:0.2}, "<");
	// tl.to("div", {borderColor: whiteColor, duration:0.2}, "<");
	// darkmode.add(tl);
}
class HoverHandler {
	constructor(target, cursorSelector) {
		this.target = gsap.utils.toArray(target);
		this.name = target.substring(1);
		this.cursorElement = $(cursorSelector);

		this.addHoverEffect();
	}

	addHoverEffect() {
		
		$(this.target).hover(

			() => {
				this.cursorElement.addClass(this.name);
				// console.log(this.name);
			},
			() => {
				this.cursorElement.removeClass(this.name);
			}
		);
	}
}

class ScrollHandler {
	constructor(barSelector, scrollbarSelector) {
		this.bar = $(barSelector);
		this.scrollbar = $(scrollbarSelector);
		this.barHeight = 0;
		this.scroll = $(window).scrollTop();

		// this.handleScroll = this.handleScroll.bind(this);

		this.setUpscrollBar();

		$(window).on('scroll', () => {
			this.setUpscrollBar();
		});
	}

	setUpscrollBar() {
		this.scroll = $(window).scrollTop();
		this.full = $('body').innerHeight() - $(window).innerHeight();
		this.barHeight = this.scroll*100 / this.full;

		gsap.to(this.bar, {
			height: this.barHeight + '%',
			ease: 'expo.out',
			duration: 1,
			onStart: this.handleScroll(),
			// onUpdate: this.handleScroll(),
			onComplete: this.hideScrollBar(),
		});
		// console.log(this.scroll, this.barHeight + '%', full);
	}

	hideScrollBar() {
		gsap.to(this.scrollbar, {
			opacity: 0,
			filter: 'blur(4px)',
			delay: .5,
			duration: .5,
			ease: 'power3.in',
		});
	}

	handleScroll() {
		gsap.to(this.scrollbar, {
			opacity: 1,
			filter: 'blur(0px)',
			duration: 1,
			ease: 'expo.out',
		});
	}
}
class JellyBlobCursor {
	constructor(cursorSelector, textSelector) {
		this.jellyRef = $(cursorSelector);
		this.textRef = $(textSelector);
		this.arrowSelector = this.jellyRef.find('.arrowFooter');
		this.box = this.jellyRef.find('.box');
		this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		this.prevPos = { x: this.pos.x, y: this.pos.y };
		this.vel = {x: 0, y: 0};
		this.set = {};
		this.scroll = window.scrollY;

		// Create quickSetters
		this.set.x 	= gsap.quickSetter(this.jellyRef, "x", "px");
		this.set.y 	= gsap.quickSetter(this.jellyRef, "y", "px");
		this.set.r 	= gsap.quickSetter(this.box, "rotate", "deg");
		this.set.sx = gsap.quickSetter(this.box, "scaleX");
		this.set.sy = gsap.quickSetter(this.box, "scaleY");
		this.set.rt = gsap.quickSetter(this.arrowSelector, "rotate", "deg");
		this.speed = .8;

		// Run on Mouse Move
		const setFromEvent = (e) => {
			const x = e.clientX;
			const y = e.clientY;
			this.jellyRef.removeClass('hoverNow');

			// Animate Pos Object and calculate Vel Object Velocity

			gsap.to(this.pos, {
				x: x,
				y: y,
				duration: this.speed,
				ease: "expo.out",
				onUpdate: () => {
					this.vel.x = x - this.pos.x;
					this.vel.y = y - this.pos.y;
					// console.log(this.vel)
				}
			});
			this.loop();
		};
		gsap.ticker.add(() => this.loop());

		$(document).mousemove(setFromEvent);

		// Add the animation loop to GSAP's ticker
		

		// Listen to window scroll event
		$(window).scroll(() => {
			this.scroll = window.scrollY;
			 // Get the horizontal scroll position
			this.loop(); // Update the animation
		});
	}

	// Function for Mouse Move Scale Change
	getScale(diffX, diffY) {
		const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
		return Math.min(distance / 400, 0.7);
	}

	// Function For Mouse Movement Angle in Degrees
	getAngle(diffX, diffY) {
		return (Math.atan2(diffY, diffX) * 180) / Math.PI;
	}

	// Animation loop
	loop() {
		// Calculate angle and scale based on velocity
		var rotation = this.getAngle(this.vel.x, this.vel.y);
		var scale = this.getScale(this.vel.x, this.vel.y);

		const newY = this.pos.y + this.scroll;

		this.set.x(this.pos.x);
		this.set.y(newY);
		this.set.r(rotation);
		this.set.sx(1 + scale);
		this.set.sy(1 - scale);
		this.set.rt(-rotation);
		// console.log(scale)
	}
}
$(document).ready(function(e) {
	main();
	lightDarkMode();
	appendToHTML();
	// textInAnmation();

	var loadCurtain = gsap.utils.toArray('.loadCurtain');

	function pageInTransition() {
		gsap.to(loadCurtain, {
			height: '0%',
			duration: 2,
			ease: "expo.inOut",
			stagger: {
				each: .5,
				amount: .5,
			},
			onStart: function () {
				$('#handlePageTransition').css('display', 'none');
			}
		})
	}
	function pageOutTransition() {
		gsap.to(loadCurtain, {
			height: '100%',
			duration: 1.5,
			ease: "expo.in",
			stagger: {
				each: .3,
				amount: .5,
			}
		})
	}
	window.scrollTo(0, 0);
	pageInTransition();
	// Select all a tags
	const links = document.querySelectorAll("a[prefetch]");

	// Loop through each a tag
	links.forEach((link) => {
		// Add click event listener
		link.addEventListener("click", function (e) {
			$('#naviLink .link li').removeClass('active');
			pageOutTransition();
			// Prevent default behavior
			e.preventDefault();
			// Get the href attribute value
			const href = this.getAttribute("href");
			const prefetchLink = document.createElement('link');
			prefetchLink.rel = 'prefetch';
			prefetchLink.href = href;
			document.head.appendChild(prefetchLink);
			// Delay for 500ms
			var lengthCurtain = gsap.utils.toArray('.loadCurtain').length;
			console.log(lengthCurtain);

			setTimeout(() => {
				// Redirect to the href value
				window.location.href = href;
			}, lengthCurtain*200);
		});
	});
})