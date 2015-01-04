var data = require('../data'); 
var formattedCategories = data.categories.slice(0, data.categories.length - 2);

module.exports = {
    method: 'GET',
    path: '/livability',
    handler: function (request, reply) {
    	reply.view('livability', {
            categories: data.categories
        });
    }
}
