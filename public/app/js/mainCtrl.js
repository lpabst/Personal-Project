angular.module('tutorialSite').controller('mainCtrl', function($scope){

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

});