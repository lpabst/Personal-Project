angular.module('tutorialSite').service('angularService', function($http){

//api key = AIzaSyCuuFUnpR3Gm-ai-tS252apbm0adv10PAI
//video id = i9MHigUZKEM

    this.getYoutubePic = function(){
        return $http.get('https://www.googleapis.com/youtube/v3/videos?id=i9MHigUZKEM&key=AIzaSyCuuFUnpR3Gm-ai-tS252apbm0adv10PAI&part=snippet')
    }

});