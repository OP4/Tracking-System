/* 
THIS FILE DEFINES THE ONLY ANGULAR MODULE USED IN THE HTML PAGES 

The function getSLackProfile should be in the "getSlackUsers.js" file but a mistake occured !
*/

var app = angular.module('myApp', []).controller('getSlackProfile', getSlackProfile);

function getSlackProfile($http) {
    var token = "xoxp-54295399571-126184120261-164671004707-e5aa1cbb53bd4727a3946cfc46cbc4ca";
    var urlSlack = "https://slack.com/api/users.profile.get?token="+token+"&user="+"U3Q5E3J7P"+"&pretty=1";

    var vm = this;
    vm.init = init;
    return vm;

    function init() {
        $http.get(urlSlack).then(function mySucces(response) {
            vm.userSlackProfile = response.data.profile;
        }, function myError(response) {});
    };
};

