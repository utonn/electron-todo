"use strict"

const Dispatcher = require('./dispatcher');
const Const = require('./const');

var Action = {
  addTodo(data){
    Dispatcher.dispatch({
      actionType: Const.ADD_TODO,
      text: data
    })
  }
}

module.exports = Action;
