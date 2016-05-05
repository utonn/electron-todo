require("babel-register")({plugins: "transform-react-jsx"});
// この辺はnpmで入れたモジュールの読み込み。
const React = require("react");
const ReactDOM = require("react-dom");
// ./付きで自分で作ったの読める。
const MyApp = require("./app/todo");

const rootDOM = document.getElementById("root-dom");
ReactDOM.render(React.createElement(MyApp), rootDOM);
