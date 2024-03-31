$("canvas").on("touchstart" , function(e){

    touchedown = true

    touche.x = e.changedTouches[0].clientX * devicePixelRatio
    touche.y = e.changedTouches[0].clientY * devicePixelRatio

    for(var i = 0 ; i < tetrominoes.length ; i++){

        if(tetrominoes[i].inside(touche.x , touche.y)){

            pickedtetromino = tetrominoes[i]
            dx = touche.x - pickedtetromino.x 
            dy = touche.y - pickedtetromino.y
            pickedtetromino.blocksize = size
            pickedtetromino.updateBlockpositions()
            break;
        }
    }
})

$("canvas").on("touchmove" , function(e){

    cells.forEach(cell => {

        cell.color = cell.defaultcolor
    })

    touche.x = e.changedTouches[0].clientX * devicePixelRatio
    touche.y = e.changedTouches[0].clientY * devicePixelRatio

    if(touchedown){

        //tetromino selected
        if(pickedtetromino && pickedtetromino.canDrag){

            pickedtetromino.x = touche.x - dx
            pickedtetromino.y = touche.y - dy  

            pickedtetromino.updateBlockpositions()

            if(canFit(pickedtetromino)){

                cells.forEach(cell => {

                    if(pickedtetromino.inside(cell.x , cell.y)){

                        cell.color = pickedtetromino.color
                    }
                })
            }

        }
    }
})

$("canvas").on("touchend" , function(e){

    touchedown = false

    if(pickedtetromino){

        if(canFit(pickedtetromino)){

            placesound.play()

            cells.forEach(cell => {

                if(cell.color !== cell.defaultcolor){

                    cell.defaultcolor = cell.color
                    cell.colored = true

                    scorelabels.push(new Scorelabel(cell.x , cell.y , cell.size , "black" , "+2"))

                    score += 2

                    $(".score").html(score)
                }
            })


            //remove picked tetromino from array
            for(var i = 0 ; i < tetrominoes.length ; i++){

                if(tetrominoes[i] === pickedtetromino){

                    tetrominoes.splice(i,1)
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
        $(".outputscore").html(score)

        if(canplaysound){

            gameOversound.play()
            canplaysound = false

        }

        tetrominoes.forEach(tetromino => {

            tetromino.canDrag = false
        })
        

   }

})