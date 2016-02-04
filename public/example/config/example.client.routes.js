angular.module('example').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        $routeProvider.

        // passenger's side
        when('/', {
            templateUrl: 'example/views/trip-locations.client.view.html'
        }).when('/confirm-trip', {
            templateUrl: 'example/views/confirm-trip.client.view.html'
        }).when('/available-drivers', {
            templateUrl: 'example/views/available-drivers.client.view.html'
        }).when('/driver-info', {
            templateUrl: 'example/views/driver-info.client.view.html'
        }).when('/enjoy-trip', {
            templateUrl: 'example/views/enjoy-trip.client.view.html'
        }).when('/trip-final', {
            templateUrl: 'example/views/trip-final.client.view.html'
        }).

        // driver's side
        when('/d/', {
            templateUrl: 'example/views/passenger-info.client.view.html'
        }).when('/d/drive-passenger', {
            templateUrl: 'example/views/drive-passenger.client.view.html'
        }).when('/d/check-passenger', {
            templateUrl: 'example/views/check-passenger.client.view.html'
        }).when('/d/initiate-payment', {
            templateUrl: 'example/views/initiate-payment.client.view.html'
        }).when('/d/finalize-trip', {
            templateUrl: 'example/views/finalize-trip.client.view.html'
        }).

        // if any of the routes above doesn't work
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
]);