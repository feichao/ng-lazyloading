(function () {
  'use strict';

  var uuid = 0;

  angular
    .module('fc.lazyLoading', [])
    .directive('lazyLoading', lazyLoading);

  function lazyLoading() {
    return {
      restrict: 'A',
      replace: true,
      template: function(element) {
        var id = uuid++;
        element.attr('lazy-loading-id', id);
        element.attr('ng-if', '__$$isIfShow_' + id);
        element.attr('ng-show', '__$$isShow_' + id);
        element.removeAttr('lazy-loading');
        return element[0].outerHTML;
      },
      link: postLink,
    };
  }

  function postLink($scope, element, attr) {
    var delay = $scope.$eval(attr.lazyLoading);
    var id = attr.lazyLoadingId;
    var isIfShowId = '__$$isIfShow_' + id;
    var isShowId = '__$$isShow_' + id;

    $scope[isIfShowId] = false;
    $scope[isShowId] = false;

    if (typeof delay === 'number') { // delay number
      setTimeout(function () {
        $scope[isIfShowId] = true;
        $scope[isShowId] = true;
        $scope.$digest();
      }, delay);
    } else { // boolean
      $scope.$watch(function () {
        return $scope.$eval(attr.lazyLoading);
      }, function (newValue) {
        if (typeof newValue === 'boolean' && newValue) {
          $scope[isIfShowId] = true;
          $scope[isShowId] = true;
        } else {
          $scope[isShowId] = false;
        }
      });
    }
  }
})();
