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
        vm.CreateAssignment = CreateAssignment;
        vm.DeleteAssignment = DeleteAssignment;
        
        var ref = new Firebase('https://shining-heat-7466.firebaseio.com/data');

        // Initial Functions
        vm.InitPage = function() {
            vm.GetItems();
            vm.CreateAssignment();
            vm.DeleteAssignment();
        };

        function GetItems(data) {
           vm.assignments = $firebaseArray(ref);
           console.log('vm.assignments :', vm.assignments);
        }
        
        function CreateAssignment() {
          vm.assignments.$add(vm.newAssignment);
        }
        
        function DeleteAssignment(item) {
          console.log('item :', item);
          vm.assignments.$remove(item).then(function(ref) {
            // ref.key() === item.$id; // true
          });

        }
    }
})();
