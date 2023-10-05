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

	// ScrollTrigger.create({
	// 	trigger: '.section1',
	// 	start: "top 72px",
	// 	pin: true, 
	// 	pinSpacing: false,
	// });

	let panels = gsap.utils.toArray(".section2 .panel");
	
	panels.forEach((target) => {
		ScrollTrigger.create({
			trigger: target,
			start: "top 71px",
			pin: true, 
			pinSpacing: false,
		});

		new MarqueeThumbnailText(target);
	});

	ScrollTrigger.create({
		trigger: '#bodycontainer .intro',
		start: "top 71px",
		pin: true, 
		pinSpacing: false,
	});
}

class MarqueeThumbnailText {
	constructor(selector, horizontalNumClones, verticalNumClones) {
		this.selector = $(selector);
		this.parent = this.selector.find('.thumbnailContainer');
		this.container = this.parent.find('.text-thumb');
		this.horizontalContent = this.container.find('.horizontal-content');
		this.target = this.container.find('p');
		this.headText = this.selector.find('.work-head-ts');

		this.horizontalNumClones = horizontalNumClones || 12;
		this.verticalNumClones = verticalNumClones || 20;

		for (let i = 1; i < this.horizontalNumClones; i++) {
			this.target.clone().appendTo(this.horizontalContent)
		}
		for (let i = 1; i < this.verticalNumClones; i++) {
			this.horizontalContent.clone().appendTo(this.container)
		}

		this.animationText = this.container.find('.horizontal-content');
		this.animationThumb = this.parent.find('.thumbnail');

		this.textAnimation();
		this.thumbnailAnimation();
		this.headTextAnimation();
	}
	textAnimation() {
		gsap.from(this.animationText, {
			scrollTrigger: {
				trigger: this.selector,
				start: "top 85%",
				end: "bottom 60%",
				scrub: true,
			},
			y: 250,
			scale: 2,
			opacity: 0,
			stagger: {
				amount: .6,
			},
			ease: Back.easeOut.config(2.8),
		});
		gsap.to(this.container, {
			scrollTrigger: {
				trigger: this.selector,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
			ease: 'none',
			yPercent: -20,
		})
	}
	thumbnailAnimation() {
		gsap.fromTo(this.animationThumb, {
			yPercent: 20,
		}, {
			scrollTrigger: {
				trigger: this.selector,
				start: "top 90%",
				end: "100% top",
				scrub: true,
			},
			yPercent: -10,
		})
	}
	headTextAnimation() {
		gsap.from(this.headText, {
			scrollTrigger: {
				trigger: this.selector,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
			y: 80
		})
	}
}

window.addEventListener('load', function() {
	work();
})