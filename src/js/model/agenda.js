var zientziApp = window.zientziApp || {};
zientziApp.model = zientziApp.model || {};
zientziApp.model.Agenda = (function () {
  'use strict';

  function Agenda(events) {
    this.events = events;
  }

  Agenda.prototype.get = function () {
    return this.events;
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

  Agenda.fromJson = function (data) {
    //var json_data = $.xml2json(data);
    //console.log("NEWS MODEL BARRUAN!!");
    return new Agenda(data);
   
  };

  

  return Agenda;
}());