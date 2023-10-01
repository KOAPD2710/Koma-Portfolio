
$(window).ready(function(){
	var wdwidth = $(window).scrollTop();
	var wdheight = $(window).innerWidth();
	var ratio = 1/2;
	if (wdwidth > wdheight) {
		ratiosvg = ratio*wdwidth/1800
	} else {
		ratiosvg = ratio*wdheight/1000
	}
})


var friction = .3,
	restitution = .2;

var forceconts = -0.08;

function DomieSocks(x, y, w, h){
	this.w = w;
	this.h = h;
	radius = h/2;

	var options = {
		friction: friction,
		restitution: restitution,
		angle : 0,
		chamfer : {
			radius : radius,
		},
		render : {
			sprite : {
				texture: 'img/dms.png',
				xScale: ratiosvg,
				yScale: ratiosvg,
			}
		},
		url : 'https://koapd2710.github.io/Domie-Website/'
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	World.add(world, this.body);

	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}

	this.applyForce = function(){
		var pos = this.body.position;
		Body.applyForce(
			this.body,
			{	x: pos.x,
				y: pos.y,
			},
			{	x: 0,
				y: forceconts,
			}
		)
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};
}

function Diary(x, y, w, h){
	this.w = w;
	this.h = h;
	radius = h/2;

	var options = {
		friction: friction,
		restitution: restitution,
		angle : 0,
		chamfer : {
			radius : radius,
		},
		render : {
			sprite : {
				texture: 'img/dia.png',
				xScale: ratiosvg,
				yScale: ratiosvg,
			}
		}
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	World.add(world, this.body);

	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}
	this.applyForce = function(){
		var pos = this.body.position;
		Body.applyForce(
			this.body,
			{	x: pos.x,
				y: pos.y,
			},
			{	x: 0,
				y: forceconts*0.5,
			}
		)
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};
}

function ProE(x, y, w, h){
	this.w = w;
	this.h = h;
	radius = h/2;

	var options = {
		friction: friction,
		restitution: restitution,
		angle : 0,
		chamfer : {
			radius : radius,
		},
		render : {
			sprite : {
				texture: 'img/proe.png',
				xScale: ratiosvg,
				yScale: ratiosvg,
			}
		}
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	World.add(world, this.body);
	
	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}
	this.applyForce = function(){
		var pos = this.body.position;
		Body.applyForce(
			this.body,
			{	x: pos.x,
				y: pos.y,
			},
			{	x: 0,
				y: forceconts,
			}
		)
	}
	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};
}

function OliBanner(x, y, w, h){
	this.w = w;
	this.h = h;
	radius = h/2;

	var options = {
		friction: friction,
		restitution: restitution,
		angle : 0,
		chamfer : {
			radius : radius,
		},
		render : {
			sprite : {
				texture: 'img/olip.png',
				xScale: ratiosvg,
				yScale: ratiosvg,
			}
		}
	}

	this.body = Bodies.rectangle(x, y, w, h, options); 
	World.add(world, this.body);

	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}
	this.applyForce = function(){
		var pos = this.body.position;
		Body.applyForce(
			this.body,
			{	x: pos.x,
				y: pos.y,
			},
			{	x: 0,
				y: forceconts,
			}
		)
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};
}

function Savour(x, y, w, h){
	this.w = w;
	this.h = h;
	radius = h/2;

	var options = {
		friction: friction,
		restitution: restitution,
		chamfer : {
			radius : radius,
		},
		render : {
			sprite : {
				texture: 'img/sav.png',
				xScale: ratiosvg,
				yScale: ratiosvg,
			}
		}
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	World.add(world, this.body);
	
	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}
	this.applyForce = function(){
		var pos = this.body.position;
		Body.applyForce(
			this.body,
			{	x: pos.x,
				y: pos.y,
			},
			{	x: 0,
				y: forceconts/2,
			}
		)
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};
}

function CocaCola(x, y, w, h){
	this.w = w;
	this.h = h;
	radius = h/2;

	var options = {
		friction: friction,
		restitution: restitution,
		angle : 0,
		chamfer : {
			radius : radius,
		},
		render : {
			sprite : {
				texture: 'img/coca.png',
				xScale: ratiosvg,
				yScale: ratiosvg,
			},
		},
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	World.add(world, this.body);
	
	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}
	this.applyForce = function(){
		var pos = this.body.position;
		Body.applyForce(
			this.body,
			{	x: pos.x,
				y: pos.y,
			},
			{	x: 0,
				y: forceconts,
			}
		)
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};
}

function Flowers1(x, y, r){
	this.r = r;

	var options = {
		friction: .1,
		restitution: .2,
		render : {
			sprite : {
				texture: 'img/flower.png',
				xScale: ratiosvg*2,
				yScale: ratiosvg*2,
			}
		}
	}

	this.body = Bodies.circle(x, y, r, options, r*2);
	World.add(world, this.body);
	
	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		ellipse(0, 0, r*2);
		pop();
	};
}

function Flowers2(x, y, r){
	this.r = r;

	var options = {
		friction: .1,
		restitution: .2,
		render : {
			sprite : {
				texture: 'img/flower.png',
				xScale: ratiosvg*2,
				yScale: ratiosvg*2,
			}
		}
	}

	this.body = Bodies.circle(x, y, r, options, r*2);
	World.add(world, this.body);
	
	this.isOffScreen = function() {
		var pos = this.body.position;
		return (pos.y > wdheight + 100);
	}

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noStroke();
		ellipse(0, 0, r*2);
		pop();
	};
}