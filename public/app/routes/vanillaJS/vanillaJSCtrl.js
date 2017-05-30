angular.module('tutorialSite').controller('vanillaJSCtrl', function($scope){

    var box1 = document.getElementById('js_box1');
    var box2 = document.getElementById('js_box2');
    var box3 = document.getElementById('js_box3');
    var box4 = document.getElementById('js_box4');
    var input = document.getElementById('js_input');
    var submitBtn = document.getElementById('js_submit');

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




})






