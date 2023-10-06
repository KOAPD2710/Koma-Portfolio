class workWithMeBall {
	constructor(target) {
		this.target = $(target);
		this.container = this.target.find('.arrowContainer');
		this.ballSelector = this.target.find('.arrowBall');
		this.arrowSelector = this.ballSelector.find('.arrow');
		this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		this.prevPos = { x: this.pos.x, y: this.pos.y };
		this.vel = {x: 0, y: 0};
		this.set = {};
		this.scroll = window.scrollY;

		// Create quickSetters
		this.set.x 	= gsap.quickSetter(this.ballSelector, "x", "px");
		this.set.y 	= gsap.quickSetter(this.ballSelector, "y", "px");
		this.set.r 	= gsap.quickSetter(this.ballSelector, "rotate", "deg");
		this.set.sx = gsap.quickSetter(this.ballSelector, "scaleX");
		this.set.sy = gsap.quickSetter(this.ballSelector, "scaleY");
		this.set.rt = gsap.quickSetter(this.arrowSelector, "rotate", "deg");
		this.speed = .8;
		this.offsetTop = this.target.offset().top;

		// Run on Mouse Move
		const setFromEvent = (e) => {
			const x = e.clientX;
			const y = e.clientY;
			// Animate Pos Object and calculate Vel Object Velocity

			gsap.to(this.pos, {
				x: x,
				y: y,
				duration: this.speed,
				ease: "expo.out",
				onUpdate: () => {
					this.vel.x = x - this.pos.x;
					this.vel.y = y - this.pos.y;
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
		return Math.min(distance / 600, 0.7);
	}

	// Function For Mouse Movement Angle in Degrees
	getAngle(diffX, diffY) {
		return (Math.atan2(diffY, diffX) * 180) / Math.PI;
	}

	// Animation loop
	loop() {
		// Calculate angle and scale based on velocity
		const newY = this.pos.y + this.scroll - this.offsetTop - .9*window.innerHeight / 2;
		const newX = this.pos.x - window.innerWidth / 2;

		var rotation = this.getAngle(this.vel.x, this.vel.y);
		var scale = this.getScale(this.vel.x, this.vel.y);

		this.set.x(newX);
		this.set.y(newY);
		this.set.r(rotation);
		this.set.sx(1 + scale);
		this.set.sy(1 - scale);
		this.set.rt(-rotation);
	}
}
class footerNavigation {

	constructor(selector) {
		this.selector = $(selector);
		this.btnContainer = this.selector.find('.infoBtn');
		this.btn = this.selector.find('.btn');
		this.emailBtn = this.btnContainer.find('.email');
		this.pnumberBtn = this.btnContainer.find('.pnumber');
		this.facebookBtn = this.btnContainer.find('.facebook');

		this.linkContainer = this.selector.find('.infoText');
		this.target = this.linkContainer.find('.linkBox');

		this.emailBtn.on('mouseenter', () => {
			this.emailBtn.addClass('hovering');
		});
		this.emailBtn.on('mouseleave', () => {
			this.emailBtn.removeClass('hovering');
		});
		this.pnumberBtn.on('mouseenter', () => {
			this.pnumberBtn.addClass('hovering');
		});
		this.pnumberBtn.on('mouseleave', () => {
			this.pnumberBtn.removeClass('hovering');
		});
		this.facebookBtn.on('mouseenter', () => {
			this.facebookBtn.addClass('hovering');
		});
		this.facebookBtn.on('mouseleave', () => {
			this.facebookBtn.removeClass('hovering');
		});

		this.emailBtn.on('click', () => {
			this.btn.removeClass('active');
			this.emailBtn.addClass('active');
			this.target.css('transform', 'translateY(calc(0%/3))');
		})
		this.pnumberBtn.on('click', () => {
			this.btn.removeClass('active');
			this.pnumberBtn.addClass('active');
			this.target.css('transform', 'translateY(calc(-100%/3))');
		})
		this.facebookBtn.on('click', () => {
			this.btn.removeClass('active');
			this.facebookBtn.addClass('active');
			this.target.css('transform', 'translateY(calc(-200%/3))');
		})
	}
}
function appendRandomLogoFooter() {
	const svgK = `<svg class="kLogo" viewBox="0 0 28.7 28.7">
	<path class="path" d="m16.6,14.3c8.5-2.3,11.4-7.6,12-13.1C28.7.3,28.5,0,27.5,0c-8.8,0-17.5,0-26.3,0C.2,0,0,.3,0,1.2v26.2c0,.9.2,1.2,1.2,1.2,8.8,0,17.5,0,26.3,0,1,0,1.2-.3,1.1-1.2-.6-5.5-3.5-10.8-12-13.1Z" />
	</svg>`;
	const svgO = `<svg class="oLogo" viewBox="0 0 28.7 28.7">
	<circle class="path" cx="14.3" cy="14.3" r="14.3" />
	</svg>`;
	const svgM = `<svg class="mLogo" viewBox="0 0 28.7 28.7">
	<path class="path" d="m14.3,12C12.1,3.5,6.7.7,1.2,0,.3,0,0,.1,0,1.2c0,8.8,0,17.5,0,26.3,0,1,.3,1.2,1.2,1.2h26.2c.9,0,1.2-.2,1.2-1.2,0-8.8,0-17.5,0-26.3,0-1-.3-1.2-1.2-1.1-5.5.7-10.8,3.5-13.1,12h0Z" />
	</svg>`;
	const svgA = `<svg class="aLogo" viewBox="0 0 28.7 28.7">
	<path class="path" d="m28.6,13.1c0-4.8-4.4-13.1-14.3-13.1S0,8.3,0,13.1C0,17.5,0,23.1,0,27.6c0,1,.3,1.1,1.1,1.1,4.3,0,8.9,0,13.2,0s8.9,0,13.2,0c.8,0,1.1,0,1.1-1.1,0-4.4,0-10.1,0-14.5h0Z" />
	</svg>`;

	const svgArray = [svgK, svgO, svgM, svgA];

	const randomIndex = Math.floor(Math.random() * svgArray.length);

	$('#lastFooter .bottom .randomLogoContainer').append(svgArray[randomIndex]);
}
function footerAnimation() {
	var container = $('#lastFooter');
	var target = container.find('svg');

	gsap.from($('#lastFooter .logoContainer svg'), {
		scrollTrigger: {
			trigger: container,
			start: 'top bottom',
			end: 'top 30%',
			scrub: 1,
		},
		stagger: {
			amount: .1
		},
		y: -200,
		opacity: .5,
		ease: 'back.out(1.7)',

	})
}
function notSafeForWork() {
	appendRandomLogoFooter();
	footerAnimation();

	gsap.to('.circleContainer svg', {
		scrollTrigger: {
			trigger: '.circleContainer',
			start: 'top bottom',
		},
		transformOrigin: 'center center',
		rotate: 360,
		ease: 'none',
		repeat: -1,
		duration: 15,
	})

	// new workWithMeBall('.workWithMe');
	new footerNavigation('#lastFooter');

	ScrollTrigger.create({
		trigger: '.WWM-container',
		start: `top top`,
		end: 'bottom 65px',
		pin: true, 
		pinSpacing: false,
	});

	$('.WWM-container p').hover(function() {
		$('.WWM-container .text1').toggleClass('hovering')	
	})
}
$(document).ready(function(e) {
	notSafeForWork();
})