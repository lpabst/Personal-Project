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
        //limits height/width to values 10-300
        if (height.val() < 10 || width.val() < 10 
        || height.val() > 300 || width.val() > 300){
            alert('Please enter height and width values between 10-300');
        }else{
            //changes the box's css based on what the user typed in
            box2.css({
                'width': width.val() + 'px',
                'height': height.val() + 'px'
            })
        }
    })

// Example3 - JQuery Carousel. Changes the positioning of the div so 
// that a different picture is showing.
        
    //Gets the css property 'left' from our
    //element, and converts it to a number    
    var left = parseInt(pics.css('left'), 10);

    //if they click the previous button, do this
    prev.click(function(){
        //as long as left isn't greater than 0
        if (left < 0){
            //add 110 to it
            left += 110;
        }
        //then, set the css property to that new
        //value, as a percentage
        pics.css({
            left: left + '%'
        })
    });

    //if they click the next button, do this
    next.click(function(){
        if (left > -440){
            left -= 110;
        }
        pics.css({
            left: left + '%'
        })
    });








    // })





});