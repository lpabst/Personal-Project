angular.module('tutorialSite').service('showcaseService', function($http){

    this.saveStats = function(stats){
        return $http.put('/api/updateStats', {
            "goatsWon": stats.goatsWon,
            "timesSwitched": stats.timesSwitched,
            "switchedAndWon": stats.switchedAndWon,
            "timesStayed": stats.timesStayed,
            "stayedAndWon": stats.stayedAndWon
        });
    }

    this.resetStats = function(){
        return $http.put('/api/updateStats', {
            "goatsWon": 0,
            "timesSwitched": 0,
            "switchedAndWon": 0,
            "timesStayed": 0,
            "stayedAndWon": 0
        })
    }

    this.getStats = function(){
        return $http.get('/api/getStats');
    }

//AI Fuctionality
    this.getComputerMove = function(){
        
    }

});