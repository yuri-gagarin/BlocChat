(function(){
    function config($stateProvider, $locationProvider) {
        $locationProvider
        .html5Mode({
            enabled: true,
            requireBase: false
        });
        
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl as home',
                templateUrl: '/templates/home.html'
        });
    }
    
    function BlocChatCookies($cookies, $uibModal) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        console.log(currentUser);
        if (!currentUser || currentUser === '') {
            var userModal = $uibModal.open({
            // Modal configuration object properties
                templateUrl: '/templates/username.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.nameLength = 1;
                    $scope.newUserName = '';
                    $scope.createUser = function() {
                        $uibModalInstance.close($scope.newUserName);
                    };
                },
                size: 'sm'
            });
            userModal.result.then(function(data) {
                $cookies.put('blocChatCurrentUser', data);
            });
        }   
    }
    
    angular
        .module('blocChat', ['ui.router', 'ui.bootstrap', 'firebase', 'ngCookies'])
        .config(config)
        .run(['$cookies', '$uibModal', BlocChatCookies])
    
    
})();