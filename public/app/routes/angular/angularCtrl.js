angular.module('tutorialSite').controller('angularCtrl', function($scope, angularService){

    $scope.showLeftBox = true;

    $scope.getYoutubePic = function(){
        angularService.getYoutubePic().then(function(response){
            $scope.angularPicUrl = response.data.items[0].snippet.thumbnails.high.url;
        })
    }

    $scope.getYoutubePic();

});