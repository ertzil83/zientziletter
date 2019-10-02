var zientziApp = window.zientziApp || {};
zientziApp.View = (function () {
  'use strict';

function View(rootElement) 
{
  var dom = 
  {
    header: $(rootElement).find('#app_header'),
    listmenu: $(rootElement).find('#listview_menu'),
    results: $(rootElement).find('#resultados'),
    errorMessage: $(rootElement).find('#content_error'),

    /* ELEMENTOS */
    header_home_noicon: '', 

    header_home: '<a href="#" id="btn_menu" class="ui-btn-left ui-nodisc-icon ui-btn ui-icon-menu ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>'+
                  '<div class="ui-btn-right right_div"><a href="#" id="btn_show_map"  class="ui-nodisc-icon ui-btn ui-icon-map ui-btn-icon-notext" data-iconshadow="false" data-iconpos="notext" data-role="button" role="button"></a></div>',
                
    
    header_map: '<a href="#" id = "btn_back" class="ui-icon-prev ui-btn-left ui-nodisc-icon ui-btn  ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>'+
                  '<div class="ui-btn-right right_div"><a href="#" id="btn_center_map"  class="ui-nodisc-icon ui-btn ui-icon-center ui-btn-icon-notext" data-iconshadow="false" data-iconpos="notext" data-role="button" role="button"></a></div>',
    
    header_back_buttton: '<a href="#" id = "btn_back" class="ui-icon-prev ui-btn-left ui-nodisc-icon ui-btn  ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>'+
                  '<div class="ui-btn-right right_div"><a href="#" id="btn_show_map"  class="ui-nodisc-icon ui-btn ui-icon-map ui-btn-icon-notext" data-iconshadow="false" data-iconpos="notext" data-role="button" role="button"></a></div>',

    header_simple: '<a href="#" id = "btn_back" class="ui-icon-prev ui-btn-left ui-nodisc-icon ui-btn  ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>',

    header_new_page: '<a href="#" id = "btn_back" class="ui-icon-prev ui-btn-left ui-nodisc-icon ui-btn  ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>'+
                     '<div class="ui-btn-right right_div"><a href="#" id="btn_share"  class="ui-nodisc-icon ui-btn ui-icon-share ui-btn-icon-notext" data-iconshadow="false" data-iconpos="notext" data-role="button" role="button"></a></div>',

    header_event_page: '<a href="#" id = "btn_back" class="ui-icon-prev ui-btn-left ui-nodisc-icon ui-btn  ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>'+
                     '<div class="ui-btn-right right_div"><a href="#" id="btn_to_calendar"  class="ui-nodisc-icon ui-btn ui-icon-tocalendar ui-btn-icon-notext" data-iconshadow="false" data-iconpos="notext" data-role="button" role="button"></a></div>',
    header_news_list: '<a href="#" id="btn_menu" class="ui-btn-left ui-nodisc-icon ui-btn ui-icon-menu ui-btn-icon-notext" data-iconshadow="false" data-role="button" role="button"></a>'+
                     '<div class="ui-btn-right right_div"><a href="#" id="btn_lupa"  class="ui-nodisc-icon ui-btn ui-btn_logo ui-icon-lupa ui-btn-icon-notext" data-iconshadow="false" data-iconpos="notext" data-role="button" role="button"></a></div>',  

    

    //ZIENTZIAPP!!!!

    EventPage: function()
    {
      if(selected_event.fields.photo!=null && checkConnection())
      zientziApp.api.getIrudia(selected_event.fields.photo)
          .done(function(response) {
          //  console.log("irudia kargatuta");
            //console.log(response);
            var imgs = $("<div>" +response +"</div>").find("img");
            var src=imgs.attr('src');
            //console.log(imgs.attr('src'));
            //$("#news_image").attr("src", src);
            $("#news_image").css("background-image", "url("+src.replace(/ /g,'%20')+")");
          });
      var title=selected_event.fields.title;
      var author=selected_event.fields.antolatzailea;
      var desc=selected_event.fields.summary;
      var city=selected_event.fields.herria;
      var place=selected_event.fields.place;
      var start=selected_event.fields.begin;
      var end=selected_event.fields.end;
      var title_div='<div class="title">'+title+'</div>';
      var image_div="";
      if(selected_event.fields.photo!=null)
        image_div='<div class="image_div" id="news_image"></div>';
      var author_div="";
      if(author!=null)
        author_div='<div class="dates"><span class="info" data-t="author"></span>'+author+'</div>';
      var city_div='';
      var place_div='';
      if(city!=null)
        city_div='<div class="dates"><span class="info" data-t="town"></span>'+city+'</div>'
      if(place!="")
        place_div='<div class="dates"><span class="info" data-t="place"></span>'+place+'</div>';
      //var place_div='<div><span class="info">Lekua: </span>'+place+'</div>';
      var start_clean=getCleanDate(start);
      var end_clean=getCleanDate(end);
      var date_div='<div> <span class="info" data-t="date"></span> '+start_clean+' - '+end_clean+'</div>';
      var desc_div='<div id="desc_div">'+desc+'</div>';
     // var visit_div='<div class="url_div"><span id="web_link" data-t="visit_event"></span></div>';
      return '<div>'+ image_div+'<div class="new_central_div">'+
                  title_div+
                  '<div class="line-separator"></div>'+
                  '<div class="info_div">'+
                  author_div+
                  city_div+
                  place_div+
                  date_div+
                //  date_div+
                  '</div>'+
                  '<div class="line-separator"></div>'+
                  desc_div+
                //  visit_div+
                '<a href="#" class="ui-btn visit_web ui-btn-inline" id="web_link" data-t="visit_event"/>'+
                '</div></div>';
     
    },

    EventItem: function(event,i)
    {
      var banner_div="";
      if((i+1)%5==0)
        banner_div='<li><a  href="https://www.elhuyar.eus/eu/site/proiektuak/caf-elhuyar/caf-elhuyar-sariak"><img class="banner_li" src="https://tpc.googlesyndication.com/simgad/6360417393206419105" border="0" width="100%" height="auto" ></img></a></li>';
      var title_div='<div class="title">'+event.fields.title+'</div>';
      //var day=getDayOfTheWeek(event.fields.begin);

      var day=getDayOfTheWeekAgenda(event.fields.begin);
      var month=getMonthAgenda(event.fields.begin);
      var number=getDayAgenda(event.fields.begin);
      var year=getYearAgenda(event.fields.begin);

      var enddate=event.fields.end;
      var enddate_div="";
      if(enddate!="")
      {
        var end_clean=getCleanDate(enddate);
        enddate_div="<div class='date'>"+gjson_lang["end_date"]+ end_clean+"</div>";
      }
      

      var place_div="";
      var place=event.fields.place;
      if (place!="")
        place_div="<div class='date'>"+place+"</div>";
      //var date_div='<div class="date">'+day+'</div>';
      return "<li class='agenda_item' id="+i+"><div id='event_list_item' class='ui-grid-a agenda_list_item'>"+
              "<div class='ui-block-a content_list_item'>"+
                title_div+
                place_div+
                enddate_div+
              "</div>"+
              "<div class='ui-block-b date_list_item'>"+
                "<div class='month_div'>"+month+"</div>"+
                "<div class='day_div'>"+number+"</div>"+
                "<div class='weekday_div'>"+year+"</div>"+
              "</div>"+
            "</div></li>"+banner_div;
    },

    NewItem: function(element,i)
    {

      var banner_div="";
     // var 
      if((i+1)%5==0)
        banner_div=getPubli();
      var type=checkNewsType(element);
      if(type !="audio")
      {
        var img_url="";
        if(type!="video")
        {

          img_url=element.fields.photo;
          if(img_url==undefined)
          {
            if(element.fields.hasOwnProperty('photos'))
              img_url=element.fields.photos[0];
          }
            
        }
         // img_url=element.fields.photo;
        else
          img_url=element.fields.irudia;
        //console.log("URL::: "+img_url);
          if(checkConnection()) //Konexioa dugun ala ez ikusten dugu hemen
          {
          zientziApp.api.getIrudia(img_url)
          .done(function(response) {
            //console.log("irudia kargatuta");
            //console.log(response);
            var imgs = $("<div>" +response +"</div>").find("img");
            var src=imgs.attr('src');
            var img_name="#img"+i;
            //console.log(src.replace(/ /g,'%20'));
            var no_white_url=src.replace(/ /g,'%20').replace("(","%28").replace(")","%29").replace("'","%27");
            //console.log(no_white_url);
            //$(img_name).attr("src", src);
            $(img_name).css("background-image", "url("+no_white_url+")");          
            });
          }

           var mota=gjson_lang[type];
            var title=getTitle(type,element);
            var title_div='<div class="title">'+title+'</div>';
            var fav_img_class="fav_img";
            if(isInFavList(element))
              fav_img_class="fav_sel_img";
            var fav_img_div="<div class='fav_img_div' id="+i+"><img class="+fav_img_class+" /></div>";
            var img_src="";
            var img_name="img"+i;
            var img_div="<div class='list_div' id='"+img_name+"'></div>";
            var day=getDayOfTheWeek(element.fields.published_date);
            var date_div='<div class="date ui-block-a">'+day+'</div>';
           
            return "<li>"+
           fav_img_div+
            "<div class='news_item' id="+i+">"+

            "<div id='event_list_item' class=' news_list_item'>"+
              "<div class='list_div' id='"+img_name+"'>"+
              "<div class='content_list_item'>"+
                
                title_div+
                "<div class='ui-grid-a'>"+

                date_div+
                "<div class='ui-block-b type_span'>"+mota+"</div></div>"+
              "</div>"+
              
              "</div></div></div></li>"+banner_div;
      
         
      }
      else
      {
        var banner_div="";
      if((i+1)%5==0)
        banner_div=getPubli();
      var type=checkNewsType(element);
      var mota=gjson_lang[type];
      var fav_img_class="fav_img";
            if(isInFavList(element))
              fav_img_class="fav_sel_img";
      var fav_img_div="<div class='fav_img_div' id="+i+"><img class="+fav_img_class+" /></div>";
      var title=getTitle(type,element);
      var title_div='<div class="title">'+title+'</div>';
      var img_src="";
     
      var img_div="<div class='list_div_radio'>";
      var day=getDayOfTheWeek(element.fields.published_date);
      var date_div='<div class="date ui-block-a">'+day+'</div>';
      
      return "<li>"+
           fav_img_div+
            "<div class='news_item' id="+i+">"+

            "<div id='event_list_item' class=' news_list_item'>"+
              img_div+
              "<div class='content_list_item'>"+
                
                title_div+
                "<div class='ui-grid-a'>"+

                date_div+
                "<div class='ui-block-b type_span'>"+mota+"</div></div>"+
              "</div>"+
              
              "</div></div></div></li>"+banner_div;
    }
      
     
    },

    GalItem: function(element,i)
    {

      var banner_div="";
     // var 
      if((i+1)%5==0)
        banner_div=getPubli();
      var type=checkNewsType(element);
      var img_url="";
        if(type!="video")
        {

          img_url=element.fields.photo;
          if(img_url==undefined)
          {
            if(element.fields.hasOwnProperty('photos'))
              img_url=element.fields.photos[0];
          }
            
        }
         // img_url=element.fields.photo;
        else
          img_url=element.fields.irudia;
        //console.log("URL::: "+img_url);
          if(checkConnection()) //Konexioa dugun ala ez ikusten dugu hemen
          {
          zientziApp.api.getIrudia(img_url)
          .done(function(response) {
            //console.log("irudia kargatuta");
            //console.log(response);
            var imgs = $("<div>" +response +"</div>").find("img");
            var src=imgs.attr('src');
            var img_name="#img"+i;
            //console.log(src.replace(/ /g,'%20'));
            var no_white_url=src.replace(/ /g,'%20').replace("(","%28").replace(")","%29").replace("'","%27");
            //console.log(no_white_url);
            //$(img_name).attr("src", src);
            $(img_name).css("background-image", "url("+no_white_url+")");          
            });
          }

           var mota=gjson_lang[type];
            var title=getTitle(type,element);
            var title_div='<div class="title">'+title+'</div>';
            var fav_img_class="fav_img";
            if(isInFavList(element))
              fav_img_class="fav_sel_img";
            var fav_img_div="<div class='fav_img_div' id="+i+"><img class="+fav_img_class+" /></div>";
            var img_src="";
            var img_name="img"+i;
            var img_div="<div class='list_div' id='"+img_name+"'></div>";
            var day=getDayOfTheWeek(element.fields.published_date);
            var date_div='<div class="date ui-block-a">'+day+'</div>';
            //console.log("Return egitera");
            return "<li>"+
           fav_img_div+
            "<div class='news_item' id="+i+">"+

            "<div id='event_list_item' class=' news_list_item'>"+
              "<div class='list_div' id='"+img_name+"'>"+
              "<div class='content_list_item'>"+
                
                title_div+
                "<div class='ui-grid-a'>"+

                date_div+
             
              "</div>"+
              
              "</div></div></div></li>"+banner_div;

           
      
     
    },

    FavItem: function(element,i)
    {

      var banner_div="";
     // var 
      if((i+1)%5==0)
        banner_div=getPubli();
      var type=checkNewsType(element);
      if(type !="audio")
      {
        var img_url="";
        if(type!="video")
        {

          img_url=element.fields.photo;
          if(img_url==undefined)
          {
            if(element.fields.hasOwnProperty('photos'))
              img_url=element.fields.photos[0];
          }
            
        }
         // img_url=element.fields.photo;
        else
          img_url=element.fields.irudia;
        //console.log("URL::: "+img_url);
          if(checkConnection()) //Konexioa dugun ala ez ikusten dugu hemen
          {
          zientziApp.api.getIrudia(img_url)
          .done(function(response) {
            //console.log("irudia kargatuta");
            //console.log(response);
            var imgs = $("<div>" +response +"</div>").find("img");
            var src=imgs.attr('src');
            var img_name="#img"+i;
            //console.log(src.replace(/ /g,'%20'));
            var no_white_url=src.replace(/ /g,'%20').replace("(","%28").replace(")","%29").replace("'","%27");
            //console.log(no_white_url);
            //$(img_name).attr("src", src);
            $(img_name).css("background-image", "url("+no_white_url+")");          
            });
          }

           var mota=gjson_lang[type];
            var title=getTitle(type,element);
            var title_div='<div class="title">'+title+'</div>';
            var del_img_div="<div class='del_img_div' id="+i+"><img class='del_img' /></div>";
            var img_src="";
            var img_name="img"+i;
            var img_div="<div class='list_div' id='"+img_name+"'></div>";
            var day=getDayOfTheWeek(element.fields.published_date);
            var date_div='<div class="date ui-block-a">'+day+'</div>';
            
              return "<li>"+
           del_img_div+
            "<div class='news_item' id="+i+">"+

            "<div id='event_list_item' class=' news_list_item'>"+
              "<div class='list_div' id='"+img_name+"'>"+
              "<div class='content_list_item'>"+
                
                title_div+
                "<div class='ui-grid-a'>"+

                date_div+
                "<div class='ui-block-b type_span'>"+mota+"</div></div>"+
              "</div>"+
              
              "</div></div></div></li>"+banner_div;
      
         
      }
      else
      {
        var banner_div="";
      if((i+1)%5==0)
        banner_div=getPubli();
      var type=checkNewsType(element);
      var mota=gjson_lang[type];
      var del_img_div="<div class='del_img_div' id="+i+"><img class='del_img' /></div>";
      var title=getTitle(type,element);
      var title_div='<div class="title">'+title+'</div>';
      var img_src="";
     
      var img_div="<div class='list_div_radio'>";
      var day=getDayOfTheWeek(element.fields.published_date);
      var date_div='<div class="date ui-block-a">'+day+'</div>';
      
      return "<li>"+
           del_img_div+
            "<div class='news_item' id="+i+">"+

            "<div id='event_list_item' class=' news_list_item'>"+
              img_div+
              "<div class='content_list_item'>"+
                
                title_div+
                "<div class='ui-grid-a'>"+

                date_div+
                "<div class='ui-block-b type_span'>"+mota+"</div></div>"+
              "</div>"+
              
              "</div></div></div></li>"+banner_div;
      }
      
     
    },

    NewArticle: function()
    {
       if(checkConnection()) //Konexioa dugun ala ez ikusten dugu hemen
          {
            var img_url=selected_new.fields.photo;
            if(img_url==undefined)
            {
              if(selected_new.fields.hasOwnProperty('photos'))
                img_url=selected_new.fields.photos[0];
            }
           
            zientziApp.api.getIrudia(img_url)
                .done(function(response) {
                  console.log("irudia kargatuta");
                  //console.log(response);
                  var imgs = $("<div>" +response +"</div>").find("img");
                  var src=imgs.attr('src');
                  var no_white_url=src.replace(/ /g,'%20').replace("(","%28").replace(")","%29").replace("'","%27");
                  //console.log(imgs.attr('src'));
                  //$("#news_image").attr("src", src);
                  $("#news_image").css("background-image", "url("+no_white_url+")");
              });
        }
      var title=selected_new.fields.title;
      var fav_img_class="new_fav_img";
            if(isInFavList(selected_new))
              fav_img_class="new_fav_sel_img";
      var fav_img_div="<div class='new_fav_img_div'><img class="+fav_img_class+" /></div>";
      var subtitle=selected_new.fields.azpititulua;
      var iturria=selected_new.fields.iturria;
      var iturri_div="";
      if(iturria!="" && iturria!=undefined)
        iturri_div='<div class="dates"><span class="info" data-t="iturria"></span>'+iturria+'</div>';
      var author_div="";
      if(selected_new.fields.egileak!=null)
      {
        var author=getAuthor(selected_new.fields.egileak);
        author_div='<div class="dates"><span class="info" data-t="author_art"></span>'+author+'</div>';
      }
      /*var author=getAuthor(selected_new.fields.egileak);
      var author_div='<div class="dates"><span class="info" data-t="author_art"></span>'+author+'</div>';*/
      var tags=getTags(selected_new.fields.subject);
      var tags_div='<div class="dates"><span class="info" data-t="tags"></span>'+tags+'</div>';
      var desc=selected_new.fields.body;
      var small_desc=desc.split("</p>")[0]+"</p>";
      var title_div='<div class="title">'+title+'</div>';
      var subtitle_div="";
      if(subtitle!="" && iturria!=undefined)
        subtitle_div='<div class="subtitle">'+subtitle+'</div>';
      var image_div=fav_img_div+'<div class="image_div" id="news_image"></div>';
      var desc_div='<div id="desc_div">'+small_desc+'</div>';
      return "<div>"+
              image_div+

              '<div class="new_central_div">'+
              title_div+
              '<div class="line-separator"></div>'+
               '<div class="info_div">'+
                  iturri_div+
                  author_div+
                  tags_div+
                 
                  '</div>'+
                  '<div class="line-separator"></div>'+
              subtitle_div+
              desc_div+
              '<div class="dots">...</div>'+
             // visit_div+
             '<a href="#" class="ui-btn visit_web ui-btn-inline" id="web_link" data-t="visit_web"/>'+
              '</div>'+
             "</div>";
      
      
    },

    NewGallery: function()
    {
       
      var title=selected_new.fields.title;
      var fav_img_class="new_fav_img";
            if(isInFavList(selected_new))
              fav_img_class="new_fav_sel_img";
      var fav_img_div="<div class='newg_fav_img_div'><img class="+fav_img_class+" /></div>";
      var full_scr_div="<div class='full_src_img_div'><img class='new_fsrc_img' /></div>";
      var subtitle=selected_new.fields.azpititulua;
      var iturria=selected_new.fields.iturria;
      var iturri_div="";
      if(iturria!="" && iturria!=undefined)
        iturri_div='<div class="dates"><span class="info" data-t="iturria"></span>'+iturria+'</div>';
      var author_div="";
      if(selected_new.fields.egileak!=null)
      {
        var author=getAuthor(selected_new.fields.egileak);
        author_div='<div class="dates"><span class="info" data-t="author_art"></span>'+author+'</div>';
      }
      /*var author=getAuthor(selected_new.fields.egileak);
      var author_div='<div class="dates"><span class="info" data-t="author_art"></span>'+author+'</div>';*/
      var tags=getTags(selected_new.fields.subject);
      var tags_div='<div class="dates"><span class="info" data-t="tags"></span>'+tags+'</div>';
      var desc=selected_new.fields.body;
      var small_desc=desc.split("</p>")[0]+"</p>";
      var title_div='<div class="title">'+title+'</div>';
      var subtitle_div="";
      if(subtitle!="" && iturria!=undefined)
        subtitle_div='<div class="subtitle">'+subtitle+'</div>';
      var desc_div='<div id="desc_div">'+small_desc+'</div>';
      
      var slides=getSlides();
      return '<div>'+
              
            '<div class="swiper-container page_swiper">'+
                '<div class="swiper-wrapper ">'+
                slides+
                '</div>'+
                '<div class="page-pagination swiper-pagination swiper-pagination-white"></div>'+
                '<div class="page-next swiper-button-next swiper-button-white"></div>'+
                '<div class="page-prev swiper-button-prev swiper-button-white"></div>'+
                fav_img_div+
                full_scr_div+
              '</div>'+
              '<div class="new_central_div">'+
              title_div+
              '<div class="line-separator"></div>'+
               '<div class="info_div">'+
                  iturri_div+
                  author_div+
                  tags_div+
                 
                  '</div>'+
                  '<div class="line-separator"></div>'+
              subtitle_div+
              desc_div+
              '<div class="dots">...</div>'+
             // visit_div+
             '<a href="#" class="ui-btn visit_web ui-btn-inline" id="web_link" data-t="visit_web"/>'+
              '</div>'+
             "</div></div>";
      
    },

    NewAudio: function()
    {
      var audio="Audioa";
      var title=selected_new.fields.title;
      var desc=selected_new.fields.summary;
      var iturria=selected_new.fields.iturria;
      var fav_img_class="new_fav_img";
            if(isInFavList(selected_new))
              fav_img_class="new_fav_sel_img";
      var fav_img_div="<div class='new_fav_img_div'><img class="+fav_img_class+" /></div>";
      var iturri_div="";
      if(iturria!="")
        iturri_div='<div class="dates"><span class="info" data-t="iturria"></span>'+iturria+'</div>';
      var tags=getTags(selected_new.fields.subject);
      var tags_div='<div class="dates"><span class="info" data-t="tags"></span>'+tags+'</div>';
      var title_div='<div class="title">'+title+'</div>';
      var desc_div='<div id="desc_div">'+desc+'</div>';

     // var visit_div='<div class="url_div"><span id="web_link" data-t="visit_web"></span></div>';
      return "<div>"+
                fav_img_div+
                '<div class="player_div">'+
                '<div id="track_title_div"><span id="track_title">'+playing_title+'</span></div>'+
                  '<div class="player_bar_div">'+

                    '<span id="time">00:00</span>'+
                    '<span id="total_time">00:00</span>'+
                    '<div id="seekbar-container" ></div>'+

                    '</div>'+
                    
                  //'</div>'+

                  '<div class="ui-grid-b player_buttons_div">'+
                    '<div class="ui-block-a" id="play_btn"><img id="play_img" class="play_img"></img></div>'+
                    '<div class="ui-block-b" id="pause_btn" ><img id="pause_img" class="pause_img_sem"></img></div>'+
                    '<div class="ui-block-c" id="stop_btn"><img id="stop_img" class="stop_img_sem"></img></div>'+
                  '</div>'+
                 
                '</div>'+
                '<div class="new_central_div">'+
                  title_div+
                  '<div class="line-separator"></div>'+
                  '<div class="info_div">'+
                  iturri_div+
                 // author_div+
                  tags_div+
                 
                  '</div>'+
                  '<div class="line-separator"></div>'+
                  desc_div+
                  '<a href="#" class="ui-btn visit_web ui-btn-inline" id="web_link" data-t="visit_web"/>'+
                 // visit_div+
                '</div>'+
              "</div>";
    },

    NewVideo: function()
    {
      //HEMEN BEREZ HIZKUNTZAREN ARABERA AUKERATU BEHARKO LITZATEKE
       if(checkConnection()) //Konexioa dugun ala ez ikusten dugu hemen
          {
      zientziApp.api.getIrudia(selected_new.fields.irudia)
          .done(function(response) {
           // console.log("irudia kargatuta");
            //console.log(response);
            var imgs = $("<div>" +response +"</div>").find("img");
            var src=imgs.attr('src');
            //console.log(imgs.attr('src'));
            //$("#news_image").attr("src", src);
            $("#news_image").css("background-image", "url("+src.replace(/ /g,'%20')+")");
          });
        }
      var title=selected_new.fields.title_eu;
      var desc=selected_new.fields.summary_eu;
      var iturria=selected_new.fields.iturria;
      var iturri_div="";
      if(iturria!="")
        iturri_div='<div class="dates"><span class="info" data-t="iturria"></span>'+iturria+'</div>';
      var fav_img_class="new_fav_img";
            if(isInFavList(selected_new))
              fav_img_class="new_fav_sel_img";
      var fav_img_div="<div class='new_fav_img_div'><img class="+fav_img_class+" /></div>";
      var tags=getTags(selected_new.fields.subject);
      var tags_div='<div class="dates"><span class="info" data-t="tags"></span>'+tags+'</div>';
      var iframe=selected_new.fields.blipIframe_eu;
      var image_div=fav_img_div+'<div class="image_div" id="news_image"></div>';
      var title_div='<div class="title">'+title+'</div>';
      var desc_div='<div id="desc_div">'+desc+'</div>';
      //var visit_div='<div class="url_div"><span id="web_link" data-t="visit_web"></span></div>';
     // var video='<div class="wrapper"><div class="h_iframe"><img class="ratio" src="http://placehold.it/16x9/f9f9f9"/>'+
        iframe+
        '</div></div>';
      return "<div>"+
              image_div+
              '<div class="new_central_div">'+
                  title_div+
                   '<div class="line-separator"></div>'+
               '<div class="info_div">'+
                  iturri_div+
                  tags_div+
                 
                  '</div>'+
                  '<div class="line-separator"></div>'+
                  desc_div+
                  '<a href="#" class="ui-btn video_player ui-btn-inline" id="see_video" data-t="see_video"/>'+
                  //video+
                 // '<a href="#" class="ui-btn visit_web ui-btn-inline" id="web_link" data-t="visit_web"/>'+
                '</div>'+
                '</div>';

    },
    SelectionItem:function(list)
    {
      var result="<b>Aukeratu berri nagusia</b></br>";
      for(var i=0; i<list.length;i++)
      {
        
        if(list[i].model==="artikulua.artikulua" ||list[i].model==="audio_bideo.bideoa")
          result= result+'<input type="checkbox" class="example" value="'+i+'" />'+list[i].fields.title+'</br>';
        else 
        {

          result= result+'<input type="checkbox" class="example" value="'+i+'" />'+list[i].fields.title_eu+'</br>';
        }
      }
      return result;
    }

   
    
    
  

  }// FINAL VARAIBLE DOM

/*FUNCIONES SLIDER*/
function getSlides()
{
  var result="";
  var fs_result="";
  for(var i=0; i<selected_new.fields.photos.length; i++)
  {
    var id="slide-"+i;
    var fid="fslide-"+i;
    fs_result=fs_result+'<div class="full-slide swiper-slide"><div class="swiper-zoom-container"><img id='+fid+' /></div></div>';
    result=result+'<div class="swiper-slide img_slide page_slide" id='+id+' ></div>'; //style="background-image:url(http://lorempixel.com/1000/1000/nightlife/1)"
    getSliderImage(selected_new.fields.photos[i],id,fid);
  }
  $("#full_wrapper").append(fs_result);
  return result;
}



function getSliderImage(img_url,div_id,fid)
{
  if(checkConnection()) //Konexioa dugun ala ez ikusten dugu hemen
          {
            
           
            zientziApp.api.getIrudia(img_url)
                .done(function(response) {
                  
                  var imgs = $("<div>" +response +"</div>").find("img");
                  var src=imgs.attr('src');
                  var no_white_url=src.replace(/ /g,'%20').replace("(","%28").replace(")","%29").replace("'","%27");
                  $("#"+fid).attr("src", no_white_url);
                  $("#"+div_id).css("background-image", "url("+no_white_url+")");
              });
        }
}

/* FUNCIONES GENERALES */

function addHeader(title, type) 
{
  var header_type = "dom."+type;
  var header = '<h1 id="page_title">'+title+'</h1>'+eval(header_type);                
  dom.header.empty().append(header).trigger( "updatelayout" );;
  $( "#app_header" ).toolbar();
}

function addPlaceHolder(text, obj) 
{            
  obj.attr("placeholder", text);
}

function clearResults() {
  dom.listmenu.html("");
}

function getCleanDate(value)
{
  var result=value.substr(0,10);
  return result;
}

function getPubli()
{
  var array_publ=JSON.parse(ZientziApp.localStorage.getItem("publizitatea"));
  var random_index=Math.floor(Math.random() * array_publ.length);
  var selected_publi=array_publ[random_index];
  var result='<li><a href="'+selected_publi.visit_url+'"><img class="banner_li" src="'+selected_publi.id+'" border="0" width="100%" height="auto" ></img></a></li>';
  return result;
}

function checkNewsType(element)
{
  var result="article";
 // console.error(element);
  var fields=element.fields;
  if(fields.hasOwnProperty('blipMP3_EU')){
    result="audio";
  }
  else if(fields.hasOwnProperty('blipIframe_eu')){
    result="video";
  }
  else if(element.model==="argazkiak.argazkigaleria")
    result="gallery";
  return result;
}

function getTitle(type,element)
{
  switch(type) {
    case "gallery":
    case "article":
        return element.fields.title;
        break;
    case "audio":
        return element.fields.title;
        break;
    case "video":
        return element.fields.title_eu;
        break;
    
}
}

function getAuthor(array_id)
{
  var result="";
  var all_authors=JSON.parse(ZientziApp.localStorage.getItem("egileak"));
  for(var i=0;i<array_id.length;++i)
  {
   // console.log("id barruan");
    for(var j=0;j<all_authors.length;++j)
    {
      if(array_id[i]==all_authors[j].pk)
      {
        if(result!="")
          result=result+" "+all_authors[j].fields.izena;
        else
          result=all_authors[j].fields.izena;
      }
        
    }
  }
  return result;
}

function getTags(array_id)
{
  var result="";
  var all_tags=JSON.parse(ZientziApp.localStorage.getItem("atalak"));
  for(var i=0;i<array_id.length;++i)
  {
   // console.log("id barruan");
    for(var j=0;j<all_tags.length;++j)
    {
      if(array_id[i]==all_tags[j].pk)
      {
        if(result!="")
          result=result+", "+all_tags[j].fields.title_eu;
        else
          result=all_tags[j].fields.title_eu;
      }
        
    }
  }
  return result;
}

function getDayAgenda(date)
{
  return date.substr(8,2);
}

function getMonthAgenda(date)
{
  var result=date;
  var year=date.substr(0,4);
  var month=date.substr(5,2);
  var day=date.substr(8,2);
  result=["Urtarrila","Otsaila","Martxoa","Apirila","Maiatza","Ekaina","Uztaila","Abuztua","Iraila","Urria","Azaroa","Abendua"][new Date(year,month-1,day).getMonth()];
  return result;
}

function getYearAgenda(date)
{
  var result=date;
  var year=date.substr(0,4);
  return year;
}

function getDayOfTheWeekAgenda(date)
{
      var result=date;
      var year=date.substr(0,4);
      var month=date.substr(5,2);
      var day=date.substr(8,2);
      result=["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"][new Date(year,month-1,day).getDay()];
      return result;
}

function getDayOfTheWeek(date)
{
    //  console.log(date);
      var result=date;
      var year=date.substr(0,4);
      var month=date.substr(5,2);
      var day=date.substr(8,2);
     
        result=["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"][new Date(year,month-1,day).getDay()];
     
      return getCleanDate(date)+" " +result;
}
/* FIN FUNCIONES GENERALES */

/* FUNCIONES RENDER */

function rendenMenuList(array)
{
  clearResults();
  dom.listmenu.empty();
  for(var i=0;i<array.length;++i)
      {
        if(array[i].subcategorias.length!=0 || array[i].pois.length!=0)
        {
          var value=dom.MenuLista(array[i],i);
          dom.listmenu.append(value).hide().fadeIn(300).promise().done();
        }
        
       
      }
  
}

function renderSubcategorieList(array)
{
  $("#subcategorie_list").html("");
  $("#subcategorie_list").empty();
  for(var i=0;i<array.length;++i)
      {
        
        var value=dom.MenuLista(array[i],i);
        $("#subcategorie_list").append(value).hide().fadeIn(300).promise().done();
       
      }
  
}

function renderEventPage()
{
 // console.log("renderEventPage barruan");
  $("#event_content").html("");
  $("#event_content").empty();
  var value=dom.EventPage();
  $("#event_content").append(value).hide().fadeIn(300).promise().done();
}

function renderAgenda(events)
{
 // console.log("renderAgenda barruan");
  $("#event_list").html("");
  $("#event_list").empty();
  for(var i=0;i<events.length;++i)
  {
    var value=dom.EventItem(events[i],i);
    $("#event_list").append(value).hide().fadeIn(300).promise().done(function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
            //  console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
            }
      });
  }
}

function addToAgenda(events)
{
  var to=parseInt(loadEventsToShow());
  var from=to-10;
  for(var i=0;i<events.length;++i)
  {
    var value=dom.EventItem(events[i],from+i);
    $("#event_list").append(value).promise().done( function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
             // console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
              var position=$(window).scrollTop();
              $("html, body").animate({ scrollTop: position+150 },800);
              
            }
      });
  }
}

function renderNews(news)
{
  //console.log("renderNews barruan");
 // console.log(news.length);
  $("#news_list").html("");
  $("#news_list").empty();
  for(var i=0;i<news.length;++i)
  {
    var value=dom.NewItem(news[i],i);
    $("#news_list").append(value).hide().fadeIn(300).promise().done( function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
              //console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
            }
      });
  }
  
}

function addNews(news,from1)
{
 /* console.log("addNews barruan");
  console.log("array luzera: "+from1);*/
  //var data = JSON.parse(ZientziApp.localStorage.getItem("albisteak"));
  var to=parseInt(loadElementsToShow());
  var from=to-10;
  for(var i=0;i<news.length;++i)
  {
    var new_index=from1+i;
   // console.log("index berria: "+new_index);
    var value=dom.NewItem(news[i],from1+i);
    $("#news_list").append(value).promise().done( function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
             // console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
              var position=$(window).scrollTop();
              $("html, body").animate({ scrollTop: position+150 },800);
              
            }
      });
  }
}

function renderNew()
{
 // console.log("renderNew barruan");
  $("#new_content").html("");
  $("#new_content").empty();
  var value=dom.NewPage();
  $("#new_content").append(value).hide().fadeIn(300).promise().done();
}

function renderArticle()
{
 // console.log("renderArticle barruan");
  $("#new_content").html("");
  $("#new_content").empty();
  var value=dom.NewArticle();
  $("#new_content").append(value).hide().fadeIn(300).promise().done();
}

function renderAudio()
{
 // console.log("renderAudio barruan");
  $("#new_content").html("");
  $("#new_content").empty();
  var value=dom.NewAudio();
  $("#new_content").append(value).hide().fadeIn(300).promise().done();
  setTimeout(setSeekBar, 300);
  //setSeekBar();
}

function renderVideo()
{
 /* console.log("renderVideo barruan");
  console.log("renderArticle barruan");*/
  $("#new_content").html("");
  $("#new_content").empty();
  var value=dom.NewVideo();
  $("#new_content").append(value).hide().fadeIn(300).promise().done();
}

function renderGalleryN()
{
 // console.log("renderGallery barruan");
  $("#new_content").html("");
  $("#new_content").empty();
  var value=dom.NewGallery();
  $("#new_content").append(value).hide().fadeIn(300).promise().done(function()
      {
        swiper_page = new Swiper('.page_swiper', {

        pagination: '.page-pagination',

        paginationClickable: true,

        nextButton: '.page-next',

        prevButton: '.page-prev',

        spaceBetween: 30,

        effect: 'fade'

    });

        swiper_full = new Swiper('.full_swiper', {

        zoom: true,

        pagination: '.full-pagination',

        nextButton: '.full-next',

        prevButton: '.full-prev'

    });
      });
  
}

function renderFavList(list)
{
  $("#favs_list").html("");
  $("#favs_list").empty();
  for(var i=0;i<list.length;++i)
  {
    var value=dom.FavItem(list[i],i);
    $("#favs_list").append(value).hide().fadeIn(300).promise().done( function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
              //console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
            }
      });
  }
}

function renderGallery(list)
{
 // console.log("renderGallery barruan");
  $("#gallery_list").html("");
  $("#gallery_list").empty();
  for(var i=0;i<list.length;++i)
  {
    var value=dom.GalItem(list[i],i);
    $("#gallery_list").append(value).hide().fadeIn(300).promise().done( function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
              //console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
            }
      });
  }
}

function addGalleries(list)
{
 // console.log("addGalleries barruan");
  var to=parseInt(loadGalleriesToShow());
  var from=to-10;
  for(var i=0;i<list.length;++i)
  {
    var value=dom.GalItem(list[i],from+i); //NewItem jarri besteen berdina erakusteko
    $("#gallery_list").append(value).promise().done( function()
      {
        var position=loadScrollPosition();
            if(position!=0)
            {
             // console.log("SCROLL-A: "+position);
              $(window).scrollTop(position);
              ZientziApp.sessionStorage.removeItem("scroll_value");
              var position=$(window).scrollTop();
              $("html, body").animate({ scrollTop: position+150 },800);
              
            }
      });
  }
}
function renderArticleOptions(list)
{
  var value=dom.SelectionItem(list); //Article Item berezi bat sortu
  $("#article_list_div").append(value).hide().fadeIn(300).promise().done();
  
}












/* FIN FUNCIONES RENDER */


    return {
      addHeader: addHeader,
      addPlaceHolder:addPlaceHolder,
      renderSubcategorieList:renderSubcategorieList,
      renderEventPage:renderEventPage,
      renderAgenda:renderAgenda,
      renderGallery:renderGallery,
      renderNews:renderNews,
      renderNew:renderNew,
      renderArticle:renderArticle,
      renderAudio:renderAudio,
      renderVideo:renderVideo,
      renderGalleryN:renderGalleryN,
      addNews:addNews,
      addToAgenda:addToAgenda,
      addGalleries:addGalleries,
      renderFavList:renderFavList,
      renderArticleOptions:renderArticleOptions
    }
  }//FIN FUNCTION VIEW

  return View;
}());