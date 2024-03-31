$("canvas").on("mousemove", function (e) {

    cells.forEach(cell => {

        cell.color = cell.defaultcolor
    })

    mouse.x = e.clientX * devicePixelRatio
    mouse.y = e.clientY * devicePixelRatio

    if (mousedown) {

        //tetromino selected
        if (pickedtetromino && pickedtetromino.canDrag) {

            pickedtetromino.x = mouse.x - dx
            pickedtetromino.y = mouse.y - dy

            pickedtetromino.updateBlockpositions()

            if (canFit(pickedtetromino)) {

                cells.forEach(cell => {

                    if (pickedtetromino.inside(cell.x, cell.y)) {

                        cell.color = pickedtetromino.color
                    }
                })
            }

        }
    }

})


$("canvas").on("mousedown", function (e) {

    mousedown = true

    for (var i = 0; i < tetrominoes.length; i++) {

        if (tetrominoes[i].inside(mouse.x, mouse.y)) {

            pickedtetromino = tetrominoes[i]
            
            if(pickedtetromino.canDrag){

                pickedtetromino.blocksize = size
                pickedtetromino.updateBlockpositions()
                dx = mouse.x - pickedtetromino.x
                dy = mouse.y - pickedtetromino.y
                break;
            }
           
        }
    }

})

$("canvas").on("mouseup", function (e) {

    mousedown = false

    if (pickedtetromino) {

        if (canFit(pickedtetromino)) {

            placesound.play()

            cells.forEach(cell => {

                if (cell.color !== cell.defaultcolor) {

                    cell.defaultcolor = cell.color
                    cell.colored = true

                    scorelabels.push(new Scorelabel(cell.x , cell.y , cell.size , "black" , "+2"))

                    score += 2

                    $(".score").html(score)
                }
            })

            //remove picked tetromino from array
            for (var i = 0; i < tetrominoes.length; i++) {

                if (tetrominoes[i] === pickedtetromino) {

                    tetrominoes.splice(i, 1)
                }
            }

            pickedtetromino = undefined
            //create new tetrominoes
            CreateNewTetromino()
            //remove complete rows , columns and subgrids
            GetColoredcells()

            gameOver = false

            Checkmoves()

        }else{

            pickedtetromino.x = pickedtetromino.oldx
            pickedtetromino.y = pickedtetromino.oldy
            pickedtetromino.blocksize = subsize
            pickedtetromino.updateBlockpositions()
            pickedtetromino = undefined
            errorsound.play()
        }   

    }

    if(gameOver){

        $(".gameOverUI").css("display" ,"block")

        $(".outputscore").html("your score: " + score)

        if(canplaysound){

            gameOversound.play()
            canplaysound = false

        }


        tetrominoes.forEach(tetromino => {

            tetromino.canDrag = false
        })
        

   }

})
