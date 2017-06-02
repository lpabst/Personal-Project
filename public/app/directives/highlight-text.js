angular.module('tutorialSite').directive('highlightText', function(){

    return {
        restrict: 'A',
        link: function(scope, elem, attr){
            elem.css({
                'background': 'yellow'
            })
        }
    }

});