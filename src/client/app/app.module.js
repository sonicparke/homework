(function() {

    'use strict';

    angular.module('app', [
        /* Shared modules */
        'app.core',

        /* Feature areas */
        'app.layout',
        'app.assignments'
    ]).config(config);


    // TODO: Figure out how to move routes to feature folders. Keep getting $stateProvider injection error
    config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];
    /* @ngInject */
    function config($stateProvider, $httpProvider, $urlRouterProvider) {


        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // $httpProvider.interceptors.push('AuthInterceptor');

        $stateProvider
            .state('assignments', {
                url: '/assignments',
                templateUrl: 'app/assignments/assignments.html',
                controller: 'Assignments',
                controllerAs: 'ass'
            });


        $urlRouterProvider.otherwise('assignments');
    }

})();
