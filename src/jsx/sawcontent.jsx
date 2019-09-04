const React = require("react");

const SawContent = (props) => {
    let state;
    let data;
    props.fileViewOpen ? state = "viewOpen" : state = "viewClose";
    if(props.filename.match(/txt/ig) !== null || props.filename.match(/pdf/ig) !== null){
        let content = props.filecontent.map((c, i) => 
            <p key={i}>{c}</p>
        )
        data = <h3 height="100%">{content}</h3>
    }else{
        data = <img src={props.filecontent} width="100%" height="90%"/>
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