var v
var position
var velocity
var acceleration
var r
var maxforce
var maxspeed

setup= function() {
  createCanvas(600,600)
  v = new vehicle(width/2,height/2)
}

draw= function(){
    background(200);
  var mouse = new createVector(mouseX,mouseY)
  
  fill(100)
  stroke(0)
  strokeWeight(2)
  ellipse(mouse.x,mouse.y, 50,50)
  
  
  v.seek(mouse);
  v.update();
  v.show();
  
}

var vehicle = function(x,y){
  acceleration = new p5.Vector(0,0)
  velocity = new p5.Vector(0,-1)
  position = new p5.Vector(x,y)
  r=6
  maxspeed = 4
  maxforce = 0.1
}

vehicle.prototype.update=function(){
  velocity.add(acceleration)
  velocity.limit(maxspeed)
  position.add(velocity)
  acceleration.mult(0)
}

vehicle.prototype.applyForce=function(force) {
  acceleration.add(force);
}

vehicle.prototype.seek=function(target){
  var desired = p5.Vector.sub(target,position)
  
  desired.setMag(maxspeed);
  
  var steer = p5.Vector.sub(desired,velocity)
  steer.limit(maxforce);
  
  v.applyForce(steer)
}

vehicle.prototype.show=function(){
  
  fill(127)
  stroke(0)
  strokeWeight(1)
  push()
  translate(position.x,position.y)
  
  beginShape()
  vertex(0, -r*2)
  vertex(-r, r*2)
  vertex(r, r*2)
  endShape()
  pop()
}




