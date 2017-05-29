angular.module('tutorialSite').controller('vanillaJSCtrl', function($scope){

    var box1 = document.getElementById('js_examplebox1');
    box1.addEventListener('click', function (){
        if (box1.style.background == 'red'){
            box1.style.background = 'blue';
        }else{
            box1.style.background = 'red';
        }
    })









})






