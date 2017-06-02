angular.module('tutorialSite')
.directive('growShrink', function(){

    return {
        restrict: 'A',
        link: function(scope, elem, atts){
            var normalSize = true;

            elem.click(function(){
                if (normalSize){
                    elem.css('width', '+=200');
                    normalSize = false;
                }else{
                    elem.css('width', '-=200');
                    normalSize = true;
                }
            })
        }
    }

});