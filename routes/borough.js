var data = require('../data'); 
var categories = data.categories;
var scores = data.scores;
var boroughs = data.boroughs;

function getBoroughScores (borough) {
	var boroughInd = boroughs.indexOf(borough);
	var boroughScores = scores[boroughInd];
	return boroughScores.map(function (num) {return num*100});
}

module.exports = {
    method: 'GET',
    path: '/results/{borough}',
    handler: function (request, reply) {
    	var boroughDataSet = {
		    fillColor: 'rgba(66,139,202,0.5)',
		    strokeColor: 'rgba(66,139,202,0.8)',
		    highlightFill: 'rgba(220,220,220,0.75)',
		    highlightStroke: 'rgba(220,220,220,1)',
		    data: getBoroughScores(request.params.borough)
		}
		var chartData = {
			labels: categories,
			datasets: [boroughDataSet]
		}
    	reply.view('borough', {
            borough: request.params.borough,
            boroughData: chartData
        });
    }
}