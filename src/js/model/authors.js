var zientziApp = window.zientziApp || {};
zientziApp.model = zientziApp.model || {};
zientziApp.model.Authors = (function () {
  'use strict';

  function Authors(authors) {
    this._authors = authors;
  }

  Authors.prototype.get = function () {
    return this._authors;
  };

  

  Authors.fromJson = function (data) {
    //var json_data = $.xml2json(data);
    //console.log("AUTHORS MODEL BARRUAN!!");
    return new Authors(data);
   
  };

  

  return Authors;
}());
