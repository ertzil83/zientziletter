/* JS PARA MENU.HTML */

/* VARIABLES */


var page_nagusia = window.zientziApp || {};

page_nagusia.writeBody = function (rootElement) {
  'use strict';

// console.log("Nagusia barruan");
 view = new zientziApp.View(rootElement);
 hideLoading();
  
};

function loadFromServer()
{
  zientziApp.api.getNews()
          .done(function(json_response) {
            console.log("JASOTAKOA");
           // console.log("datuak kargatuta");
           console.log(json_response);
              zientziApp.api.getTags()
                  .done(function(json_response) {
                   // console.log("atalak kargatuta");
                   
                    ZientziApp.localStorage.setItem("atalak",JSON.stringify(json_response.get()));
                    
                    zientziApp.api.getAuthors()
                  .done(function(json_response) {
                   // console.log("egileak kargatuta");
                    ZientziApp.localStorage.setItem("egileak",JSON.stringify(json_response.get()));
                

                    zientziApp.api.getAgenda()
			          .done(function(json_response) {
			           // console.log("datuak kargatuta");
			            events_array=json_response.get();
			            events_array.sort(SortByDate);
			            ZientziApp.localStorage.setItem("agenda",JSON.stringify(events_array));
			            
			           /* zientziApp.api.getWord()
					          .done(function(json_response) {
					            ZientziApp.localStorage.setItem("hitza",JSON.stringify(json_response.get()));
                      asteko_hitza=json_response;
                     
                      var hitza_summary=asteko_hitza._word[0].fields.summary;
                      hitza_text=(hitza_summary.replace(/<[^>]*>/g, "")).replace(/&nbsp;/g," ");
                      
                     //separateInArrays();
                     
					          });*/
			            
			          });
              });
              });
           
            
            news_array=json_response.get();
            ZientziApp.localStorage.setItem("albisteak",JSON.stringify(news_array));
            
            getListOfWeek();
            getMArticleList();
           
            $( document ).ajaxStop(function() {
              $('#createTemplateButton').show();
             // $('#asteko_hitza_info').show();
              $('#main_new_text').show();
              $('#custom_new_text').show();
              hideLoading();
              
            });
          });
}


function getListOfWeek()
{

	var formated_day_end= $.datepicker.formatDate("yy-mm-dd", end);
	var formated_day_start=$.datepicker.formatDate("yy-mm-dd", start);
	
	news_by_day=[];
	for (var i=0; i<news_array.length; i++)
	{
		//console.log(getCleanDate(news_array[i].fields.published_date));
		var date_to_compare=getCleanDate(news_array[i].fields.published_date);
		if(formated_day_start<= date_to_compare && date_to_compare<formated_day_end)
		{
			news_by_day.push(news_array[i]);
		}
	}

  
}

function getListOfEvents()
{
 // console.error("GETLISTOFEVENTS BARRUAN");
  var formated_day_end= $.datepicker.formatDate("yy-mm-dd", end_ag);
  var formated_day_start=$.datepicker.formatDate("yy-mm-dd", start_ag);
  for (var i=0; i<events_array.length; i++)
  {
    //console.log(getCleanDate(news_array[i].fields.published_date));
    var date_to_compare_start=getCleanDate(events_array[i].fields.begin);
    var date_to_compare_end=getCleanDate(events_array[i].fields.end);
    if(formated_day_start<= date_to_compare_end && formated_day_end>date_to_compare_start)
    {
      selected_event_list.push(events_array[i]);
    }
  }
 
}
function getMArticleList()
{
  
  for(var i=0; i<news_by_day.length; i++)
  {
    var berria=news_by_day[i];
 
    
    if(berria.model==="artikulua.artikulua" || berria.model==="multimedia.multimedia" || berria.model==="audio_bideo.bideoa")
      {
        m_article_list.push(berria);
      }
    
  }
  console.log(m_article_list);
  view.renderArticleOptions(m_article_list);
  
}



function updateMainNews(value)
{
  var s_a=m_article_list[value];
  for(var i=0; i<news_by_day.length; i++)
  {
    var berria=news_by_day[i];
    if(berria.pk===s_a.pk)
      {
        main_new=berria;
        index_to_delete=i;
        break;
      }

  }
  news_by_day.splice(index_to_delete,1);
  var photo="";
  if(s_a.model==="artikulua.artikulua")
  {
    main_new_title=s_a.fields.title;
    main_new_url="http://zientzia.eus/artikuluak/"+s_a.fields.slug;
    photo=s_a.fields.photo;
  }
  else if(s_a.model==="audio_bideo.bideoa")
  {
    main_new_title=s_a.fields.title;
      main_new_url=getVideoUrl(s_a);
      photo=s_a.fields.irudia;
  }
  else
  {
     main_new_title=s_a.fields.title_eu;
      main_new_url=getVideoUrl(s_a);
      photo=s_a.fields.irudia;
  }
  showLoading();
  
  zientziApp.api.getIrudia(photo)
          .done(function(response) {
           
            hideLoading();
            var imgs = $("<div>" +response +"</div>").find("img");
            var src=imgs.attr('src');
            main_new_image=src.replace(/ /g,'%20');
            separateInArrays()
            createTemplate();
          });
}

function checkIfCustomIsSelected()
{
  if(custom_main_new_title==="")
    return false;
  else
    return true;
}


function getCleanDate(value)
{
  var result=value.substr(0,10);
  return result;
}

function SortByDate(a, b){
 // console.log(a);
  var aName = a.fields.begin;
  var bName = b.fields.begin; 
  return ((bName < aName) ? -1 : ((bName > aName) ? 1 : 0));
}

function copyToClipboard(text) {
  
  // Create a "hidden" input
  var aux = document.createElement("input");

  // Assign it the value of the specified element
  aux.setAttribute("value",text);

  // Append it to the body
  document.body.appendChild(aux);

  // Highlight its content
  aux.select();

  // Copy the highlighted text
  document.execCommand("copy");

  // Remove it from the body
  document.body.removeChild(aux);
  // console.log("edukia kopiatuta");
  alert("edukiak kopiatuta daude");
}

function toClipBoard()
{
  $('#copyToClipboardButton').show();
  showHideCutomElements();
}
function getFavArticle()
{
  var id= $( "input:checked" ).val();
  updateMainNews(id);
  //return true;
}

function createCustomArticle()
{
  main_new_title=custom_main_new_title;
      main_new_image=custom_main_new_img;
      main_new_url=custom_main_new_url;
      separateInArrays()
      createTemplate();
  //return true;
}

/*function getAstekoHitzaN()
{
  if(!show_week_word)
    return '';
  else
  return '<table class="mcnBoxedTextBlock" style="min-width:100%;" border="0" cellpadding="0" cellspacing="0" width="100%">'+
    '<!--[if gte mso 9]>'+
  '<table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">'+
  '<![endif]-->'+
  '<tbody class="mcnBoxedTextBlockOuter">'+
        '<tr>'+
            '<td class="mcnBoxedTextBlockInner" valign="top">'+
                
        '<!--[if gte mso 9]>'+
        '<td align="center" valign="top" ">'+
        '<![endif]-->'+
                '<table style="min-width:100%;" class="mcnBoxedTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">'+
                    '<tbody><tr>'+
                        
                        '<td style="padding-top:9px;  padding-bottom:9px; ">'+
                        
                            '<table class="mcnTextContentContainer" style="min-width: 100% ! important;background-color: #404040;" border="0" cellspacing="0" width="100%">'+
                                '<tbody><tr>'+
                                    '<td class="mcnTextContent" style="padding: 18px;color: #F2F2F2;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;" valign="top">'+
                                        '<div style="text-align: justify;"><a href="http://zientzia.eus/asteko-hitzak/quasar/" target="_blank"><span style="font-size:14px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">ASTEKO HITZA: '+asteko_hitza._word[0].fields.title+'</span></span></a><br>'+
'<br>'+
'<span style="font-size:12px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">'+hitza_text+'<br>'+
'<br>'+
'<a href="http://zientzia.eus/asteko-hitzak/'+asteko_hitza._word[0].fields.slug+'/" target="_blank">Gehiago irakurri.</a></span></span></div>'+

                                    '</td>'+
                                '</tr>'+
                            '</tbody></table>'+
                        '</td>'+
                    '</tr>'+
                '</tbody></table>'+
        '<!--[if gte mso 9]>'+
        '</td>'+
        '<![endif]-->'+
                
        '<!--[if gte mso 9]>'+
                '</tr>'+
                '</table>'+
        '<![endif]-->'+
            '</td>'+
        '</tr>'+
    '</tbody>'+
'</table>';
}*/

function createTemplate()
{
  
   html_main_new= '   <div style="text-align: center;"><span style="font-size:18px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif"><a href="'+main_new_url+'" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #00aca9!important;font-weight: bold;text-decoration: none;">'+main_new_title+'</a></span></span></div>  '  + 
 '     '  + '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '          <!--[if mso]>  '  + 
 '          </td>  '  + 
 '          <![endif]-->  '  + 
 '                     '  + 
 '          <!--[if mso]>  '  + 
 '          </tr>  '  + 
 '          </table>  '  + 
 '          <![endif]-->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '   </table><table class="mcnCaptionBlock" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '       <tbody class="mcnCaptionBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnCaptionBlockInner" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                     '  + 
 '     '  + 
 '   <table class="mcnCaptionBottomContent" align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '       <tbody><tr>  '  + 
 '           <td class="mcnCaptionBottomImageContent" style="padding: 0 9px 9px 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" align="center" valign="top">  '  + 
 '             '  + 
 '                 '  + 
 '               <a href="'+main_new_url+'" title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                 '  + 
 '     '  + 
 '               <img alt="" src="'+main_new_image+'" style="max-width: 600px;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;vertical-align: bottom;" class="mcnImage" width="564">  '  + 
 '               </a>  '  + 
 '             '  + 
 '           </td>  '  + 
 '       </tr>  '  + 
 '       <tr>  '  + 
 '           <td class="mcnTextContent" style="padding: 0 9px 0 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #000000;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: left;" valign="top" width="564">  '  + 
 '               <div style="text-align: justify;"><span style="font-size:12px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">'+main_new_text+'</span></span></div>  '  + 
 '    ' ; 
  //var ast_hitz_ne=getAstekoHitzaN();
  //html_main_new=html_main_new+ast_hitz_ne;
  generateContentTable(); // HAU DA ALDATU BEHAR DENAAA!!!
}

function isMainArticleSelected()
{
  if((show_week_word && $( "input:checked" ).length===1) ||(!show_week_word && $( "input:checked" ).length===0))
    return false;
  else
    return true;
}

function showHideCutomElements()
{
  if((show_week_word && $( "input:checked" ).length===1) ||(!show_week_word && $( "input:checked" ).length===0))
  {
    $('#custom_new_text').show();
  }
  else
  {
    $('#custom_new_text').hide();
  }
}
function checkIfCustomIsCompleted()
{
  
  if((custom_main_new_title==="")||(custom_main_new_img==="")||(custom_main_new_url===""))
  {
    return false;
  }
  else
    return true;
}


/* EVENTS */

$( document ).off( ".nagusia" )
  

.on("vclick.nagusia", "#loadButton", function(event)
{
  event.preventDefault();
  $('#createTemplateButton').hide();
  $('#copyToClipboardButton').hide();
  $("#content_error").empty();
  selected_day=$("#datepicker").datepicker("getDate");
  var selected_day_init=$("#datepicker").datepicker("getDate");
  var d = new Date(selected_day_init);
 
  // Add weeks to the selected date, multiply with 7 to get days
  start = new Date(d.getFullYear(), d.getMonth(), d.getDate() -6);
  end=new Date(d.getFullYear(), d.getMonth(), d.getDate() +1);
  start_ag=new Date(d.getFullYear(), d.getMonth(), d.getDate());
  end_ag=new Date(d.getFullYear(), d.getMonth(), d.getDate() +7);
  
  if (selected_day==null)
  {
  	alert("Ez duzu egunik aukeratu");
  }
  else
  {
  	showLoading();
  	loadFromServer();
  }
  return false;
}) 

.on("vclick.nagusia", "#createTemplateButton", function(event)
{ 
  event.preventDefault();
  main_new_text=$('.main_new_text_ta').val();
  custom_main_new_title=$('.custom_main_new_text_ta').val();
  custom_main_new_img=$('.custom_main_new_img_ta').val();
  custom_main_new_url=$('.custom_main_new_url_ta').val();
  show_week_word=$('input[name=week_word]').prop('checked');
  if(main_new_text==="")
    alert("Berri nagusiaren laburpenak ezin du hutsik egon");
  else if (!isMainArticleSelected() && !checkIfCustomIsCompleted())
    alert("Berri nagusia aukeratu behar duzu: Zerrendatik bat hatu edo kustomizatuaren atal guztiak bete");
  else if(isMainArticleSelected())
    {
      
      getFavArticle()
      getListOfEvents();
      
    }
  else
  {
    createCustomArticle();
    getListOfEvents();
  }

  
  return false;
})


.on("vclick.nagusia", "#copyToClipboardButton", function(event)
{
  event.preventDefault();
  var generated_end=down_content;
  console.error("EDUKIAK");
  console.error(main_new_url);
  console.error(main_new_title);
  console.error(main_new_image);
  var html_for_mailchimp=getHtmlStart(main_new_image,main_new_desc,main_new_title,main_new_url)+html_main_new+generated_end;
  copyToClipboard(html_for_mailchimp);
  return false;
})
.on("change.nagusia", ".example", function(event)
{
  $('input.example').not(this).prop('checked', false); 
  showHideCutomElements();
})




  
var view;
var selected_day;
var start;
var end;
var start_ag;
var end_age;
var news_by_day=null;
var show_week_word=false;
var main_new_text="";
var custom_main_new_title="";
var custom_main_new_url="";
var custom_main_new_img="";
/* INIT */
page_nagusia.writeBody($(document.body));



