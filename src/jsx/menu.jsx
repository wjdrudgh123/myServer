const React = require("react");

class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let menuOnOff;
        
        this.props.onOff? menuOnOff = "menuOn":menuOnOff = "menuOff";
        
        return(
            <div className={"menu "+menuOnOff}>
                <div id="makeFolder">
                    <h3 onClick={this.props.showDialog}>폴더만들기</h3>
                </div>
                <div id="uploadFile">
                    <input type="file" id="file" name="upload" hidden onChange={this.props.selectFile}/>
                    <h3 onClick={this.props.clickUpload}>파일올리기</h3>
                </div>
                <div id="deleteFile">
                    <h3 onClick={this.props.deleteMode}>삭제</h3>
                </div>
            </div>
        );
    }
}

module.exports = Menu