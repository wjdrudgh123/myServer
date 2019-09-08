const React = require("react");
const Header = require("./header.jsx");
const Content = require("./content.jsx");
const Menu = require("./menu.jsx");
const SawContent = require("./sawcontent.jsx");
const Dialog = require("./dialog.jsx");

class View extends React.Component{
    constructor(props){
        super(props);
        this.state={
            folderList:[],
            fileList:[],
            isMenuToggled:false,
            isDialogToggled:false,
            foldername:"",
            flag:0,
            currentFolder:"",
            folderPath:"",
            filecontent:"",
            filename:"",
            fileViewOpen:false,
            deleteFileList:[],
            deleteModeOnOff:false
        }
        this.getFolderList = this.getFolderList.bind(this);
        this.inputFolderName = this.inputFolderName.bind(this);
        this.handleMakeFolder = this.handleMakeFolder.bind(this);
        this.handleClickMenuBtn = this.handleClickMenuBtn.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.handleInputEnter = this.handleInputEnter.bind(this);
        this.handleUploadBtnClick = this.handleUploadBtnClick.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.getFileContext = this.getFileContext.bind(this);
        this.fileViewOpen = this.fileViewOpen.bind(this);
        this.fileViewCloseBtn = this.fileViewCloseBtn.bind(this);
        this.handleDeleteFileSelect = this.handleDeleteFileSelect.bind(this);
        this.handleDeleteMode = this.handleDeleteMode.bind(this);
        this.handleGetIMG = this.handleGetIMG.bind(this)
    }
    componentDidMount(){
        this.getFolderList();
    }
    getFolderList(e){
        let folder;
        if(e === undefined){
            this.state.currentFolder === "" ? folder = "" : folder = this.state.currentFolder;
        }else if(e.target.className === "back"){
            let temp = this.state.folderPath.split("/");
            let avertPath = temp[0]; 
            for(let i = 1; i < temp.length-1; i++){
                avertPath += "/"+temp[i];
            }
            this.setState({
                folderPath:avertPath,
                currentFolder:temp[temp.length-2],
                file:""
            });
            folder = avertPath;
        }else{
            this.setState({
                currentFolder:e.target.id,
                folderPath:this.state.folderPath+"/"+e.target.id
            });
            folder = e.target.id;
        }
        fetch("/getFolderList",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    "folder":folder,
                    "path":this.state.folderPath
                })
            }
        ).then((res)=>res.json()).then((result)=>{
            this.setState({
                folderList:result.file,
                flag:result.no
            });
        });
    }
    showDialog(e){
        if(e === undefined){
            this.setState(prevState => ({
                isDialogToggled:!prevState.isDialogToggled
            }));
        }else if(e.target.innerText === "폴더만들기"){
            this.setState(prevState => ({
                isDialogToggled:!prevState.isDialogToggled,
                isMenuToggled:!prevState.isMenuToggled
            }));
        }else{
            this.setState(prevState => ({
                isDialogToggled:!prevState.isDialogToggled
            }));
        }
    }
    handleMakeFolder(){
        fetch("/makeFolder", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "path":this.state.folderPath,
                "foldername":this.state.foldername
            })
        }).then((res)=>res.text()).then((result)=>{
            if(result === "success"){
                this.showDialog();
                this.getFolderList();
                this.setState({
                    foldername:""
                });
            }
        });
    
    }
    handleInputEnter(e){
        if(e.keyCode === 13){
            this.handleMakeFolder();
        }
    }
    inputFolderName(e){
        this.setState({
            foldername:e.target.value
        });
    }
    handleClickMenuBtn(){
        this.setState(prevState => ({
            isMenuToggled:!prevState.isMenuToggled
        }));
    }
    handleUploadBtnClick(e){
        e.preventDefault();
        document.getElementById("file").click();
    }
    handleSelectedFile(e){
        let file = document.getElementById(e.target.id).files[0];
        let formData = new FormData();
        formData.append("uploadFile", file);
        formData.append("filePath", this.state.folderPath);
        fetch("/uploadFile", {
            method:"POST",
            body:formData
        }).then((response)=>response.text()).then((result)=>{
            if(result === "success"){
                this.getFolderList();
                this.handleClickMenuBtn();
            };
        });
    }
    getFileContext(e){
        
        var targetFilename = e.target.id;
        this.fileViewOpen();
        fetch("/getFileContext", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "fileName":targetFilename,
                "filePath":this.state.folderPath,
                "screenSize":window.screen.width
            })
        }).then((res)=>res.blob()).then((result)=>{
            var reader = new FileReader();
            if(result.type.indexOf("image/") !== -1){
                reader.onload = (e) =>{
                    let jsone = JSON.parse(e.currentTarget.result);
                    this.handleGetIMG(jsone.filecontent, jsone.filename);
                }
                reader.readAsText(result);
            }
            else if(result.type.match(/.pdf/ig) !== null){
                reader.onload = (e) =>{
                    let jsone = JSON.parse(e.currentTarget.result);
                    this.handleGetPDF(jsone, targetFilename);
                }
                reader.readAsText(result);
            }
            else{
                reader.onload = (e) =>{
                    let jsone = JSON.parse(e.currentTarget.result);
                    this.setState({
                        filecontent:jsone.filecontent,
                        filename:jsone.filename
                    });
                }
                reader.readAsText(result);
            }
        });
    }
    handleGetIMG(jsone, f){
        fetch("/getIMG", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "j":jsone,
                "filename":f
            })
        }).then((res)=>res.json()).then((result)=>{
            this.setState({
                filecontent:result.json,
                filename:result.filename
            });
        })
    }
    handleGetPDF(jsone, f){
        fetch("/getPDFIMG", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "j":jsone,
                "filename":f
            })
        }).then((res)=>res.json()).then((result)=>{
            this.setState({
                filecontent:result.json,
                filename:result.filename
            });
        })
    }
    fileViewOpen(){
        this.setState(prevState => ({
            fileViewOpen:!prevState.fileViewOpen
        }));
    }
    fileViewCloseBtn(e){
        this.setState(prevState => ({
            fileViewOpen:!prevState.fileViewOpen,
            filename:"",
            filecontent:""
        }));
    }

    handleDeleteFileSelect(e){
        let files = this.state.deleteFileList;
        if(files.indexOf(e.target.id) === -1){
            files.push(e.target.id);
            document.getElementById(e.target.id).parentElement.style.background = "#ecf0f1";
        }else{
            files.splice(files.indexOf(e.target.id),1); // 배열에서 특정 값을 찾아 삭제하는 것
            document.getElementById(e.target.id).parentElement.style.background = "white";
        }
        this.setState({
            deleteFileList:files
        });
    }
    handleDeleteMode(){
        this.setState(prevState => ({
            deleteModeOnOff:!prevState.deleteModeOnOff,
            deleteFileList:[]
        }));
        if(this.state.isMenuToggled !== false){
            this.handleClickMenuBtn();
        }
    }
    render(){
        let dialogSH;
        this.state.isDialogToggled ? dialogSH = "s" : dialogSH = "h";
        return (
            <div id="view" className={dialogSH}>
                <Header {...this.state} getList = {this.getFolderList} clickBtn = {this.handleClickMenuBtn} delModeOnOff={this.handleDeleteMode}/>
                <Menu onOff={this.state.isMenuToggled} deleteMode={this.handleDeleteMode} showDialog = {this.showDialog} clickUpload = {this.handleUploadBtnClick} selectFile = {this.handleSelectedFile}/>
                <Content {...this.state} getFolderList={this.getFolderList} showDialog = {this.showDialog} getFileContext={this.getFileContext}
                            selectDeleteFile={this.handleDeleteFileSelect}/>
                <Dialog showHidden = {this.state.isDialogToggled} foldername = {this.state.foldername} inputFolderName = {this.inputFolderName} makeFolder = {this.handleMakeFolder}
                        showDialog = {this.showDialog} enter = {this.handleInputEnter}/>
                <SawContent {...this.state} fileCloseBtn={this.fileViewCloseBtn}/>
            </div>
        );    
    }
} 

module.exports = View

