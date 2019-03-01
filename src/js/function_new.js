 
 var table_dividier= '   <table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnDividerBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 5px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                   <table class="mcnDividerContent" style="min-width: 100%;border-top: 1px solid #ededed;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                           <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                               <span></span>  '  + 
 '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '   <!--              '  + 
 '                   <td class="mcnDividerBlockInner" style="padding: 18px;">  '  + 
 '                   <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />  '  + 
 '   -->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '  </table>  ' ; 

 

 function generateContentTable()
 {
    //separateInArrays();
    getImagesFromSource();
    $( document ).ajaxStop(function() {
             /* console.log("IRUDIAK");
              console.log(image_sources);*/
              down_content=getDownContent(getTableContent(),getEventRowList());
              
              toClipBoard();
            });
 }

 function separateInArrays()
 {
  for(var i=0; i< news_by_day.length;i++)
  {
    if(news_by_day[i].model==="artikulua.artikulua")
      mailc_articles_array.push(news_by_day[i]);
    else if (news_by_day[i].model==="multimedia.multimedia")
      mailc_videos_array.push(news_by_day[i]);
    else
      mailc_audios_array.push(news_by_day[i]);
  }
  console.log("separateInArrays barruan");
 }

 function getImagesFromSource()
 {
  var total_elemts=mailc_articles_array.length +mailc_videos_array.length;
  var image_index=0; 
  image_sources=new Array(total_elemts);
  for (var i=0;i<mailc_articles_array.length; i++)
  {
    if(mailc_articles_array[i].fields.photo !=null)
    {
      completeImageArray(image_index, mailc_articles_array[i].fields.photo);
      image_index++;
    }
    else
    {
      image_sources[image_index]="https://filosofia.laguia2000.com/wp-content/uploads/2012/02/Ciencia.jpg";
      image_index++;
      
    }
    
  }
  for (var i=0;i<mailc_videos_array.length; i++)
  {
    completeImageArray(image_index, mailc_videos_array[i].fields.irudia)
    image_index++;
  }
 }

 function completeImageArray(index, image_id)
 {
  image_sources[index]="";
  /*  zientziApp.api.getIrudia(image_id)
          .done(function(response) {
            //console.log(response);
            var imgs = $("<div>" +response +"</div>").find("img");
            var img_src=imgs.attr('src');
            image_sources[index]=img_src.replace(/ /g,'%20');
          });*/
 }

 function getTableContent()
 {
  var total_elemts=mailc_articles_array.length +mailc_videos_array.length; 
  left_table_content="";
  
  /*right_table_content='   <table class="mcnBoxedTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <!--[if gte mso 9]>  '  + 
 '    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">  '  + 
 '    <![endif]-->  '  + 
 '    <tbody class="mcnBoxedTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnBoxedTextBlockInner" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                     '  + 
 '          <!--[if gte mso 9]>  '  + 
 '          <td align="center" valign="top" ">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnBoxedTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td style="padding-top: 9px;padding-left: 18px;padding-bottom: 9px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                             '  + 
 '                               <table class="mcnTextContentContainer" style="min-width: 100% ! important;background-color: #404040;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellspacing="0" width="100%">  '  + 
 '                                   <tbody><tr>  '  + 
 '                                       <td class="mcnTextContent" style="padding: 18px;color: #F2F2F2;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;" valign="top">  '  + 
 '                                           <div style="text-align: center;"><a href="http://zientzia.eus/asteko-hitzak/'+asteko_hitza._word[0].fields.slug+'"" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: none;"><span style="font-size:14px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">ASTEKO HITZA: '+asteko_hitza._word[0].fields.title+'</span></span></a></div>  '  + 
 '     '  + 
 '   <div style="text-align: justify;"><br>  '  + 
 '   <span style="font-family:arial,helvetica neue,helvetica,sans-serif"><span style="font-size:12px">'+hitza_text+'</span></span></div>  '  + 
 '     '  + 
 '                                       </td>  '  + 
 '                                   </tr>  '  + 
 '                               </tbody></table>  '  + 
 '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '          <!--[if gte mso 9]>  '  + 
 '          </td>  '  + 
 '          <![endif]-->  '  + 
 '                     '  + 
 '          <!--[if gte mso 9]>  '  + 
 '                   </tr>  '  + 
 '                   </table>  '  + 
 '          <![endif]-->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '  </table>  ' ; */
  //var bool=true;
  for (var index=0; index<total_elemts;index++)
  {
    var selected_element=selectElement();
   
      var row="";
      row=leftSide(selected_element,index);
    
        left_table_content=left_table_content+row +table_dividier;
     
  }
  
  for(var index=0; index< mailc_audios_array.length; index++)
  {
    var aux_aud_row=getAudioRow(mailc_audios_array[index]);
    
    var audio_row_t=aux_aud_row;
     
        if(index!=mailc_audios_array.length-1)
          left_table_content=left_table_content+audio_row_t +table_dividier;
        else
          left_table_content=left_table_content+audio_row_t
    
    
  }

  var left_table=   '   <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="columnWrapper" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                      <tbody><tr>  '  + 
 '                        <td valign="top" class="columnContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">'+
left_table_content+
'</td>  '  + 
 '                      </tr>  '  + 
 '                    </tbody></table>  ' ;

 var right_table=   '   <table align="left" border="0" cellpadding="0" cellspacing="0" width="300" class="columnWrapper" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                      <tbody><tr>  '  + 
 '                        <td valign="top" class="columnContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">'+
right_table_content+
'</td>  '  + 
 '                      </tr>  '  + 
 '                    </tbody></table>  ' ;

 var table_row= '   <tr>  '  + 
 '                  <td valign="top" id="templateColumns" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;">  '  + 
  left_table+
 // right_table+
 '                  </td>  '  + 
 '                </tr>  ' ; 
 
 return table_row;

 }
 function rightSide(element,index)
 {
 // console.error(element);
  var title="";
  if (element.model==="multimedia.multimedia")
    title="BIDEOA "+element.fields.title_eu;
  else
    title=element.fields.title;
    var url="http://zientzia.eus/artikuluak/"+element.fields.slug;
    return getRow(title, url,index);
 }

 function leftSide(element,index)
 {
  //console.error(element);

  var title="";
  var url="";
  if (element.model==="multimedia.multimedia")
  {
    title="BIDEOA "+element.fields.title_eu;
    url=getVideoUrl(element);
  }
  else
  {
    title=element.fields.title;
    url="http://zientzia.eus/artikuluak/"+element.fields.slug;
  }
    
    return getRow(title, url,index);
 }

function getVideoUrl(vid)
{
  var iframe= vid.fields.blipIframe_eu;
  var imgs = $("<div>" +iframe +"</div>").find("iframe");
  var src=imgs.attr('src');
  var res = src.replace("screen", "screenview");
  
  return res;
}

 function getRow(t,u,i)
 {
  var image=image_sources[i];
  
 var table_element='<table width="100%" class="mcnCaptionBlock" border="0" cellspacing="0" cellpadding="0">'+
    '<tbody class="mcnCaptionBlockOuter">'+
        '<tr>'+
            '<td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">'+
'<table width="100%" class="mcnCaptionRightContentOuter" border="0" cellspacing="0" cellpadding="0">'+
    '<tbody><tr>'+
        '<td class="mcnCaptionRightContentInner" valign="top" style="padding:0 9px ;">'+
            '<table width="76" align="left"  class="mcnCaptionRightImageContentContainer" border="0" cellspacing="0" cellpadding="0">'+
                '<tbody><tr>'+
                    '<td align="left" class="mcnCaptionRightImageContent" valign="top">'+
                    
                        
                        '<a title="" href="'+u+'" target="_blank">'+
                        

                        '<img  style="border-radius: 0%;object-fit: cover;width: 76px;height: 76px;" class="mcnImage" style="max-width:700px;" alt="" src="'+image+'">'+
                        '</a>'+

                    
                    '</td>'+
                '</tr>'+
            '</tbody></table>'+
            '<table width="auto"  class="mcnCaptionRightTextContentContainer" border="0" cellspacing="0" cellpadding="0">'+
                '<tbody><tr>'+
                    '<td class="mcnTextContent" valign="top" style="text-align: left; line-height: 200%; padding-left: 10px;">'+
                        '<span style="font-size:14px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif"><a href="'+u+'">'+t+'</a></span></span>'+
                    '</td>'+
                '</tr>'+
            '</tbody></table>'+
        '</td>'+
    '</tr>'+
'</tbody></table>'+
 '</td>'+
        '</tr>'+
    '</tbody>'+
'</table>';

 return table_element;
 }

 function selectElement()
 {
    var value;

    if (mailc_articles_array.length!=0)
    {
      value=mailc_articles_array[0];
      mailc_articles_array.splice(0,1);
    }
    else
    {
      value=mailc_videos_array[0];
      mailc_videos_array.splice(0,1);
    }
  return value;
  
 }


 function getAudioRow(element)
 {
  //console.log(element);
  var title=element.fields.title;
  var url= element.fields.blipURL_EU;
  return audio_row= '   <table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                  <!--[if mso]>  '  + 
 '          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">  '  + 
 '          <tr>  '  + 
 '          <![endif]-->  '  + 
 '              '  + 
 '          <!--[if mso]>  '  + 
 '          <td valign="top" width="300" style="width:300px;">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #000000;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: left;" valign="top">  '  + 
 '                             '  + 
 '                               <a href="'+url+'" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: none;"><span style="font-size:14px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">AUDIOA: '+title+'</span></span></a>  '  + 
 '                           </td>  '  + 
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
 '  </table>  ' ; 
 }

 function getEventRowList()
 {
  var row_block="";
 // console.log("GET EVENT ROW LIST: "+selected_event_list.length);
  for (var i=0; i<selected_event_list.length; i++)
  {
    row_block=row_block + getEventRow(selected_event_list[i])+table_dividier;
  }
  return row_block;
 }

 function getEventRow(event)
 {
  var title=event.fields.title;
  var place='; '+event.fields.place;
  var date=getEventDateForRow(event);
  var url="http://zientzia.eus/agenda/"+event.fields.slug;
  return  '   <table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                  <!--[if mso]>  '  + 
 '          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">  '  + 
 '          <tr>  '  + 
 '          <![endif]-->  '  + 
 '              '  + 
 '          <!--[if mso]>  '  + 
 '          <td valign="top" width="600" style="width:600px;">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #000000;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: left;" valign="top">  '  + 
 '                             '  + 
 '                               <a href="'+url+'" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: none;"><span style="font-size:14px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">'+title+'</span></span></a><br>  '  + 
 '   <strong><span style="font-size:12px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">'+date+' '+place+'</span></span></strong>  '  + 
 '                           </td>  '  + 
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
 '  </table>  ' ; 
 }

 function getEventDateForRow(event)
 {
   if (getCleanDate(event.fields.begin)===getCleanDate(event.fields.end))
    return event.fields.begin;
   else
   {
    return getCleanDate(event.fields.begin) +' - '+getCleanDate(event.fields.end);
   }
 }

 function getDownContent(table_content_row,event_content_row)
 {
  return '   </td>  '  + 
 '       </tr>  '  + 
 '   </tbody></table>  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '   </table><table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnDividerBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 5px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                   <table class="mcnDividerContent" style="min-width: 100%;border-top: 1px solid #999999;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                           <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                               <span></span>  '  + 
 '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '   <!--              '  + 
 '                   <td class="mcnDividerBlockInner" style="padding: 18px;">  '  + 
 '                   <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />  '  + 
 '   -->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '   </table></td>  '  + 
 '                </tr>  '  + 
 table_content_row+ 
 '                <tr>  '  + 
 '                  <td valign="top" id="templateLowerBody" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 2px none #EAEAEA;padding-top: 0;padding-bottom: 9px;"><table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnDividerBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px 18px 2px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                   <table class="mcnDividerContent" style="min-width: 100%;border-top: 1px solid #999999;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                           <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                               <span></span>  '  + 
 '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '   <!--              '  + 
 '                   <td class="mcnDividerBlockInner" style="padding: 18px;">  '  + 
 '                   <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />  '  + 
 '   -->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '   </table><table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                  <!--[if mso]>  '  + 
 '          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">  '  + 
 '          <tr>  '  + 
 '          <![endif]-->  '  + 
 '              '  + 
 '          <!--[if mso]>  '  + 
 '          <td valign="top" width="600" style="width:600px;">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #000000;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: left;" valign="top">  '  + 
 '                             '  + 
 '                               <span style="font-size:18px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">AGENDA</span></span>  '  + 
 '                           </td>  '  + 
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
 '   </table><table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnDividerBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 2px 18px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                   <table class="mcnDividerContent" style="min-width: 100%;border-top: 1px solid #999999;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                           <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                               <span></span>  '  + 
 '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '   <!--              '  + 
 '                   <td class="mcnDividerBlockInner" style="padding: 18px;">  '  + 
 '                   <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />  '  + 
 '   -->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '   </table>'+

event_content_row+
 '</td>  '  + 
 '                </tr>  '  + 
 '                <tr>  '  + 
 '                  <td valign="top" id="templateFooter" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;"><table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                  <!--[if mso]>  '  + 
 '          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">  '  + 
 '          <tr>  '  + 
 '          <![endif]-->  '  + 
 '              '  + 
 '          <!--[if mso]>  '  + 
 '          <td valign="top" width="600" style="width:600px;">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #656565;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;" valign="top">  '  + 
 '                             '  + 
 '                               <div style="text-align: center;"><span style="font-size:12px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif"><span style="color:#000000">Buletina gehiago jaso nahi ez baduzu, </span><a href="*|UNSUB|*" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: underline;">harpidetza eten</a><br>  '  + 
 '   <span style="color:#000000">Buletina lagun batek berbidali badizu, </span><a href="http://zientzia.eus/harpidetu-buletinera/" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: underline;">harpidedun egin</a></span></span></div>  '  + 
 '     '  + 
 '                           </td>  '  + 
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
 '   </table><table class="mcnBoxedTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <!--[if gte mso 9]>  '  + 
 '    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">  '  + 
 '    <![endif]-->  '  + 
 '    <tbody class="mcnBoxedTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnBoxedTextBlockInner" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                     '  + 
 '          <!--[if gte mso 9]>  '  + 
 '          <td align="center" valign="top" ">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnBoxedTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td style="padding-top: 9px;padding-left: 18px;padding-bottom: 9px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  '  + 
 '                             '  + 
 '                               <table class="mcnTextContentContainer" style="min-width: 100% ! important;background-color: #000000;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellspacing="0" width="100%">  '  + 
 '                                   <tbody><tr>  '  + 
 '                                       <td class="mcnTextContent" style="padding: 18px;color: #F2F2F2;font-family: Helvetica;font-size: 12px;font-weight: normal;line-height: 18px;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;" valign="top">  '  + 
 '                                           <div style="text-align: center;"><a href="http://zientzia.eus/honi-buruz/nor-gara" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: underline;">Nor gara</a>     <a href="https://www.elhuyar.eus/" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: underline;">Elhuyar</a>     <a href="mailto:zientzia@elhuyar.com" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: underline;">Kontaktua</a></div>  '  + 
 '     '  + 
 '                                       </td>  '  + 
 '                                   </tr>  '  + 
 '                               </tbody></table>  '  + 
 '                           </td>  '  + 
 '                       </tr>  '  + 
 '                   </tbody></table>  '  + 
 '          <!--[if gte mso 9]>  '  + 
 '          </td>  '  + 
 '          <![endif]-->  '  + 
 '                     '  + 
 '          <!--[if gte mso 9]>  '  + 
 '                   </tr>  '  + 
 '                   </table>  '  + 
 '          <![endif]-->  '  + 
 '               </td>  '  + 
 '           </tr>  '  + 
 '       </tbody>  '  + 
 '   </table><table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                  <!--[if mso]>  '  + 
 '          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">  '  + 
 '          <tr>  '  + 
 '          <![endif]-->  '  + 
 '              '  + 
 '          <!--[if mso]>  '  + 
 '          <td valign="top" width="600" style="width:600px;">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #656565;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;" valign="top">  '  + 
 '                             '  + 
 '                               <p style="color: #666666;font-size: 11px;text-align: center;font-family: Verdana,Arial,Helvetica,sans-serif;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 150%;"><span style="font-size:10px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">Datu Pertsonalak Babesteari buruzko abenduaren 13ko 15/1999 Lege Organikoan xedatzen dena betez, zure datu pertsonalak “KOLABORATZAILEAK” fitxategian sartuta daudela aitortzen dugu. Horren helburua da elkarlana sustatzea, ikerketen eta zientzia-dibulgazioaren berri ematea eta euskararen normalizazioa bultzatzea. Datu horiek marketin-enpresei laga ahal zaizkie .Fitxategia Datuak Babesteko Agentzian erregistratu dugu, eta datuen segurtasuna bermatzeko neurriak ezarri ditugu.</span></span></p>  '  + 
 '     '  + 
 '   <p style="color: #666666;font-size: 11px;text-align: center;font-family: Verdana,Arial,Helvetica,sans-serif;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 150%;"><span style="font-size:10px"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">Fitxategi horien erantzulea ELHUYAR FUNDAZIOA bera da, eta, nahi izanez gero, aipatutako Legean aurreikusitako sarbide-, zuzenketa-, ezeztapen- eta aurkaritza-eskubideak balia ditzakezu; horretarako, eskaera bat bidali behar duzu <a href="mailto:datuensegurtasuna@elhuyar.eus" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #ff9a00;font-weight: bold;text-decoration: underline;">datuensegurtasuna@elhuyar.eus </a>helbidera, NANaren kopiarekin edo nortasuna egiaztatzeko beste agiri batekin batera.</span></span></p>  '  + 
 '     '  + 
 '                           </td>  '  + 
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
 '   </table><table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '       <tbody class="mcnTextBlockOuter">  '  + 
 '           <tr>  '  + 
 '               <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">  '  + 
 '                  <!--[if mso]>  '  + 
 '          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">  '  + 
 '          <tr>  '  + 
 '          <![endif]-->  '  + 
 '              '  + 
 '          <!--[if mso]>  '  + 
 '          <td valign="top" width="600" style="width:600px;">  '  + 
 '          <![endif]-->  '  + 
 '                   <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="100%">  '  + 
 '                       <tbody><tr>  '  + 
 '                             '  + 
 '                           <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #656565;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;" valign="top">  '  + 
 '                             '  + 
 '                               *|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*  '  + 
 '                           </td>  '  + 
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
 '   </table></td>  '  + 
 '                </tr>  '  + 
 '              </table>  '  + 
 '              <!--[if (gte mso 9)|(IE)]>  '  + 
 '              </td>  '  + 
 '              </tr>  '  + 
 '              </table>  '  + 
 '              <![endif]-->  '  + 
 '              <!-- // END TEMPLATE -->  '  + 
 '                       </td>  '  + 
 '                   </tr>  '  + 
 '               </table>  '  + 
 '           </center>  '  + 
 '       </body>  '  + 
 '   </html>  '  + 
 '     '  + 
 '    ' ; 

 }