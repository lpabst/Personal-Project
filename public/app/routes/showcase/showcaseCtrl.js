angular.module("tutorialSite")
  .controller("showcaseCtrl", function($scope, $state, showcaseService) {

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
          if ($scope.display.length < 12){
            $scope.display += str;
          }
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
      $scope.display = String(eval($scope.display));
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
    var connect4Gameover = false;
    
    $scope.playerOneName = 'Player 1';
    $scope.playerTwoName = 'Player 2';
    $scope.player2IsComputer = true;
    $scope.showAreYouSureBox = false;
    $scope.showWinnerBox = false;
    $scope.score = {
        player1: 0,
        player2: 0,
    }

    var $column = $('.column');
    var $circle = $('.circle');
    var $player2 = $('#player2_select');

//Controls Fuctions

    $scope.player2Select = function(){
        if ($player2.val() == 'human'){
            $scope.player2IsComputer = false;
        }else{
            $scope.player2IsComputer = true;
        }
    }

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
        if (!connect4Gameover){
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
        if (!connect4Gameover){
            var columnIndex = $(this).attr('id').split('').pop();   //gets column index from the 'id' attribute
            for (var j = 0; j < board[columnIndex].length; j++){    //loops through the selected column in the array
                if (board[columnIndex][j] == '#111'){              //finds the first circle that is #111
                    board[columnIndex][j] = color;                  //updates the array according to who made the move
                    var id = '#c'+columnIndex+'r'+j;                //constructs the appropriate id-selector
                    $(id).css('background', color);                 //updates the id-selected div according to who made the move
                    if ($scope.player2IsComputer){
                        showcaseService.getComputerMove();
                    }else{
                        return colorChange();                           //changes who's turn it is
                    }
                }
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
        connect4Gameover = true;
    }

    $scope.newGame = function(){
        $scope.showWinnerBox = false;
        connect4Gameover = false;
        clearBoard();
    }

    $scope.checkForWinner = function(){
        if (!connect4Gameover){
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
    }

    //Audio Controls
    var playlist=[                                          //an array of all the audio src urls
        './img/showcase/connect4/audio/tiptoe.mp3',
        './img/showcase/connect4/audio/bats.mp3',
        './img/showcase/connect4/audio/troll_hunt.mp3',
        './img/showcase/connect4/audio/in_doubt.mp3',
        './img/showcase/connect4/audio/spy_story.mp3'
    ];
    
    var nextSong = 1;
    var audio = document.getElementById('audio');
    audio.pause();                                          //music is paused by default

    audio.addEventListener('ended', function(){             //grabs a new song when current song ends
        audio.src = playlist[nextSong];                     //updates the audio tag's src with the next song in the playlist
        audio.load();                                       //loads the song
        audio.play();                                       //plays the song
        if (nextSong >= playlist.length-1){                 //if we are playing the last song in the list, 
            nextSong = 0;                                   //starts the list over.
        }else{                                              //otherwise,
            nextSong++                                      //moves on to the next song in the list.
        }
    })
//  && elem.closest('[ui-view]').data('$uiView').state == 'showcase'
    function playAudio(){                                   //unpauses the music when connect4 is showing
        if (this.scrollY > 400                              //once we are basically past the calculator portion of the page
        && this.scrollY < 1310                              //and until we leave the connect4 portion of the page
        && $state.current.name == 'showcase'){              //and ONLY on the showcase view
            audio.play();                                   //play the music.
        }else{                                              //otherwise,
            audio.pause();                                  //pause it again
        }
    }

    window.addEventListener("scroll", playAudio, false);    //keeps track of where the user has scrolled to, and plays the
                                                            //music at the right time by firing the playAudio function

// **********GAMESHOW FUNCTIONS******************************************

    var gameover = false;                       //when true, clicking on doors does nothing
    var doors = [];                             //-playGame function sets two goats and one car randomly
                                                //into this array
    $scope.goatsWon;

    var timesSwitched;
    var switchedAndWon;                     //user switched doors and got the car
    var timesStayed;
    var stayedAndWon;                       //user stayed with original door and got the car

    $scope.check1;                              //checkmarks on doors only show when these are true
    $scope.check2;
    $scope.check3;
    $scope.prize1 = '';                         //-lets view know what to display behind doors 1,
    $scope.prize2 = '';                         //2,
    $scope.prize3 = '';                         //& 3
    $scope.showHostExplanationBox = false;      //-this box comes out after user picks a door, starts hidden
    
    var finalSelection;                         //-checks whether host has opened door and it's the user's final decision
    var originalChoice;                         //-if originalChoice == finalChoice, user stayed with their original door
    var finalChoice;                            //otherwise, they switched after the host opened a door

    var $door = $('.door');                     //all doors
    var $instructions = $('#instructions');     //instructions at the bottom of the page
    var $prize = $('.prize');                   //all prizes

//Door logic
    $scope.playGame = function(){
        //reset doors and door logic
        gameover = false;                                                   //allows user to select doors again
        finalSelection = false;                                             //let's program know user will make first choice at this point
        doors = ['goat', 'goat', 'goat'];                                   //reset doors
        var doorWithCar = Math.floor(Math.random()*3);                      //-pick random number 0-2
        doors[doorWithCar] = 'car';                                         //-use that random number to place a car
        $scope.prize1 = doors[0];                                           //-assign array value to $scope objects
        $scope.prize2 = doors[1];                                           //so that we know what to display behind
        $scope.prize3 = doors[2];                                           //each door
        //reset animations
        $door.css('transform', 'rotateY(0deg)');                            //-close all of the doors
        $instructions.text('Pick a door');                                  //reset instructions
        $instructions.css('border', 'none');                                //remove instructions border
        $prize.css({'font-size': '1px', 'left': '10px'});                   //make prizes small while the doors close
        setTimeout(function(){$prize.css('font-size', '25px')}, 2000);      //once doors, are closed, make them big again
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
            timesStayed++;       
        }
        $scope.carsWon = stayedAndWon + switchedAndWon;                                 //total cars won
        $scope.switchSuccess = Math.floor((switchedAndWon / timesSwitched)*100);        //percent of winning the car when switching doors after host opens a door
        $scope.staySuccess = Math.floor((stayedAndWon / timesStayed)*100);              //percent of winning the car when sticking with original door after host opens a door
    }

//Visual effects
    $scope.pickDoor = function(num){
        let id = '#'+num;                                           //gets the door id based on the users choice
        let prize = '#p'+num;                                       //gets the prize id based on the users choice
        if (gameover){

        }else if (finalSelection){                                  //if host has already opened a door
            if (num != $scope.doorOpenedByHost){                    //doesn't let the user select the door the host opened
                $scope.showHostExplanationBox = false;              //if explanation box is showing, hide it
                $scope.hideAllCheckMarks();                         
                finalChoice = num;                                 
                $scope.updateStats(num);                            //updates stats based on the door user picked
                $(id).css('transform', 'rotateY(-65deg)');          //opens the door user selected
                $(prize).css('left', '75px');                       //prize comes out from behind the door
                $instructions.text('Play Again?');                  //updates instructions to let user play again
                $instructions.css('border', '2px solid black');     //border makes the instructions seem more clickable
                gameover = true;
            }
        }else{                                     //if host hasn't opened a door yet, and user is picking for the first time
            $scope.checkMark(num);                 //add checkmark to the door user picks
            originalChoice = num;                  
            $scope.hostOpensDoor(num);             //triggers the function where host opens a door
        }
    }

    $scope.checkMark = function(num){               //puts checkmark on the door user picks at first
        if (num === 1){
            $scope.check1 = true;
        }else if (num === 2){
            $scope.check2 = true;
        }else if (num === 3){
            $scope.check3 = true;
        }        
        finalSelection = true;                      //user has picked a door. next user action will be their final Selection
    }

    $scope.hostOpensDoor = function(userChoice){    //everything in between user's two choices
        $scope.showHostExplanationBox = true;       //displays explanation box
        $scope.userChoice = userChoice;             //sets scope variable so view can display it during the explanation box

        var hostOptions = [];                       //declare empty array
        for (var i = 1; i <= 3; i ++){              //go through numbers 1-3
          if (i != userChoice){                     //only push the two numbers that the user didn't select for their door
            hostOptions.push(i);                    //(i.e. the host will never open the same door the user picks first)
          }
        }

        var rand, doorOpened, hostChoice;           //declare variables

        for (var i = 0; i < 5; i){                  //loop runs until we reach a desired outcome
          rand = Math.floor(Math.random()*2);       //generates random number 0 or 1
          doorOpened = hostOptions[rand];           //what door number did we pick?
          hostChoice = doors[doorOpened-1];         //what is behind that door?
          if (hostChoice != 'car'){                 //if it's not the car, great!
            i = 10;                                 //end the loop
          }                                         //if it is the car, the loop runs again and picks a new random door
        }

        $scope.doorOpenedByHost = doorOpened;           //whatever door ends up being the one the host opens
                                                        //is set to a scope variable
        let id = '#' + $scope.doorOpenedByHost;         //constructs door id based which door the host is opening
        let prize = '#p' + $scope.doorOpenedByHost;     //constructs prize id based on which door the host is opening
        $(id).css('transform', 'rotateY(-65deg)');      //opens the door
        $(prize).css('left', '75px');                   //reveals what's behind that door
    }

    $scope.hideHostExplanationBox = function(){
        $scope.showHostExplanationBox = false;
    }

    $scope.hideAllCheckMarks = function(){
        $scope.check1 = false;
        $scope.check2 = false;
        $scope.check3 = false;               //if we are hiding the checkmarks, that means the user 
    }                                           //needs to make a first selection again

//Gameshow Stats functions
    $scope.saveStats = function(){
        var stats = {
            goatsWon: $scope.goatsWon, 
            timesSwitched: timesSwitched,
            switchedAndWon: switchedAndWon,
            timesStayed: timesStayed,
            stayedAndWon: stayedAndWon
        }
        showcaseService.saveStats(stats);
    }

    $scope.resetStats = () => {
        showcaseService.resetStats().then(function(){
            $scope.getStats();
        });
    }

    $scope.getStats = function(){
        showcaseService.getStats().then(function(response){
            var statsArr = response.data;
            for (var i in statsArr){
                if (statsArr[i].id === 2){
                    $scope.goatsWon = parseInt(statsArr[i].statvalue, 10);
                }else if (statsArr[i].id === 5){
                    timesStayed = parseInt(statsArr[i].statvalue, 10);
                }else if (statsArr[i].id === 6){
                    stayedAndWon = parseInt(statsArr[i].statvalue, 10);
                }else if (statsArr[i].id === 7){
                    timesSwitched = parseInt(statsArr[i].statvalue, 10);
                }else if (statsArr[i].id === 8){
                    switchedAndWon = parseInt(statsArr[i].statvalue, 10);
                }
            }
            $scope.carsWon = stayedAndWon + switchedAndWon;
            $scope.switchSuccess = Math.floor((switchedAndWon / timesSwitched)*100);
            $scope.staySuccess = Math.floor((stayedAndWon / timesStayed)*100);
        })
    }

    $scope.getStats();

//Initiate first iteration of the game
    $scope.playGame();                          //this is down here so that it has access to everything above it
                                                //i.e. at this point, all of the other functions are visible to the controller
  });
