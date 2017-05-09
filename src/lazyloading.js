(function () {
  'use strict';

  angular
    .module('fc.lazyLoading', [])
    .directive('lazyLoading', lazyLoading);

  function lazyLoading() {
    return {
      restrict: 'A',
      scope: {
        lazyLoading: '@'
      },
      template: '<div ng-if="isIfShow" ng-show="isShow"><ng-transclude></ng-transclude></div>',
      transclude: true,
      link: postLink,
    };
  }

  function postLink($scope) {
    var delay;
    if($scope.lazyLoading) {
      delay = angular.fromJson($scope.lazyLoading);
    }

    $scope.isIfShow = false;
    $scope.isShow = false;

    if(typeof delay === 'number') { // delay number
      setTimeout(function() {
        $scope.isIfShow = true;
        $scope.isShow = true;
        $scope.$digest();
      }, delay);
    } else { // boolean
      $scope.$watch('lazyLoading', function() {
        var boolVal = angular.fromJson($scope.lazyLoading);
        if(typeof boolVal === 'boolean' && boolVal) {
          $scope.isIfShow = true;
          $scope.isShow = true;
        } else {
          $scope.isShow = false;
        }
      });
    }
  }
})();
