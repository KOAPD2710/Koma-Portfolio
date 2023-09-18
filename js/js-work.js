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
	
	panels.forEach((panel, i) => {
		ScrollTrigger.create({
			trigger: panel,
			start: "top 71px",
			pin: true, 
			pinSpacing: false,
		});

		new MarqueeThumbnailText(panel);
	});
}

class MarqueeThumbnailText {
	constructor(selector, horizontalNumClones, verticalNumClones) {
		this.selector = $(selector);
		this.parent = this.selector.find('.thumbnailContainer');
		this.container = this.parent.find('.text-thumb');
		this.horizontalContent = this.container.find('.horizontal-content');
		this.target = this.container.find('p');

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
	}
	textAnimation() {
		gsap.from(this.animationText, {
			scrollTrigger: {
				trigger: this.selector,
				start: "top 70%",
				end: "100% 60%",
				scrub: .5,
			},
			y: 200,
			scale: 2,
			opacity: 0,
			stagger: {
				amount: .6,
			},
			ease: Back.easeOut.config(2.7),
		});
		// gsap.from(this.animationText, {
		// 	scrollTrigger: {
		// 		trigger: this.selector,
		// 		start: "top 90%",
		// 		end: "100% 60%",
		// 		scrub: true,
		// 	},
		// 	y: 200,
		// 	stagger: {
		// 		amount: .6,
		// 	},
		// 	ease: 'power1.in',
		// });
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
				// markers: true,
			},
			yPercent: -5,
		})
	}
}

class AnimatonThumbText {
	constructor(selector) {
		this.selector = $(selector);
		
	}
}
window.addEventListener('load', function() {
	work();
})