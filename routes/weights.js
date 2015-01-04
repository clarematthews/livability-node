var data = require('../data'); 
var scores = data.scores;
var boroughs = data.boroughs;

function rankBoroughs(weights) {
    weights = weights.map(parseFloat);
    var sumWeights = weights.reduce(function(sum, current) { return sum + current; });
    var boroughScores = [];
    for (var i = 0; i < scores.length; i++) {
        var weightedSum = 0;
        for (var j = 0; j < scores[i].length; weightedSum += scores[i][j]*weights[j], j++) {
        }
        boroughScores[i] = Math.round(100*weightedSum/sumWeights);
    }
    return boroughScores;
}

function topBoroughs(totalScores, number) {
	var topBoroughs = [];
	var topScores = [];
	for (var i = 0; i < number; i++) {
		var ind = totalScores.indexOf(Math.max.apply(Math, totalScores));
		topBoroughs[i] = boroughs[ind];
		topScores[i] = totalScores[ind];
		totalScores[ind] = 0;
	}
	return {
		boroughs: topBoroughs,
		scores: topScores
	};
}

module.exports = {
    method: 'POST',
    path: '/livability/weights',
    handler: function (request, reply) {
        var weights = request.payload.weights;
        var rankedBoroughs = rankBoroughs(weights);
        reply(topBoroughs(rankedBoroughs, 3));
    }
}
