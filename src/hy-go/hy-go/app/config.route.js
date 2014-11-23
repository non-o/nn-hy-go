(function () {
    'use strict';

    var app = angular.module('nnHydra');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [

            {
                url: '/',
                config: {
                    title: 'debug',
                    templateUrl: 'app/debug/debug.html',
                  
                }
            },
            {
                url: '/debug',
                config: {
                    title: 'debug',
                    templateUrl: 'app/debug/debug.html',
                  
                }
            },
           
        ];
    }
})();