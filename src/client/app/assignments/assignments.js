/* global Firebase, angular */
/* jshint -W117 */
(function() {
    'use strict';

    angular.module('app.core')
        .controller('Assignments', Assignments);

    Assignments.$inject = ['$firebaseArray'];
    /* @ngInject */
    function Assignments ($firebaseArray) {
        var vm = this;
        // vm.showLoader = true;
        vm.GetItems = GetItems;
        
        var ref = new Firebase('https://shining-heat-7466.firebaseio.com/data');

        // Initial Functions
        vm.InitPage = function() {
            vm.GetItems();
        };

        function GetItems(data) {
           vm.assignments = $firebaseArray(ref);
           console.log('vm.assignments :', vm.assignments);
          //  vm.assignments.$add({ from: 'brad', body: 'message i sent' });

        }
    }
})();
