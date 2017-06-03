angular.module('tutorialSite').controller('homeCtrl', function($scope, homeService){

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

});