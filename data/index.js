var csv = require('csv');
var fs = require('fs');

module.exports.init = function (callback) {
    csv.parse(fs.readFileSync('./data/scores.csv'), {}, function (err, output) {
        if (err) {
            console.log(err);
        }
        else {
            var scores = output;
            var categories = scores.splice(0,1)[0];
            categories.splice(0,1);
            var boroughs = [];
            for (var i = 0; i < scores.length; i++) {
                boroughs[i] = scores[i].splice(0,1)[0];
                scores[i] = scores[i].map(parseFloat);
            }
            console.log(categories);
            console.log(boroughs);
            // console.log(scores);        
            module.exports.scores = scores;
            module.exports.categories = categories;
            module.exports.boroughs = boroughs;
            callback();
        }
    });    
}


