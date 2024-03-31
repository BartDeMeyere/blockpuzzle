class Miniblock{

    constructor(x , y , size , color){

        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.rotation = 0
        this.rotationspeed = random( -.05 , .05)
        this.alpha = 1
        this.velocity = {

            x: random(-5,5),
            y: random(-10,-15)

        }
    }

    draw(){

        c.save()
        c.translate(this.x , this.y)
        c.rotate(this.rotation)
        c.beginPath()
        c.globalAlpha = this.alpha
        c.strokeStyle = "black"
        c.fillStyle = this.color
        c.roundRect(-this.size/2 , -this.size/2 , this.size , this.size , this.size/5);
        c.stroke()
        c.fill()
        c.closePath()
        c.restore()
    }

    move(){

        if(this.alpha > .02){

            this.alpha -= .02

        }else{

            this.alpha = 0
        }

        this.velocity.y += .5

        this.rotation += this.rotationspeed
        this.x += this.velocity.x 
        this.y += this.velocity.y
    }
}