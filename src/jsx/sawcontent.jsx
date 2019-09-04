const React = require("react");

const SawContent = (props) => {
    let state;
    let data;
    props.fileViewOpen ? state = "viewOpen" : state = "viewClose";
    if(props.filename.indexOf(".txt") !== -1){
        data = <h3 height="100%">{props.filecontent}</h3>
    }else{
        data = <embed src={props.filecontent} type="application/pdf" width="100%" height="90%" />
        // data = <img src={props.filecontent} width="100%" height="90%"/>
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