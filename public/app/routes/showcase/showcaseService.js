angular.module('tutorialSite').service('showcaseService', function($http){

    this.saveStats = function(stats){
        return $http.put('/api/updateStats', {
            "goatsWon": stats.goatsWon,
            "timesSwitched": stats.timesSwitched,
            "switchedAndWon": stats.switchedAndWon,
            "timesStayed": stats.timesStayed,
            "stayedAndWon": stats.stayedAndWon
        });
    }

    this.resetStats = function(){
        return $http.put('/api/updateStats', {
            "goatsWon": 0,
            "timesSwitched": 0,
            "switchedAndWon": 0,
            "timesStayed": 0,
            "stayedAndWon": 0
        })
    }

    this.getStats = function(){
        return $http.get('/api/getStats');
    }

/*********BLOCKS MY VERTICAL WIN, BUT THAT'S IT *******/
//Connect4 AI Fuctionality

    // var testBoard = [
    //     ['#7f3', '#7f3', '#7f3', '#111', '#111', '#111', ], //column0
    //     ['#7f3', '#7f3', '#7f3', '#111', '#111', '#111', ], //column1
    //     ['#111', '#111', '#111', '#111', '#111', '#111', ], //column2
    //     ['#111', '#111', '#111', '#111', '#111', '#111', ], //column3
    //     ['#111', '#111', '#111', '#111', '#111', '#111', ], //column4
    //     ['#111', '#111', '#111', '#111', '#111', '#111', ], //column5
    //     ['#111', '#111', '#111', '#111', '#111', '#111', ]  //column6
    // ];

    this.getComputerMove = function(board){
        if (checkFourOffense(board) < 10){                        //check if we have a winning move
            return checkFourOffense(board);
        }else if (checkFourDefense(board) < 10){                  //check if we can block a winning move
            return checkFourDefense(board);
        }else{
            return Math.floor(Math.random()*7);         //last resort, return a random move
        }
    }

//Used for testing
    // this.getComputerMove();
    // this.getComputerMove();
    // this.getComputerMove();
    // this.getComputerMove();
    // this.getComputerMove();

    function checkFourOffense(board){
        //vertical
        for (var i = 0; i < board.length; i ++){
            for (var j = 0; j <= 2; j ++){
                if (board[i][j] == '#f80'
                && board[i][j+1] == '#f80'
                && board[i][j+2] == '#f80'
                && board[i][j+3] == '#111'){
                    return i;
                }
            }
        }

        //horizontal
        for (var i = 0; i < board.length - 3; i ++){
            for (var j = 0; j < 6; j ++){
                if (board[i][j] == '#111'         //empty orange orange orange
                && board[i+1][j] == '#f80'
                && board[i+2][j] == '#f80'
                && board[i+3][j] == '#f80'){
                    if (j == 0){                            //if we're on the bottom row
                        return i;                           //go in that column
                    }else if (board[i][j-1] != '#111'){     //otherwise, if the spot beneath 'empty'
                        return i;                           //is taken, go in that column
                    }
                }else if (board[i][j] == '#f80'         //orange empty orange orange
                && board[i+1][j] == '#111'
                && board[i+2][j] == '#f80'
                && board[i+3][j] == '#f80'){
                    if (j == 0){                    
                        return i+1;                   
                    }else if (board[i+1][j-1] != '#111'){      
                        return i+1;                             
                    }
                }else if (board[i][j] == '#f80'         //orange orange empty orange
                && board[i+1][j] == '#f80'
                && board[i+2][j] == '#111'
                && board[i+3][j] == '#f80'){
                    if (j == 0){                    
                        return i+2;                   
                    }else if (board[i+2][j-1] != '#111'){      
                        return i+2;                             
                    }
                }else if (board[i][j] == '#f80'         //orange orange orange empty
                && board[i+1][j] == '#f80'
                && board[i+2][j] == '#f80'
                && board[i+3][j] == '#111'){
                    if (j == 0){                    
                        return i+3;                   
                    }else if (board[i+3][j-1] != '#111'){      
                        return i+3;                             
                    }
                }
            }
        }

        //bottom left to top right diagonal
        for (var i = 0; i < board.length - 3; i++){
            for (var j = 0; j <= 2; j ++){
                if (board[i][j] =='#111'
                    && board[i+1][j+1] =='#f80'
                    && board[i+2][j+2] =='#f80'
                    && board[i+3][j+3] =='#f80'){
                        if (j == 0){
                            return i;
                        }else if (board[i][j-1] != '#111'){
                            return i;
                        }
                }else if (board[i][j] =='#f80'
                    && board[i+1][j+1] =='#111'
                    && board[i+2][j+2] =='#f80'
                    && board[i+3][j+3] =='#f80'){
                        if (board[i+1][j] != '#111'){
                            return i+1;
                        }
                }else if (board[i][j] =='#f80'
                    && board[i+1][j+1] =='#f80'
                    && board[i+2][j+2] =='#111'
                    && board[i+3][j+3] =='#f80'){
                        if (board[i+2][j+1] != '#111'){
                            return i+2;
                        }
                }else if (board[i][j] =='#f80'
                    && board[i+1][j+1] =='#f80'
                    && board[i+2][j+2] =='#f80'
                    && board[i+3][j+3] =='#111'){
                        if (board[i+3][j+2] != '#111'){
                            return i+3;
                        }
                }
            }
        }

        //top left to bottom right diagonal
        for (var i = 0; i < board.length-3; i ++){
            for (var j = board[i].length-1; j >= 3; j --){
                if (board[i][j] =='#111'
                && board[i+1][j-1] =='#f80'
                && board[i+2][j-2] =='#f80'
                && board[i+3][j-3] =='#f80'){
                    if (board[i][j-1] != '#111'){
                        return i;
                    }
                }else if (board[i][j] =='#f80'
                && board[i+1][j-1] =='#111'
                && board[i+2][j-2] =='#f80'
                && board[i+3][j-3] =='#f80'){
                    if (board[i+1][j-2] != '#111'){
                        return i+1;
                    }
                }else if (board[i][j] =='#f80'
                && board[i+1][j-1] =='#f80'
                && board[i+2][j-2] =='#111'
                && board[i+3][j-3] =='#f80'){
                    if (board[i+2][j-3] != '#111'){
                        return i+2;
                    }
                }else if (board[i][j] =='#f80'
                && board[i+1][j-1] =='#f80'
                && board[i+2][j-2] =='#f80'
                && board[i+3][j-3] =='#111'){
                    if (j-3 == 0){
                        return i+3;
                    }else if (board[i+3][j-4] != '#111'){
                        return i+3;
                    }
                }
            }
        }

        //if we didn't find an answer, return a falsy value;
        return 10;
    }

    function checkFourDefense(board){
        //vertical
        for (var i = 0; i < board.length; i ++){
            for (var j = 0; j <= 2; j ++){
                if (board[i][j] == '#7f3'
                && board[i][j+1] == '#7f3'
                && board[i][j+2] == '#7f3'
                && board[i][j+3] == '#111'){
                    return i;
                }
            }
        }

        //horizontal
        for (var i = 0; i < board.length - 3; i ++){
            for (var j = 0; j < 6; j ++){
                if (board[i][j] == '#111'         //empty orange orange orange
                && board[i+1][j] == '#7f3'
                && board[i+2][j] == '#7f3'
                && board[i+3][j] == '#7f3'){
                    if (j == 0){                            //if we're on the bottom row
                        return i;                           //go in that column
                    }else if (board[i][j-1] != '#111'){     //otherwise, check the spot beneath 'empty'
                        return i;                           //is taken, then go in that column
                    }
                }else if (board[i][j] == '#7f3'         //orange empty orange orange
                && board[i+1][j] == '#111'
                && board[i+2][j] == '#7f3'
                && board[i+3][j] == '#7f3'){
                    if (j == 0){                    
                        return i+1;                   
                    }else if (board[i+1][j-1] != '#111'){      
                        return i+1;                             
                    }
                }else if (board[i][j] == '#7f3'         //orange orange empty orange
                && board[i+1][j] == '#7f3'
                && board[i+2][j] == '#111'
                && board[i+3][j] == '#7f3'){
                    if (j == 0){                    
                        return i+2;                   
                    }else if (board[i+2][j-1] != '#111'){      
                        return i+2;                             
                    }
                }else if (board[i][j] == '#7f3'         //orange orange orange empty
                && board[i+1][j] == '#7f3'
                && board[i+2][j] == '#7f3'
                && board[i+3][j] == '#111'){
                    if (j == 0){                    
                        return i+3;                   
                    }else if (board[i+3][j-1] != '#111'){      
                        return i+3;                             
                    }
                }
            }
        }

        //bottom left to top right diagonal
        for (var i = 0; i < board.length - 3; i++){
            for (var j = 0; j <= 2; j ++){
                if (board[i][j] =='#111'
                    && board[i+1][j+1] =='#7f3'
                    && board[i+2][j+2] =='#7f3'
                    && board[i+3][j+3] =='#7f3'){
                        if (j == 0){
                            return i;
                        }else if (board[i][j-1] != '#111'){
                            return i;
                        }
                }else if (board[i][j] =='#7f3'
                    && board[i+1][j+1] =='#111'
                    && board[i+2][j+2] =='#7f3'
                    && board[i+3][j+3] =='#7f3'){
                        if (board[i+1][j] != '#111'){
                            return i+1;
                        }
                }else if (board[i][j] =='#7f3'
                    && board[i+1][j+1] =='#7f3'
                    && board[i+2][j+2] =='#111'
                    && board[i+3][j+3] =='#7f3'){
                        if (board[i+2][j+1] != '#111'){
                            return i+2;
                        }
                }else if (board[i][j] =='#7f3'
                    && board[i+1][j+1] =='#7f3'
                    && board[i+2][j+2] =='#7f3'
                    && board[i+3][j+3] =='#111'){
                        if (board[i+3][j+2] != '#111'){
                            return i+3;
                        }
                }
            }
        }

        //top left to bottom right diagonal
        for (var i = 0; i < board.length-3; i ++){
            for (var j = board[i].length-1; j >= 3; j --){
                if (board[i][j] =='#111'
                && board[i+1][j-1] =='#7f3'
                && board[i+2][j-2] =='#7f3'
                && board[i+3][j-3] =='#7f3'){
                    if (board[i][j-1] != '#111'){
                        return i;
                    }
                }else if (board[i][j] =='#7f3'
                && board[i+1][j-1] =='#111'
                && board[i+2][j-2] =='#7f3'
                && board[i+3][j-3] =='#7f3'){
                    if (board[i+1][j-2] != '#111'){
                        return i+1;
                    }
                }else if (board[i][j] =='#7f3'
                && board[i+1][j-1] =='#7f3'
                && board[i+2][j-2] =='#111'
                && board[i+3][j-3] =='#7f3'){
                    if (board[i+2][j-3] != '#111'){
                        return i+2;
                    }
                }else if (board[i][j] =='#7f3'
                && board[i+1][j-1] =='#7f3'
                && board[i+2][j-2] =='#7f3'
                && board[i+3][j-3] =='#111'){
                    if (j-3 == 0){
                        return i+3;
                    }else if (board[i+3][j-4] != '#111'){
                        return i+3;
                    }
                }
            }
        }

        //if we didn't find an answer, return a falsy value;
        return 10;
    }





});