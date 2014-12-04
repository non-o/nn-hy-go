(function () {
    'use strict';

    var controllerId = 'debug';

    angular.module('nnHydra').controller(controllerId, ['$http', 'common', 'apiDocumentation', debug]);

    function debug($http, common, apiDocumentation) {
        var log = common.logger.getLogFn(controllerId);

        //scope variables
        var vm = this;
        vm.loadApiDoc = loadApiDoc;
        vm.apiData = 'No Data Yet';
        vm.apiDoc = 'apiDoc  not loaded';
        vm.adressUrl = 'http://he-3d64859981c5.my.apitools.com/hydra/event-api/';
        vm.UrlplaceHolder = 'enter url';
        vm.toggleApiDoc = toggleApiDoc;
        vm.showDoc = false;

        //implementation
        function loadApiDoc() {
            log(vm.adressUrl);
            if (common.isNull(vm.adressUrl))
            {
                vm.UrlplaceHolder = 'you must provide a url';
            }

            else
            {
                vm.apiData = 'loading...';

                apiDocumentation.getDataAsync(vm.adressUrl)
                .then(function (d) {
                    vm.apiData = common.prettyPrint( d);
                }, function(err){
                    log('error found : ', err);
                });

                apiDocumentation.getApiDocAsync(vm.adressUrl)
                .then(function (d) {
                    vm.apiDoc = common.prettyPrint( d);
                });

            }
        }

        function toggleApiDoc()
        {
            vm.showDoc = !vm.showDoc ;
        }
    }
})();