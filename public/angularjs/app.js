/* 
THIS FILE DEFINES THE ONLY ANGULAR MODULE USED IN THE HTML PAGES 

The function getSLackProfile should be in the "getSlackUsers.js" file but a mistake occured !
*/

var app = angular.module('myApp', []).controller('getSlackProfile', getSlackProfile);

function getSlackProfile($http) {
    var token = "";
    var userID = "";
    var urlSlack = "https://slack.com/api/users.profile.get?token="+token+"&user="+userID+"&pretty=1";

    var vm = this;
    vm.init = init;
    return vm;

    function init() {
        $http.get(urlSlack).then(function mySucces(response) {
            vm.userSlackProfile = response.data.profile;
        }, function myError(response) {});
    };
};

