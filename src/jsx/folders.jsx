const React = require("react");

class Folders extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let folders = [];
        let clickFileEvent;
        let clickFolderEvent;
        this.props.deleteModeOnOff ? clickFileEvent = this.props.selectDeleteFile : clickFileEvent = this.props.getFileContext;
        this.props.deleteModeOnOff ? clickFolderEvent = this.props.selectDeleteFile : clickFolderEvent = this.props.getFolder;
        for(let i = 0; i < this.props.folderList.length; i++){
            if(this.props.folderList[i].indexOf("txt") !== -1){
                folders.push(
                    <div className="folder" key={i} onClick={clickFileEvent}>
                        <img src="../img/txt.png" id={this.props.folderList[i]}/>
                        <h5 id={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }else if(this.props.folderList[i].indexOf("jpg") !== -1 || this.props.folderList[i].indexOf("png") !== -1 || this.props.folderList[i].indexOf("jpeg") !== -1){
                folders.push(
                    <div className="folder" key={i} onClick={clickFileEvent}>
                        <img src="../img/image.png" id={this.props.folderList[i]}/>
                        <h5 id={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }else if(this.props.folderList[i].match(/pdf/ig) !== null){
                folders.push(
                    <div className="folder" key={i} onClick={clickFileEvent}>
                        <img src="../img/image.png" id={this.props.folderList[i]}/>
                        <h5 id={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }
            else{
                folders.push(
                    <div className="folder" key={i} onClick={clickFolderEvent}>
                        <img src="../img/folder.png" id={this.props.folderList[i]}/>
                        <h5 id={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }
        }
        if(this.props.flag !== 0){
            folders.unshift(
                <div className="folder" key="shift" onClick={this.props.getFolder}>
                    <img src="../img/folder.png" className="back"/>
                    <h5 className="back">..</h5>
                </div>
            )
        }
        return(
            <div className="folders">
                {folders}
            </div>
        );
    }
}

module.exports = Folders