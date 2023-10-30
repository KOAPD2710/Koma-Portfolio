width = $(window).innerWidth();
height = $(window).innerHeight();

function about() {

	$('.section1').css('height', ' '+ height - 67 +'px');
	$('.section1 .container').css('height', ' '+ height - 67 - 72 +'px');

	if (width/2 < (height - 72 - 67 - 37 * 2)) {
		$('.section1 .container .square2 .thumbnail img').css('height', '100%');
		$('.section1 .container .square2 .thumbnail img').css('width', 'auto');
	} else {
		$('.section1 .container .square2 .thumbnail img').css('height', 'auto');
		$('.section1 .container .square2 .thumbnail img').css('width', '100%');
	}

	const s3Urls = ['./imgs/svg/Smile2.svg', './imgs/svg/bl1.svg', './imgs/svg/bl2.svg', './imgs/svg/bl3.svg', './imgs/svg/bl4.svg', './imgs/svg/bl5.svg', './imgs/svg/bl6.svg', './imgs/svg/bl7.svg', './imgs/svg/bl8.svg', './imgs/svg/bl9.svg', './imgs/svg/bl20.svg', './imgs/svg/bl21.svg', './imgs/svg/bl22.svg', './imgs/svg/bl23.svg', './imgs/svg/bl24.svg', './imgs/svg/bl25.svg', './imgs/svg/bl26.svg', './imgs/svg/bl27.svg', './imgs/svg/bl28.svg', './imgs/svg/bl29.svg', './imgs/svg/bl30.svg'];
	const animation = new BalloonAnimation('.section3 #flyingBalloons', 40, 7, 10, s3Urls);

	const s3Smile = new FloatingAnimation('.section3 .left .smile img', 50, 50, 15, 5);

	ScrollTrigger.create({
		trigger: '.section5',
		start: "top 71px",
		pin: true, 
		pinSpacing: false,
	});

	ScrollTrigger.create({
		trigger: '.section7 .container',
		start: "top top",
		endTrigger: '.section7',
		end: "bottom top",
		pin: true, 
		pinSpacing: false,
	});

	gsap.fromTo('.section7 .character img',{
		yPercent: 5,
	}, {
		scrollTrigger: {
			trigger: ".section7 .container",
			start: "top bottom",
			endTrigger: '.section7',
			end: "bottom top",
			scrub: true,
		},
		yPercent: -55,
		ease: "power3.in",
	});
	gsap.fromTo('.section7 .logo-container',{
		yPercent: 5
	}, {
		scrollTrigger: {
			trigger: ".section7 .container",
			start: "top bottom",
			endTrigger: '.section7',
			end: "bottom top",
			scrub: 1,
		},
		yPercent: -10,
		ease: "none",
	});

	const fixFloatAnimationLogo = (20, 10, 10, 10);

	const s7SVG = gsap.utils.toArray('.section7 .logo-container svg');
	s7SVG.forEach(target => {
		new FloatingAnimation(target, fixFloatAnimationLogo);
	})
}

class MarqueeAnimation {
	constructor(containerSelector, speed) {
		this.container = $(containerSelector);
		this.speed = speed || 180;
		this.target = this.container.find('.marquee-content');
		this.targetHover = this.container.find('.mainText');
		this.targetWidth = this.target.innerWidth();
		this.setupMarquee();
		this.setupHover();
	}
	setupMarquee() {
		this.timeIn = {
			timeScale: 1,
			overwrite: true,
			duration: 0.5,
			ease: 'Power1.easeOut'
		};
		this.timeOut = {
			timeScale: 0,
			overwrite: true,
			duration: 2,
			ease: 'Power3.easeInOut'
		};
		this.timeline = gsap.timeline();
		this.timeline.to(this.target, {
			x: -this.targetWidth,
			repeat: -1,
			ease: 'none',
			duration: this.targetWidth / this.speed,
		});
		gsap.to(this.timeline, this.timeOut);
	}
	setupHover() {
		this.targetHover.on('mouseenter', () => {
			gsap.to(this.timeline, this.timeIn);
			this.container.addClass('hovering');
		});
		this.targetHover.on('mouseleave', () => {
			gsap.to(this.timeline, this.timeOut);
			this.container.removeClass('hovering');
		});
	}
}

class BalloonAnimation {
	constructor(target, max, duration, delay, urlImage) {
		this.target = $(target)[0];
		this.imageUrls = urlImage || null;
		this.balloons = [];

		this.maxVal = max || 10;
		this.delayVal = delay || 5;
		this.durationVal = duration || 10;
		this.minDur = this.durationVal * 0.5;
		this.maxDur = this.durationVal * 1.5;
		this.targetWidth = this.target.clientWidth;
		this.targetHeight = this.target.clientHeight;
		this.currentBalloonIndex = 0;

		this.createBalloonDelay();
	}

	createBalloonDelay() {
		if (this.currentBalloonIndex < this.maxVal) {
			var delayRandom = Math.random() * this.delayVal;
			setTimeout(() => {
				this.createBalloon();
				this.currentBalloonIndex++;
				this.createBalloonDelay();
				// console.log(this.currentBalloonIndex, this.maxVal, delayRandom);
			}, delayRandom);
		}
	}

	createBalloon() {
		const balloon = document.createElement("div");
		balloon.className = "targetObject";

		const img = document.createElement("img");

		if (this.imageUrls !== null) {
			const randomImageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
			img.src = randomImageUrl;
			balloon.appendChild(img);
		}

		this.target.appendChild(balloon);
		this.animateBalloon(balloon, img);
		this.balloons.push(balloon);
	}

	animateBalloon(balloon, img) {
		const duration = Math.random() * this.durationVal + this.minDur;
		const x = Math.random() * this.targetWidth;

		gsap.set(balloon, {
			y: this.targetHeight + 200,
			// y: 600,
			x: x
		});

		const onCompleteCallback = () => {
			balloon.remove();
			this.createBalloon();
		};

		gsap.to(balloon, {
			y: -200,
			duration: duration,
			ease: "power2.inOut",
			onStart: () => {
				this.floatingAnimation(img);
			},
			onComplete: onCompleteCallback
		});
	}

	floatingAnimation(img) {
		const randomX = random(5, 50);
		const randomY = random(5, 30);
		const randomDelay = random(0, 1);
		const randomMoveTime = random(3, 5);
		const randomRotateTime = random(5, 10);
		const randomAngle = random(10, 90);

		gsap.set(img, {
			x: randomX(Math.random() < 0.5 ? 1 : -1),
			y: randomY(Math.random() < 0.5 ? 1 : -1),
			rotation: randomAngle(Math.random() < 0.5 ? 1 : -1),
			transformOrigin: "center center",
		}, 0);

		moveX(img, Math.random() < 0.5 ? 1 : -1);
		moveY(img, Math.random() < 0.5 ? 1 : -1);
		rotate(img, Math.random() < 0.5 ? 1 : -1);

		function rotate(target, direction) {
			return gsap.to(target, {
				duration: randomRotateTime(),
				rotation: randomAngle(direction),
				ease: 'Sine.easeInOut',
				onComplete: rotate.bind(this),
				onCompleteParams: [target, direction * -1]
			});
		}

		function moveX(target, direction) {
			return gsap.to(target, {
				duration: randomMoveTime(),
				x: () => randomX(direction),
				ease: 'Sine.easeInOut',
				onComplete: moveX.bind(this),
				onCompleteParams: [target, direction * -1]
			});
		}

		function moveY(target, direction) {
			return gsap.to(target, {
				duration: randomMoveTime(),
				y: () => randomY(direction),
				ease: 'Sine.easeInOut',
				onComplete: moveY.bind(this),
				onCompleteParams: [target, direction * -1]
			});
		}

		function random(min, max) {
			const delta = max - min;
			return (direction = 1) => (min + delta * Math.random()) * direction;
		}
	}
}

class FloatingAnimation {
	constructor(target, x, y, angle, duration) {
		this.target = $(target);
		this.x = x || 50;
		this.y = y || 50;
		this.angle = angle || 15;
		this.duration = duration || 10;

		this.randomX = this.random(this.x * 0.1, this.x);
		this.randomY = this.random(this.y * 0.1, this.y);
		this.randomAngle = this.random(this.angle * 0.1, this.angle);
		this.randomMoveTime = this.random(this.duration * 0.5, this.duration);
		this.randomRotateTime = this.random(this.duration, this.duration * 2);

		gsap.set(this.target, {
			x: this.randomX(Math.random() < 0.5 ? 1 : -1),
			y: this.randomY(Math.random() < 0.5 ? 1 : -1),
			rotation: this.randomAngle(Math.random() < 0.5 ? 1 : -1),
			transformOrigin: "center center",
		}, 0);

		this.moveX(this.target, Math.random() < 0.5 ? 1 : -1);
		this.moveY(this.target, Math.random() < 0.5 ? 1 : -1);
		this.rotate(this.target, Math.random() < 0.5 ? 1 : -1);
	}

	random(min, max) {
		const delta = max - min;
		return (direction = 1) => (max - delta * Math.random()) * direction;
	}

	moveX(selector, direction) {
		gsap.to(selector, {
			duration: this.randomMoveTime(),
			x: this.randomX(direction),
			ease: 'Sine.inOut',
			onComplete: this.moveX.bind(this),
			onCompleteParams: [selector, direction * -1],
		});
	}

	moveY(selector, direction) {
		gsap.to(selector, {
			duration:this.randomMoveTime(),
			y: this.randomY(direction),
			ease: 'Sine.inOut',
			onComplete: this.moveY.bind(this),
			onCompleteParams: [selector, direction * -1],
		});
	}

	rotate(selector, direction) {
		gsap.to(selector, {
			duration: this.randomRotateTime(),
			rotation: this.randomAngle(direction),
			ease: 'Sine.inOut',
			onComplete: this.rotate.bind(this),
			onCompleteParams: [selector, direction * -1],
		});
	}
}

$(document).ready(function(e) {
	about();
})