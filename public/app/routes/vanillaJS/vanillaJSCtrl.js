angular.module('tutorialSite').controller('vanillaJSCtrl', function($scope){

    let box1 = document.getElementById('js_box1');
    let box2 = document.getElementById('js_box2');
    let box3 = document.getElementById('js_box3');
    let box4 = document.getElementById('js_box4');
    let input = document.getElementById('js_input');
    let submitBtn = document.getElementById('js_submit');

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

//This scrolls the page when the pulsing scroll
//arrow is pressed
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

})






