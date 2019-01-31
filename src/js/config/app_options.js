/******************************************************
 * CORDOVA
 */
// Cordova initialization
$.mobile.loading().hide();
document.addEventListener("deviceready", onDeviceReadyCordova, false);
//Cordova is loaded and it is now safe to call Cordova methods
//
function onDeviceReadyCordova() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
    analytics = navigator.analytics;
    analytics.setTrackingId('UA-479977-44');

    initialize();
    navigator.splashscreen.hide();
    //UA-102055131-1
    
}

function initialize()
{
  gb_isCordovaLoaded = true;
    console.log("cordova initialize");
  /*  if (gb_isPageIndexShowed) {
      
      loadTemplate('INIT');
    }*/
}


function onBackKeyDown()
{
  if( !$( "body" ).hasClass( "ui-disabled" ) )
  {
    if( $("#content div:first-child").hasClass("exit_app") ) 
    {
      navigator.notification.confirm(
        gjson_lang['exit_msg'], // message
        onConfirmExit, // callback to invoke with index of button pressed
        gjson_lang['exit_title'], // title
        [gjson_lang['exit_ok'],gjson_lang['exit_cancel']] // buttonLabels
      );
    }else {
        $("#btn_back").click();
    }
  }
  return false;
}

function onConfirmExit( index )
{
  if ( index === 1 )
  {
    reload_news=false;
    reload_agenda=false;
    navigator.app.exitApp();
  }
    
}

/*function showAlert( message, callback, title, buttonName )
{
	title = title || null;
	buttonName = buttonName || gjson_lang.accept;

	if(navigator.notification && navigator.notification.alert){
		navigator.notification.alert(
			message,    // message
			callback,   // callback
			title,      // title
			buttonName  // buttonName
		);

	} else{
		alert(message);
		if (callback)
			callback();
	}
}*/

/**
 * Mostra un Toast
 * Si no disponemos del plugin de Toast, se utiliza un Alert
 */
function showToast(message, duration, position) {
	if(window.plugins && window.plugins.toast) {
		if(!duration) duration = "long";
		if(!position) position = "center";

		window.plugins.toast.show(message, duration, position);
		navigator.vibrate(200);
	}
	else {
		alert(message);
	}
}





function checkConnection() {


  if(isCordovaEnvironment())
  {
   
     var networkState = navigator.network.connection.type;
     
     var states = {};
     states[Connection.UNKNOWN]  = 0;
     states[Connection.ETHERNET] = 1;
     states[Connection.WIFI]     = 2;
     states[Connection.CELL_2G]  = 3;
     states[Connection.CELL_3G]  = 4;
     states[Connection.CELL_4G]  = 5;
     states[Connection.NONE]     = 6;   

     if(states[networkState] == 0 || states[networkState] == 6)
     {
        //localInfo();
       // isonline=false;
        return false;
     }
     else
     {
      isonline=true;
      return true;
     }
      
  }else
    return true; //false para simular que no hay conexión al utilizar el navegador

}

function isCordovaEnvironment() {
  var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
  return app;
}


/* VARIABLES */

var gb_isPageIndexShowed = false;
var gb_isCordovaLoaded = false;
var APP_LANGUAGE = "eu";