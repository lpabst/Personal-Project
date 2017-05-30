angular.module('tutorialSite').controller('jqueryCtrl', function($scope){

    // $(document).ready(function(){

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
        if (height.val() < 10 || width.val() < 10 || height.val() > 300 || width.val() > 300){
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
            console.log(left);
        pics.css({
            left: left + '%'
        })
    });

    next.click(function(){
        if (left > -440){
            left -= 110;
        }
            console.log(left);
        pics.css({
            left: left + '%'
        })
    });








    // })





});