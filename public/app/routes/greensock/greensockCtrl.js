angular.module('tutorialSite').controller('greensockCtrl', function($scope){

    var box2 = $('#greensock_box2');
    var box3 = $('#greensock_box3');
    let box4_btn = $('#gs_example4_btn');
    var box4 = $('#greensock_box4');
    var plantExampleBtn = $('#plant_example_btn');
    var plant_reset_btn = $('#plant_reset_btn');
    var sun = $('.sun');
    var stem = $('.stem');
    var petals = $('.petal');
    var leaf = $('.leaf');
    var miniStem = $('.mini_stem');

    TweenLite.to($('#greensock_box1'), 10, {left:'200px'});

    box2.click(function(){
        TweenLite.to(box2, 2, {top:'130px'});
        TweenLite.to(box2, 2, {left:'200px', delay:2});
        TweenLite.to(box2, 2, {top:'0px', left:'160px', delay:4});
        TweenLite.to(box2, 2, {top:'0px', left:'0px', delay:6});
    })

    function firstAnimation(){
        TweenLite.to(box3, 1, {
            left:'150px', 
            onComplete:secondAnimation
        });
    }

    function secondAnimation(){
        TweenLite.to(box3, 1, {
            left:'0px', 
            onComplete:firstAnimation
        });
    }

    box3.click(function(){
        firstAnimation();
    })

    box4_btn.click(function(){
        TweenLite.from(box4, 1.6, {left:'200px'});
    })

    plantExampleBtn.click(function(){
        //sun
        var mq = window.matchMedia( "(min-width: 1000px)" );
        if(mq.matches){//Checks if the screen is larger than 1000px or not
            TweenLite.to(sun, 3.4, {left:'480px', top:'15px', ease:Linear.easeNone});
            TweenLite.to(sun, 3.6, {left:'960px', top:'65px', delay:3.4});
        }else{
            TweenLite.to(sun, 3.4, {left:'150px', top:'15px'});
            TweenLite.to(sun, 3.6, {left:'300px', top:'65px', delay:3.4});
        }
        
        //plant
        TweenLite.to(stem, 5, {height:'120px'});
        TweenLite.to(leaf, 3, {width: '30px', height: '18px', delay:1});
        TweenLite.to(miniStem, 3, {width:'4px', height:'42px', delay:1.8});
        TweenLite.to(petals, 0.1, {border:'0.5px solid gray', delay:4.7});
        TweenLite.to(petals, 2, {width:'14px', height:'20px', left:'-3px', delay:4.8});
    })

    plant_reset_btn.click(function(){
        TweenLite.to(sun, 1, {left:'45px', top:'65px'});
        TweenLite.to(stem, 1, {height:'30px'});
        TweenLite.to(leaf, 1, {width: '10px', height: '6px'});
        TweenLite.to(miniStem, 1, {width:'3px', height:'0px'});
        TweenLite.to(petals, 1, {width:'0px', height:'0px', left:'0px', border:'0px solid gray'});
    })

    $scope.scrollPage = function(){

        //Check height of screen, adjust scroll for desktop/mobile headers.
        //If screen is at least 700 pixels wide, scroll for desktopHeader,
        //else scroll for Mobile header.
        var scrollMinusDesktopHeader = $(window).height()-68;
        var scrollMinusMobileHeader = $(window).height()-60;
        var mq = window.matchMedia( "(min-width: 700px)" );

        if (mq.matches){
            $("html, body").animate({scrollTop: scrollMinusDesktopHeader}, 800);
        }else{
            $("html, body").animate({scrollTop: scrollMinusMobileHeader}, 800);
        }
        //***800 is the number of milliseconds it takes to carry out the animation
    }
});