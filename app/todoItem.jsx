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
        newOrder: prop.index
      }
    }

    removeTodo(event){
      Action.removeTodo(this.props.id);
    }

    handleOrderKeyDown (event) {
      if (event.keyCode !== ENTER_KEY) {
        return;
      }
      event.preventDefault();

      var val = this.state.newOrder.trim();

      Action.reorderTodo(this.props.id,this.state.newOrder);
    }

    handleChange(event){
      this.setState({newOrder: event.target.value});
    }

    render() {
      return (
        <li className="list-group-item bs-callout bs-callout-warning">
          <div className="todo-order">
            <input type="text"
              value={this.state.newOrder}
              onKeyDown={this.handleOrderKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}></input>
          </div>
          <div className="">
            {this.props.val}
          </div>
          <div
            className="delete-btn bg-danger"
            onClick={this.removeTodo.bind(this)}>
            <span className='glyphicon glyphicon-remove'></span>
          </div>
        </li>
        );
    }
  }
})();
