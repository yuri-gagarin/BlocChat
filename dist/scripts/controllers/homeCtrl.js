(function() {
    function HomeCtrl(Room, $uibModal) {
        this.chatRooms = Room.all;
        
        this.openModal = function() {
            var modalWindow = $uibModal.open({
                templateUrl: '/templates/modal.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.roomName = {name: ''};
                    $scope.cancelAction = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                    
                    $scope.createRoom = function() {
                        $uibModalInstance.close($scope.newRoom)
                    };
                },
                size: 'sm'
            });
            
            modalWindow.result.then(function(data){
                Room.addRoom(data);
            });
        }
        
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['Room', '$uibModal', HomeCtrl])
})();