(function () {
    'use strict';

    var serviceId = 'apiParser';

    angular.module('nnHydra').factory(serviceId,
        [ 'common', apiParser]);

    function apiParser(common) {
        var log = common.logger.getLogFn(serviceId);

        //interface
        var service = {
            parse: parse,
        };       

        return service;

   
        function parse(doc) {
        	// log(getType(doc));
   //      	jsonld.expand(doc, function(err, expanded) {
   //      		log('pretty print flattened', common.prettyPrint(expanded));
   //      		return expanded
			// });
            return doc;
        }


        function getType(doc){
        	var docType = doc['@type'];
        	log(docType);
        }
    }
})();