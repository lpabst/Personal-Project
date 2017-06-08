angular.module('tutorialSite', ['ui.router'])
.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider){
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './app/routes/home/home.html',
            controller: 'homeCtrl',
        })
        .state('contact', {
            url: '/contact',
            templateUrl: './app/routes/contact/contact.html',
            controller: '',
        })
        .state('angular', {
            url: '/angular',
            templateUrl: './app/routes/angular/angular.html',
            controller: 'angularCtrl',
        })
        .state('css', {
            url: '/css',
            templateUrl: './app/routes/cssPage/cssPage.html',
            controller: '',
        })
        .state('greensock', {
            url: '/greensock',
            templateUrl: './app/routes/greensock/greensock.html',
            controller: 'greensockCtrl',
        })
        .state('jquery', {
            url: '/jquery',
            templateUrl: './app/routes/jquery/jquery.html',
            controller: 'jqueryCtrl',
        })
        .state('showcase', {
            url: '/showcase',
            templateUrl: './app/routes/showcase/showcase.html',
            controller: 'showcaseCtrl'
        })
        .state('javascript', {
            url: '/javascript',
            templateUrl: './app/routes/vanillaJS/vanillaJS.html',
            controller: 'vanillaJSCtrl',
        })

    $urlRouterProvider.otherwise('/');

}]);
angular.module('tutorialSite')
.directive('growShrink', function(){

    return {
        restrict: 'A',
        link: function(scope, elem, atts){
            var normalSize = true;

            elem.click(function(){
                if (normalSize){
                    elem.css('width', '+=200');
                    normalSize = false;
                }else{
                    elem.css('width', '-=200');
                    normalSize = true;
                }
            })
        }
    }

});
angular.module('tutorialSite')
.directive('highlightText', function(){

    return {
        restrict: 'A',
        link: function(scope, elem, atts){
            elem.click(function(){
                elem.toggleClass('highlighted');
            })
        }
    }

});
angular.module('tutorialSite').controller('mainCtrl', ["$scope", function($scope){

    $scope.mobileMenu = false;
    $scope.showLearnSubheader = false; //desktop learn submenu
    let learnSubMenu = false; //mobile learn submenu

    $scope.showMobileMenu = () => {
        $scope.mobileMenu = true;
    }

    $scope.hideMobileMenu = () => {
        $scope.mobileMenu = false;
        learnSubMenu = false;
    }

    $scope.hideLearnSubheader = () => {
        $scope.showLearnSubheader = false;
    }

//slides out the mobile learn submenu
    $scope.showLearnSubMenu = () => {
        if (!learnSubMenu){
            $('.learn_submenu_mobile').css({
                'left': '200px',
                'height': '260px'
            });
            learnSubMenu = true;
        }else{
            $('.learn_submenu_mobile').css({
                'left': '0px',
                'height': '0px'
            });
            learnSubMenu = false;
        }

    }

//when the page is scrolled down, the desktop header fills the top
//of the page
    function changeHeaderCss(){
        var dHeader = $('.desktop_header');
        var learnHeader = $('.learn_subheader');
        if (this.scrollY > 50){
            dHeader.css({
                "width": "100%",
                'left': '0',
                'top': '0',
                'border-radius': '0'
            });
            $('.desktop_nav').css('right', '6.8%');
            learnHeader.css('top', '68px');
        }else{
            dHeader.css({
                "width": "94%",
                'left': '3%',
                'top': '20px',
                'border-radius': '6px'
            });
            $('.desktop_nav').css('right', '5%');
            learnHeader.css('top', 'calc(3% + 68px)');
        }
    }
    
    window.addEventListener("scroll", changeHeaderCss, false);

}]);
angular.module('tutorialSite').controller('angularCtrl', ["$scope", "angularService", function($scope, angularService){

    $scope.showLeftBox = true;

    $scope.getYoutubePic = () => {
        angularService.getYoutubePic().then((response) => {
            $scope.angularPicUrl = response.data.items[0].snippet.thumbnails.high.url;
        })
    }

    $scope.getYoutubePic();

    $scope.scrollPage = () => {

        //Check height of screen, adjust scroll for desktop/mobile headers.
        //If screen is at least 700 pixels wide, scroll for desktopHeader,
        //else scroll for Mobile header.
        let scrollMinusDesktopHeader = $(window).height()-68;
        let scrollMinusMobileHeader = $(window).height()-60;
        let mq = window.matchMedia( "(min-width: 700px)" );

        if (mq.matches){
            $("html, body").animate({scrollTop: scrollMinusDesktopHeader}, 800);
        }else{
            $("html, body").animate({scrollTop: scrollMinusMobileHeader}, 800);
        }
        //***800 is the number of milliseconds it takes to carry out the animation
    }

    $scope.toDoList = [];

    $scope.addItem = () => {
        $scope.toDoList.push($scope.newItem);
    }

}]);
angular.module('tutorialSite').service('angularService', ["$http", function($http){

    this.getYoutubePic = function(){
        return $http.get('https://www.googleapis.com/youtube/v3/videos?id=i9MHigUZKEM&key=AIzaSyCuuFUnpR3Gm-ai-tS252apbm0adv10PAI&part=snippet')
    }

}]);
angular.module('tutorialSite').controller('greensockCtrl', ["$scope", function($scope){

    let box2 = $('#greensock_box2');
    let box3 = $('#greensock_box3');
    let box4_btn = $('#gs_example4_btn');
    let box4 = $('#greensock_box4');
    let plantExampleBtn = $('#plant_example_btn');
    let plant_reset_btn = $('#plant_reset_btn');
    let sun = $('.sun');
    let stem = $('.stem');
    let petals = $('.petal');
    let leaf = $('.leaf');
    let miniStem = $('.mini_stem');

    TweenLite.to($('#greensock_box1'), 10, {left:'200px'});

    box2.click(function(){
        TweenLite.to(box2, 2, {top:'130px'});
        TweenLite.to(box2, 2, {left:'200px', delay:2});
        TweenLite.to(box2, 2, {top:'0px', left:'160px', delay:4});
        TweenLite.to(box2, 2, {top:'0px', left:'0px', delay:6});
    })

    function firstAnimation(){
        TweenLite.to(box3, 1, {
            left:'150px', 
            onComplete:secondAnimation
        });
    }

    function secondAnimation(){
        TweenLite.to(box3, 1, {
            left:'0px', 
            onComplete:firstAnimation
        });
    }

    box3.click(function(){
        firstAnimation();
    })

    box4_btn.click(function(){
        TweenLite.from(box4, 1.6, {left:'200px'});
    })

    plantExampleBtn.click(function(){
        //sun
        let mq = window.matchMedia( "(min-width: 1000px)" );
        if(mq.matches){//Checks if the screen is larger than 1000px or not
            TweenLite.to(sun, 3.4, {left:'480px', top:'15px', ease:Linear.easeNone});
            TweenLite.to(sun, 3.6, {left:'960px', top:'65px', delay:3.4});
        }else{
            TweenLite.to(sun, 3.4, {left:'150px', top:'15px'});
            TweenLite.to(sun, 3.6, {left:'300px', top:'65px', delay:3.4});
        }
        
        //plant
        TweenLite.to(stem, 5, {height:'120px'});
        TweenLite.to(leaf, 3, {width: '30px', height: '18px', delay:1});
        TweenLite.to(miniStem, 3, {width:'4px', height:'42px', delay:1.8});
        TweenLite.to(petals, 0.1, {border:'0.5px solid gray', delay:4.7});
        TweenLite.to(petals, 2, {width:'14px', height:'20px', left:'-3px', delay:4.8});
    })

    plant_reset_btn.click(function(){
        TweenLite.to(sun, 1, {left:'45px', top:'65px'});
        TweenLite.to(stem, 1, {height:'30px'});
        TweenLite.to(leaf, 1, {width: '10px', height: '6px'});
        TweenLite.to(miniStem, 1, {width:'3px', height:'0px'});
        TweenLite.to(petals, 1, {width:'0px', height:'0px', left:'0px', border:'0px solid gray'});
    })

    $scope.scrollPage = () => {

        //Check height of screen, adjust scroll for desktop/mobile headers.
        //If screen is at least 700 pixels wide, scroll for desktopHeader,
        //else scroll for Mobile header.
        let scrollMinusDesktopHeader = $(window).height()-68;
        let scrollMinusMobileHeader = $(window).height()-60;
        let mq = window.matchMedia( "(min-width: 700px)" );

        if (mq.matches){
            $("html, body").animate({scrollTop: scrollMinusDesktopHeader}, 800);
        }else{
            $("html, body").animate({scrollTop: scrollMinusMobileHeader}, 800);
        }
        //***800 is the number of milliseconds it takes to carry out the animation
    }
    
}]);
angular.module('tutorialSite').controller('jqueryCtrl', ["$scope", function($scope){

    let box1 = $('#jquery_box1');
    let box2 = $('#jquery_box2');
    let height = $('#jquery_input_height');
    let width = $('#jquery_input_width');
    let prev = $('.prev');
    let next = $('.next');
    let pics = $('#jquery_carousel_pictures');

//example 1 - changes box width and height
    box1.click(function(){
        if($(this).css('height') == '40px'){
            box1.css({
                'height': '80px',
                'width': '300px'
            })
        }else{
            box1.css({
                'height': '40px',
                'width': '140px'
            })
        }
    })

// Example2 - Changes box width and height based on user input
    box2.click(function(){
        if (height.val() < 10 || width.val() < 10 
        || height.val() > 300 || width.val() > 300){
            alert('Please enter height and width values between 10-300');
        }else{
            box2.css({
                'width': width.val() + 'px',
                'height': height.val() + 'px'
            })
        }
    })

// Example3 - JQuery Carousel. Changes the positioning of the div so 
// that a different picture is showing.
    let left = parseInt(pics.css('left'), 10);
    
    prev.click(function(){
        
        if (left < 0){
            left += 110;
        }

        pics.css({
            left: left + '%'
        })
    });

    next.click(function(){
        if (left > -440){
            left -= 110;
        }

        pics.css({
            left: left + '%'
        })
    });

//top screen pulsing scroll button scrolls page automatically
//with this function
    $scope.scrollPage = () => {

        //Check height of screen, adjust scroll for desktop/mobile headers.
        //If screen is at least 700 pixels wide, scroll for desktopHeader,
        //else scroll for Mobile header.
        let scrollMinusDesktopHeader = $(window).height()-68;
        let scrollMinusMobileHeader = $(window).height()-60;
        let mq = window.matchMedia( "(min-width: 700px)" );

        if (mq.matches){
            $("html, body").animate({scrollTop: scrollMinusDesktopHeader}, 800);
        }else{
            $("html, body").animate({scrollTop: scrollMinusMobileHeader}, 800);
        }
        //***800 is the number of milliseconds it takes to carry out the animation
    }

}]);
angular.module('tutorialSite').controller('homeCtrl', ["$scope", "homeService", function($scope, homeService){

    $scope.getHomePageIntro = () =>  {
        $scope.intro = homeService.getHomePageIntro();
    }

    $scope.getMiddleSection = () => {
        $scope.middle = homeService.getMiddleSection();
    }

    $scope.getBottomSection = () => {
        $scope.bottom = homeService.getBottomSection();
    }

    $scope.getTechInfo = () => {
        $scope.techInfo = homeService.getTechInfo().then(function(response){
            $scope.techInfo = response.data;
        });
    }

    $scope.getHomePageIntro();
    $scope.getMiddleSection();
    $scope.getBottomSection();
    $scope.getTechInfo();

}]);
angular.module('tutorialSite').service('homeService', ["$http", function($http){

    var homePageInfo = [
        {
            header: 'Welcome To My Tutorials!',
            content: `Tutorials are a great way to learn!  Seeing how someone else solves a problem
                can many times be the ticket to understanding how certain technologies work.
                Seeing living examples makes it easy to connect the dots and begin to
                understand how the tech works.`
        }, 
        {
            header: 'Where do I start?',
            content: `Right here!  This page is meant as a quick introduction to the different
                    technologies that can be learned on this website. Make sure to tell your
                    friends so they can come learn too!`
        }, 
        {
            header: 'How Much Experience Do I Need?',
            content: `These tutorials are meant to be an easy introduction to the animations
                that can be performed with many different web development languages. A basic 
                understanding of HTML, CSS, and Javascript should be enough to get you 
                started on any of these tutorials!`
        }
    ];

  this.getHomePageIntro = () => {
      return homePageInfo[0];
  };

  this.getMiddleSection = () => {
      return homePageInfo[1];
  }

  this.getBottomSection = () => {
      return homePageInfo[2];
  }

  this.getTechInfo = () => {
      return $http.get('/api/techinfo');
  }

}]);
angular.module("tutorialSite")
  .controller("showcaseCtrl", ["$scope", function($scope) {

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

  }]);

angular.module('tutorialSite').controller('vanillaJSCtrl', ["$scope", function($scope){

    let box1 = document.getElementById('js_box1');
    let box2 = document.getElementById('js_box2');
    let box3 = document.getElementById('js_box3');
    let box4 = document.getElementById('js_box4');
    let input = document.getElementById('js_input');
    let submitBtn = document.getElementById('js_submit');

    box1.addEventListener('click', function (){
        if (box1.style.background == 'red'){
            box1.style.background = 'blue';
        }else{
            box1.style.background = 'red';
        }
    });

    box2.addEventListener('mouseover', function(){
        box2.style.position = 'absolute';
        box2.style.left = '50%';
    });

    box3.addEventListener('mouseover', function(){
        box3.style.position = 'absolute';
        if (box3.style.left == '50%'){
            box3.style.left = '10px';
        }else{
            box3.style.left = '50%';
        }
    });

    submitBtn.addEventListener('click', function(){
        box4.innerText = input.value;
    });

//This scrolls the page when the pulsing scroll
//arrow is pressed
    $scope.scrollPage = () => {

        //Check height of screen, adjust scroll for desktop/mobile headers.
        //If screen is at least 700 pixels wide, scroll for desktopHeader,
        //else scroll for Mobile header.
        let scrollMinusDesktopHeader = $(window).height()-68;
        let scrollMinusMobileHeader = $(window).height()-60;
        let mq = window.matchMedia( "(min-width: 700px)" );

        if (mq.matches){
            $("html, body").animate({scrollTop: scrollMinusDesktopHeader}, 800);
        }else{
            $("html, body").animate({scrollTop: scrollMinusMobileHeader}, 800);
        }
        //***800 is the number of milliseconds it takes to carry out the animation
    }

}])






