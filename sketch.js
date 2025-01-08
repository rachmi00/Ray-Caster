let walls= [];
let ray;
let particle;
let xoff =0;
let yoff = 100;


function setup() {
    createCanvas(400, 400);
   
   
    for(let i=0; i<5; i++){
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
  
    // ray = new Ray(100, 200, 100, 200)
    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of walls){
        wall.show();
    }
    // ray.show();
    // ray.lookAt(mouseX, mouseY)
    particle.update(noise(xoff)*width, noise(yoff* height));
    particle.show();
    particle.look(walls);

    xoff += 0.01
    yoff += 0.01
    //cast a ray against a wall 
    // let pt = ray.cast(wall);
    //if the point exists
    // console.log(pt)
    // if(pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8);
    // }
}