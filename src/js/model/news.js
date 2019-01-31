var zientziApp = window.zientziApp || {};
zientziApp.model = zientziApp.model || {};
zientziApp.model.News = (function () {
  'use strict';

  function News(news) {
    this._news = news;
  }

  News.prototype.get = function () {
    return this._news;
  };

  /*Info.prototype.getName = function () {
    return this._data.name;
  };

  Info.prototype.getDesign= function () {
    return this._data.design;
  };

  Info.prototype.getLastVersion= function () {
    return this._data.last_version;
  };

  Info.prototype.getCategories= function () {
    console.log(this._data.categories);
    return this._data.categories;
  };*/

  News.fromJson = function (data) {
    //var json_data = $.xml2json(data);
    //console.log("NEWS MODEL BARRUAN!!");
    return new News(data);
   
  };

  

  return News;
}());
