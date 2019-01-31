ZientziApp.LocalStorage = function( domain){
    this.username = domain + "**" + "_";
}

ZientziApp.SessionStorage = function( domain){
    this.username = domain + "**" + "_";
}

ZientziApp.LocalStorage.prototype.setItem = function(key, value) {
	localStorage.setItem(this.username + key, value);
}

ZientziApp.LocalStorage.prototype.getItem = function(key) {
    return localStorage.getItem(this.username + key)
}

ZientziApp.LocalStorage.prototype.removeItem = function(key) {
    localStorage.removeItem(this.username + key)
}

ZientziApp.SessionStorage.prototype.setItem = function(key, value) {
    sessionStorage.setItem(this.username + key, value);
}

ZientziApp.SessionStorage.prototype.getItem = function(key) {
    return sessionStorage.getItem(this.username + key)
}

ZientziApp.SessionStorage.prototype.removeItem = function(key) {
    sessionStorage.removeItem(this.username + key)
}