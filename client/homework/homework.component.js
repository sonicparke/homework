angular.module('homework').directive('homework', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/homework/homework.html',
    controllerAs: 'homework',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
 
      this.helpers({
        isLoggedIn: () => {
          return Meteor.userId() !== null;
        },
        currentUser: () => {
          return Meteor.user();
        }
      });
      
      this.logout = () => {
        Accounts.logout();
      }
      
    }
  }
});