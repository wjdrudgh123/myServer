const React = require("react");
const MenuButton = require("./menubutton.jsx");

const Header = (props) => {
    let header;
    props.currentFolder === "" ? header = "My Cloud" : header = props.currentFolder; 
    return(
        <div id="header">
            <MenuButton {...props}/>
            <h1>{header}</h1>
        </div>
    );
}

module.exports = Header