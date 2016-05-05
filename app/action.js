"use strict"

const Dispatcher = require('./dispatcher');
const Const = require('./const');

var Action = {
  addTodo(data){
    Dispatcher.dispatch({
      actionType: Const.ADD_TODO,
      text: data
    })
  },
  removeTodo(id){
    Dispatcher.dispatch({
      actionType: Const.REMOVE_TODO,
      id:id
    })
  },
  reorderTodo(id, newOrder){
    Dispatcher.dispatch({
      actionType: Const.REORDER_TODO,
      id:id,
      newOrder:newOrder
    })
  }
}

module.exports = Action;
