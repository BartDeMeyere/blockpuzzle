class Cell{

    constructor(x , y , size){

        this.x = x 
        this.y = y 
        this.size = size
        this.color = "rgb(255,255,255)"
        this.row = 0
        this.column = 0
        this.boardcolor = undefined
        this.defaultcolor = this.color
        this.colored = false
    }

    draw(){

        c.save()
        c.translate(this.x , this.y)
        c.beginPath()
        c.strokeStyle = "rgb(0,0,0)"
        c.fillStyle = this.color
        c.roundRect(-this.size/2 , -this.size/2 , this.size , this.size , this.size/5)
        c.stroke()
        c.fill()
        c.closePath()
        c.restore()
    }

    insideCell(x , y){

        if(x > this.x - this.size/2 && x < this.x + this.size/2 && y > this.y - this.size/2 && y < this.y + this.size/2){

            return true
        }
    }
}