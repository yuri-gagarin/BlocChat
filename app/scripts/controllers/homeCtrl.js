(function() {
    function HomeCtrl(Room, $uibModal, Message) {
        this.chatRooms = Room.all;
        
        var home = this;
        this.selectRoom = function (roomId) {
            home.currentRoom = roomId;
            home.messages = Room.getMessages(home.currentRoom.$id);

        }
        
        this.sendMessage = function () {
            Message.sendMessage(home.newMessage, home.currentRoom.$id);
            home.newMessage = "";
        }
        
        this.openModal = function() {
            var modalWindow = $uibModal.open({
                templateUrl: '/templates/modal.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.newRoom = {name: ''};
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
        .controller('HomeCtrl', ['Room', '$uibModal', 'Message', HomeCtrl])
})();