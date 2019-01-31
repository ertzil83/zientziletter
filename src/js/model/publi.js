var zientziApp = window.zientziApp || {};
zientziApp.model = zientziApp.model || {};
zientziApp.model.Publi = (function () {
  'use strict';

  function Publi(publi) {
    this._publi = publi;
  }

  Publi.prototype.get = function () {
    return this._publi;
  };

 

  Publi.fromJson = function (data) {
    //var json_data = $.xml2json(data);
    //console.log("Publi MODEL BARRUAN!!");
    return new Publi(data);
   
  };

  

  return Publi;
}());
