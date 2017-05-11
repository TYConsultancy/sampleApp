var app1 = angular.module('app1', ['CustomServices']);

app1.controller('ctrl1', function ($scope, logInService) {
    $scope.first = 1;
    $scope.second = 1;

    $scope.updateValue = function () {
        $scope.calculation = $scope.first + '+' + $scope.second + " = " + (+$scope.first + +$scope.second);
    }

   // $scope.calc = angular.element(document).ready(function () {
    $scope.calc = function () {
        //$scope.cal = logInService.verifyEmailId("priya_yerunkar@uhc.com");
        $scope.cal = document.getElementById("test").textContent;
        
        //FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
        //function isAvailableSuccess(result) {
        //    if (result.isAvailable) {
        //        alert("Fingerprint available");
        //        //document.getElementById("test").innerHTML = "Fingerprint available";
        //    }
        //}
        //function isAvailableError(result) {
        //    if (!result.isAvailable) {
        //        alert("Fingerprint not available");
        //        //document.getElementById("test").innerHTML = "Fingerprint not available";
        //    }
        //}
        
    }
    

});




