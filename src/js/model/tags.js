var zientziApp = window.zientziApp || {};
zientziApp.model = zientziApp.model || {};
zientziApp.model.Tags = (function () {
  'use strict';

  function Tags(tags) {
    this._tags = tags;
  }

  Tags.prototype.get = function () {
    return this._tags;
  };

 

  Tags.fromJson = function (data) {
    //var json_data = $.xml2json(data);
    //console.log("Tags MODEL BARRUAN!!");
    return new Tags(data);
   
  };

  

  return Tags;
}());
