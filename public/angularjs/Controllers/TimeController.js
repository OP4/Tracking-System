/* THIS FILE DEFINES AN ANGULAR CONTROLLER TO DISPLAY THE EXACT TIME ON THE HTML PAGES WHERE IT IS USED */

app.controller('TimeController', ($scope, $interval) => {
    $scope.timestamp = new Date().toLocaleTimeString();
    $interval(() => {$scope.timestamp = new Date().toLocaleTimeString()}, 1000);
});
