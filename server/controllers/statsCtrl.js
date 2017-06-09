const app = require('./../index.js');
var db = app.get('db');

module.exports = {

    getGameshowStats: function(req, res, next){
        db.getGameshowStats(function(err, response){
            return res.status(200).json(response);
        })
    },

    updateStats: function(req, res, next){
        let info = req.body;
        db.updateStat([info.goatsWon, 'goatsWon'], function(){})
        db.updateStat([info.timesSwitched, 'timesSwitched'], function(){})
        db.updateStat([info.switchedAndWon, 'switchedAndWon'], function(){})
        db.updateStat([info.timesStayed, 'timesStayed'], function(){})
        db.updateStat([info.stayedAndWon, 'stayedAndWon'], function(err, response){
            if (response){
                return res.status(200).json('ok');
            }else{
                return res.stats(200).json(err);
            }
        })
    }

}