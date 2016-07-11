define(["jquery","underscore"],function(a,b){"use strict";return{defaults:{options:{config:{}},templates:{url:"/admin/api/articles<% if (!!id) { %>/<%= id %><% } %>?locale=<%= locale %>"},translations:{headline:"sulu_article.edit.title"}},header:function(){var a={save:{parent:"saveWithOptions"},template:{options:{dropdownOptions:{url:"/admin/articles/templates?type="+(this.options.type||this.data.type),callback:function(a){this.template=a.template,this.sandbox.emit("sulu.tab.template-change",a)}.bind(this)}}}};return this.options.id&&(a["delete"]={}),{tabs:{url:"/admin/content-navigations?alias=article",options:{data:function(){return this.sandbox.util.deepCopy(this.data)}.bind(this),url:function(){return this.templates.url({id:this.options.id,locale:this.options.locale})}.bind(this),config:this.options.config},componentOptions:{values:this.data}},toolbar:{buttons:a}}},initialize:function(){this.saveState="disabled",this.bindCustomEvents()},bindCustomEvents:function(){this.sandbox.on("sulu.header.back",this.toList.bind(this)),this.sandbox.on("sulu.tab.dirty",this.enableSave.bind(this)),this.sandbox.on("sulu.toolbar.save",this.save.bind(this)),this.sandbox.on("sulu.toolbar.delete",this.deleteItem.bind(this)),this.sandbox.on("sulu.tab.data-changed",this.setData.bind(this)),this.sandbox.on("sulu.header.language-changed",function(a){this.sandbox.sulu.saveUserSetting(this.options.config.settingsKey,a.id),this.toEdit(a.id)}.bind(this))},deleteItem:function(){this.sandbox.util.save("/admin/api/articles/"+this.options.id,"DELETE").then(function(){this.toList()}.bind(this))},toEdit:function(a,b){this.sandbox.emit("sulu.router.navigate","articles/"+(a||this.options.locale)+"/edit:"+(b||this.options.id),!0,!0)},toList:function(){1===this.options.config.types.length?this.sandbox.emit("sulu.router.navigate","articles/"+this.options.locale):this.sandbox.emit("sulu.router.navigate","articles:"+(this.options.type||this.data.type)+"/"+this.options.locale)},toAdd:function(){1===this.options.config.types.length?this.sandbox.emit("sulu.router.navigate","articles/"+this.options.locale+"/add",!0,!0):this.sandbox.emit("sulu.router.navigate","articles/"+this.options.locale+"/add:"+(this.options.type||this.data.type),!0,!0)},save:function(a){this.loadingSave(),this.saveTab().then(function(b){this.afterSave(a,b)}.bind(this))},setData:function(a){this.data=a},saveTab:function(){var b=a.Deferred();return this.sandbox.once("sulu.tab.saved",function(a){this.setData(a),b.resolve(a)}.bind(this)),this.sandbox.emit("sulu.tab.save"),b},enableSave:function(a){(a||"loading"!==this.saveState)&&(this.saveState="enabled",this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1))},disableSave:function(a){(a||"loading"!==this.saveState)&&(this.saveState="disabled",this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0))},loadingSave:function(){this.saveState="loading",this.sandbox.emit("sulu.header.toolbar.item.loading","save")},afterSave:function(a,b){this.disableSave(!0),this.sandbox.emit("sulu.header.saved",b),"back"===a?this.toList():"new"===a?this.toAdd():this.options.id||this.toEdit(this.options.locale,b.id)},loadComponentData:function(){var c=a.Deferred();return this.options.id?(this.sandbox.util.load(b.template(this.defaults.templates.url,{id:this.options.id,locale:this.options.locale})).done(function(a){c.resolve(a)}),c):(c.resolve({}),c)}}});