var zientziApp = window.zientziApp || {};
zientziApp.model = zientziApp.model || {};
zientziApp.model.Word = (function () {
  'use strict';

  function Word(word) {
    this._word = word;
  }

  Word.prototype.get = function () {
    return this._word;
  };

  

  Word.fromJson = function (data) {
    //var json_data = $.xml2json(data);
    //console.log("Word MODEL BARRUAN!!");
    return new Word(data);
   
  };

  

  return Word;
}());
