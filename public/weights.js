var boroughTable;
var party = {name: "party"}
var categories = new Array();
var weights = new Array();
var formData = {
	party: party,
	weights: weights
};

function displayBoroughs() {
	var request = $.ajax({
        url: '/livability/weights',
        type: 'POST',
        data: formData,
        dataType: 'JSON',
	});

	request.done(function(boroughScores) {
		$(boroughTable).children().remove();
		for (var i = 0; i < boroughScores.boroughs.length; i++) {
			var newRow = boroughTable.insertRow();
			newRow.insertCell(0).appendChild(document.createTextNode(boroughScores.boroughs[i]));
			newRow.insertCell(1).appendChild(document.createTextNode(boroughScores.scores[i]));
		}
	});
}

function updateBoroughs(categoryId, newValue) {
	weights[categories.indexOf(categoryId)] = parseInt(newValue, 10);
	displayBoroughs();
};

$(function() {
	boroughTable = $('#top-boroughs-table')[0];
	party.name = 'Labour';
	// party.name = $( "#party option:selected" ).text();
	var inputs = $('input[name="weights"]');

	for(i = 0;i < inputs.length; i++) {
		weights[i] = parseInt(inputs[i].value, 10);
		categories[i] = inputs[i].id;
	}
	
	displayBoroughs();

	$( '#party' ).change(function() {
  		party.name = $( "#party option:selected" ).text();
  		displayBoroughs();
	});

});
