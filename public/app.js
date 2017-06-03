angular.module('tutorialSite', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider){
    
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

});