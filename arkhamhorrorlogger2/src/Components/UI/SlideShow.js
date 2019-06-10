import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentFile,fetchFiles,setCampaign,fetchResults,deleteByFileId} from '../../actions/index';
import FileWrapper from '../DashBoard/FilesMenu/FileWrapper/FileWrapper';
import SubmitButton from '../Forms/Button/SubmitButton';
import './SlideShow.css';

class SlideShow extends Component{

    constructor(props){
        super(props);
        this.state = {
          selected: null
        }
      }

      componentDidMount(){
       console.log(this.props.files.length);
       console.log(this.props.auth);
        if(this.props.auth!==null && this.props.files.length<1){
            
                this.props.fetchFiles();
        }
    }

    nextProperty = () => {
        // const newIndex = this.state.property.index+1;
        // this.setState({
        //   property: data.properties[newIndex]
        // })
        const newIndex = this.props.files.findIndex(file=>file._id===this.state.selected)+1;

        console.log(newIndex);
      }
    
      prevProperty = () => {
        // const newIndex = this.state.property.index-1;
        const newIndex = this.props.files.findIndex(file=>file._id===this.state.selected)-1;
        console.log(newIndex);
        // this.setState({
        //   property: data.properties[newIndex]
        // })
      }


      selectHandler=(e,title)=>{
        this.setState({selected:e});
        this.setState({title:title})
        
    }




    submitHandler = (e)=>{
        const {files,setCampaign,setCurrentFile,fetchResults}=this.props;
        const{selected}=this.state;
        if(files.length>0 && selected !==null){ 
            e.preventDefault();
            
            
            const fileIdx= files.findIndex(e=>e._id===selected)
            setCurrentFile(files[fileIdx]);
            setCampaign(files[fileIdx].campaignTitle);
            fetchResults(files[fileIdx].campaignTitle);     
            //this.props.history.push("/scenario");     //Tyler McGinnis says not to mess with history api unless absolutely necessary ,https://tylermcginnis.com/react-router-programmatically-navigate/
            this.setState({toScenario:true});
        }
        else{
            e.preventDefault();
            return;
        }
    }

      renderFiles(){
        const {selected}= this.state;
        if(this.props.files.length>0){  
            return this.props.files.map((e)=>{
                return (
                        <FileWrapper 
                            title={e.campaignTitle} 
                            id={e._id} key={e._id} 
                            selected={selected} 
                            clicked={this.selectHandler} 
                            completedScenarios={e.completedScenarios}
                            deleted={this.deleteHandler}
                            />
                        );
            })
        }
        else{
            return 'Start a new file by pressing \'Create Campaign\' button below';
        }
    }

      renderButtons=()=>{
          return(
              <React.Fragment>
            <button 
            onClick={() => this.nextProperty()} 
          >Next</button>
          <button 
            onClick={() => this.prevProperty()} 
          >Prev</button>
          </React.Fragment>
          );
      }

    render(){

        const {selected,toScenario}= this.state;
        const {files}=this.props;
        
        if(toScenario){
            return <Redirect to="scenario"/>
        }

        return(
            <div className="SlideShow__Wrapper">
                <div className="page">
                    {this.renderButtons()}
                    <div className={`cards-slider active-slide-${files.findIndex(file=>file._id===selected)}`}>
                    <div className="cards-slider-wrapper" style={{'transform':`translateX(-${files.findIndex(file=>file._id===selected)* (100/files.length)}%)`}}>
                        {this.renderFiles()}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}




const mapStateToProps=({auth,file})=>{
    return{
        auth,
        files:file.files,
        error:file.error
    }
}

const mapDispatchToProps={
    setCurrentFile:(file)=>setCurrentFile(file),
    fetchFiles:()=>fetchFiles(),
    setCampaign:(camp)=>setCampaign(camp),
    fetchResults:(campaign)=>fetchResults(campaign),
    deleteByFileId:(fileid)=>deleteByFileId(fileid)
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideShow);
