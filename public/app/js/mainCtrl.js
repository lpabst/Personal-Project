angular.module('tutorialSite').controller('mainCtrl', function($scope){

    $scope.mobileMenu = false;

    $scope.showMobileMenu = function(){
        $scope.mobileMenu = true;
    }

    $scope.hideMobileMenu = function(){
        $scope.mobileMenu = false;
    }








});