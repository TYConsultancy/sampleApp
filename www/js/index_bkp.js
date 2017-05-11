/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    onDeviceReady: function () {
        //hide the home page div
        document.getElementById("loginPage").hidden = true;
        document.getElementById("homePage").hidden = true;
        document.getElementById("emailDiv").hidden = true;
        var prefs = plugins.appPreferences;
        prefs.remove(ok, fail, 'emailCheck');
        function ok(value) { }
        function fail(error) { }
        checkFingerprintFeatureOnDevice();
        
         

       
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
      /*  var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
        //alert("Device ready");

    }

    


};
function checkPreferenceValues() {
    var prefs = plugins.appPreferences;
    prefs.fetch(foundSuccess, foundFailure, 'emailCheck');
    function foundSuccess(value) {
        if (value != '' && value =='Done') {            
            //display fingerprint dialog            
            verifyFingerprints();
            
        } else {            
            //display fetch emailid textbox form
            document.getElementById("emailDiv").hidden = false;
        }
    }
    function foundFailure(error) {
        //display fetch emailid textbox form
        //first time user
        document.getElementById("emailDiv").hidden = false;
    }
}
function checkFingerprintFeatureOnDevice() {
    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
    function isAvailableSuccess(result) {
        //Finger print feature available
        if (result.isAvailable) {
            if (result.hasEnrolledFingerprints == true) {
                //Finger print enrolled                
                checkPreferenceValues();
            } else {
                //Finger print not enrolled
                //take user to conventional user/pass login 
                document.getElementById("loginPage").hidden = false;
            }

        }
    }
    function isAvailableError(result) {
        if (!result.isAvailable) {
            //take user to conventional user/pass login
            document.getElementById("loginPage").hidden = false;

        }
    }
}
function verifyFingerprints() {
    var encryptConfig = {
        clientId: "myAppName",
        username: "currentUser",
        password: "currentUserPassword",
        maxAttempts: 5,
        locale: "en_US",
        dialogTitle: "Hi, we need your fingerprint",
        dialogMessage: "Place your finger on the device",
        dialogHint: "One way of logging in apps"
    }; // See config object for required parameters

    // Set config and success callback
    FingerprintAuth.encrypt(encryptConfig, function (_fingerResult) {
        console.log("successCallback(): " + JSON.stringify(_fingerResult));
        if (_fingerResult.withFingerprint) {
            console.log("Successfully encrypted credentials.");
            console.log("Encrypted credentials: " + _fingerResult.token);            
        } else if (_fingerResult.withBackup) {
            console.log("Authenticated with backup password");
        }
        //success scenario display home page     
        document.getElementById("emailDiv").hidden = true;
        document.getElementById("homePage").hidden = false;
        // Error callback
    }, function (err) {        
        if (err === "Cancelled") {
            console.log("FingerprintAuth Dialog Cancelled!");
        } else {
            console.log("FingerprintAuth Error: " + err);
        }
        //take user to conventional login
        document.getElementById("loginPage").hidden = false;
    });
}

function x() {
    function okStored(value) {
        //very well stored
        verifyFingerprints();
    }
    function failStored(error) {
        //failure to store maybe try again to store or give message try again after some time
        verifyFingerprints();
    }  

    var prefs = plugins.appPreferences;    
    prefs.store(okStored, failStored, 'emailCheck', 'Done');
    //prefs.fetch(okFetch, failFetch, 'email');
}

// Check if device supports fingerprint
/**
* @return {
*      isAvailable:boolean,
*      isHardwareDetected:boolean,
*      hasEnrolledFingerprints:boolean
*   }
*/
/*
FingerprintAuth.isAvailable(function (result) {

    console.log("FingerprintAuth available: " + JSON.stringify(result));

    // If has fingerprint device and has fingerprints registered
    if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {

        // Check the docs to know more about the encryptConfig object :)
        var encryptConfig = {
            clientId: "myAppName",
            username: "currentUser",
            password: "currentUserPassword",
            maxAttempts: 5,
            locale: "en_US",
            dialogTitle: "Hi, we need your fingerprint",
            dialogMessage: "Place your finger on the device",
            dialogHint: "One way of logging in apps"
        }; // See config object for required parameters

        // Set config and success callback
        FingerprintAuth.encrypt(encryptConfig, function (_fingerResult) {
            console.log("successCallback(): " + JSON.stringify(_fingerResult));
            if (_fingerResult.withFingerprint) {
                console.log("Successfully encrypted credentials.");
                console.log("Encrypted credentials: " + result.token);
            } else if (_fingerResult.withBackup) {
                console.log("Authenticated with backup password");
            }
            document.getElementById("oneMain").hidden = false;
            // Error callback
        }, function (err) {
            if (err === "Cancelled") {
                console.log("FingerprintAuth Dialog Cancelled!");
            } else {
                console.log("FingerprintAuth Error: " + err);
            }
        });
    }

    /**
    * @return {
    *      isAvailable:boolean,
    *      isHardwareDetected:boolean,
    *      hasEnrolledFingerprints:boolean
    *   }
    */
/*}, function (message) {
    console.log("isAvailableError(): " + message);
    document.getElementById("oneMain").hidden = false;
});*/
