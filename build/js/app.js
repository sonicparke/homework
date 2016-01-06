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

(function() {
    'use strict';

    angular.module('app.assignments', []);

})();

(function() {
    'use strict';

    angular
        .module('app.core', [
            /* Angular modules */
            'ngAnimate',
            'ngSanitize',

            /* Cross-app modules */
            'app.uibutton',

            /* 3rd-party modules */
            'firebase',
            'ui.router',
            'restangular',
            'ngStorage',
            'toastr'
        ]);

})();

(function() {
    'use strict';

    angular.module('app.layout', []);
})();

(function() {
    'use strict';

    angular.module('app.uibutton', []);

})();

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

(function() {
    'use strict';

    angular.module('app.core')
        .constant('appConfig', {
            'appname': 'ngStart',
            'title': 'Angular Starter',
            'version': '0.3.0'
        });
})();

(function() {
    'use strict';

    angular.module('app.core')
        .controller('Main', Main);

    Main.$inject = ['appConfig'];
    /* @ngInject */
    function Main (appConfig) {

        var vm = this;
        vm.appConfig = appConfig;

    }
})();

(function() {
    'use strict';

    angular.module('app.uibutton')
        .directive('uiButton', function () {
            return {
                restrict: 'E',
                replace: true,
                controller: function() {

                },
                templateUrl: 'app/common/uibutton/ui-button.html',
                scope:{
                    clickFn: '&',
                    text: '@',
                    activeText: '@',
                    buttonClass: '@',
                    icon: '@',
                    buttonDisabled: '=?',
                    showButton: '=?'
                },
                link:function (scope, element, attrs) {
                    scope.showButton = true;
                    scope.onClick = function() {
                        scope.error = undefined;
                        scope.updating = true;
                        scope.buttonDisabled = true;
                        var promise = scope.clickFn();
                        promise.then(function() {
                            scope.updating = false;
                            scope.buttonDisabled = false;
                        }, function(error) {
                            scope.updating = false;
                            scope.buttonDisabled = false;
                            scope.error = error;
                        });
                    };
                }
            };
        });
})();

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/assignments/assignments.html","<div ng-init=ass.InitPage()><h1>Assignments</h1><sign-out class=\"pull-right btn-inverse\"></sign-out><section class=\"menu container\"><div ng-loader ng-show=ass.showLoader></div><nav class=row><ul class=list-unstyled><li class=\"col-md-4 col-sm-12\" ng-repeat=\"assignment in ass.assignments\"><a class=\"btn btn-block btn-inverse clearfix\" href={{assignment.Url}} target=_blank><div class=menuText>{{assignment.from}}<br><small>{{assignment.body}}</small></div></a></li></ul></nav></section><section></section></div>");
$templateCache.put("app/layout/footer.html","<footer></footer>");
$templateCache.put("app/common/uibutton/ui-button.html","<button class=\"btn {{buttonClass}}\" ng-click=onClick(data) ng-show=showButton><i class=fa ng-class=\"{\'fa-{{icon}}\': !updating, \'fa-spinner fa-spin\': updating}\"></i> {{ updating && activeText || text }}</button>");}]);