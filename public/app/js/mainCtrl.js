angular.module('tutorialSite').controller('mainCtrl', function($scope){

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






});