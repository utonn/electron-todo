const Dispatcher = require('./dispatcher');
const EventEmitter = require('events').EventEmitter;
const Const = require('./const');
const assign = require('object-assign');

var _todos=[{id:'1',text:'hoge'}];

function _createTodo(text){
  // action側でそのままstateに入れるので、idが必要。
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos.push({
    id:id,
    text: text
  });
}

// actionから利用するメソッドを定義
// リスナの登録とデータの取得だけ、なはず。
var TodoStore = assign({}, EventEmitter.prototype,{
  // これ、ここでいいのかなぁ。。。
  emitChange: function(){
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
      _createTodo(val)
      TodoStore.emitChange();
      break;
    default:
  }
});

module.exports = TodoStore;
