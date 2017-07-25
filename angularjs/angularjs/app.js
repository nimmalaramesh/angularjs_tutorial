

(function () {
    'use strict';
    var app = angular.module('myapp', []);
       app.controller('MyCon', DiController).run(['$anchorScroll', function ($anchorScroll) {
            $anchorScroll.yOffset = 50;
    }]);
    //custom filter
       app.filter('loves', LovesFilter);
       //custom filter
       app.filter('truth', TruthFilter);
    //injecitng dependencies
       DiController.$inject = ['$scope', '$filter', 'lovesFilter','$timeout','$anchorScroll', '$location'];
    //placing cusotm filter in funciton

       function DiController($scope, $filter, lovesFilter,$timeout,$anchorScroll,$location) {
        $scope.name = "ramesh";
        $scope.goanchor = function (x) {
            //debugger;
            var newhash = 'anchor' + x;
            if ($location.hash() !== newhash) {
                $location.hash('anchor'+x);
            }
            else {
                $anchorScroll();
            }

        }
           //watcher
        $scope.hello = 0;
        $scope.increment = function () {
            $timeout(function () {
                $scope.hello++;

            }, 2000);
            //setTimeout(function () {

            //    $scope.hello++;
            //    console.log("increment is done");
               
            //},2000);
         
        }

        $scope.$watch('hello', function (newvalue, old) {
            console.log('oldvalue' + old);
            console.log('newvalue' + newvalue);
        });

         
        $scope.sayFilter = function () {
            var msg = "i dont likes sweets";
            msg = lovesFilter(msg);
            return msg;
        }
        $scope.sayHello = function () {
            var message = [{ name: 'ram', age: 10 },
            { name: 'sur', age: 56 },
            { name: 'gtm', age: 5 },
            { name: 'hgy', age: 64 },
            { name: 'huur', age: 87 }];
            
            var output = $filter('orderBy')(message, 'age', 'reverse');
            var  num=1245.56777
            var number = $filter('number')(num, 2);
            var dat = 10251998;
            var date = $filter('date')(dat, 'MM/dd/yyyy @ h:mma');
            return { output, number,date };
        }

        //console.log($injector.annotate(DiController));

    }


  //cusotom filter
    function LovesFilter() {
        return function (input) {
            input = input || "";
            input = input.replace("likes", "loves");
            return input;
        };
       }
    //customer filter 2
    function TruthFilter() {
        return function (input,target,replace) {
            input = input || "";
            input = input.replace(target, replace);
            return input;
        };
    }

    //cache contorller
    app.controller('CacheController', ['$scope', '$cacheFactory', function ($scope, $cacheFactory) {

        $scope.key = "";
        $scope.keys = [];
        $scope.value = "";
        $scope.currentItem = "";
        $scope.cache = $cacheFactory('cache1');
        $scope.addItems = function () {
            $scope.keys.push($scope.key);
            $scope.cache.put($scope.key, $scope.value);
        }
        $scope.getItems = function () {
            $scope.currentItem = $scope.cache.get($scope.key);
        }
        $scope.removeItem = function () {
            //debugger;
            $scope.keys = $scope.keys.filter(function (key) {

                return (key !== $scope.key);
            });
            $scope.cache.remove($scope.key);
        }
    }]);

})(); 

   






            //$scope.totalValue = 0;
            //$scope.displayNumeric = function () {
            //    var totalNameValue = calculateNumericForString($scope.name);
            //    $scope.totalValue = totalNameValue;

            //}
            //function calculateNumericForString(string) {
            //    var totalStringValue = 0;
            //    for (var i = 0; string.length ; i++) {
            //        totalStringValue += string.charCodeAt(i);
            //    }
            //    return totalStringValue;
            //}
   
