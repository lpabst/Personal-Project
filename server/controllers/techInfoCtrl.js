const app = require('./../index.js');
var db = app.get('db');

module.exports = {

    getAllTechInfo: function(req, res, next){
        db.getAllTechInfo(function(err, response){
            return res.status(200).json(response);
        })
    }

}