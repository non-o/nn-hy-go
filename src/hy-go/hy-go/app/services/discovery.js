(function () {
    'use strict';

    var serviceId = 'discovery';
    angular.module('nnHydra').factory(serviceId,
        ['$http', 'common', 'cacheService', discovery]);

    function discovery($http, common, cacheService) {

       // var getLogFn = common.logger.getLogFn;
        var log = common.logger.getLogFn(serviceId);
        var $q = common.$q;

        // var currentApi;

        //interface
        var service = {
            supportedClasses: supportedClasses,
        };

        init();

        return service;

        //
        //interface implementation 
        //
        function entryPoint() {

        };

        function supportedClasses(url) {
            return discover(url);
        };

        function init() {
        };

        //private
        function discover(url) {
            if (common.isNotNull(url)) {

                log("discover api for : " + url);

                if (!(cacheService.apiDocumentation(url) == null)) {
                    log("loaded from cache");
                    return getFromCache(url);

                } else {
                    log("loading from remote");
                    return getFromRemote(url);
                }
            }
            else {
                return null;
            }
        };

        //returns a promise from cache
        function getFromCache(url)
        {
            var deferred = $q.defer();
            deferred.resolve(cacheService.apiDocumentation(url));
            return deferred.promise;
        }

        //explore the Link header to get the hydra:apiDocumentation from it
        function getFromRemote(url)
        {
            var promise =
                   $http.get(url)
                        .then(function (response) {
                            var linkToApiDoc = response.headers('Link');
                            log("Hydra link header is : " + linkToApiDoc);
                            linkToApiDoc = linkToApiDoc.substring(linkToApiDoc.lastIndexOf("<") + 1, linkToApiDoc.lastIndexOf(">"));
                            return linkToApiDoc;
                        })
                        .then(function (link) {
                            log("loading api doc");
                            var promise = $http.get(link).then(function (response) {
                                cacheService.apiDocumentation(url, response.data);
                                return cacheService.apiDocumentation(url);
                            });

                            return promise;
                        });

            return promise;
        }        

        function findObject(collection, searchField, searchValue) {
            var results = [];
            for (var i = 0 ; i < collection.length ; i++) {
                if (collection[i][searchField] == searchValue) {
                    results.push(collection[i]);
                }
            }

            return results;
        };

    }

})();