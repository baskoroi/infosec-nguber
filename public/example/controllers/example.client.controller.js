angular.module('example').controller('ExampleController', ['$scope', '$location', '$http', '$timeout',
    function($scope, $location, $http, $timeout) {

        // default origin and destination
        $scope.defaultOrigin = '30.263608,120.1234389'; // Zhejiang University Yuquan Campus
        $scope.defaultDestination = '30.2640788,120.1526847'; // Jinjiang Inn Hangzhou

        // The 'Trip' object which is to be later stored in MongoDB
        $scope.trip = {};
        $scope.trip.distance = 7.68;
        $scope.trip.cost = 16.23;
        $scope.trip.confCode = '2387';

        // Mock drivers around the origin
        $http.get('/drivers').success(function(data) {
            $scope.drivers = data;
        });

        /*$scope.driverMarkers = [];

        for (var i = 0, len = $scope.drivers.length; i < len; i++) {
            $scope.driverMarkers.push(new google.maps.Marker({
                title: "Driver: " + drivers[i].fullName
            }));
        }

        $scope.convertLocationToCoords = function(address) {

        }

        $scope.generateDriverMarkers = function() {

        }*/

        // AFTER MENU #1: FIND ORIGIN AND DESTINATION LOCATIONS
        $scope.calculateTrip = function() {
            $location.path('/confirm-trip');
        };

        // AFTER MENU #2: CHOOSE FROM DRIVERS AROUND THE ORIGIN
        $scope.chooseDrivers = function() {
            // view available drivers
            $location.path('/available-drivers');
            
            // view information about chosen driver
            $timeout(function() {
                $location.path('/driver-info');
            }, 3000);
        };

        // AFTER MENU #3: AFTER USER GETS INFO ABOUT DRIVER
        // User is within the trip, being driven by the driver.
        $scope.enjoyTrip = function() {
            $location.path('/enjoy-trip');
        };

        // AFTER MENU #4: WHEN DRIVER HAS ARRIVED FOR USER
        $scope.getIn = function() {
            $location.path('/trip-final');
        };

        // TO CANCEL from the current menu OR if the trip is successful
        $scope.endTrip = function() {
            $location.path('/');
        };

        $scope.passengerInfo = function() {
            $location.path('/d/');
        };

        $scope.drivePassenger = function() {
            $location.path('/d/drive-passenger');
        };

        $scope.checkPassenger = function() {
            $location.path('/d/check-passenger');

            $timeout(function() {
                $location.path('/d/initiate-payment');
            }, 3000);
        };

        $scope.finalizeTrip = function() {
            $location.path('/d/finalize-trip');
        };
    }
]);