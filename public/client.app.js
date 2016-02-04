var appName = 'NguberApp';

var app = angular.module(appName, [
    'ngRoute',
    'example',
    /*'uiGmapgoogle-maps',*/
    'ngMap'
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
});