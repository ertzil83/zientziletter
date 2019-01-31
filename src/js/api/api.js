var zientziApp = window.zientziApp || {};
zientziApp.api = (function () {
  'use strict';

  var api = 
  {

    getNews:function()
    {
      return ZientziApp.connection.getNewsInfo()
          .then(zientziApp.model.News.fromJson);
    },

    getAgenda:function()
    {
      return ZientziApp.connection.getAgendaInfo()
          .then(zientziApp.model.Agenda.fromJson);
    },

    getGallery:function()
    {
      return ZientziApp.connection.getGalleryInfo()
          .then(zientziApp.model.News.fromJson);
    },

    getAuthors:function()
    {
      return ZientziApp.connection.getAuthorsInfo()
          .then(zientziApp.model.Authors.fromJson);
    },

    getTags:function()
    {
      return ZientziApp.connection.getTagsInfo()
          .then(zientziApp.model.Tags.fromJson);
    },

    getIrudia:function(id)
    {
      return ZientziApp.connection.getImage(id);
          
    },

     getPubli:function()
    {
      return ZientziApp.connection.getPubli()
        .then(zientziApp.model.Publi.fromJson);
          
    },
    getWord:function()
    {
      return ZientziApp.connection.getWord()
        .then(zientziApp.model.Word.fromJson);
    }

    


  };

  return api;
}());




