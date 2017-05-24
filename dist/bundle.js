angular.module('tutorialSite', ['ui.router'])
.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider){
    

$stateProvider
    .state('home', {
        url: '/',
        templateUrl: './app/routes/home/home.html',
        controller: '',
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
        controller: 'javascriptCtrl',
    })


$urlRouterProvider.otherwise('/');




}]);
angular.module('tutorialSite').service('headersService', ["$http", function($http){










}]);
angular.module('tutorialSite').controller('mainCtrl', ["$scope", function($scope){

    $scope.mobileMenu = false;

    $scope.showMobileMenu = function(){
        $scope.mobileMenu = true;
    }

    $scope.hideMobileMenu = function(){
        $scope.mobileMenu = false;
    }

    function changeHeaderCss(){
        var dHeader = $('.desktop_header');
        if (this.scrollY > 50){
            dHeader.css({
                "width": "100%",
                'position': 'fixed',
                'left': '0',
                'top': '0',
                'border-radius': '0'
            });
            $('.desktop_nav').css('right', '2.3%');
        }else{
            dHeader.css({
                "width": "94%",
                'position': 'absolute',
                'left': '3%',
                'top': '20px',
                'border-radius': '6px'
            });
            $('.desktop_nav').css('right', '0%');
        }
    }
    
    window.addEventListener("scroll", changeHeaderCss, false);






}]);
