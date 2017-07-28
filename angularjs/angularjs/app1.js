var app = angular.module('MyModule', []);

app.controller('ParentController1', ParentController1);
app.controller('ChildController1', ChildController1);
app.controller('ParentController2', ParentController2);
app.controller('ChildController2', ChildController2);
app.controller('AddList', AddList);
app.service('ShoppingListService', ShoppingListService);
app.service('WeightLossFilterService', WeightLossFilterService);
//app.provider('ShopListService', ShopListProvider);

//app.config(config);

//config.$inject = ['ShopListProvider'];
//function config(ShopListProvider) {
//    ShopListProvider.defaults.maxItem = 3;
//}

ParentController1.$inject = ['$scope'];
function ParentController1($scope) {
    $scope.parentValue = 1;
    $scope.pc = this;
    $scope.pc.parentValue = 1;
}

ChildController1.$inject = ['$scope'];

function ChildController1($scope) {
    console.log("$scope.parentValue", $scope.parentValue);
    console.log("Child $scope", $scope);
    $scope.parentValue = 5;
    console.log("changed the $scope.parentValue=5");
    console.log("$scope.parentValue", $scope.parentValue);
    console.log("$scope.pc.parentValue", $scope.pc.parentValue);
    $scope.pc.parentValue = 5;
    console.log("changed the $scope.parentValue=5");
    console.log("$scope.pc.parentValue", $scope.pc);
    console.log($scope);
}

ParentController2.$inject = ['$scope'];
function ParentController2($scope) {
    var parent = this;
    parent.value = 1;
}

ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
    var child = this;
    child.value = 3;
}


AddList.$inject = ['ShoppingListService'];
function AddList(ShoppingListService) {
    var list = this;
    list.dailyItem = "";
    list.quantity = "";
    list.items = ShoppingListService.getItem();
   
    list.removeItems = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
    }
    list.addItems = function () {
      
        try {
            ShoppingListService.addItems(list.dailyItem, list.quantity);

        }
        catch (error){
            list.errorMessage = error.message;
        }
    }
       
}

ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService) {
    var service = this;
    var items = [];

    service.addItems = function (dailyItem, quantity) {
        var namepromise = WeightLossFilterService.checkName(dailyItem);
        var qunatitypromise = WeightLossFilterService.checkQuantity(quantity);
        $q.all([namepromise, quantitypromise]).then(function (response) {
            var item = {
                myitem: dailyItem,
                itemQuantity: quantity
            };
            items.push(item);
        }).catch(function (errorResponse) {
            console.log(errorResponse);
        });

    };
  
    //service.addItems = function (dailyItem, quantity) {
      
      
    //    var promise = WeightLossFilterService.checkName(dailyItem);
        
    //    promise.then(function (response) {
           
    //        var nextPromise = WeightLossFilterService.checkQuantity(quantity);
    //        nextPromise.then(function (result) {

    //            var item = {
    //                myitem: dailyItem,
    //                itemQuatity: quantity
    //            };
    //            items.push(item);
    //        }, function (errorResponse) {
    //            console.log(errorResponse.message);
    //            });
    //    },
    //        function (errorResponse) {
    //            console.log(errorResponse.message);
    //        });
    //};


      //  if ((maxItem == undefined) || (maxItem !== undefined) && (items.length < maxItem))
       // {
         
      //  }
      //  else {
      //      throw new Error("max items(" + maxItem + ") reached");
      //  }
      // }
    

service.getItem = function () {

    return items;
};

       service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
        };

}




WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q,$timeout) {
    var service = this;
    service.checkName = function (dailyItem) {
       
        var deferred = $q.defer();
        var result = {
            message: ""
        };
        $timeout(function () {
            if (dailyItem.toLowerCase().indexOf('cookie') == -1) {
                deferred.resolve(result);

            }
            else {
                result.message = "stay away form cookie";
                deferred.reject(result);
            }
        }, 3000);
        return deferred.promise;
       
    };
    service.checkQuantity = function (qunatity) {
        var deferred = $q.defer();
        var result = {
            message: ""
        };
        $timeout(function () {
            if (qunatity < 6) {
                deferred.resolve(result);
            }
            else {
                result.message = "that too much ramesh";
                deferred.reject(result);
            }
        }, 1000);
        return deferred.promise;
    };

}




//function ShopListProvider() {
//    var provider = this;
//    provider.defaults = {
//        maxItem:10
//    }
//    provider.$get = function () {
//        var shoppingList = new ShopListService(provider.defaults.maxItem);
//        return shoppingList;
//    }
//}