const Dispatcher = require('./dispatcher');
const EventEmitter = require('events').EventEmitter;
const Const = require('./const');
const assign = require('object-assign');
const storage = require('electron-json-storage');

const fs = require("fs")

const DATA_FILE='./datafile.json';

var _todos = [];
(function(){
  _todos = JSON.parse(fs.readFileSync(DATA_FILE).toString() || '[]')
})();



function _createTodo(text){
  // action側でそのままstateに入れるので、idが必要。
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos.push({
    id:id,
    text: text
  });
}

function _removeTodo(id){
  if(!id) return;
  _todos = _todos.filter(function(v){ return v.id != id });
}

function _reorder(id,newOrder){
  var target;
  var newTodos = _todos.filter(function(v){
    if(v.id == id) {
      target = v;
      return false;
    }
    return true;
  });
  newTodos.splice(newOrder,0,target);
  _todos = newTodos;
}

// actionから利用するメソッドを定義
// リスナの登録とデータの取得だけ、なはず。
var TodoStore = assign({}, EventEmitter.prototype,{
  // これ、ここでいいのかなぁ。。。
  emitChange: function(){
    fs.writeFileSync(DATA_FILE,JSON.stringify(_todos));
    this.emit("change")
  },
  onChange(callback){
    this.on("change",callback);
  },
  getAll: function(){
    return _todos;
  }
});

// dispatcherの監視。actionTypeによって処理を分ける。
Dispatcher.register(function(action){
  switch (action.actionType) {
    case Const.ADD_TODO:
      var val = action.text;
      _createTodo(val);
      TodoStore.emitChange();
      break;
    case Const.REMOVE_TODO:
      var id = action.id;
      _removeTodo(id);
      TodoStore.emitChange();
      break;
    case Const.REORDER_TODO:
      _reorder(action.id,action.newOrder);
      TodoStore.emitChange();
    default:
  }
});

module.exports = TodoStore;
