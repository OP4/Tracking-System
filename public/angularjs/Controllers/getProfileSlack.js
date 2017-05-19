/* THIS FILE DEFINES AN ANGULAR CONTROLLER WHICH GETS THE USER'S INFORMATION ABOUT HIS PROFILE */

var token = ""; // The toke can be found here : https://api.slack.com/custom-integrations/legacy-tokens
var IDuser = "U3Q5E3J7P"; // This ID can be found here : https://api.slack.com/methods/users.profile.get/test by clicking on the @username
var urlSlack = "https://slack.com/api/users.profile.get?token="+token+"&user="+IDuser+"&pretty=1";

(function () {
    'use strict';
    angular.module('myApp').controller('getSlackProfiles', getSlackProfile);

    function getSlackProfile($http) {
        var vm = this;
        vm.init = init;
        return vm;

        // Stores the user's profile
        function init() {
            $http.get(urlSlack).then(function mySucces(response) {
                vm.userSlackProfile = response.data.profile;
            }, function myError(response) {});
        };
    };
});
