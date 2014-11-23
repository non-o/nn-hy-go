(function () {
    'use strict';

    var serviceId = 'cacheService';

    angular.module('nnHydra').factory(serviceId,
        ['$cacheFactory', 'common', cacheService]);

    function cacheService($cacheFactory, common) {
        var log = common.logger.getLogFn(serviceId);

        //interface
        var service = {
            apiDocumentation: apiDocumentation,
        };       

        init();

        return service;

        //implementation
        var myCache;        

        function init() {
            myCache = $cacheFactory('hydra-client-cache');
            myCache.removeAll();
        }

        function apiDocumentation(apiUrl, content) {

            var key = 'apiDocumentation-' + apiUrl;

            if (!(content == null)) { 

                log('put content in cache with key ' + key);

                myCache.put(key, content);

            }
            log("return content with key " + key);

            return myCache.get(key);
        }
    }
})();