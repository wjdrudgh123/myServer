const React = require("react");

const SawContent = (props) => {
    let state;
    let data;
    props.fileViewOpen ? state = "viewOpen" : state = "viewClose";
    if(props.filename.match(/txt/ig) !== null ){
        let content = props.filecontent.map((c, i) => 
            <p key={i}>{c}</p>
        )
        data = <h3 height="100%">{content}</h3>
    }else if(props.filename.match(/pdf/ig) !== null){
        let content = props.filecontent.map((c, i) => 
            <div key={i}>
                <img src={"data:image/png;base64,"+c} width="100%" height="90%"/>
            </div>
        )
        data = content;
    }else if(props.filename.match(/.png/ig) !== null || props.filename.match(/.jpg/ig) !== null || props.filename.match(/.jpeg/ig) !== null
    || props.filename.match(/.gif/ig) !== null){
        data = <img src={"data:image/"+props.filename.split(".")[1]+";base64,"+props.filecontent} width="100%" height="90%"/>
    }else{
        data = <h3>파일을 읽는 중입니다...</h3>;
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