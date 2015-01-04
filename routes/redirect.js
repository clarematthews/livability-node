module.exports = {
    method: 'GET',
	path: '/results',
    handler: function (request, reply) {
    	var response = reply('success');
    	response.redirect('/livability');
    }
}