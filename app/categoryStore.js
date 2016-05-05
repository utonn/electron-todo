"use strict";

const Dispatcher = require('./dispatcher');
const EventEmitter = require('events').EventEmitter;
const Const = require('./const');
const assign = require('object-assign');

const fs = require("fs");

const DATA_FILE='./datafile_category.json';

var _categories = [];
(function(){
  _categories = JSON.parse(fs.readFileSync(DATA_FILE).toString() || '[]')
})();

function _create(text){
  // action側でそのままstateに入れるので、idが必要。
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _categories.push({
    id:id,
    text: text
  });
}

function _remove(id){
  if(!id) return;
  _categories = _categories.filter(function(v){ return v.id != id });
}

function _reorder(id,newOrder){
  var target;
  var newCategories = _categories.filter(function(v){
    if(v.id == id) {
      target = v;
      return false;
    }
    return true;
  });
  newCategories.splice(newOrder,0,target);
  _categories = newCategories;
}

// actionから利用するメソッドを定義
// リスナの登録とデータの取得だけ、なはず。
var CategoryStore = assign({}, EventEmitter.prototype,{
  // これ、ここでいいのかなぁ。。。
  emitChange: function(){
    fs.writeFileSync(DATA_FILE,JSON.stringify(_categories));
    this.emit("change")
  },
  onChange(callback){
    this.on("change",callback);
  },
  getAll: function(){
    return _categories;
  }
});

// dispatcherの監視。actionTypeによって処理を分ける。
Dispatcher.register(function(action){
  switch (action.actionType) {
    case Const.ADD_CATEGORY:
      var val = action.text;
      _create(val);
      TodoStore.emitChange();
      break;
    case Const.REMOVE_CATEGORY:
      var id = action.id;
      _remove(id);
      TodoStore.emitChange();
      break;
    case Const.REORDER_CATEGORY:
      _reorder(action.id,action.newOrder);
      TodoStore.emitChange();
    default:
  }
});

module.exports = CategoryStore;
