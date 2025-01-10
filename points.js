
//creates circular points for collection
class Points {
    constructor(pos, d) {
        this.pos = pos;
        this.d = d
    }
    
    show() {
        stroke(255);
        circle(this.a, this.b, this.d)
    }
} 