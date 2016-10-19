(function() {
    function Message($firebaseArray, $cookies) {
        var ref = firebase.database().ref().child('messages');
        var messages = $firebaseArray(ref);
        
        function scrollTop () {
           var element = document.getElementsByClassName("main-view");
           element.scrollTop = element.scrollHeight;
           console.log(element.scrollHeight);
        }
        
        function timeFormat() {
			var date = new Date();
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			var dayNight = "AM";

			if (h > 12) {
				h -= 12;
				dayNight = "PM";
			}
			if (m < 10) {
				m = "0" + m;
			}
			if (s < 10) {
				s = "0" + s;
			}
			return h + ":" + m + " " + dayNight;
		}
        
        function sendMessage (newMessage, roomId) {
            var message = {
                username: $cookies.get("blocChatCurrentUser"),
                content: newMessage,
                sentAt: timeFormat(),
                roomId: roomId
            }
            messages.$add(message);
            scrollTop();
        }
        return {
            sendMessage: sendMessage
        };
    }
    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', '$cookies', Message]);
})();