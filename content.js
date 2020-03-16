chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var firstHref = $("a[href^='http']").eq(0).attr("href");
  
        console.log(firstHref);
        console.log("test");
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
          }
    }
  );

// function scangamepads() {
//     var gamepads = navigator.getGamepads();
// 	for (var i = 0; i < gamepads.length; i++) {
// 		if (gamepads[i]) {
//             // console.log(gamepads[i]);
// 			if (gamepads[i].axes.length < 4) {
// 				continue;
//             }
//             else{
//                 console.log("connected");
//                 chrome.runtime.sendMessage({"message": "controller_connected", "axis": gamepads[i].axes.length, "buttons":  gamepads[i].buttons.length});
//                 return;
//             }
// 		}
//     }
//     console.log("disconnected");
//     chrome.runtime.sendMessage({"message": "controller_disconnected"});
// }

// setInterval(scangamepads, 500);