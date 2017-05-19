/* THIS FILE DEFINES SOME COBOT CONTROLLERS TO DISPLAY THE MEMBERS FROM COBOT OR ONLY THE SIGNED IN ONES ON THE HTML PAGES WHERE IT IS USED */

var token = ""; //The access token can be found with the Client Id and the Client Secret information
var domain_name = "smartworkliege"; // Chose the domain name appropriate
var urlCobot = "https://"+domain_name+".cobot.me/api/";
      
(function () {
    'use strict';
    angular.module('myApp').controller('getCobotMembers', getCobotMembers);
    angular.module('myApp').controller('getCobotCheckIns', getCobotCheckIns);

    function getCobotMembers($http) {
        var vm = this; 
        vm.init = init;
        return vm;

        // Each member of the domain chosen is pushed once the controller is called
        function init() {
            vm.membersCobot = [];
            $http.get(urlCobot + "memberships?access_token="+token).then(function mySucces(response) {
                response.data.forEach((item) => {                      
                    vm.membersCobot.push(item);
                })
            }, function myError(response) {});
        }
    }

    function getCobotCheckIns($http,$interval) {
        var vm = this; 
        vm.init = init;
        return vm;

        // Each user called by a request sending a 200 status response, meaning that the user is signed in, is pushed when the controller is called
        function init() {
            function retrieveUrl() {
                vm.checkinCobot = []; 
                $http.get(urlCobot + "memberships?access_token="+token).then(function mySucces(response) {
                    response.data.forEach((item) => {                      
                        $http.get(urlCobot + "check_in?login="+item.email+"&access_token="+token).then(function mySucces(reponse) {
                            if(reponse.status ===200){
                                vm.checkinCobot.push(item);  
                            }
                        }, function myError(reponse) {})
                    })
                }, function myError(response) {});
            }
            retrieveUrl();
            $interval(() => {console.log(new Date()); retrieveUrl()}, 30000); //The requests are done every 30 seconds interval
        }
    }    
})();
