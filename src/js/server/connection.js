

ZientziApp.Connection = function(networFailureAlert) {
    var $data = null;
    this.networFailureAlert = networFailureAlert;
}

ZientziApp.Connection.prototype._serverCall = function(url, data, contentType, timeout) {
    var self = this;
    
   // showLoading();
    
    var method = data ? "POST" : "GET";

    var options = { type: method, data: data, dataType: 'json',  timeout: timeout != undefined? timeout : 15000 };

    var promise = $.ajax( url,  options)
    .fail(function( jqXHR, textStatus, errorThrown)
    {
        console.log(errorThrown);
        self.networFailureAlert();
       // hideLoading();
    })
    .always(function()
    {
       // hideLoading();
    });

   // hideLoading();
    return promise;
}



ZientziApp.Connection.prototype._imgServerCall = function(url, data, contentType, timeout) {
    var self = this;
    
    showLoading();
    
    var method = data ? "POST" : "GET";

    var options = { type: method, data: data, dataType: 'json',  timeout: timeout != undefined? timeout : 15000 };

    var promise = $.ajax( url,  options)
    .fail(function( jqXHR, textStatus, errorThrown)
    {
        console.log(errorThrown);
        //self.serviceFailureAlert();
        hideLoading();
    })
    .always(function()
    {
        //hideLoading();
    });


    return promise;

   
}



ZientziApp.Connection.prototype.getNewsInfo = function() {
    return this._serverCall(URL_INFO_NEWS); 
}
ZientziApp.Connection.prototype.getAuthorsInfo = function() {
    return this._serverCall(URL_AUTHORS); 
}
ZientziApp.Connection.prototype.getTagsInfo = function() {
    return this._serverCall(URL_TAGS); 
}
ZientziApp.Connection.prototype.getWord = function() {
    return this._serverCall(URL_WEEK_WORD); 
}
ZientziApp.Connection.prototype.getImage = function(id) {
    var url=URL_IMG+id;
    return this._imgServerCall(url); 
}
ZientziApp.Connection.prototype.getPubli = function() {
    return this._serverCall(URL_PUBLI); 
}
ZientziApp.Connection.prototype.getAgendaInfo = function() {
    return this._serverCall(URL_INFO_AGENDA); 
}

ZientziApp.Connection.prototype.getGalleryInfo = function() {
    return this._serverCall(URL_GALLERY); 
}







