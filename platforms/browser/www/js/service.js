angular.module('CustomServices', [])
    .factory('logInService', function () {
        var serviceObject = {
            verifyEmailId: function (playerEmailId) {
                
                NativeStorage.getItem("emailId", this.itemExist, this.itemNotExist);
                function itemExist(obj){
                    return "Item exist";
                }
                function itemNotExist(error){
                    return "Not exist "+error.code;
                }
                 
            }
            

        }
        return serviceObject;
    })
 