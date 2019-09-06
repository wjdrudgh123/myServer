const React = require("react");
const MenuButton = require("./menubutton.jsx");

class Header extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteFile = this.handleDeleteFile.bind(this);
    }
    handleDeleteFile(e){
        let files = [];
        let folders = [];
        for(let i = 0; i < this.props.deleteFileList.length; i++){
            if(this.props.deleteFileList[i].match(/.jpeg/ig) !== null || this.props.deleteFileList[i].match(/.jpg/ig) !== null
                || this.props.deleteFileList[i].match(/.txt/ig) !== null || this.props.deleteFileList[i].match(/.png/ig) !== null ||
                this.props.deleteFileList[i].match(/.pdf/ig) !== null){
                    files.push(this.props.deleteFileList[i]);
                }else{
                    folders.push(this.props.deleteFileList[i]);
                }
        }
        if(confirm("삭제스??") !== false){
            let sendValue = {
                "value":{
                    "path":this.props.folderPath,
                    "files":files,
                    "folders":folders
                }
            };
            fetch("/delete", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(sendValue)
            }).then((res)=>res.text()).then((result)=>{
                if(result === "ENOTEMPTY"){
                    alert("폴더를 비워주세요");
                    this.props.delModeOnOff();
                }else if(result === "success"){
                    this.props.getList();
                    this.props.delModeOnOff();
                    //getElementsByClassName은 하나의 돔 오브젝트 리턴이 아닌 여러개를 리턴하므로 하나씩 루프 돌려가면서 바꿔야 됨.
                    for(let i = 0; i < document.getElementsByClassName("folder").length; i++){
                        document.getElementsByClassName("folder")[i].style.background = "white";
                    }
                }
            });
        }
    }
    render(){
        let header;
        if(this.props.currentFolder === "" && this.props.deleteModeOnOff === false){
            header = <h1>{"My Cloud"}</h1>;
        }else if(this.props.deleteModeOnOff === true){
            let img;
            let imgClickMethod;
            this.props.deleteFileList.length === 0 ? img = "home" : img = "trashcan";
            img === "home" ? imgClickMethod = this.props.delModeOnOff : imgClickMethod = this.handleDeleteFile;
            header = (<div className="deleteMode">
                    <h1>{"선택항목 "+this.props.deleteFileList.length}</h1><img src={"../img/"+img+".png"} onClick={imgClickMethod}/>
            </div>);
        }else{
            header = <h1>{this.props.currentFolder}</h1>
        }
        return(
            <div id="header">
                <MenuButton {...this.props}/>
                {header}
            </div>
        );
    }
}

module.exports = Header