(function() {
    function HomeCtrl($log, Room) {
        this.chatRooms = ['1', '2', '3'];
        
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['Room', '$log', HomeCtrl])
})();