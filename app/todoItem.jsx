"use strict";

const React = require("react");
(function(){
  var ENTER_KEY = 13;

  // 基本的にはここではActionを呼ばないし、stateを持たない
  // オーナーにすべて委譲し、オーナーから与えられるpropを元に表示するのみ。
  module.exports = class TodoItem extends React.Component {

    constructor (prop) {
      super(prop)
      this.state = {
        newOrder: prop.index,
        isDone: prop.isDone ? prop.isDone : false,
        dragOver: false
      }
    }

    // 親からのpropsに変化があった時だけ呼ばれる。
    componentWillReceiveProps(nextProp){
      this.setState({
        newOrder: nextProp.index,
        isDone: nextProp.isDone
      })
    }

    handleRemoveBtn(event){
      this.props.onRemove(this.props.id);
    }

    // この辺の処理、どこまでをオーナーに移譲するべきか。
    handleOrderKeyDown (event) {
      if (event.shiftKey && event.keyCode === 8){
        this.props.onRemove(this.props.id);
        return;
      }
      if (event.keyCode !== ENTER_KEY) {
        return;
      }
      event.preventDefault();

      var val = event.target.value.trim();

      this.props.onReorder(this.props.id,val);
    }

    handleChange(event){
      this.setState({newOrder: event.target.value});
    }

    handleDone(event){
      this.props.onChange(this.props.id, {isDone: !this.state.isDone})
    }

    handleDragStart(event){
      event.dataTransfer.setData("String", this.props.id);
    }
    handleDragEnter(event){
      this.setState({dragOver: true});
      // drop操作の許可。
      event.preventDefault();
    }
    handleDragOver(event){
      this.setState({dragOver: true});
      // drop操作の許可。
      event.preventDefault();
    }
    handleDragLeave(event){
      this.setState({dragOver: false});
    }
    handleDrop(event){
      this.props.onReorder(event.dataTransfer.getData("String"),this.props.index);
      this.setState({dragOver: false});
    }
    render() {
      var dragOver = this.state.dragOver ? " dragOver" : "";
      var li_class = "list-group-item bs-callout bs-callout-warning" + dragOver;
      return (
        <li className={li_class} draggable="true"
          onDragStart={this.handleDragStart.bind(this)}
          onDragEnter={this.handleDragEnter.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
          onDragLeave={this.handleDragLeave.bind(this)}
          onDrop={this.handleDrop.bind(this)}
          >
          <div className="todo-order">
            <input type="checkbox"
              checked={this.state.isDone}
              onChange={this.handleDone.bind(this)}
            ></input>
            <input type="text"
              value={this.state.newOrder}
              onKeyDown={this.handleOrderKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              tabIndex={this.props.index+1}
              ></input>
          </div>
          <div className="">
            {this.props.val}
          </div>
          <div
            className="delete-btn"
            onClick={this.handleRemoveBtn.bind(this)}>
            <span className='glyphicon glyphicon-remove'></span>
          </div>
        </li>
        );
    }
  }
})();
