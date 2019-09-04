const React = require("react");
const Folders = require("./folders.jsx");

class Content extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let list;
        (this.props.folderList.length === 0 && this.props.flag === 0) ? list = <a  onClick={this.props.showDialog}>+ 폴더 만들기</a> : 
                                            list = <Folders file = {this.props.file} folderList ={this.props.folderList} flag = {this.props.flag} 
                                                    getFolder={this.props.getFolderList} getFileContext={this.props.getFileContext}
                                                    deleteModeOnOff = {this.props.deleteModeOnOff} selectDeleteFile={this.props.selectDeleteFile}/>;
        return(
            <div id="Content">
                {list}
            </div>
        )
    }
}

module.exports= Content