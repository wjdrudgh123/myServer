const React = require("react");

const MenuButton = (props) => {
    
    return(
        <div id="button" onClick={props.clickBtn}>
        <span></span>
        <span></span>
        <span></span>
        </div>
    );
}

module.exports = MenuButton