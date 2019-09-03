const React = require("react");

const Dialog = (props) => {
    let sh;
    props.showHidden ? sh = "show" : sh = "hidden";
    return(
    <div className={"dialog "+sh}>
        <input type="text" id="dialogInput" autoComplete="off" placeholder="만들 폴더 이름" value={props.foldername} onChange={props.inputFolderName}
                onKeyDown={props.enter}/>
        <div id="dialogBtn">
            <a onClick={props.makeFolder}>만들기</a>
            <a onClick={props.showDialog}>취소</a>
        </div>
    </div>
    );
}

module.exports = Dialog