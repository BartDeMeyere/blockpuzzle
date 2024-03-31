class Scorelabel{

    constructor(x , y , size , color , text){

        this.x = x 
        this.y = y
        this.size = size;
        this.color = color;
        this.text = text
        this.opacity = 1
    }

    draw(){

        c.save()
        c.translate(this.x , this.y)
        c.beginPath()
        c.fillStyle = this.color
        c.globalAlpha = this.opacity
        c.textAlign = "center"
        c.textBaseline = "middle"
        c.font = this.size/3  + "px arial"
        c.fillText(this.text , 0 , 0)
        c.closePath()
        c.restore()
    }

    animate(){

        if(this.opacity > .03){

            this.opacity -= .03

        }else{

            this.opacity = 0

        }

        this.y -= 2
    }
}