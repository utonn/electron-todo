"use strict";

const React = require("react");
const Todo = require("./todo");
const CategoryStore = require("./categoryStore")
const Action = require("./action");

(function(){
  var ENTER_KEY = 13;

  module.exports = class App extends React.Component {

    constructor (prop) {
      super(prop)
      this.state = {
        categories: this._loadAllCategory(),
        selected: ''
      }
    }
    handleCategoryClick(event){
        this.onChangeCategory(event.target.getAttribute('data-id'));
    }
    onChangeCategory(category){
      this.setState({selected:category||''});
    }

    render() {
      var menues = this.state.categories.map(function(v,i){
        return (
          <li role="presentation" key={v.id} className={v.id==this.state.selected?'active':''}>
            <a href="#"
              onClick={this.handleCategoryClick.bind(this)}
              data-id={v.id}>
              {v.text}
            </a>
          </li>
        );
      },this)

      return (
        <div>
          <ul className="nav nav-tabs">
          	<li role="presentation" className={this.state.selected==''?'active':''}>
              <a href="#" onClick={this.handleCategoryClick.bind(this)}>
                all
              </a>
            </li>
            {menues}
          </ul>
          <Todo category={this.state.selected}/>
        </div>
        );
    }

    _loadAllCategory(){
      return CategoryStore.getAll().map(function(v,i){
        return v;
      })
    }
  }
})();
