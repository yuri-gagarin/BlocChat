(function() {
    function Room($firebaseArray) {
        var ref = firebase.database().ref().child('rooms');
        var rooms = $firebaseArray(ref);
        
        function addRoom (name) {
            rooms.$add(name);
        }
        
        function getMessages (roomId) {
            var messages = firebase.database().ref().child('messages');
            return $firebaseArray(messages.orderByChild('roomId').equalTo(roomId))
        }

        
        return {
            all: rooms,
            addRoom: addRoom,
            getMessages: getMessages
        };
    }
    
    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', Room]);
})();