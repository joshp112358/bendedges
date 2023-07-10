let gui;
let controlMode;
let exported;



function arrow(x,y,angle){

  beginShape(LINES);
  vertex(x,y);
  vertex(x+30*cos(angle+PI+0.25*PI),y+30*sin(angle+PI+0.25*PI));
  vertex(x,y);
  vertex(x+30*cos(angle+PI-0.25*PI),y+30*sin(angle+PI-0.25*PI));
  endShape();

}

function angleToNode(x1,y1,x2,y2){
  // x1 y1 receive
  // x2 y2 from
		let m = (y2-y1)/(x2-x1);
    if( x1>x2) {
      console.log("uh");
      return atan(m);}
    else {
      console.log("other");
      return PI+atan(m);}
}

class DirectedEdge {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.mid_x = (x1 + x2) / 2;
    this.mid_y = (y1 + y2) / 2;
    this.bend_edges = true;
    this.color = [random(0,255), random(0,255), random(0,255)];
  }
  display() {
    strokeWeight(4);
    noFill();
    beginShape();
    curveVertex(this.x1, this.y1);
    curveVertex(this.x1, this.y1);
    curveVertex(this.mid_x, this.mid_y);
    curveVertex(this.x2, this.y2);
    curveVertex(this.x2, this.y2);
    endShape();
    console.log(angleToNode(this.x2,this.y2,this.mid_x, this.mid_y));
    arrow(this.x2,this.y2,angleToNode(this.x2,this.y2,this.mid_x, this.mid_y))
    if (this.bend_edges){
      fill(this.color);
      circle(this.x1, this.y1, 10);
      circle(this.x2, this.y2, 10);
      circle(this.mid_x, this.mid_y, 10);
    }
  }
  clicked() {
    if (this.bend_edges){
      let d1 = dist(mouseX, mouseY, this.mid_x, this.mid_y);
      if (d1 <= 10) {
        console.log("yo1")
        this.mid_x = mouseX;
        this.mid_y = mouseY;
        loop();
        return;
      }
      let d2 = dist(mouseX, mouseY, this.x1, this.y1);
      if (d2 <= 10) {
        console.log("yo2")
        this.x1 = mouseX;
        this.y1 = mouseY;
        loop();
        return;
      }
      let d3 = dist(mouseX, mouseY, this.x2, this.y2);
      if (d3 <= 10) {
        console.log("yo3")
        this.x2 = mouseX;
        this.y2 = mouseY;
        loop();
        return;
      }
    }
  }
}

let curve;


function setup() {
  createCanvas(650, 650);
  curve = new DirectedEdge(100, 100, 320, 320);

  gui = new dat.GUI();
  gui.add(curve, "bend_edges").onChange(loop);
}


function draw() {

  background("pink");
  curve.display();
  noLoop();
}


function mouseDragged() {
  curve.clicked()
}
