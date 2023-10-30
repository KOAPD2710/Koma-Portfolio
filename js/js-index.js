width = $(window).innerWidth();
height = $(window).innerHeight();

const naviHeight = $(".naviSticky").innerHeight();

document.body.addEventListener('resize', function() {
	width = $(window).innerWidth();
	height = $(window).innerHeight();
})

function index() {

	var indexScrollTrigger = {
			trigger: '.section2',
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
		},
		indexEase = "Power1.easeOut";

	gsap.timeline().to('.kHero', {
		scrollTrigger: indexScrollTrigger,
		x: -150,
		y: 350,
		rotate: 15,
		scale: 1.05,
		ease: indexEase
	},0).to('.oHero', {
		scrollTrigger: indexScrollTrigger,
		x: -80,
		y: 250,
		ease: indexEase
	},0.1).to('.mHero', {
		scrollTrigger: indexScrollTrigger,
		x: 50,
		y: 450,
		rotate: -15,
		scale: .95,
		ease: indexEase
	},0.2).to('.aHero', {
		scrollTrigger: indexScrollTrigger,
		x: 250,
		y: 290,
		rotate: 25,
		scale: 1.1,
		ease: indexEase
	},0.3);
	gsap.from('.heroSection svg', {
		y: 200,
		opacity: 0,
		duration: 1.2,
		ease: "power3.out",
		delay: 7.4,
	})

	ScrollTrigger.create({
		trigger: '.section4 .stickyContainer',
		// start: `top ${naviHeight-1}`,
		start: `top top`,
		endTrigger: '.section4',
		end: "bottom top",
		pin: true, 
		pinSpacing: false,
	});

	gsap.to('.section4 .circle svg', {
		scrollTrigger: {
			trigger: '.section4',
			start: 'top bottom',
		},
		transformOrigin: 'center center',
		rotate: 360,
		ease: 'none',
		repeat: -1,
		duration: 15,
	})
	gsap.fromTo('.section4 .cardDiv', {
		y: 100
	}, {
		scrollTrigger: {
			trigger: '.section4',
			start: 'top bottom',
			end: 'bottom top',
			scrub: .5,
			// markers: true
		},
		y: -100,
		ease: 'power1.in'
	})
	gsap.fromTo('.section4 .circle1', {
		yPercent: 50,
		// scale: 1,
	}, {
		scrollTrigger: {
			trigger: '.section4',
			start: 'top bottom',
			end: 'bottom top',
			scrub: 1,
		},
		yPercent: -10,
		// scale: 1.1,
	})
	gsap.fromTo('.section4 .circle2', {
		yPercent: -80,
		// scale: 1,
	}, {
		scrollTrigger: {
			trigger: '.section4',
			start: 'top bottom',
			end: 'bottom top',
			scrub: 1,
		},
		yPercent: -30,
		// scale: 1.1,
	})

	new workSelectionThumbNew('#workSelectionThumb', '.section6');
}

class workSelectionThumbNew {
	constructor(target, wrapper) {
		this.target = $(target);
		this.wrapper = $(wrapper);
		this.thumbnail = this.target.find('.thumbMove');

		this.thumbnailTransition('.workSelection');
		this.thumbnailMove(this.thumbnail);
	}
	thumbnailTransition(selectionTarget) {
		const filterSelected = document.getElementById('filterSelected'),
		feTurbulence = filterSelected.querySelector("feTurbulence"),
		animateFeTurbulence = feTurbulence.querySelector("animate"),
		feDisplacementMap = filterSelected.querySelector("feDisplacementMap"),
		animateFeDisplacementMap = feDisplacementMap.querySelector("animate");

		var workSelections = gsap.utils.toArray(selectionTarget);
		workSelections.forEach(function(workSelection) {
			$(workSelection).hover(function() {
				$(this).addClass('hovering');
				$('#workSelectionThumb').addClass('hovering');

				var target = $(this).data('target');
				$('#workSelectionThumb .visible img[data-target="' + target + '"]').css('opacity', 1);

				animateFeDisplacementMap.beginElement();
			}, function() {
				$(this).removeClass('hovering');
				$('#workSelectionThumb').removeClass('hovering');

				var target = $(this).data('target');
				$('#workSelectionThumb .visible img[data-target="' + target + '"]').css('opacity', 0);
			})
		})
	}
	thumbnailMove(target) {
		$('.section6').hover(() => {
			var targetPos = {x:0, y:0},
				halfWidth = $(window).innerWidth()/2;

			window.addEventListener('mousemove', function(event) {
				this.cursorX = halfWidth + ((event.pageX  - halfWidth)*.7);
				this.cursorY = event.pageY - $('.section6').offset().top;

				gsap.to(target, {
					x: this.cursorX,
					y: this.cursorY,
					ease: 'expo.out',
					duration: 2,
				})
			})
		})
	}
}
// function workSelectionThumb() {
// 	var target = $('.section6 #workSelectionThumb');
// 	var thumb = $('.section6 .thumbMove');
// 	var isFunctionRunning = false;
// 	var debounceTimeout;

// 	// var scroll = window.scrollY || window.pageYOffset;

// 	function updateThumbPosition() {
// 		if (!isFunctionRunning) {
// 			return;
// 		}
// 		cursorX = event.pageX;
// 		cursorY = event.pageY;
// 		topTrigger = $('.section6').offset().top;
// 		dis = cursorY - topTrigger;
// 		gsap.to(thumb, {
// 			x: cursorX*.8,
// 			y: dis,
// 			ease: 'Power1.easeInOut',
// 			duration: .1,
// 		})
// 	}

// 	function startFunction() {
// 		isFunctionRunning = true;
// 		$(document).on('mousemove', updateThumbPosition);
// 	}
// 	function stopFunction() {
// 		isFunctionRunning = false;
// 		$(document).off('mousemove', updateThumbPosition);
// 	}
// 	$('.section6').hover(function() {
// 		startFunction();
// 		animateFeDisplacementMap.beginElement();
// 	}, function() {
// 		stopFunction();
// 	});

// 	const filterSelected = document.getElementById('filterSelected'),
// 	feTurbulence = filterSelected.querySelector("feTurbulence"),
// 	animateFeTurbulence = feTurbulence.querySelector("animate"),
// 	feDisplacementMap = filterSelected.querySelector("feDisplacementMap"),
// 	animateFeDisplacementMap = feDisplacementMap.querySelector("animate");

// 	$('.section6').hover(function() {
// 		startFunction();
// 		animateFeDisplacementMap.beginElement();
// 	}, function() {
// 		stopFunction();
// 	});

// 	var workSelection = gsap.utils.toArray('.workSelection');
// 	workSelection.forEach(function(workSelection) {

// 		var workSectionInstance;
// 		$(workSelection).hover(function() {
// 			$(this).toggleClass('hovering');
// 			$(this).removeClass('none');
// 			$('#workSelectionThumb').toggleClass('hovering');

// 			var target = $(this).data('target');
// 			$('#workSelectionThumb .visible img[data-target="' + target + '"]').css('opacity', 1);

// 			workSectionInstance = new selectedWorkSection(this);
// 			animateFeDisplacementMap.beginElement();
// 		}, function() {
// 			$(this).toggleClass('hovering');
// 			$('#workSelectionThumb').toggleClass('hovering');

// 			var target = $(this).data('target');
// 			$('#workSelectionThumb .visible img[data-target="' + target + '"]').css('opacity', 0);

// 			workSectionInstance.stop();
// 			workSectionInstance = null;
// 		})
// 	})
// }
class selectedWorkSectionNew {
	constructor(panel) {
		this.container = $(panel);
		this.panel = this.container.find('.panel');

		this.panel.each(function() {
			$(this).hover(function() {
				$(this).addClass('hovering')
			}, function() {
				$(this).removeClass('hovering')
			})
		})

	}
}
function splitText() {
	// Select the target paragraph
	const originalParagraph = $('.textLandingPage');

	// Get the text content of the paragraph
	const text = originalParagraph.text();

	// Create an array of individual letters
	const letters = text.split('');

	// Create an empty string to store the new HTML content
	let newHtml = '';

	// Iterate through the letters and wrap each one in a <p> tag
	for (let i = 0; i < text.length; i++) {
		if (text[i] === ' ') {
			// If the character is a space, add a <p> tag with a space
			newHtml += '<p>&nbsp;</p>';
		} else {
			// If the character is not a space, add a <p> tag with the character
			newHtml += `<p>${text[i]}</p>`;
		}
	}
	// Replace the original paragraph's HTML with the new HTML
	originalParagraph.html(newHtml);
}
function landingPage() {
	const landPage = $('.landingPage');
	const textlandPage = landPage.find('.textLandingPage');
	const letterLandPage = textlandPage.children('p');
	const logoLandingPage = landPage.find('.logoLandingPage');
	const kLogo = logoLandingPage.find('.kLDP');
	const oLogo = logoLandingPage.find('.oLDP');
	const mLogo = logoLandingPage.find('.mLDP');
	const aLogo = logoLandingPage.find('.aLDP');

	var loadCurtain = gsap.utils.toArray('.loadCurtain');

	disableScroll();
	const tl = gsap.timeline();

	tl.from(letterLandPage, {
		display: "none",
		stagger: .09,
		ease: 'expo.out',
	}, 1).from(textlandPage, {
		y: 50,
		ease: 'power1.out',
		duration: 1.4,
	}, 3).from(logoLandingPage.find('.path'), {
		yPercent: 150,
		ease: 'power1.inOut',
		duration: 1.3,
		stagger: .2,
	}, 3.2).to(textlandPage, {
		opacity: 0,
		ease: 'sine.inOut',
		duration: 1,
	}, 5).to(logoLandingPage.find('.path'), {
		opacity: 0,
		ease: 'sine.inOut',
		duration: 1,
		// stagger: .2,
	}, 5.5).to(landPage, {
		height: 0,
		ease: 'sine.inOut',
		duration: .8,
		onStart: () => {
			gsap.set(loadCurtain, {height: "100%"});
		},
		onComplete: function() {
			enableScroll();
			landPage.css('display', 'none');
			gsap.to(loadCurtain, {
				height: '0%',
				duration: 2,
				ease: "expo.inOut",
				stagger: {
					each: .5,
					amount: .5,
				},
			})
		}
	}, 5.8);
}
function disableScroll() {
	// Store the current scroll position
	const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

	// Disable scrolling by preventing the default behavior of scroll events
	window.addEventListener('scroll', preventScroll, {
		passive: false
	});

	// Save the scroll position to a data attribute on the body element
	document.body.setAttribute('data-scroll-position', scrollY);

	// Add a class to the body to apply additional styles if needed
	document.body.classList.add('no-scroll');

	// Set the body's position to 'fixed' to prevent scroll position changes
	document.body.style.position = 'fixed';
	document.body.style.overflowY = 'scroll';
	document.body.style.top = `-${scrollY}px`;

	function preventScroll(event) {
		event.preventDefault();
	}
}
function enableScroll() {
	// Retrieve the stored scroll position
	const scrollY = parseInt(document.body.getAttribute('data-scroll-position'), 10);

	// Remove the event listener to allow scrolling again
	window.removeEventListener('scroll', preventScroll, {
		passive: false
	});

	// Remove the 'no-scroll' class and reset styles
	document.body.classList.remove('no-scroll');
	document.body.style.position = '';
	document.body.style.overflowY = '';
	document.body.style.top = '';
	
	// Scroll to the original position
	window.scrollTo(0, scrollY);

	function preventScroll(event) {
		event.preventDefault();
	}
}
$(document).ready(function(e){
	splitText();
	landingPage();
	new selectedWorkSectionNew('.section6');
})
window.addEventListener('load', function() {
	index();
	// workSelectionThumb()
	// new checkPos('.section4 .card');
	new Parallax3D('.section4 .card');
})

class checkPos {
	constructor(target) {

		this.target = $(target);

		this.offsetTop = this.target.offset().top;
		this.height = this.target.innerHeight();
		this.offsetLeft = this.target.offset().left;
		this.width = this.target.innerWidth();

		this.toptop = this.offsetTop+this.height/2;

		$(document).on('scroll',() => {
			this.updateToptop()

			$('.offsetTop').css('top', ' ' + this.toptop + 'px');
			$('.offsetLeft').css('top', ' ' + (this.offsetTop-300) + 'px');
			$('.offsetLeft').css('left', ' ' + (this.offsetLeft+this.width/2) + 'px');
			// console.log(this.toptop);
		})
	}
	updateToptop() {
		this.offsetTop = this.target.offset().top;
		this.height = this.target.innerHeight();
		this.toptop = this.offsetTop + this.height / 2;
	}
}

class Parallax3D {
	constructor(target) {
		this.target = $(target);
		this.svg = this.target.find('.back').find('svg');
		this.logo = this.target.find('.front').find('svg');
		this.text = this.target.find('.front').find('.text');

		var request = null;
		var mouse = {x: 0, y: 0};
		var scrollTop = window.scrollY || window.pageYOffset;

		this.offsetTop = this.target.offset().top;
		this.height = this.target.innerHeight();
		this.offsetLeft = this.target.offset().left;
		this.width = this.target.innerWidth();

		var middleX = this.offsetLeft+this.width/2;
		var middleY = this.offsetTop+this.height/2;

		var self = this;

		let isActivated = false;

		gsap.to(this.target, {
			scrollTrigger: {
				trigger: this.target,
				start: 'top bottom',
				endTrigger: '.section5',
				end: 'top top',
				onToggle: (self) => {
					isActivated = self.isActive;
				},
				toggleClass: 'isActive',
			}
		})

		function onMouseMove(event) {
			if (!isActivated) {
				return
			}

			mouse.x = event.pageX;
			mouse.y = event.pageY;

			cancelAnimationFrame(request);
			request = requestAnimationFrame(update);
		}

		window.addEventListener('mousemove', onMouseMove);

		function update() {
			self.offsetTop = self.target.offset().top;
			self.offsetLeft = self.target.offset().left;

			middleX = self.offsetLeft + self.width/2;
			middleY = self.offsetTop + self.height/2;

			var dx = mouse.x - middleX;
			var dy = mouse.y - middleY;

			var tiltx = -(dy / middleY);
			var tilty = (dx / middleX);
			var radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
			var degree = (radius*40);

			gsap.to(self.target, {
				transform: 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
				ease: 'expo.out',
				duration: 2,
			});

			var tiltRatioBig = 30;
			gsap.to(self.svg, {
				x: tilty*tiltRatioBig,
				y: -tiltx*tiltRatioBig,
				ease: 'expo.out',
				duration: 2,
			})
			var tiltRatioLogo = 10;
			gsap.to(self.logo, {
				x: tilty*tiltRatioLogo,
				y: -tiltx*tiltRatioLogo,
				ease: 'expo.out',
				duration: 2,
			})
			var tiltRatioText = 20;
			gsap.to(self.text, {
				x: tilty*tiltRatioText,
				y: -tiltx*tiltRatioText,
				ease: 'expo.out',
				duration: 2,
			})
		}

		$(window).resize(function() {
			middleX = this.offsetLeft+this.width/2;
			middleY = this.offsetTop+this.height/2;
		});

		window.addEventListener('scroll', function() {
			middleX = this.offsetLeft+this.width/2;
			middleY = this.offsetTop+this.height/2;

			scrollTop = window.scrollY || window.pageYOffset;
		});
	}
}