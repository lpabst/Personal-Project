angular.module('tutorialSite').controller('jqueryCtrl', function($scope){

    var box1 = $('#jquery_box1');
    var box2 = $('#jquery_box2');
    var height = $('#jquery_input_height');
    var width = $('#jquery_input_width');
    var prev = $('.prev');
    var next = $('.next');
    var pics = $('#jquery_carousel_pictures');

//example 1 - changes box width and height
    box1.click(function(){
        if($(this).css('height') == '40px'){
            box1.css({
                'height': '80px',
                'width': '300px'
            })
        }else{
            box1.css({
                'height': '40px',
                'width': '140px'
            })
        }
    })

// Example2 - Changes box width and height based on user input
    box2.click(function(){
        if (height.val() < 10 || width.val() < 10 
        || height.val() > 300 || width.val() > 300){
            alert('Please enter height and width values between 10-300');
        }else{
            box2.css({
                'width': width.val() + 'px',
                'height': height.val() + 'px'
            })
        }
    })

// Example3 - JQuery Carousel. Changes the positioning of the div so 
// that a different picture is showing.
    
    var left = parseInt(pics.css('left'), 10);
    
    prev.click(function(){
        
        if (left < 0){
            left += 110;
        }

        pics.css({
            left: left + '%'
        })
    });

    next.click(function(){
        if (left > -440){
            left -= 110;
        }

        pics.css({
            left: left + '%'
        })
    });

//top screen pulsing scroll button scrolls page automatically
//with this function
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