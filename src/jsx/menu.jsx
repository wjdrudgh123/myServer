const React = require("react");

const Menu = (props) => {
    let onOff;
    props.onOff? onOff = "on":onOff = "off";
    console.log()
    return(
        <div className={"menu "+onOff}>
            <div id="makeFolder">
                <h3 onClick={props.showDialog}>폴더만들기</h3>
            </div>
            <div id="uploadFile">
                <input type="file" id="file" name="upload" hidden onChange={props.selectFile}/>
                <h3 onClick={props.clickUpload}>파일올리기</h3>
            </div>
            <div id="deleteFile">
                <h3>삭제</h3>
            </div>
        </div>
    );
}

module.exports = Menu