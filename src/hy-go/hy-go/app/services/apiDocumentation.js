(function () {
    'use strict';

    var serviceId = 'apiDocumentation';
    
    angular.module('nnHydra').factory(serviceId,
        ['$http', 'apiParser', 'common', 'discovery', apiDocumentation]);

    function apiDocumentation($http, apiParser, common, discovery) {

        // var getLogFn = common.logger.getLogFn;
        var log = common.logger.getLogFn(serviceId);
        var $q = common.$q;

        var initialized = false;
        var url = url;
        var data = 'not initialized';
        
        //interface
        var service = {
            // discover : discover,
            // getSupportedClasses: getSupportedClasses,
            getDataAsync : getDataAsync,
            getApiDocAsync : getApiDocAsync
        };

        return service;

        //
        //interface implementation 
        //
        function discover(url){

            return discovery.discover(url).then(function (d){
                data = d;
                initialized = true;
            });
        }

        function getSupportedClasses() {
            var results = [];

            for (var i = 0 ; i < data.supportedClass.length ; i++) {
                results.push(data.supportedClass[i]['@id']);
            }

            return results;
        };  

        function getDataAsync(url)
        {

            //first discover the api documentation, then get the data, expand it and pass it to caller in a promise
            return discover(url).then(function(){
                return $http.get(url).then(function(result){

                    result.data['@context'] = 'http://he-3d64859981c5.my.apitools.com' + result.data['@context'];

                    return result.data;

                }).then(function(someData){
                    // return someData;
                    // log('data is', someData);
                    var promises = jsonld.promises;
                    var promise = promises.expand(someData);
                    return promise;
                });
                
            });   

        }


        function getApiDocAsync(url)
        {
            return discover(url).then(function(){
                var promises = jsonld.promises;
                var promise = promises.expand(data);
                return promise;
                // return data;
            });
            
        }

    }
})();