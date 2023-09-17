width = $(window).innerWidth();
height = $(window).innerHeight();
naviHeight = $('#navigation').innerHeight();

document.body.addEventListener('resize', function() {
	width = $(window).innerWidth();
	height = $(window).innerHeight();
})

function about() {
	$('.naviHeight').css('height', ' ' + naviHeight + 'px');

	var expertField = ['.uiExpert', '.visualExpert', '.mediaExpert', '.contentExpert'];
	expertField.forEach(function(targetSelector) {
		new MarqueeAnimation(targetSelector, 180);
	});
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


window.addEventListener('load', function() {
	about();
})