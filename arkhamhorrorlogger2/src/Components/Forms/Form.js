import React from '../../../node_modules/react';
import {Redirect} from '../../../node_modules/react-router-dom';
import {Question} from './Question/Question';
import RadioButtonContainer from './RadioButtons/RadioButtonContainer';
import  CheckBoxesContainer from './CheckBoxes/CheckBoxesContainer';
import * as actions from '../../actions/index';
import { connect } from '../../../node_modules/react-redux/lib';
import shortid from "../../../node_modules/shortid";  //for animations, need a new key prop to render each animation
import "./Form.css";

//maybe change this ...

 const Form =(props)=>{
    

    const getId = () => {
            const id = shortid.generate();
            return id;
        };

    const submitHandler =(question,ans)=>{
        const obj={[question.id]:ans}
        props.setAnswer(obj);
        //based on the user answer, we need to set the next appropriate question...
        props.filterQuestions(obj);
        props.setQuestion();
    }


    const {question}=props;

    const renderForm=(props)=>{
        let userForm=null;
        const {scenarioTitle,question,questions, questionIdx,totalQuestions}=props;

        if(questionIdx===totalQuestions){       //no more questions
            return null;
        }
        else{
            if(question.type==='radio'){
                userForm=<RadioButtonContainer
                            question={question} 
                            scenarioTitle={scenarioTitle} 
                            choices={question.choices}
                            submit={submitHandler}
                        />
            }
            else if(  question.type==='checkbox'){
                userForm=<CheckBoxesContainer
                            scenarioTitle={scenarioTitle} 
                            submit={submitHandler}
                            questions={questions}
                        />
            }
        }
        return userForm;
    }

    if(question ===null){
        return <Redirect to="/"/>
    }

    return(
        <div key={getId()} className="Form-Wrapper">
            <Question 
                qString={question.qString} 
                getQuestionKey={()=>getId}
            />
            {renderForm(props)}
        </div>
    )
}

const mapStateToProps=({choices})=>{
    return{
        question:choices.currentQuestion,
        questions:choices.questions,
        scenarioTitle:choices.selectedScenario,
        totalQuestions:choices.totalQuestions,
    }
}

export default connect(mapStateToProps,actions)(Form);