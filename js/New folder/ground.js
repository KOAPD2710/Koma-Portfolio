function Ground(x, y, w, h){
	var options = {
		friction: .1,
		restitution: .1,
		isStatic: true,
		render : {
			fillStyle: "transparent",
		}
	}
	var wdwidth = $(window).scrollTop();
	var wdheight = $(window).innerWidth();
	
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w;
	this.h = h;
	World.add(world, this.body);

	this.removeThisShit = function() {
		World.remove(world, this.body);
		return false;
	};

	this.show = function() {
		this.w = w;
		this.h = h;
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		noFill();
		rectMode(CENTER);
		noStroke();
		rect(0, 0, this.w, this.h);
		pop();
	};

}

function Circle(x, y, r) {
	this.r = r;

	var options = {
		friction: .8,
		restitution: .9,
		isStatic: true,
		render : {
			fillStyle: "transparent",
		}
	}

	this.body = Bodies.circle(x, y, r, options, r*2);
	World.add(world, this.body);

	this.removeThisShit = function() {
		World.remove(world, this.body);
		return false;
	};

	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		noFill();
		noStroke();
		ellipse(0, 0, this.r*2);
		pop();
	}
}

function Flowersmore(x, y, r){
	this.r = r;

	var options = {
		friction: .1,
		restitution: .2,
		render : {
			sprite : {
				texture: 'img/flower.png',
				xScale: r*2/135,
				yScale: r*2/135,
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