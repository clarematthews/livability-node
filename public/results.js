function maxValue (values) {
    var max = values[0];
    for (var i = 1; i < values.length; i++) {
        var currentVal = values[i];
        if (currentVal > max) {
            max = currentVal;
        }
    }
    return max;
}

function minValue (values) {
    var min = values[0];
    for (var i = 1; i < values.length; i++) {
        var currentVal = values[i];
        if (currentVal < min) {
            min = currentVal;
        }
    }
    return min;
}

function normalise (scores) {
	var maxScore = maxValue(scores);  
	var minScore = minValue(scores);

	for (var i = 0; i < scores.length; i++) {
        scores[i] = (scores[i] - minScore)/(maxScore - minScore);
	}

	return scores;
}

$(function () {
    var normalisedScores = data.scores.slice(0);
    normalise(normalisedScores);

    var map = new google.maps.Map($('#map-canvas')[0],{
    	zoom: 10,
        center: new google.maps.LatLng(51.50, -0.10)
    });

    var marker = new MarkerWithLabel({
            position: new google.maps.LatLng(0,0),
            draggable: false,
            raiseOnDrag: false,
            map: map,
            labelContent: 'borough',
            labelAnchor: new google.maps.Point(30, 20),
            labelClass: 'labels',
            labelStyle: {opacity: 1.0},
            icon: 'https://placehold.it/1x1',
            labelVisible: true,
            visible: false
    });

    map.data.loadGeoJson('geo/LondonBoroughs.json');

    map.data.setStyle(function(feature) {
    	var name = feature.getProperty('name');
        var ind = data.boroughs.indexOf(name);
        var opacity = normalisedScores[ind];

        return {
            fillOpacity: opacity,
            fillColor: '#428bca',
            strokeWeight: 2,
            clickable: true,
            title: name
        };
    });

    map.data.addListener('click', function(event) {
        var url = '/results/' + event.feature.getProperty('name');
        window.location.href = url;
    });

   map.data.addListener('mouseover', function(event) {
        var name = event.feature.getProperty('name');
        var score = data.scores[data.boroughs.indexOf(name)];
        var labelString = name + " (" + score + ")";
        marker.setOptions({position: event.latLng});
        marker.setOptions({labelContent: labelString});
        marker.setOptions({visible: true});
    });

   map.data.addListener('mouseout', function(event) {
        marker.setOptions({visible: false});
    });

   google.maps.event.addListener(marker, 'click', function() {
        var name = $.trim(marker.labelContent.split('(', 1));
        var url = '/results/' + name;
        window.location.href = url;
   });

});