var Hapi = require('hapi');
var Handlebars = require('handlebars');


Handlebars.registerHelper('spaceToDash', function (originalString) {
    return originalString.replace(/\s+/g, '-');
});

Handlebars.registerHelper('json', function (originalObject) {
    return JSON.stringify(originalObject);
});

Handlebars.registerHelper('pathFor', function (path, parameter) {
    return path + '/' + parameter;
});

var data = require('./data');
data.init(function () {
    var server = new Hapi.Server();

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',
        layoutPath: './views/layout',
        layout: true
    });

    server.connection({ port: 3000 });

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

    server.route(require('./routes/static'));

    server.route(require('./routes/home'));

    server.route(require('./routes/livability'));

    server.route(require('./routes/weights'));

    server.route(require('./routes/results'));

    server.route(require('./routes/borough'));
});





	