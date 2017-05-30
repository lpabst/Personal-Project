angular.module('tutorialSite').controller('jqueryCtrl', function($scope){

    // $(document).ready(function(){

        var box1 = $('#jquery_box1');
        var box2 = $('#jquery_box2');
        var box3 = $('#jquery_box3');
        var box4 = $('#jquery_box4');

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












    // })





});