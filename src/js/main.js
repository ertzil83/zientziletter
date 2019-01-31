/* JS PARA MAIN. JS PRINCIPAL DE MAIN.HTML SOBRE EL QUE SE CARGAN LOS TEMPLATES */

/* VARIABLES */

var main = window.zientziApp || {};

main.init = function () {
  'use strict';
 	$( "#panel_app" ).panel();	
 	
 
};



/* EVENTS */
$( document ).off( ".main" )

.on( "pagecreate.main", "#page_main", function()
{
  
	main.init();
  
})

.on("pagecontainerbeforeshow.main", function(event, ui)
{
	if (ui.toPage.attr("id") == "page_main") 
    //console.log(getURLParameter("template"));
		updateTemplate(getURLParameter("template"));
}) 

.on("click.main", "#panel_app a", function()
{ 
    
    if($(this).attr("data-url")!="#")
    {
      $("#panel_app").find("a").removeClass("panelItemSelected").addClass("panelItem");
      $( this ).removeClass("panelItem").addClass("panelItemSelected");
      var selected=this.id;
      
      switch(selected) {
        case "newsItem":
            $("#newsItem").removeClass("ui-icon_panel_news").addClass("ui-icon_panel_news_sel");
            $("#agendaItem").removeClass("ui-icon_panel_agenda_sel").addClass("ui-icon_panel_agenda");
            $("#aboutItem").removeClass("ui-icon_panel_about_sel").addClass("ui-icon_panel_about");
            $("#galleryItem").removeClass("ui-icon_panel_gallery_sel").addClass("ui-icon_panel_gallery");
            $("#favsItem").removeClass("ui-icon_panel_fav_sel").addClass("ui-icon_panel_fav");
            break;
        case "agendaItem":
            $("#newsItem").removeClass("ui-icon_panel_news_sel").addClass("ui-icon_panel_news");
            $("#agendaItem").removeClass("ui-icon_panel_agenda").addClass("ui-icon_panel_agenda_sel");
            $("#aboutItem").removeClass("ui-icon_panel_about_sel").addClass("ui-icon_panel_about");
            $("#galleryItem").removeClass("ui-icon_panel_gallery_sel").addClass("ui-icon_panel_gallery");
            $("#favsItem").removeClass("ui-icon_panel_fav_sel").addClass("ui-icon_panel_fav");
            break;
        case "aboutItem":
            $("#newsItem").removeClass("ui-icon_panel_news_sel").addClass("ui-icon_panel_news");
            $("#agendaItem").removeClass("ui-icon_panel_agenda_sel").addClass("ui-icon_panel_agenda");
            $("#aboutItem").removeClass("ui-icon_panel_about").addClass("ui-icon_panel_about_sel");
            $("#galleryItem").removeClass("ui-icon_panel_gallery_sel").addClass("ui-icon_panel_gallery");
            $("#favsItem").removeClass("ui-icon_panel_fav_sel").addClass("ui-icon_panel_fav");
            break;
        case "galleryItem":
            $("#newsItem").removeClass("ui-icon_panel_news_sel").addClass("ui-icon_panel_news");
            $("#agendaItem").removeClass("ui-icon_panel_agenda_sel").addClass("ui-icon_panel_agenda");
            $("#aboutItem").removeClass("ui-icon_panel_about_sel").addClass("ui-icon_panel_about");
            $("#galleryItem").removeClass("ui-icon_panel_gallery").addClass("ui-icon_panel_gallery_sel");
            $("#favsItem").removeClass("ui-icon_panel_fav_sel").addClass("ui-icon_panel_fav");
            break;
        case "favsItem":
            $("#newsItem").removeClass("ui-icon_panel_news_sel").addClass("ui-icon_panel_news");
            $("#agendaItem").removeClass("ui-icon_panel_agenda_sel").addClass("ui-icon_panel_agenda");
            $("#aboutItem").removeClass("ui-icon_panel_about_sel").addClass("ui-icon_panel_about");
            $("#galleryItem").removeClass("ui-icon_panel_gallery_sel").addClass("ui-icon_panel_gallery");
            $("#favsItem").removeClass("ui-icon_panel_fav").addClass("ui-icon_panel_fav_sel");
            break;
    
      }
      loadTemplate('main', $(this).attr("data-url"));
      $("#panel_app").panel( "close" );
    }
    
})


.on("vclick.main", "#btn_menu", function()
    { 
        
        $("#panel_app").panel( "open" );
    }
    )


