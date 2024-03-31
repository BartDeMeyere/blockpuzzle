let canvas = $("canvas")[0];
let c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

$("canvas").css("width", 100 + "%")
$("canvas").css("height", 100 + "%")

$(".container").css("display" , "none")

let cells = []
let rows = 9
let columns = 9
let size = 125
let subsize = size * .7
let x_offset = (canvas.width - (columns * size)) / 2
let y_offset = 400
let mouse = { x: 0, y: 0 }
let tetrominoes = []
let pickedtetromino = undefined
let mousedown = false
let score = 0
let blockpoint = 30
let dx, dy
let coloredcells = []
let placesound = new Audio("sounds/place.mp3")
let errorsound = new Audio("sounds/error.mp3")
let combosound = new Audio("sounds/combo.mp3")
let gameOversound = new Audio("sounds/gameOver.mp3")
let gameOver = false
let canplaysound = true

let miniblocks = []
let scorelabels = []

//mobile event
let touchedown = false
let touche = { x: 0, y: 0 }

RenderCanvas()

function CreateCells(rows, cols) {

    for (var i = 0; i < rows; i++) {

        for (var j = 0; j < cols; j++) {

            var newcell = new Cell(x_offset + size / 2 + j * size, y_offset + size / 2 + i * size, size * .95);
            newcell.row = i
            newcell.column = j

            if (i < 3 && j > 2 && j < 6) {

                newcell.color = "rgb(230,230,230)"
                newcell.boardcolor = "rgb(230,230,230)"
                newcell.defaultcolor = newcell.color
            } else


                if (i > 2 && i < 6 && j < 3) {

                    newcell.color = "rgb(230,230,230)"
                    newcell.boardcolor = "rgb(230,230,230)"
                    newcell.defaultcolor = newcell.color
                } else


                    if (i > 2 && i < 6 && j > 5 && j < 9) {

                        newcell.color = "rgb(230,230,230)"
                        newcell.boardcolor = "rgb(230,230,230)"
                        newcell.defaultcolor = newcell.color
                    } else

                        if (i > 5 && i < 9 && j > 2 && j < 6) {

                            newcell.color = "rgb(230,230,230)"
                            newcell.boardcolor = "rgb(230,230,230)"
                            newcell.defaultcolor = newcell.color

                        } else {

                            newcell.color = "rgb(255,255,255)"
                            newcell.boardcolor = "rgb(255,255,255)"
                            newcell.defaultcolor = newcell.color
                        }

            cells.push(newcell)
        }
    }
}

function CreateNewTetromino() {

    if (tetrominoes.length === 0) {

        var sx = x_offset + subsize
        var sy = y_offset + size * rows + size

        for (var i = 0; i < 3; i++) {

            do {

                var tetromino = new Tetromino(sx + i * subsize * 4 , sy ,  subsize)

            } while (!isValid(tetromino))

            tetrominoes.push(tetromino)
            tetromino.updateBlockpositions()
        }

    }
}

function isValid(tetromino) {

    for (var i = 0; i < tetrominoes.length; i++) {

        if (tetrominoes[i].index === tetromino.index) {

            return false
        }
    }

    return true
}

function RenderCanvas() {

    c.clearRect(0, 0, canvas.width, canvas.height)

    cells.forEach(cell => cell.draw())

    tetrominoes.forEach(tetromino => {

        tetromino.draw()
    })

    if(pickedtetromino){

        pickedtetromino.draw()

    }


    //draw miniblock
    miniblocks.forEach((block,index) => { 
        
        if(block.alpha > 0){

            block.draw();
            block.move()

        }else{

            miniblocks.splice(index , 1)

        }
 
    
    });

    scorelabels.forEach((label , index) => {

        if(label.opacity > 0){

            label.draw()
            label.animate()

        }else{

            scorelabels.splice(index , 1)

        }

     
    })

    requestAnimationFrame(RenderCanvas)
}

function canFit(tetromino) {

    var count = 0

    for (var j = 0; j < cells.length; j++) {

        if (tetromino.inside(cells[j].x, cells[j].y) && !cells[j].colored) {

            count++
        }
    }

    if (count === tetromino.blockpositions.length) {

        return true
    }
}

function GetCell(row , column){

    for(var i = 0 ; i < cells.length ; i++){

        if(cells[i].row === row && cells[i].column === column){

            return cells[i]
        }
    }
}

function isCompleteRow(row){

    for(var i = 0 ; i < columns ; i++){

        if(!GetCell(row , i).colored){

            return false
        }
    }

    return true
}

function isCompleteColumn(column){

    for(var i = 0 ; i < rows ; i++){

        if(!GetCell(i,column).colored){

            return false
        }
    }

    return true
}

function isCompleteSubgrid(row , column){

    var startrow = Math.floor(row / 3) * 3
    var startcolumn = Math.floor(column / 3) * 3

    for(var i = startrow ; i < startrow + 3 ; i++){

        for(var j = startcolumn ; j < startcolumn + 3 ; j++){

            if(!GetCell(i,j).colored){

                return false
            }
        }
    }

    return true
}

function GetColoredcells(){

    coloredcells = []

    //loop trough rows
    for(var i = 0 ; i < rows ; i++){

        //if complete row is found
       if(isCompleteRow(i)){

            //loop trough columns
            for(var j = 0 ; j < columns ; j++){

                if(GetCell(i,j).colored && coloredcells.indexOf(GetCell(i,j)) === -1){

                    coloredcells.push(GetCell(i,j))

                }
            }

       }
    }

    //loop trough columns
    for(var j = 0 ; j < columns ; j++){

        //if complete column is found
        if(isCompleteColumn(j)){

            //loop trough rows
            for(var i = 0 ; i < rows ; i++){

                if(GetCell(i,j).colored && coloredcells.indexOf(GetCell(i,j)) === -1){

                    coloredcells.push(GetCell(i,j))

                }
            }
        }
    }


    //loop trough all cells
    for(var i = 0 ; i < rows ; i+=3){

        for(var j = 0 ; j < columns ; j+=3){

            if(isCompleteSubgrid(i,j)){

                for(var r = i ; r < i + 3 ; r++){

                    for(var c = j ; c < j + 3 ; c++){

                        if(GetCell(r,c).colored && coloredcells.indexOf(GetCell(r,c)) === -1){

                            coloredcells.push(GetCell(r,c))
        
                        }
                    }
                }
      
            }
        }
    }


    if(coloredcells.length > 0){

        //reset coloredcells to boardcolor
        coloredcells.forEach(cell => {

            CreateMiniBlocks(cell.x , cell.y , cell.color)

            cell.color = cell.boardcolor
            cell.defaultcolor = cell.boardcolor
            cell.colored = false

           
    
        })

        combosound.play()
    }
  
    score += coloredcells.length * blockpoint

    $(".score").html(score)

}

function CreateMiniBlocks(x, y , color){

    for(var i = 0 ; i < 2 ; i++){

        for(var j = 0 ; j < 2 ; j++){

           var xp = x - size/4 + j * size/2
           var yp = y - size/4 + i * size/2
           miniblocks.push(new Miniblock(xp , yp , size/2 , color))
        }
    }
}

function Checkmoves(){

   //console.clear()

   for(var i = 0 ; i < tetrominoes.length ; i++){
 
        var count = 0
        var current = tetrominoes[i]

        for(var r = 0 ; r < rows ; r++){

            for(var c = 0 ; c < columns ; c++){

                for(var ii = 0 ; ii < current.tetrominoes[current.index].length ; ii++){

                    for(var jj = 0 ; jj < current.tetrominoes[current.index][ii].length ; jj++){

                        if(current.tetrominoes[current.index][ii][jj] > 0){

                            if(GetCell(r + ii , c + jj) && !GetCell(r + ii , c + jj).colored){
                            
                                count++
                            }
                        } 
                    
                    }
                }

                if(count === current.counter){

                   //console.log("it can fit")
                    gameOver = false
                    return

                }else{

                    //console.log("it cannot fit")
                    gameOver = true
                }

                count = 0

            }
        }
   }
 
}
