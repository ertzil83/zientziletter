/* EVENTOS GENERALES APP */

$(document).on("mobileinit", function(){
	$.mobile.defaultPageTransition = 'none';
});


$( document ).on("click", "a", function(event)
{
	
	var str_url_params = $(this).attr( "data-url" ) || "";
	var str_anchor_href = $(this).attr( "href" );

	if($(this).attr("rel") == "external" || $(this).attr("target") == "_blank" || $(this).attr( "href" ).match( /^(tel|mailto)\:/g ))
	{
		event.preventDefault();
		window.open($(this).attr( "href" ) + ($(this).attr( "data-url" )|| ""), '_blank');
		hideLoading();
		return false;
	}
	else if ($(this).attr( "href" )[0] === "#" )
		return true;	
	else if ( $.mobile.activePage.attr( "data-url" ).indexOf( $(this).attr( "href" ) + $(this).attr( "data-url" ) ) !== -1 )
		return false;
		

	if (str_anchor_href.toLowerCase().indexOf("www") >= 0)
	{
		event.preventDefault();
		window.open($(this).attr( "href" ) + ($(this).attr( "data-url" )|| ""), '_blank');
		hideLoading();
		return false;
	}

	$( "body" ).pagecontainer( "change", str_anchor_href + str_url_params );

	return false;

});

/*$( document ).on("panelbeforeopen", function(event, ui) {
  var page = $(this);
  console.log(page.find( ".ui-content" ).height() + page.find( ".ui-header" ).height() + + page.find( ".ui-footer" ).height());
  $( "#panel_Bilbobus" ).height(page.find( ".ui-content" ).height() + page.find( ".ui-header" ).height() + + page.find( ".ui-footer" ).height()+10);
    page.css({
      overflow : 'hidden'
    });
  });


$( document ).on("panelbeforeclose", function(event, ui) {
    var page = $(this);
    $( "#panel_Bilbobus" ).height($(window).height());
    page.css({
      overflow : 'visible'
    });
  });*/
