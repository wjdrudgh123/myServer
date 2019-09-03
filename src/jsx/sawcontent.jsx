const React = require("react");

const SawContent = (props) => {
    let state;
    let data;
    props.fileViewOpen ? state = "viewOpen" : state = "viewClose";
    if(props.filename.indexOf(".txt") !== -1){
        data = <h3>{props.filecontent}</h3>
    }else{
        data = <img src={props.filecontent}/>
    }
    return(
        <div className={"sawView "+state}>
            <div id="sawHeader">
                <h3>{props.filename}</h3>
                <img src="../img/close.png" onClick={props.fileCloseBtn}/>
            </div>
            <div id="sawContent">
                {data}
            </div>
        </div>
    );
}

module.exports = SawContent