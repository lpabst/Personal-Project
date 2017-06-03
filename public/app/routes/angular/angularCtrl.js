angular.module('tutorialSite').controller('angularCtrl', function($scope, angularService){

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

});