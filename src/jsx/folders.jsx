const React = require("react");

class Folders extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let folders = [];
        for(let i = 0; i < this.props.folderList.length; i++){
            if(this.props.folderList[i].indexOf("txt") !== -1){
                folders.push(
                    <div className="folder" key={i} onClick={this.props.getFileContext}>
                        <img src="../img/txt.png" className={this.props.folderList[i]}/>
                        <h5 className={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }else if(this.props.folderList[i].indexOf("jpg") !== -1 || this.props.folderList[i].indexOf("png") !== -1 || this.props.folderList[i].indexOf("jpeg") !== -1){
                folders.push(
                    <div className="folder" key={i} onClick={this.props.getFileContext}>
                        <img src="../img/image.png" className={this.props.folderList[i]}/>
                        <h5 className={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }else if(this.props.folderList[i].indexOf("pdf") !== -1){
                folders.push(
                    <div className="folder" key={i} onClick={this.props.getFileContext}>
                        <img src="../img/image.png" className={this.props.folderList[i]}/>
                        <h5 className={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
                    </div>);
            }
            else{
                folders.push(
                    <div className="folder" key={i} onClick={this.props.getFolder}>
                        <img src="../img/folder.png" className={this.props.folderList[i]}/>
                        <h5 className={this.props.folderList[i]}>{this.props.folderList[i]}</h5>
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