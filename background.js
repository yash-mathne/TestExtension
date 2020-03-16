// background.js


chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  });

function scangamepads() {
    var gamepads = navigator.getGamepads();
	for (var i = 0; i < gamepads.length; i++) {
		if (gamepads[i]) {
            // console.log(gamepads[i]);
			if (gamepads[i].axes.length < 4 && gamepads[i].buttons.length < 15) {
				continue;
            }
            else{
                var views = chrome.extension.getViews({ type: "popup" });
                for (var j = 0; j < views.length; j++) {
                    views[j].document.getElementById('con').innerHTML = "Connected<br>Axes : " + gamepads[i].axes.length + "<br>Buttons : " + gamepads[i].buttons.length;
                }
                console.log(gamepads[i]);
                for (var k = 0; k < gamepads[i].buttons.length; k++) {
                    var b = gamepads[i].buttons[k];
                    var pressed, val;
                    if (typeof(b) == "object") {
                      pressed = b.pressed;
                      val = b.value;
                    } else {
                      val = b;
                      pressed = b == 1.0;
                    }
                    if(pressed){
                        var sn = "Button " + k +  " pressed "; 
                        var views = chrome.extension.getViews({type: "popup"});
                        for (var q = 0; q < views.length; q++) {
                            views[q].document.getElementById('but').innerHTML = sn;
                        }
                    }
                    
                }
                
                return;
            }
		}
    }
    var views = chrome.extension.getViews({type: "popup"});
    for (var i = 0; i < views.length; i++) {
        views[i].document.getElementById('con').innerHTML = "Disconnected";
        views[i].document.getElementById('but').innerHTML = "";
    }


}


function listButtons(gamepad) {
    for (var i = 0; i < gamepad.buttons.length; i++) {
        var b = gamepad.buttons[i];
        var pressed, val;
        if (typeof(b) == "object") {
          pressed = b.pressed;
          val = b.value;
        } else {
          val = b;
          pressed = b == 1.0;
        }
        if(pressed){
            var sn = "Button " + i +  " pressed "; 
            var views = chrome.extension.getViews({type: "popup"});
            for (var i = 0; i < views.length; i++) {
                views[i].document.getElementById('but').innerHTML = sn;
            }
        }
        
    }
  }



setInterval(scangamepads, 100);
