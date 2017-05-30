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
    .state('javascript', {
        url: '/javascript',
        templateUrl: './app/routes/vanillaJS/vanillaJS.html',
        controller: 'vanillaJSCtrl',
    })


$urlRouterProvider.otherwise('/');




}]);
angular.module('tutorialSite').service('headersService', ["$http", function($http){










}]);
angular.module('tutorialSite').controller('mainCtrl', ["$scope", function($scope){

    $scope.mobileMenu = false;
    $scope.showLearnSubheader = false; //desktop learn submenu
    var learnSubMenu = false; //mobile learn submenu

    $scope.showMobileMenu = function(){
        $scope.mobileMenu = true;
    }

    $scope.hideMobileMenu = function(){
        $scope.mobileMenu = false;
        learnSubMenu = false;
    }

    $scope.hideLearnSubheader = function() {
        $scope.showLearnSubheader = false;
    }

//slides out the mobile learn submenu
    $scope.showLearnSubMenu = function(){
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

angular.module('tutorialSite').controller('homeCtrl', ["$scope", "homeService", function($scope, homeService){

    $scope.getHomePageIntro = function() {
        $scope.intro = homeService.getHomePageIntro();
    }

    $scope.getMiddleSection = function(){
        $scope.middle = homeService.getMiddleSection();
    }

    $scope.getBottomSection = function(){
        $scope.bottom = homeService.getBottomSection();
    }

    $scope.getTechInfo = function(){
        $scope.techInfo = homeService.getTechInfo();
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

    var techInfo = [
        {
            route: 'angular',
            img: './img/angular.jpeg',
            desc: `AngularJS is a structural 
                framework for dynamic web apps`
        },
        {
            route: 'css',
            img: './img/css.jpeg',
            desc: `"Cascading Style Sheet." Cascading style sheets 
                are used to format the layout of Web pages`
        },
        {
            route: 'greensock',
            img: './img/greensock.png',
            desc: `GreenSock is a suite of JavaScript
                tools for high-performance HTML5 animations`
        },
        {
            route: 'jquery',
            img: './img/jquery.jpeg',
            desc: `jQuery is a fast, small, and 
                feature-rich JavaScript library`
        },
        {
            route: 'javascript',
            img: './img/js.jpeg',
            desc: `JavaScript is a programming language commonly 
                used in web development`
        },
    ]

  this.getHomePageIntro = function(){
      return homePageInfo[0];
  };

  this.getMiddleSection = function(){
      return homePageInfo[1];
  }

  this.getBottomSection = function(){
      return homePageInfo[2];
  }

  this.getTechInfo = function(){
      return techInfo;
  }


}]);
angular.module('tutorialSite').controller('jqueryCtrl', ["$scope", function($scope){

    // $(document).ready(function(){

    var box1 = $('#jquery_box1');
    var box2 = $('#jquery_box2');
    var height = $('#jquery_input_height');
    var width = $('#jquery_input_width');
    var prev = $('.prev');
    var next = $('.next');
    var pics = $('#jquery_carousel_pictures');

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
        if (height.val() < 10 || width.val() < 10 || height.val() > 300 || width.val() > 300){
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
    prev.click(function(){
        var left = pics.css('left') - 20;
        console.log(left);
        pics.css({
            left: left + '%'
        })
    });

    next.click(function(){
        var left = pics.css('left') + 20;
        console.log(left);
        pics.css({
            left: left + '%'
        })
    });








    // })





}]);
angular.module('tutorialSite').controller('vanillaJSCtrl', ["$scope", function($scope){

    var box1 = document.getElementById('js_box1');
    var box2 = document.getElementById('js_box2');
    var box3 = document.getElementById('js_box3');
    var box4 = document.getElementById('js_box4');
    var input = document.getElementById('js_input');
    var submitBtn = document.getElementById('js_submit');

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




}])






