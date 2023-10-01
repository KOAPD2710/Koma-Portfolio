function Boundary(x, y, w, h){
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

	this.show = function() {
		this.w = w;
		this.h = h;
		var pos = this.body.position;
		var angle = this.body.angle;
		translate(pos.x, pos.y);
		rotate(angle);
		noFill();
		noStroke();
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
	};
}