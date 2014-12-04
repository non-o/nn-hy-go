(function () {
    'use strict';

    var serviceId = 'apiDocumentation';
    
    angular.module('nnHydra').factory(serviceId,
        ['common', 'discovery', apiDocumentation]);

    function apiDocumentation(common, discovery) {

        // var getLogFn = common.logger.getLogFn;
        var log = common.logger.getLogFn(serviceId);
        var $q = common.$q;

        var initialized = false;
        var url = url;
        var data = null;
        
        //interface
        var service = {
            discover : discover,
            supportedClasses: supportedClasses,
        };

        return service;

        //
        //interface implementation 
        //
        function discover(url){

           
            var deferred = $q.defer();
            // console.log('after defer');
            deferred.resolve(
                discovery.discover(url).then(function (d){
                    log(d);
                    data = d;
                    initialized = true;
                })
            );
            return deferred.promise;
        }

        function supportedClasses() {
            return data;
        };  

    }

})();