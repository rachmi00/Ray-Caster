class Particle {
    constructor() {
      this.fov = 45;
      this.pos = createVector(sceneW / 2, sceneH / 2);
      this.rays = [];
      this.heading = 0;
      for (let a = -this.fov; a < this.fov; a += 1) {
        this.rays.push(new Ray(this.pos, radians(a)));
      }
    }
  
    updateFOV(fov) {
      this.fov = fov;
      this.rays = [];
      for (let a = -fov; a < fov; a += 1) {
        this.rays.push(new Ray(this.pos, radians(a) + this.heading));
      }
    }
  
    rotate(angle) {
      this.heading += angle;
      let index = 0;
      for (let a = -this.fov; a < this.fov; a += 1) {
        this.rays[index].setAngle(radians(a) + this.heading);
        index++;
      }
    }
  
    move(amt) {
      const vel = p5.Vector.fromAngle(this.heading);
      vel.setMag(amt);
      const newPos = p5.Vector.add(this.pos, vel);
  
      // Collision detection
      let collision = false;
      for (let wall of walls) {
        if (this.intersectsWall(newPos, wall)) {
          collision = true;
          break;
        }
      }
  
      if (!collision) {
        this.pos.add(vel);
      }
    }
  
    intersectsWall(pos, wall) {
      // Simple distance-based collision detection
      const d = dist(pos.x, pos.y, wall.a.x, wall.a.y);
      return d < 10; // Adjust threshold as needed
    }
  
    look(walls) {
      const scene = [];
      for (let i = 0; i < this.rays.length; i++) {
        const ray = this.rays[i];
        let closest = null;
        let record = Infinity;
        for (let wall of walls) {
          const pt = ray.cast(wall);
          if (pt) {
            let d = p5.Vector.dist(this.pos, pt);
            const a = ray.dir.heading() - this.heading;
            d *= cos(a);
            if (d < record) {
              record = d;
              closest = pt;
            }
          }
        }
        if (closest) {
          stroke(255, 100);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
        scene[i] = record;
      }
      return scene;
    }
  
    show() {
      fill(255);
      ellipse(this.pos.x, this.pos.y, 16);
      for (let ray of this.rays) {
        ray.show();
      }
    }
  }