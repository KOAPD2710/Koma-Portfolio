var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Events = Matter.Events,
	Composite = Matter.Composite,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Vertices = Matter.Vertices,
	Svg = Matter.Svg;

// create an engine
var engine = Engine.create(),
	world = engine.world;

var canvas = document.getElementById("physicalDiv");
var canvasSize = {width: canvas.clientWidth, height: canvas.clientHeight};
var render;

function percentX(percent) {
	return Math.round((percent / 100) * canvasSize.width);
}
function percentY(percent) {
	return Math.round((percent / 100) * canvasSize.height);
}

function updateCanvasSize() {
	const canvas = document.getElementById("physicalDiv");
	canvasSize.width = canvas.clientWidth;
	canvasSize.height = canvas.clientHeight;

	if(render) {
		render.canvas.width = percentX(100);
		render.canvas.height = percentY(100);
		render.options.width = percentX(100);
		render.options.height = percentY(100);

		Render.world(render);
	}
}

updateCanvasSize();

window.addEventListener("resize", updateCanvasSize);

// create a renderer
var render = Render.create({
		element: canvas,
		engine: engine,
		options: {
			width: percentX(100),
			height: percentY(100),
			pixelRatio: 1,
			background: 'Transparent',
			contain: 'Transparent',
			wireframes: false,
			// showAngleIndicator: true
		}
	}
);

engine.world.gravity.x = 0;
engine.world.gravity.y = .8;

var runner = Runner.create();
	Runner.run(runner, engine);

var wallOptions = {
		friction: .3,
		restitution: .9,
		isStatic: true,
		render : {
			fillStyle: "transparent",
		}
	};
function Ground(x, y, w, h){
	this.body = Bodies.rectangle(x, y, w, h, wallOptions);
	World.add(world, this.body);

	this.show = function() {
		noFill();
		noStroke();
		rectMode(center);
	};
}

function Circle(x, y, w, url){
	this.w = w;
	radius = w/2;
	this.url = url;

	var options = {
			friction: .4,
			frictionAir: .015,
			restitution: .9,
			angle : 0,
			chamfer : {
				radius : radius,
			},
			render : {
				sprite : {
					texture: this.url,
					xScale: SVGScaleRatio,
					yScale: SVGScaleRatio,
				}
			}
		}

	this.body = Bodies.rectangle(x, y, w, w, options);
	World.add(world, this.body);

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

var thickness = 1000,
	deduct = thickness/2,
	posX = canvasSize.width/2,
	posY = canvasSize.height/2,
	SVGsize = 200,
	size = 100;

const 	svgScale = Math.min(Math.max(((canvasSize.width*1.2/5)/SVGsize), .7), 1.4);
		svgRatio = 1,
		trueWidth = svgScale*SVGsize,
		svgGap = .1*trueWidth;
		startPos = (canvasSize.width - (trueWidth*4) - (svgGap*3))/2,
		startY = canvasSize.height;

var SVGScaleRatio = trueWidth*2/300,
	forceconts = -(trueWidth*0.0008);

function setup() {
	createCanvas(0,0);

	ground =	new Ground(posX , canvasSize.height+deduct, canvasSize.width, thickness);
	wallL =		new Ground(-deduct, posY, thickness, canvasSize.height);
	wallR =		new Ground(canvasSize.width+deduct, posY, thickness, canvasSize.height);
	roof =		new Ground(posX, -deduct, canvasSize.width, thickness);

	smile1 = new Circle(Math.random()*canvasSize.width, Math.random()*canvasSize.height, trueWidth, './imgs/Smile2.svg');
	smile2 = new Circle(Math.random()*canvasSize.width, Math.random()*canvasSize.height, trueWidth, './imgs/Smile2.svg');


	if (typeof fetch !== 'undefined') {
		var select = function(root, selector) {
			return Array.prototype.slice.call(root.querySelectorAll(selector));
		};

		var loadSvg = function(url) {
			return fetch(url)
				.then(function(response) {
					return response.text();
				})
				.then(function(raw) {
					return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml');
				});
		};

		// ([
		// 	'./js/svg/a.svg',
		// ]).forEach(function(path, i) {
		// 	loadSvg(path).then(function(root) {
		// 		// var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

		// 		var vertexSets = select(root, 'path')
		// 			.map(function(path) {
		// 				return Vertices.scale(Svg.pathToVertices(path, 3000), 1, 1);
		// 			});

		// 		Composite.add(world, Bodies.fromVertices(300, 500, vertexSets, {
		// 			render: {
		// 				fillStyle: '#063e7b',
		// 				strokeStyle: '#063e7b',
		// 				lineWidth: 1
		// 			}
		// 		}, true));
		// 	});
		// });

		var redColor = "#FF4949",
			greenColor = "#00A167",
			blueColor = "#0073C6",
			blackColor = "#222",
			whiteColor = "#FDFBF3"
			frictionSVG = .2,
			restitutionSVG = .7;

		loadSvg('./js/svg/k.svg').then(function(root) {
			var vertexSets = select(root, 'path')
				.map(function(path) {
					return Vertices.scale(Svg.pathToVertices(path, svgRatio), svgScale, svgScale);
				});
			Composite.add(world, Bodies.fromVertices(startPos+trueWidth/2, Math.random()*startY , vertexSets, {
				render: {
					fillStyle: redColor,
				},
				friction: frictionSVG,
				restitution: restitutionSVG,
			}, true));
		});
		loadSvg('./js/svg/o.svg').then(function(root) {
			var vertexSets = select(root, 'path')
				.map(function(path) {
					return Vertices.scale(Svg.pathToVertices(path, svgRatio), svgScale, svgScale);
				});

			Composite.add(world, Bodies.fromVertices(startPos+trueWidth*3/2+svgGap, Math.random()*startY, vertexSets, {
				render: {
					fillStyle: blackColor,
					strokeStyle: whiteColor,
					lineWidth: 2
				},
				friction: frictionSVG,
				restitution: restitutionSVG,
			}, true));
		});
		loadSvg('./js/svg/m.svg').then(function(root) {
			var vertexSets = select(root, 'path')
				.map(function(path) {
					return Vertices.scale(Svg.pathToVertices(path, svgRatio), svgScale, svgScale);
				});

			Composite.add(world, Bodies.fromVertices(startPos+trueWidth*5/2+2*svgGap, Math.random()*startY, vertexSets, {
				render: {
					fillStyle: greenColor,
				},
				friction: frictionSVG,
				restitution: restitutionSVG,
			}, true));
		});
		loadSvg('./js/svg/a.svg').then(function(root) {
			var vertexSets = select(root, 'path')
				.map(function(path) {
					return Vertices.scale(Svg.pathToVertices(path, svgRatio), svgScale, svgScale);
				});

			Composite.add(world, Bodies.fromVertices(startPos+trueWidth*7/2+3*svgGap, Math.random()*startY, vertexSets, {
				render: {
					fillStyle: blueColor,
				},
				friction: frictionSVG,
				restitution: restitutionSVG,
			}, true));
		});
	} else {
		Common.warn('Fetch is not available. Could not load SVG.');
	}
}

document.addEventListener("scroll", function() {
	smile1.applyForce();
	smile2.applyForce();
});
var mouse = Mouse.create(render.canvas),
	mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false,
			}
		}
	});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// // Allow page scrolling in matter.js window
mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

// // Detect clicks vs. drags
let click = false;

document.addEventListener('mousedown', () => click = true);
document.addEventListener('mousemove', () => click = false);
document.addEventListener('mouseup', () => console.log(click ? 'click' : 'drag'));

// // Create a On-Mouseup Event-Handler
// Events.on(mouseConstraint, 'mouseup', function(event) {
// 	var mouseConstraint = event.source;
// 	var bodies = engine.world.bodies;
// 	if (!mouseConstraint.bodyB) {
// 		for (i = 0; i < bodies.length; i++) { 
// 			var body = bodies[i];
// 			// Check if clicked or dragged
// 			if (click === true) {
// 			if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
// 					var bodyUrl = body.url;
// 					console.log("Body.Url >> " + bodyUrl);
// 					// Hyperlinking feature
// 					if (bodyUrl != undefined) {
// 						//window.location.href = bodyUrl;
// 						window.open(bodyUrl, '_blank');
// 						console.log("Hyperlink was opened");
// 					}
// 					break;
// 				}
// 			}
// 		}
// 	}
// });

// run the engine
Runner.run(engine);

// run the renderer
Render.run(render);