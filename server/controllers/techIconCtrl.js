const app = require('./../index.js');
var db = app.get('db');

module.exports = {

    getAllIcons: function(req, res, next){
        db.getAllIcons(function(err, response){
            return res.status(200).json(response);
        })
    },

    getIconByName: function(req, res, next){
        let name = req.params.name;
        db.getIconByName([name], function(err, response){
            return res.status(200).json(response);
        })
    }

}