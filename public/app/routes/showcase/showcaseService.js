angular.module('tutorialSite').service('showcaseService', function($http){

    this.saveData = function(stats){
        return $http.put('/api/updateStats', {
            "goatsWon": stats.goatsWon,
            "timesSwitched": stats.timesSwitched,
            "switchedAndWon": stats.switchedAndWon,
            "timesStayed": stats.timesStayed,
            "stayedAndWon": stats.stayedAndWon
        });
    }

    this.getStats = function(){
        return $http.get('/api/getStats');
    }

});