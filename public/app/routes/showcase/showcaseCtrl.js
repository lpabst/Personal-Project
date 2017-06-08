angular.module("tutorialSite")
  .controller("showcaseCtrl", function($scope) {

// **********CALCULATOR FUNCTIONS***********************************
    $scope.display = '0';

    $scope.clear = function(){
      $scope.display = '0';
    }

    $scope.backspace = function(){
      arr = $scope.display.split('');
      arr.pop();
      $scope.display = arr.join('');
      if ($scope.display == ''){
        $scope.display = '0';
      }
    }

    $scope.addToDisplay = function(str){
      if ($scope.display == '0'){
        $scope.display = str;
      }else{
        $scope.display += str;
      }
    }

    $scope.positiveNegative = function(){
      if (!($scope.display == '0')){
        arr = $scope.display.split('');
        if(arr[0] == '-'){
          arr.shift();
        }else{
          arr.unshift('-');
        }
        $scope.display = arr.join('');
      }
    }

    $scope.equals = function(){
      $scope.display = eval($scope.display);
    }


// **********CONNECT 4 FUNCTIONS******************************************
    var board = [
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column0
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column1
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column2
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column3
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column4
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column5
        ['#111', '#111', '#111', '#111', '#111', '#111', ]  //column6
    ];
    var color = '#7f3';
    var id = '';
    var functionToExecute = clearBoard;
    
    $scope.playerOneName = 'Player 1';
    $scope.playerTwoName = 'Player 2';
    $scope.showAreYouSureBox = false;
    $scope.showWinnerBox = false;
    $scope.score = {
        player1: 0,
        player2: 0,
    }

    var $column = $('.column');
    var $circle = $('.circle');

//Controls Fuctions

    $scope.getScore = function(){
        return $scope.score;
    }

    $scope.getScore();

    var clearBoard = function(){
        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++){
                board[i][j] = '#111';
            }
        }
        $circle.css('background', '#111');
        $scope.showAreYouSureBox = false;
    }

    var resetScore = function(){
        $scope.score = {
            player1: 0,
            player2: 0
        }
        $scope.showAreYouSureBox = false;
    }

    $scope.areYouSure = function(num, str){
        $scope.action = str;
        $scope.showAreYouSureBox = true;
        if (num === 1){
            functionToExecute = clearBoard;
        }else if (num === 2){
            functionToExecute = resetScore;
        }
    }

    $scope.executeSelectedFunction = function(){
        functionToExecute();
    }

    $scope.hideAreYouSureBox = function(){
        $scope.showAreYouSureBox = false;
    }

// Board Functions
    
    //Show piece drop location on hover
    $column.mouseenter(highlightLocation);

    function highlightLocation(){
        var columnIndex = $(this).attr('id').split('').pop();   //gets column index from the 'id' attribute
        for (var j = 0; j < board[columnIndex].length; j++){    //loops through the selected column in the array
            if (board[columnIndex][j] == '#111'){              //finds the first circle that is #111
                var id = '#c'+columnIndex+'r'+j;                //constructs the proper id selector using the current array index 
                if (color == '#7f3'){                       
                    return $(id).css('background', '#af7');     //highlights the id-selected div light green;
                }else{
                    return $(id).css('background', '#940');     //highlights the id-selected div light orange;
                }
                
            }
        }
    }

    //Return css to normal background when mouse
    //leaves the hover
    $column.mouseleave(function(){
        var columnIndex = $(this).attr('id').split('').pop();
        for (var j = 0; j < board[columnIndex].length; j++){
            if (board[columnIndex][j] != '#7f3' 
            && board[columnIndex][j] !='#f80'){
                var id = '#c'+columnIndex+'r'+j;
                $(id).css('background', '#111');
            }
        }
    })

  //Player 1 = '#7f3 (green)', Player 2 ='#f80 (orange)'
    function colorChange(){
        if (color == '#7f3'){
            color = '#f80';
        }else{
            color = '#7f3';
        }
    }

//Changes the color of appropriate circle 
//when column is clicked
    $column.click(function(){
        var columnIndex = $(this).attr('id').split('').pop();   //gets column index from the 'id' attribute
        for (var j = 0; j < board[columnIndex].length; j++){    //loops through the selected column in the array
            if (board[columnIndex][j] == '#111'){              //finds the first circle that is #111
                board[columnIndex][j] = color;                  //updates the array according to who made the move
                var id = '#c'+columnIndex+'r'+j;                //constructs the appropriate id-selector
                $(id).css('background', color);                 //updates the id-selected div according to who made the move
                return colorChange();                           //changes who's turn it is
            }
        }
    })

//Game Over / Winner functions
    $scope.showWinner = function(str){
        if (str == 'Player 1'){
            $('.winner_box').css('color', '#bdff58');
            $scope.winner = $scope.playerOneName;
        }else{
            $('.winner_box').css('color', '#f60');
            $scope.winner = $scope.playerTwoName;
        }
        $scope.showWinnerBox = true;
    }

    $scope.newGame = function(){
        $scope.showWinnerBox = false;
        clearBoard();
    }

    $scope.checkForWinner = function(){
        //vertical winner
        for (var i = 0; i < board.length; i ++){
            for (var j = 0; j <= 2; j ++){
                if (board[i][j] == '#7f3'
                && board[i][j+1] == '#7f3'
                && board[i][j+2] == '#7f3'
                && board[i][j+3] == '#7f3'){
                    $scope.showWinner('Player 1');
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i][j+1] =='#f80'
                && board[i][j+2] =='#f80'
                && board[i][j+3] =='#f80'){
                    $scope.showWinner('Player 2');
                    return $scope.score.player2 += 1;
                }
            }
        }

        //horizontal winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = 0; j < 6; j ++){
                if (board[i][j] == '#7f3'
                && board[i+1][j] == '#7f3'
                && board[i+2][j] == '#7f3'
                && board[i+3][j] == '#7f3'){
                    $scope.showWinner('Player 1');
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i+1][j] =='#f80'
                && board[i+2][j] =='#f80'
                && board[i+3][j] =='#f80'){
                    $scope.showWinner('Player 2');
                    return $scope.score.player2 += 1;
                }
            }
        }

        //bottom left to upper right winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = 0; j <=2; j ++){
                if (board[i][j] == '#7f3'
                && board[i+1][j+1] == '#7f3'
                && board[i+2][j+2] == '#7f3'
                && board[i+3][j+3] == '#7f3'){
                    $scope.showWinner('Player 1');
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i+1][j+1] =='#f80'
                && board[i+2][j+2] =='#f80'
                && board[i+3][j+3] =='#f80'){
                    $scope.showWinner('Player 2');
                    return $scope.score.player2 += 1;
                }
            }
        }

        //upper left to bottom right winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = board[i].length-1; j >= 3; j --){
                if (board[i][j] == '#7f3'
                && board[i+1][j-1] == '#7f3'
                && board[i+2][j-2] == '#7f3'
                && board[i+3][j-3] == '#7f3'){
                    $scope.showWinner('Player 1');
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i+1][j-1] =='#f80'
                && board[i+2][j-2] =='#f80'
                && board[i+3][j-3] =='#f80'){
                    $scope.showWinner('Player 2');
                    return $scope.score.player2 += 1;
                }
            }
        }
    }

    //Audio Controls
    var playlist=[
        './img/audio/tiptoe.mp3',
        './img/audio/bats.mp3',
        './img/audio/troll_hunt.mp3',
        './img/audio/in_doubt.mp3',
        './img/audio/spy_story.mp3'
    ];
    
    var nextSong = 1;
    var audio = document.getElementById('audio');

    audio.addEventListener('ended', function(){
        audio.src = playlist[nextSong];
        audio.load();
        audio.play();
        if (nextSong >= playlist.length-1){
            nextSong = 0;
        }else{
            nextSong++
        }
    })

    function pauseAudio(){
        if (this.scrollY > 100){
            audio.pause();
            console.log('hi');
        }else{
            audio.play();
        }
    }

    window.addEventListener("scroll", pauseAudio, false);

// **********CONNECT 4 FUNCTIONS******************************************

    var doors = [];

    $scope.goatsWon = 0;

    var timesSwitched = 0;
    var switchedAndWon = 0;
    var timesStayed = 0;
    var stayedAndWon = 0;

    $scope.check1;
    $scope.check2;
    $scope.check3;
    $scope.prize1 = '';
    $scope.prize2 = '';
    $scope.prize3 = '';
    $scope.showHostExplanationBox = false;
    
    var finalSelection;
    var originalChoice;
    var finalChoice;

    var $door = $('.door');
    var $instructions = $('#instructions');
    var $prize = $('.prize');

//Door logic
    $scope.playGame = function(){
        //reset doors and door logic
        doors = ['goat', 'goat', 'goat'];
        var doorWithCar = Math.floor(Math.random()*3);
        doors[doorWithCar] = 'car';
        $scope.prize1 = doors[0];
        $scope.prize2 = doors[1];
        $scope.prize3 = doors[2];
        //reset animations
        $door.css('transform', 'rotateY(0deg)');
        $instructions.text('Pick a door');
        $instructions.css('border', 'none');
        $prize.css({'font-size': '1px', 'left': '10px'});
        setTimeout(function(){$prize.css('font-size', '25px')}, 2000);
        $scope.hideAllCheckMarks();
    }

    $scope.updateStats = function(num){
        if (doors[num-1] == 'car' && finalChoice == originalChoice){
            stayedAndWon++;
            timesStayed++;
        }else if(doors[num-1] == 'car' && finalChoice != originalChoice){
            switchedAndWon++;
            timesSwitched++;
        }else if(doors[num-1] != 'car' && finalChoice != originalChoice){
            $scope.goatsWon++;
            timesSwitched++;
        }else if(doors[num-1] != 'car' && finalChoice == originalChoice){
            $scope.goatsWon++;
            timesStayed++;       }
        $scope.carsWon = stayedAndWon + switchedAndWon;
        $scope.switchSuccess = (switchedAndWon / timesSwitched)*100;
        $scope.staySuccess = (stayedAndWon / timesStayed)*100;
    }

//Visual effects
    $scope.pickDoor = function(num){
        let id = '#'+num;
        let prize = '#p'+num;
        if (finalSelection){
            if (num != $scope.doorOpenedByHost){$scope.showHostExplanationBox = false;
                $scope.hideAllCheckMarks();
                finalChoice = num;
                $scope.updateStats(num);
                $(id).css('transform', 'rotateY(-65deg)');
                $(prize).css('left', '75px');
                $instructions.text('Play Again?');
                $instructions.css('border', '2px solid black');
            }
        }else{
            $scope.checkMark(num); 
            originalChoice = num;
            $scope.hostOpensDoor(num);
        }
    }

    $scope.checkMark = function(num){
        if (num === 1){
            $scope.check1 = true;
        }else if (num === 2){
            $scope.check2 = true;
        }else if (num === 3){
            $scope.check3 = true;
        }        
        finalSelection = true;
    }

    $scope.hostOpensDoor = function(userChoice){
        $scope.showHostExplanationBox = true;
        $scope.userChoice = userChoice;

        var hostOptions = [];
        for (var i = 1; i <= 3; i ++){
          if (i != userChoice){
            hostOptions.push(i);
          }
        }

        var rand, doorOpened, hostChoice;

        for (var i = 0; i < 5; i){
          rand = Math.floor(Math.random()*2);
          doorOpened = hostOptions[rand];
          hostChoice = doors[doorOpened-1];
          if (hostChoice != 'car'){
            i = 10;
          }
        }

        $scope.doorOpenedByHost = doorOpened;

        let id = '#' + $scope.doorOpenedByHost;
        let prize = '#p' + $scope.doorOpenedByHost;
        $(id).css('transform', 'rotateY(-65deg)');
        $(prize).css('left', '75px');
    }

    $scope.hideHostExplanationBox = function(){
        $scope.showHostExplanationBox = false;
    }

    $scope.hideAllCheckMarks = function(){
        $scope.check1 = false;
        $scope.check2 = false;
        $scope.check3 = false;
        finalSelection = false;
    }

//Initiate first iteration of the game
    $scope.playGame();

  });
