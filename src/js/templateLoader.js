/* JS PARA GESTIONAR EL USO DE TEMPLATES */

/* VARIABLES */

function loadTemplate(type, template, content) 
{
	switch (type) {
		case "INIT":
				window.location = "src/main.html?template=nagusia";
		break;

    case "INIT2":
        window.location = "main.html?template=nagusia";
    break;

    case "LANGUAGE":
        window.location = "src/main.html?template=nagusia";
    break;
		
    case "main":
			template_origin = getURLParameter("template");
			if (getURLParameter("content"))
				url_params_origin = getURLParameter("content");
			else
				url_params_origin = null;

			var str_anchor_href = "main.html";
			var str_url_params = "?template="+template;

			if (content)
				str_url_params += "&content="+content;

    		$('script[src="js/page_'+template_origin+'.js"]').remove();
    		$('link[href="css/page_'+template_origin+'.css"]' ).remove();

			$(".ui-page").remove();
			$(window).off( "."+template_origin);
    		$(document).off( "."+template_origin);
			$.mobile.pageContainer.pagecontainer('change', str_anchor_href + str_url_params);
			break;	
		}
}



function updateTemplate(template) 
{
      var template = getURLParameter("template");

      $.ajax({
        url: "templates/"+template+".html",
        async: false
      })
    .done(function(content){
      $("#content").removeClass().addClass(template); 
      $("#content").removeClass().addClass("ui-content");      
      $("#content").empty().append(content).trigger('create');
      $( "body" ).append('<script type="text/javascript" src="js/page_'+template+'.js"></script>');
      $( "body" ).append('<link rel="stylesheet" type="text/css" href="css/page_'+template+'.css"/>');
      
      /* ACTUALIZO EL PANEL LATERAL */
      $("#panel_app").find("a").removeClass("current_element_selected");
      //console.log($("#content:firstchild div").attr("id"));
      $("#panel_app").find("[data-url='" + template + "']").addClass("current_element_selected");
      try
      {
        analytics.sendAppView(template);
        console.log("analytics orria: "+template);
      }
      catch (err)
      {}
      translatePage($("body"));
    });     
  }

