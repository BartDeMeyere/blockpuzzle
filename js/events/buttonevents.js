
$("#newgame").on("click" , function(){

    cells.forEach(cell => {

        cell.color = cell.boardcolor
        cell.defaultcolor = cell.boardcolor
        cell.colored = false

    })

    tetrominoes = []
    score = 0
    gameOver = false

    $(".score").html(score)

    CreateNewTetromino()

    $(".gameOverUI").css("display" ,"none")

    canplaysound = true
})

$("#startgame").on("click" , function(){

    cells = []
    tetrominoes = []
    CreateCells(rows, columns)
    CreateNewTetromino()
    $(".gameStartUI").css("display" , "none")
    $(".container").css("display" , "block")

})