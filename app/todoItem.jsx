"use strict";

const Action = require("./action");

const React = require("react");
(function(){
// module.exportsすることで、require('./todo')的な感じで外部から拾えるようになる
// class hoge extends ... って書き方はES6っぽい。それ以前はReact.createClassっていうの使わなきゃだったとか
// http://blog.koba04.com/post/2015/01/28/published-react-v0.13.0-beta1/
  var ENTER_KEY = 13;

  module.exports = class TodoItem extends React.Component {

    constructor (prop) {
      super(prop)
      this.state = {
      }
    }

    removeTodo(event){
      Action.removeTodo(this.props.id);
    }

    render() {
      // return内は1タグで纏めないとダメ
      // 構文的にreturnと同じ行から書き始めるなら()は不要っぽい
      // けど、複数行にまたがるときにインデントが微妙になるので、基本カッコアリかな。
      return (
        <li className="list-group-item row">
          <div className="col-sm-8">
            {this.props.val}
          </div>
          <div
            className="col-sm-4 delete-btn bg-warning"
            onClick={this.removeTodo.bind(this)}>
            ×
          </div>
        </li>
        );
    }
  }
})();
