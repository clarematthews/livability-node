var data = require('../data'); 
var scores = data.scores;
var boroughs = data.boroughs;
var categories = data.categories;

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
	var topBoroughsData = [];
	for (var i = 0; i < number; i++) {
		var ind = totalScores.indexOf(Math.max.apply(Math, totalScores));
		topBoroughsData[i] = {
			borough: boroughs[ind],
			score: totalScores[ind],
			best: bestCategory(ind),
			worst: worstCategory(ind)
		}
		totalScores[ind] = 0;
	}
	return topBoroughsData;
}

function bottomBoroughs(totalScores, number) {
	var bottomBoroughsData = [];
	for (var i = 0; i < number; i++) {
		var ind = totalScores.indexOf(Math.min.apply(Math, totalScores));
		bottomBoroughsData[i] = {
			borough: boroughs[ind],
			score: totalScores[ind],
			best: bestCategory(ind),
			worst: worstCategory(ind)
		}
		totalScores[ind] = 100;
	}
	return bottomBoroughsData;
}

function bestCategory(boroughInd) {
	var scoreInd = scores[boroughInd].indexOf(Math.max.apply(Math, scores[boroughInd]));
	return categories[scoreInd];
}

function worstCategory(boroughInd) {
	var scoreInd = scores[boroughInd].indexOf(Math.min.apply(Math, scores[boroughInd]));
	return categories[scoreInd];
}

module.exports = {
    method: 'POST',
    path: '/results',
    handler: function (request, reply) {
    	var weights = request.payload.weights;
    	var rankedBoroughs = rankBoroughs(weights);
    	var topBoroughsData = topBoroughs(rankedBoroughs.slice(0), 5);
    	var bottomBoroughsData = bottomBoroughs(rankedBoroughs.slice(0), 5);
    	var allBoroughs = {
    		boroughs: boroughs,
    		scores: rankedBoroughs
    	}
    	reply.view('results', {
    		topBoroughs: topBoroughsData,
    		bottomBoroughs: bottomBoroughsData,
    		allBoroughs: allBoroughs
        });
    }
}