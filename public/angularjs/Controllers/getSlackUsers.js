/* THIS FILE DEFINES SOME ANGULAR CONTROLLERS TO DISPLAY THE USERS FROM SLACK OR ONLY THE PRESENT ONES ON THE HTML PAGES WHERE IT IS USED */

var token = ""; // The token can be found here : https://api.slack.com/custom-integrations/legacy-tokens
var urlSlack = "https://slack.com/api/users.list?token="+token+"&presence=true&pretty=1";

(function () {
    'use strict';
    angular.module('myApp').controller('getSlackUsers', getSlackUsers);
    angular.module('myApp').controller('getSlackCheckIns', getSlackCheckIns);

    function getSlackUsers($http) {
        var vm = this;
        vm.init = init;
        return vm;

        //Each member is pushed when the controller is called
        function init() {
            vm.allUsersSlack = [];
            $http.get(urlSlack).then(function mySucces(response) {
                response.data.members.forEach((item) => {
                    vm.allUsersSlack.push(item);
                })
            }, function myError(response) {});
        };
    }

    function getSlackCheckIns($http, $interval) {
        var vm = this;
        vm.init = init;
        return vm;

        // Each member who is active is pushed and is specified as admin or not when the controller is called
        function init() {
            function retrieveUrl() {
                $http.get(urlSlack).then(function mySucces(response) {
                    vm.usersSlackAdmin = [];
                    vm.usersSlackBasic = [];
                    response.data.members.forEach((item) => {
                        if(item.presence != "away") {
                            if(item.hasOwnProperty('is_admin')){ 
                                if (item.is_admin) {
                                    vm.usersSlackAdmin.push(item);
                                } else {
                                    vm.usersSlackBasic.push(item);
                                };                 
                            };
                        };
                    });
                }, function myError(response) {})
            };
            retrieveUrl();
            $interval(() => {console.log(new Date()); retrieveUrl()}, 30000); //The requests are done every 30 seconds interval
        }
    }    
})();