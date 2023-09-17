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


	// ScrollTrigger.create({
	// 	trigger: '.section3',
	// 	start: `top ${naviHeight}`,
	// 	pin: true, 
	// 	pinSpacing: false,
	// 	markers: true
	// });
	// $('section4-wrapper')
}

function workSelectionThumb() {
	var target = $('.section4 #workSelectionThumb');
	var thumb = $('.section4 .thumbMove');
	var isFunctionRunning = false;
	var debounceTimeout;

	// var scroll = window.scrollY || window.pageYOffset;

	function updateThumbPosition() {
		if (!isFunctionRunning) {
            return;
        }
		cursorX = event.pageX;
		cursorY = event.pageY;
		topTrigger = $('.section4').offset().top;
		dis = cursorY - topTrigger;
		gsap.to(thumb, {
			x: cursorX*.8,
			y: dis,
			ease: 'Power1.easeInOut',
			duration: .1,
		})
	}

	function startFunction() {
		isFunctionRunning = true;
		$(document).on('mousemove', updateThumbPosition);
	}
	function stopFunction() {
		isFunctionRunning = false;
		$(document).off('mousemove', updateThumbPosition);

	}

	const filterSelected = document.getElementById('filterSelected'),
	feTurbulence = filterSelected.querySelector("feTurbulence"),
	animateFeTurbulence = feTurbulence.querySelector("animate"),
	feDisplacementMap = filterSelected.querySelector("feDisplacementMap"),
	animateFeDisplacementMap = feDisplacementMap.querySelector("animate");

	$('.section4-wrapper').hover(function() {
		startFunction();
		animateFeDisplacementMap.beginElement();
	}, function() {
		stopFunction();
	});

	var workSelection = gsap.utils.toArray('.workSelection');
	workSelection.forEach(function(workSelection) {

		var workSectionInstance;
		$(workSelection).hover(function() {
			$(this).toggleClass('hovering');
			$(this).removeClass('none');
			$('#workSelectionThumb').toggleClass('hovering');

			var target = $(this).data('target');
			$('#workSelectionThumb .visible img[data-target="' + target + '"]').css('opacity', 1);

			workSectionInstance = new selectedWorkSection(this);
			animateFeDisplacementMap.beginElement();
		}, function() {
			$(this).toggleClass('hovering');
			$('#workSelectionThumb').toggleClass('hovering');

			var target = $(this).data('target');
			$('#workSelectionThumb .visible img[data-target="' + target + '"]').css('opacity', 0);

			workSectionInstance.stop();
			workSectionInstance = null;
		})
	})
}

class selectedWorkSection {
	constructor(selector) {
		this.container = $(selector);
		this.target = this.container.find('.moveWhenHover');
		this.pTop = this.container.offset().top;
		this.pMidle = this.container.offset().top + this.container.innerHeight()/2;
		this.pBtom = this.pTop + this.container.innerHeight();
		this.cursorX = 0;
		this.cursorY = 0;

		$(window).on('mousemove', (event) => {
			this.cursorY = event.pageY;

			if ( this.pTop <= this.cursorY && this.cursorY <= this.pMidle ) {
				this.container.addClass('up');
				this.container.removeClass('down');
				this.container.prev().addClass('down');
				this.container.prev().removeClass('up');
				this.container.next().addClass('up');
				this.container.next().removeClass('down');
				// console.log('up');
			} else if (true) {
				this.container.addClass('down');
				this.container.removeClass('up');
				this.container.next().addClass('up');
				this.container.next().removeClass('down');
				this.container.prev().addClass('down');
				this.container.prev().removeClass('up');
				// console.log('down');
			}
			// console.log(this.pTop, this.pMidle, this.pBtom, this.cursorY);
		});
	}

	stop() {
		$(window).off('mousemove');
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
		// visibility: 'hidden',
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
	}, 5).to(logoLandingPage, {
		opacity: 0,
		ease: 'sine.inOut',
		duration: 1,
	}, 5.5).to(landPage, {
		height: 0,
		ease: 'sine.inOut',
		duration: 1,
		onStart: () => {
			gsap.set(loadCurtain, {height: "100%"});
		},
		onComplete: function() {
			enableScroll();
			landPage.css('display', 'none');
			gsap.to(loadCurtain, {
				height: '0%',
				duration: .8,
				ease: "power3.out",
			})
		}
	}, 6);
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
})
window.addEventListener('load', function() {
	index();
	// workSelectionThumb();
})