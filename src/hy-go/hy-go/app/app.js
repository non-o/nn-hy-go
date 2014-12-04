(function () {
    'use strict';

    var app = angular.module('nnHydra', [
        'ngRoute',
        'common'
    ]);

    console.log('in hydra app');

    if (typeof String.prototype.startsWith != 'function') {
  		String.prototype.startsWith = function (str){
   	 		return this.slice(0, str.length) == str;
  		};
	}
   
})();