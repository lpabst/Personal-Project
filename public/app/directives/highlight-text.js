angular.module('tutorialSite')
.directive('highlightText', function(){

    return {
        restrict: 'A',
        link: function(scope, elem, atts){
            elem.click(function(){
                elem.toggleClass('highlighted');
            })
        }
    }

});