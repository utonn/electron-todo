"use strict";

const React = require("react");
const TodoItem = require("./todoItem");
const todoStore = require("./todoStore");
const Action = require("./action");

(function(){
// module.exportsすることで、require('./todo')的な感じで外部から拾えるようになる
// class hoge extends ... って書き方はES6っぽい。それ以前はReact.createClassっていうの使わなきゃだったとか
// http://blog.koba04.com/post/2015/01/28/published-react-v0.13.0-beta1/
  var ENTER_KEY = 13;

  module.exports = class Todo extends React.Component {

    constructor (prop) {
      super(prop)
      this.state = {
        newTodo: '',
        todos: todoStore.getAll()
      }
    }

    // store監視の登録。render同じくbindbindされないっぽいのでbindして渡す
    componentDidMount(){
      // ストア変更→全TODOリフレッシュ。再描画。
      // なのだが、reactの特性として差分リフレッシュになるので、もんだいない！
      todoStore.onChange(this._refreshAllTodo.bind(this));
    }

    // viewからの呼び出しメソッド
    // 新規用textのvalueがstateになってるので、都度書き換えてあげないとずっと変わらないという…
    handleChange (event) {
      this.setState({newTodo: event.target.value});
    }

    // エンターで登録！
    handleNewTodoKeyDown (event) {
      if (event.keyCode !== ENTER_KEY) {
        return;
      }
      event.preventDefault();

      var val = this.state.newTodo.trim();

      // storeは直接呼ばないで、actionを呼ぶ
      Action.addTodo(val);
    }

    render() {
      var todos = this.state.todos.map(function(val){
        // keyだとTodoItem側で拾えない…？
        return <TodoItem key={val.id} id={val.id} val={val.text}/>;
      })
      var footer = '';
      // return内は1タグで纏めないとダメ
      // 構文的にreturnと同じ行から書き始めるなら()は不要っぽい
      // けど、複数行にまたがるときにインデントが微妙になるので、基本カッコアリかな。
      return (
        <div className="panel panel-default">
          <h1>todos</h1>
          <header className="header panel-heading">
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.handleNewTodoKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              autoFocus={true}
            />
          </header>
          <ul className="todo-list list-group container">
            {todos}
          </ul>
          {footer}
        </div>
        );
    }
    _refreshAllTodo(){
      this.setState({
        todos:todoStore.getAll()
      });
    }
  }
})();
