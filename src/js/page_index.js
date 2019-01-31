/* JS PARA INDEX.HTML */

/* VARIABLES */

var index = window.jqueryAdApp || {};

index.init = function () {
  'use strict';
  console.log("index.js barruan");
  gb_isPageIndexShowed = true;
  loadTemplate("INIT");

};

/* EVENTS */
$( document ).off( ".index" )

  .on( "pagebeforecreate.index", "#page_index", function()
  {
    index.init();
  })