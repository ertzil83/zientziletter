/* FUNCIONES GENERALES APP */

function defaultLanguage() 
{
//console.log("dentro de defaultLanguage")
$.ajax({
		url: URL_DEFAULT_LANGUAGE,
		dataType: "json",
		async: false
	}).done(function(json) {
		gjson_lang = json;	
	});

}

function loadJSONMainLanguage() 
{
	$.ajax({
		url: "lang/" + APP_LANGUAGE + "/estructura.json",
		type : "GET",
		dataType: "json",
		async: false,
		
	}).done(function(json) {
		
		gjson_lang = json;
		//loadPanelMenuTexts();
	});
}

function loadPanelMenuTexts()
{
	//console.log("loadPanelMenuTexts barruan");
	//var lang=gjson_lang["menuItemLang"];
	var news=gjson_lang["albisteak"];
	var agenda=gjson_lang["agenda"];
	var about=gjson_lang["aplikazioari_buruz"];
	var gallery=gjson_lang["galeria"];
	var favs=gjson_lang["gogokoak"];
	$("#newsItem").text(news);
	$("#agendaItem").text(agenda);
	$("#aboutItem").text(about);
	$("#favsItem").text(favs);
	$("#galleryItem").text(gallery);
	

}

/*GOGOKOENEN ZERRENDAREKIN LAN EGITEKO FUNTZIOAK*/
function insertFavList(s_new)
{
	/*console.log("gogokoenetan gehitzera");
	console.log(s_new);*/
	var gogokoak_array=[];
	if(ZientziApp.localStorage.getItem("gogokoak"))
	{
		gogokoak_array=JSON.parse(ZientziApp.localStorage.getItem("gogokoak"));
	}
	gogokoak_array.push(s_new);
	//console.log(gogokoak_array);
	ZientziApp.localStorage.setItem("gogokoak",JSON.stringify(gogokoak_array)); 
	window.plugins.toast.show(gjson_lang["new_adde_to_fav"], 'short', 'center');
}

function removeFavList(s_new)
{
	var gogokoak_array=gogokoak_array=JSON.parse(ZientziApp.localStorage.getItem("gogokoak"));
	var gogokoak_array = $.grep(gogokoak_array, function(e){ 
     return e.pk != s_new.pk; 
	});
	//console.log(gogokoak_array);
	ZientziApp.localStorage.setItem("gogokoak",JSON.stringify(gogokoak_array));
}

function isInFavList(s_new)
{
	//console.log(s_new);
	var gogokoak_array=[];
	var result=false;
	if(ZientziApp.localStorage.getItem("gogokoak"))
	{
		gogokoak_array=JSON.parse(ZientziApp.localStorage.getItem("gogokoak"));
		for(var i = 0; i < gogokoak_array.length; i++) {
    		if(gogokoak_array[i].pk == s_new.pk) {
        	result=true;
        	break;
    		}
		}
	}
	return result;
}

function deleteFavList()
{
	if(ZientziApp.localStorage.getItem("gogokoak"))
	{
		ZientziApp.localStorage.removeItem("gogokoak")
	}
}

/* FUNCIÓN PARA FORMATEAR FECHA */
function getDateFormatted( daystamp )
{
    if(!/^(\d){8}$/.test(daystamp))
    	return daystamp;
    var date = parseDateFromYYYYMMDD("" + daystamp);

    if (APP_LANGUAGE != "eu")
    	return date.getDate() +" "+ gjson_lang["month_" +date.getMonth()] +" "+ date.getFullYear();
    else
    	return date.getFullYear()+"ko "+gjson_lang["month_" +date.getMonth()]+"ren "+date.getDate();

}

function parseDateFromYYYYMMDD(str) {
    return new Date(str.substr(0,4),
    				str.substr(4,2) - 1,
    				str.substr(6,2));
}

function parseYYYYMMDD(date) {
	var year=date.getFullYear();
	return year+""+("0" + (date.getMonth() + 1)).slice(-2)+""+("0" + date.getDate()).slice(-2);
}

function loadElementsToShow()
{
	var value;
	if ( !ZientziApp.sessionStorage.getItem("elementu_kopurua") )
	{
		value=10;
	}
	else
		value=ZientziApp.sessionStorage.getItem("elementu_kopurua");
	return value;
}
function saveElementsToShow(value)
{
	ZientziApp.sessionStorage.setItem('elementu_kopurua', value);
}

function loadEventsToShow()
{
	var value;
	if ( !ZientziApp.sessionStorage.getItem("ekitaldi_kopurua") )
	{
		value=10;
	}
	else
		value=ZientziApp.sessionStorage.getItem("ekitaldi_kopurua");
	return value;
}
function saveEventsToShow(value)
{
	ZientziApp.sessionStorage.setItem('ekitaldi_kopurua', value);
}

function loadGalleriesToShow()
{
	var value;
	if ( !ZientziApp.sessionStorage.getItem("bilduma_kopurua") )
	{
		value=10;
	}
	else
		value=ZientziApp.sessionStorage.getItem("bilduma_kopurua");
	return value;
}
function saveGalleriesToShow(value)
{
	ZientziApp.sessionStorage.setItem('bilduma_kopurua', value);
}


function showLoading(p_msg_text, p_text_visible, p_text_only, p_html, p_theme) 
{
	$("body").addClass('ui-disabled');

	var str_msg_text = ( typeof p_msg_text == "string" ) ? p_msg_text : ""; //$.mobile.loader.prototype.options.text;
	var b_text_visible = ( typeof p_text_visible == "boolean" ) ? p_text_visible : false; //$.mobile.loader.prototype.options.textVisible;
	var b_text_only = ( typeof p_text_only == "boolean" ) ? p_text_only : false;
	var str_html = ( typeof p_msg_text == "string" ) ? p_html : "";
	var str_theme = ( typeof p_msg_text == "string" ) ?p_theme : $.mobile.loader.prototype.options.theme;

	$.mobile.loading( "show", {
		text: str_msg_text,
		textVisible: b_text_visible,
		textonly: b_text_only,
		theme: str_theme,
		html: str_html
	});
}


function hideLoading() 
{
	$.mobile.loading("hide");
	$(".ui-icon-loading").hide();
	$("body").removeClass('ui-disabled');
}

function getResponse(url, type)
{
	var str_url = String.format(url);
	return serverCall(str_url, type)
}

serverCall = function(url, type) {
	var self = this;

	var promise = $.ajax({
	 				url: url,
					timeout:30000,  // 60 secs for kicks
					dataType: type,
					type: "POST",
		})
		.error(function(xhRequest, textStatus, errorThrown) {
			hideLoading();
		});

	return promise;

}

function serviceFailureAlert()
{
	hideLoading();
	$(".top_div").hide();
	$(".load_more").hide();
	showToast(gjson_lang["service_error"]);
	$("#content_error").empty().html('<img src="img/1x/ic_error.png"/>'+
                  '<p>'+gjson_lang["service_error"]+'</p>'+
                  '<div  data-corners="false" data-role="button"  class="retry_div" >'+gjson_lang["retry"]+'</div>');
}

function networkFailureAlert() 
{
	hideLoading();
	showToast(gjson_lang["error_no_local"]);
	$("#content_error").empty().html('<img src="img/1x/ic_error.png"/>'+
                  '<p >'+gjson_lang["error_no_local"]+'</p>');
}





function networkYesLocalFailureAlert()
{
	hideLoading();
	navigator.notification.confirm(
        gjson_lang['no_network_local'], // message
        onDismissYesLocal, // callback to invoke with index of button pressed
        gjson_lang['error_no_local'], // title
        [gjson_lang['exit_title'],gjson_lang['continue']] // buttonLabels
      );
	
}



function onDismissYesLocal(index)
{
	 if ( index === 1 )
    navigator.app.exitApp();
}

function translatePage($page)
{
	$page.find(":jqmData(t)").each(function() {
		var txt = $(this).attr("data-t");
		var params = $(this).attr("data-t-params");
		var translation = gjson_lang[txt];
		if(params){
			translation = String.format(translation,params);
		}

        // Si el tag tiene placeholder se traduce. En caso contrario
        // se traduce el innerHTML
        if("placeholder" in this) $(this).attr("placeholder", translation)
        else $(this).html(translation);
	});
}


/**
 * function to emulate Java String.format function (params inside string must be {0}, {1},... not %d and %s)
 */
String.format = function ( )
{
	var s = arguments[ 0 ];
	if ( $.isArray( arguments[ 1 ] ) ) {
		for ( var i = 0, len = arguments[ 1 ].length; i < len; i++ ) {
			var reg = new RegExp("\\{" + i + "\\}", "gm");
			s = s.replace(reg, arguments[ 1 ][ i ]);
		}
	} else {
		for ( var i = 0, len = arguments.length - 1; i < len; i++ ) {
			var reg = new RegExp( "\\{" + i + "\\}", "gm" );
			s = s.replace(reg, arguments[ i+1 ]);
		}
	}
	return s;
};

function getURLParameter(name) 
{
	var value = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
	if(value) return decodeURI(value);
	return null;
}

//FUNCIONES PARA CONTROLAR AUDIO
function events(action) {
    switch(action) {
        case 'music-controls-next':
          //  console.log("next sakata");
            break;
        case 'music-controls-previous':
          //  console.log("previous sakata");
            break;
        case 'music-controls-pause':
          //  console.log("pause sakata");
            my_media.pause();
            MusicControls.updateIsPlaying(false);
            $("#play_img").removeClass("play_img_sem").addClass("play_img");
      		$("#pause_img").removeClass("pause_img").addClass("pause_img_sem");
            pause_pushed=true;
            break;
        case 'music-controls-play':
          //  console.log("play sakata");
            my_media.play();
            MusicControls.updateIsPlaying(true);
            pause_pushed=false;
            $("#play_img").removeClass("play_img").addClass("play_img_sem");
      		$("#pause_img").removeClass("pause_img_sem").addClass("pause_img");
      		$("#stop_img").removeClass("stop_img_sem").addClass("stop_img");
            break;
        case 'music-controls-destroy':
        	my_media.stop();
        	 audio_playing=false;
          //  console.log("destroy sakata");
            playing_title="";
   			$("#track_title").text(playing_title);
   			$("#play_img").removeClass("play_img_sem play_img").addClass("play_img");
      $("#pause_img").removeClass("pause_img pause_img_sem").addClass("pause_img_sem");
      $("#stop_img").removeClass("stop_img_sem stop_img_sem").addClass("stop_img_sem");
   			pause_pushed=true;
            break;


        default:
            break;
    }
}

function saveScrollPosition(value)
{
	ZientziApp.sessionStorage.setItem('scroll_value', value);
}

function loadScrollPosition()
{
	var value;
	if ( !ZientziApp.sessionStorage.getItem("scroll_value") )
	{
		value=0;
	}
	else
		value=ZientziApp.sessionStorage.getItem("scroll_value")
	return value;
}




/* BUGFIX JQUERY UI TABS */
$.widget( "ui.tabs", $.ui.tabs, {

    _createWidget: function( options, element ) {
        var page, delayedCreate,
            that = this;

        if ( $.mobile.page ) {
            page = $( element )
                .parents( ":jqmData(role='page'),:mobile-page" )
                .first();

            if ( page.length > 0 && !page.hasClass( "ui-page-active" ) ) {
                delayedCreate = this._super;
                page.one( "pagebeforeshow", function() {
                    delayedCreate.call( that, options, element );
                });
            }
        } else {
            return this._super();
        }
    }
});

$.widget('mobile.collapsible', $.mobile.collapsible, {
  _handleExpandCollapse: function(isCollapse) {
    if (this._trigger('before' + (isCollapse ? 'collapse' : 'expand'))) {
      this._superApply(arguments);
    }
  }
});

//IRUDIAK GORDETZEKO FUNZTIOAK

/* VARIABLES */


var gjson_lang = null;
var my_media;
var news_array=null;
var gallery_array=null;
var selected_new=null;
var events_array=null;
var selected_event=null;
var audio_playing=false;
var reload_news=false;
var reload_agenda=false;
var reload_gallery=false;
var filter_aud=false;
var filter_vid=false;
var filter_art=false;
var playing_title="";
var pause_pushed=false;
var screen_to_return="";
var swiper_page;
var swiper_full;
var analytics;
var asteko_hitza=null;
//var hitza_text;
var main_new=null;
var main_new_url;
var main_new_title;
var main_new_image;
var html_base_start;
var html_base_end;
var html_main_new;
var main_new_desc;
var mailc_articles_array=[];
var mailc_audios_array=[];
var mailc_videos_array=[];
var image_sources=[];
var down_content;
var left_table_content;
var right_table_content;
var selected_event_list=[];
var m_article_list=[];

//console.log("FunctionGlobals-em");

loadJSONMainLanguage();

ZientziApp.connection = new ZientziApp.Connection(serviceFailureAlert);
ZientziApp.localStorage = new ZientziApp.LocalStorage(APP_DOMAIN);
ZientziApp.sessionStorage = new ZientziApp.SessionStorage(APP_DOMAIN);