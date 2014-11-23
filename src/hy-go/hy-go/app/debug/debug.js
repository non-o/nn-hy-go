(function () {
    'use strict';

    var controllerId = 'debug';

    angular.module('nnHydra').controller(controllerId, ['common', 'discovery', debug]);

    function debug(common, discovery) {
        var log = common.logger.getLogFn(controllerId);

        //scope variables
        var vm = this;
        vm.loadApiDoc = loadApiDoc;
        vm.apiDoc = 'apiDoc  not loaded';
        vm.adressUrl = 'http://he-3d64859981c5.my.apitools.com/hydra/event-api/';

        //implementation
        function loadApiDoc() {
            vm.apiDoc = 'loading...';

            discovery.supportedClasses(vm.adressUrl).
                then(function (d) {
                    log('setting apiDoc');
                    vm.apiDoc = d;
                });

        }


    }

})();