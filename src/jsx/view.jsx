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
            fileViewOpen:false
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
                currentFolder:e.target.className,
                folderPath:this.state.folderPath+"/"+e.target.className
            });
            folder = e.target.className;
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
        fetch("/getFileContext", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "fileName":e.target.className,
                "filePath":this.state.folderPath
            })
        }).then((res)=>res.blob()).then((result)=>{
            var reader = new FileReader();
            if(result.type.indexOf("image/") !== -1){
                reader.onload = (e) => {
                    this.setState({
                        filecontent:e.target.result
                    })
                }
                reader.readAsDataURL(result);
            }else{
                reader.onload = (e) =>{
                    let jsone = JSON.parse(e.currentTarget.result);
                    this.setState({
                        filecontent:jsone.filecontent,
                        filename:jsone.filename
                    });
                }
                reader.readAsText(result);
            }
            this.fileViewOpen();
        });
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
    render(){
        let dialogSH;
        this.state.isDialogToggled ? dialogSH = "s" : dialogSH = "h";
        return (
            <div id="view" className={dialogSH}>
                <Header {...this.state} clickBtn = {this.handleClickMenuBtn}/>
                <Menu onOff={this.state.isMenuToggled} showDialog = {this.showDialog} clickUpload = {this.handleUploadBtnClick} selectFile = {this.handleSelectedFile}/>
                <Content {...this.state} getFolderList={this.getFolderList} showDialog = {this.showDialog} getFileContext={this.getFileContext}/>
                <Dialog showHidden = {this.state.isDialogToggled} foldername = {this.state.foldername} inputFolderName = {this.inputFolderName} makeFolder = {this.handleMakeFolder}
                        showDialog = {this.showDialog} enter = {this.handleInputEnter}/>
                <SawContent {...this.state} fileCloseBtn={this.fileViewCloseBtn}/>
            </div>
        );    
    }
} 

module.exports = View

