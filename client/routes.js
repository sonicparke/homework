angular.module('homework')
  .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
 
    $stateProvider
      .state('assignments', {
        url: '/assignments',
        template: '<assignments-list></assignments-list>'
      })
      .state('assignmentDetails', {
        url: '/assignments/:assignmentId',
        template: '<assignment-details></assignment-details>',
        resolve: {
          currentUser: ($q) => {
            if (Meteor.userId() == null) {
              return $q.reject('AUTH_REQUIRED');
            }
            else {
              return $q.resolve();
            }
          }
        }
      })
      .state('login', {
        url: '/login',
        template: '<login></login>'
      })
      .state('register', {
        url: '/register',
        template: '<register></register>'
      })
      .state('resetpw', {
        url: '/resetpw',
        template: '<resetpw></resetpw>'
      });
 
    $urlRouterProvider.otherwise("/assignments");
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('assignments');
      }
    });
  });