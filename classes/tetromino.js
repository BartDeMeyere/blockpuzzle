class Tetromino{

    constructor(x,y,blocksize){

        this.x = x;
        this.y = y;
        this.oldx = this.x 
        this.oldy = this.y
        this.blocksize = blocksize
        this.color = undefined
        this.alpha = 1
        this.canDrag = true
        this.tetrominoes = 
        
                [

                    [[1,1,1],[0,1,0]],
                    [[2,2,0],[2,2,0]],
                    [[3,0,0],[3,3,3]],
                    [[0,4,0],[4,4,4]],
                    [[5,5,5],[0,0,0]],
                    [[6,6,0],[0,6,6]],
                    [[0,7,7],[7,7,0]],
                    [[0,8,0],[0,8,0],[8,8,0]]

                ]

        this.counter = 0
        this.index = Math.floor(Math.random() * this.tetrominoes.length)
        this.tetromino = this.tetrominoes[this.index]
        this.blockpositions = []
    }

    setCounter(){

        console.log(this.tetromino)

        for(var i = 0 ; i < this.tetromino.length ; i++){

            for(var j = 0 ; j < this.tetromino[i].length ; j++){

                if(this.tetromino[i][j] > 0){

                    this.counter++

                }
            }
        }
    }

    updateBlockpositions(){

        this.blockpositions = []

        for(var i = 0 ; i < this.tetromino.length ; i++){

            for(var j = 0 ; j < this.tetromino[i].length ; j++){

                if(this.tetromino[i][j] > 0){

                    var x = this.x + j * this.blocksize
                    var y = this.y + i * this.blocksize

                    this.blockpositions.push({x:x,y:y})
                }
            }
        }
    }

    draw(){

        //color
        switch(this.index){

            case 0: this.color = "rgba(160,32,240,1)";break;//purple
            case 1: this.color = "rgba(255,255,0,1)";break; //yellow
            case 2: this.color = "rgba(255,165,0,1)";break; //orange
            case 3: this.color = "rgba(255,0,255,1)";break; //magenta
            case 4: this.color = "rgba(0,255,255,1)";break; //cyan
            case 5: this.color = "rgba(255,0,0,1)";break;   //red
            case 6: this.color = "rgba(50,255,50,1)";break; //lime
            case 7: this.color = "rgba(0,0,255,1)";break;   //blue

        }

        //draw tetromino
        for(var i = 0 ; i < this.blockpositions.length ; i++){

            c.beginPath()
            c.strokeStyle = "rgb(0,0,0)"
            c.fillStyle = this.color;
            c.roundRect(this.blockpositions[i].x , this.blockpositions[i].y , this.blocksize * .95, this.blocksize * .95 , this.blocksize/5)
            c.fill()
            c.stroke()
            c.closePath()
 
        }

    }

    inside(x , y){

        for(var i = 0 ; i < this.blockpositions.length ; i++)

            if(x > this.blockpositions[i].x && 
               x < this.blockpositions[i].x + this.blocksize &&
               y > this.blockpositions[i].y && 
               y <  this.blockpositions[i].y + this.blocksize){

                return true
            }
    }
}