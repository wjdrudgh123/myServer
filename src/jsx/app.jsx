const React = require("react");
const ReactDom = require("react-dom");
const Test = require("./test.jsx");

ReactDom.render(
    <Test/>,
    document.getElementById("container")
)