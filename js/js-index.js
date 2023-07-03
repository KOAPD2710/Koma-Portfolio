function index() {

	// const logoMarquee = document.getElementById('logoMarquee');

	// const logoK = "M180.4,154c12.5,5.7,25.2,8.3,37,13.9c55.2,25.9,86.2,69,93.3,129.5c1.2,10.1-1.1,13.6-12.2,13.5  c-95.2-0.4-190.2-0.4-285.4,0c-10.8,0-13-3.1-13-13.4c0.4-95,0.4-190,0-285.2C0,2.2,2.7,0,12.6,0c95.6,0.3,191.1,0.3,286.7,0  c9.1,0,12.7,1.8,11.5,11.6c-7.7,64.5-40.5,109.9-101.2,134.4c-4.9,2-10.2,2.7-15.4,4.1C189.7,151.3,185.1,152.7,180.4,154z";
	// const logoO = "M156.2,310C76.2,312.2,0,246.8,0,156.2C0,68,66.4,0.2,153.7,0C239.4-0.2,308,68,309,153.8  C310,242.6,235.8,311.1,156.2,310z";
	// const logoM = "M154,130.6c5.7-12.5,8.3-25.2,13.9-37c25.9-55.2,69-86.3,129.5-93.3c10.1-1.2,13.6,1.1,13.5,12.2  c-0.4,95.2-0.4,190.2,0,285.4c0,10.8-3.1,13-13.4,13c-95.1-0.3-190.2-0.4-285.3,0C2.2,311,0,308.3,0,298.4  c0.3-95.6,0.3-191.1,0-286.7C0,2.6,1.9-1,11.7,0.2c64.5,7.7,109.9,40.5,134.4,101.2c2,4.9,2.7,10.2,4.1,15.4  c1.2,4.6,2.6,9.1,3.9,13.8H154z";
	// const logoA = "M153.7,310.8c-46.9,0-93.8-0.2-140.7,0.2c-9.1,0-13.1-1.1-13-11.9c0.7-48.9,0.6-97.8,0.2-146.8  C-0.2,86.7,46.6,28.1,101.9,8.9c75-26,160.7,5.8,194.4,83.2c8.7,19.8,13.2,41,13.3,62.7c0.2,48-0.3,96.1,0.3,144.1c0.1,10.8-3.8,12-13,12c-47.8-0.4-95.6-0.2-143.4-0.2H153.7z";

	// gsap.timeline().to(logoMarquee, {
	// 	attr: {
	// 		d: logoO
	// 	},
	// 	ease: 'power1.inOut',
	// 	delay: 2,
	// 	duration: 2,
	// }).to(logoMarquee, {
	// 	attr: {
	// 		d: logoM
	// 	},
	// 	ease: 'power1.inOut',
	// 	delay: 2,
	// 	duration: 2,
	// })

	var sc3ContentWidth = $('.section3 .marquee-content').innerWidth();
	sc3Duration = 4;
	gsap.to('.section3 .marquee-content', {
		scrollTrigger: {
			trigger: '.section3',
			start: 'top bottom',
			end: 'bottom top',
		},
		x: () => "+=" + -sc3ContentWidth,
		repeat: -1,
		ease: 'none',
		duration: sc3Duration,
	})

	projectHeight = 500;
	// testt = document.querySelector('.workSection');
	// testt.style.setProperty("--height", ''.concat(projectHeight, 'px'));
	// document.getElementById('section5').style.setProperty("--height", ''.concat(projectHeight, 'px');

	sc4Pro = $('.section4 .square1 .content').innerHeight();
	gsap.set('.section4 .square2 .project', {
		marginTop: 1.3*projectHeight + sc4Pro/2,
	})
	sc5Pro = $('.section5 .square2 .content').innerHeight();
	gsap.set('.section5 .rightSquare .project', {
		marginTop: projectHeight + sc5Pro/2,
	})
	sc6Pro = $('.section6 .square3 .content').innerHeight();
	gsap.set('.section6 .square4 .project', {
		marginTop: projectHeight + sc6Pro/2,
	})
	sc7Pro = $('.section7 .square1 .content').innerHeight();
	gsap.set('.section7 .middleSquare .project', {
		marginTop: projectHeight + sc7Pro/2,
	})

	gsap.from('.section4 .square4 .square1', {
		scrollTrigger: {
			trigger: '.section4',
			start: 'top bottom',
			endTrigger: '.section4',
			end: 'bottom top',
			scrub: 2,
		},
		y: 200,
		ease: 'none'
	})
	scrollY = 500;
	scrollEase = "none";
	scrollScrub = 1;
	gsap.to('.section4 .content, .section4 .project', {
		scrollTrigger: {
			trigger: '.section4',
			start: 'top bottom',
			endTrigger: '.section5 .content',
			end: 'top top',
			scrub: scrollScrub,
		},
		y: scrollY,
		ease: scrollEase,
	})
	gsap.to('.section5 .content, .section5 .project', {
		scrollTrigger: {
			trigger: '.section5',
			start: 'top bottom',
			endTrigger: '.section6 .content',
			end: 'top top',
			scrub: scrollScrub,
		},
		y: scrollY,
		ease: scrollEase,
	})
	gsap.to('.section6 .content, .section6 .project', {
		scrollTrigger: {
			trigger: '.section6',
			start: 'top bottom',
			endTrigger: '.section7 .content',
			end: 'top top',
			scrub: scrollScrub,
		},
		y: scrollY,
		ease: scrollEase,
	})
	gsap.to('.section7 .content, .section7 .project', {
		scrollTrigger: {
			trigger: '.section7',
			start: 'top bottom',
			end: 'bottom top',
			scrub: scrollScrub,
		},
		y: scrollY,
		ease: scrollEase,
	})
}

function logoMarquee() {
	duration = 1,
	gsap.defaults({ease: "power2.inOut", duration: duration});

	const logoMarqueeK = document.querySelectorAll('.logoMarqueeK');
	const logoMarqueeO = document.querySelectorAll('.logoMarqueeO');
	const logoMarqueeM = document.querySelectorAll('.logoMarqueeM');
	const logoMarqueeA = document.querySelectorAll('.logoMarqueeA');
	const logoMarqueeTL = gsap.timeline();


	logoMarqueeTL.fromTo(logoMarqueeK, {
		xPercent: 0,
	}, {
		xPercent: -100,
		delay: duration,
	}).fromTo(logoMarqueeO, {
		yPercent: 0
	}, {
		yPercent: 100
	}, 3*duration).fromTo(logoMarqueeO, {
		xPercent: -100
	}, {
		xPercent: 0
	}, duration).fromTo(logoMarqueeM, {
		yPercent: 0
	}, {
		yPercent: 100
	}, 5*duration).fromTo(logoMarqueeM, {
		yPercent: 100
	}, {
		yPercent: 0,
	}, 3*duration).fromTo(logoMarqueeA, {
		yPercent: 0
	}, {
		yPercent: 100,
	}, 7*duration).fromTo(logoMarqueeA, {
		yPercent: 100
	}, {
		yPercent: 0,
	}, 5*duration).fromTo(logoMarqueeK, {
		xPercent: -100
	}, {
		xPercent: 0,
	}, 7*duration);
	gsap.set(logoMarqueeK, {
		xPercent: 0,
	})

	logoMarqueeTL.eventCallback('onComplete', function() {
		logoMarqueeTL.play(0)
	})
}

window.addEventListener('load', function() {
	index();
	logoMarquee();
})