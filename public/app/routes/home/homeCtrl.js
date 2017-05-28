angular.module('tutorialSite').controller('homeCtrl', function($scope, homeService){

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


});