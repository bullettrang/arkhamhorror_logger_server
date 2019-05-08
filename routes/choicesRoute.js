const mongoose=require('mongoose');
const fileSchema = require('../models/File');
const resultSchema = require('../models/Result');
const _ = require('lodash');
const File = mongoose.model('files',fileSchema);            //create a Files table
const Result = mongoose.model('results',resultSchema);

//TODO:
//routes for specific files



module.exports=app=>{

    app.post('/api/submitChoices',async (req,res)=>{
        const {scenarioTitle,answers,_file}=req.body;

        const scenario = {scenarioTitle:scenarioTitle,_file:_file,answers:answers};

        try{
            const FileFound = await File.findById(_file);
            if(FileFound){
                //did the user already did this scenario?
                const completedScenarioIdx = FileFound.completedScenarios.findIndex(sc=>sc.scenarioTitle===scenario.scenarioTitle);
                const campaignTitle = FileFound.campaignTitle;
                if(completedScenarioIdx===-1){
                    FileFound.completedScenarios.push(scenario);
                    await FileFound.save();
                    await updateResultsWithUserAnswers(answers,_file,scenarioTitle,campaignTitle);
                    res.send(FileFound);

                }
                else{       
                    FileFound.completedScenarios[completedScenarioIdx]=scenario;   //overwrite old scenario within file
                    await FileFound.save();
                    await updateResultsWithUserAnswers(answers,_file,scenarioTitle,campaignTitle);
                    res.send(FileFound);
                }

            }
            else{
                console.log('[/submitChoices] FILE NOT FOUND');
            }
        }
        catch(error){
            res.status(422).send(error);
        }

    })

    app.post('/api/submitFile', async (req,res)=>{
        try{
            await createNewPlayerFile(req,res);
        }
        catch(error){
            res.status(422).send(error);
        }
    });

    app.get('/api/user_files',async(req,res)=>{
        try{
            await fetchUserFilesById(req,res);
        }
        catch(err){
            res.status(422).send(err);
        } 
    });

    app.get('/api/results',async(req,res)=>{
        console.log(req.query.scenario);
        const campaignTitle=req.query.campaign
        try{
            const results = await Result.find({campaignTitle:campaignTitle});   //might change this to search by campaign
            res.send(results);
        }
        catch(err){
            res.status(422).send(err);
        } 
    });
}


//takes in user answers and _file id, scenarioTitle, and campaignTitle
//updates global results of user choices
//by either updating Result Documents or making new ones if Result documents do not exist yet.  
const updateResultsWithUserAnswers = async (answers,_file,scenarioTitle,campaignTitle)=>{
    const questionIds = answers.map(ans=> ({questionID:Object.keys(ans)[0]}));

                    for(let qId of questionIds){
                        for(let key in qId){
                            const ResultFound = await Result.findOne({questionID:qId[key]});
                            let ansIdx = answers.findIndex(ans=>Object.keys(ans)[0]===qId[key]);
                            if(ansIdx===-1)
                                continue;
                            if(ResultFound){
                                const answerValue = answers[ansIdx][qId[key]];
                                if(isRadioQuestion(answerValue)){
                                    choiceIdx=ResultFound.choices.findIndex(choice=>choice.choiceValue===answerValue)
                                    if(choiceIdx===-1){ //no such choice ever submitted, we will create a new choice schema and push it into Result
                                        const choiceObj = initChoiceObject(answerValue);
                                        ResultFound.choices.push(choiceObj);
                                        ResultFound.totalVotes= ResultFound.totalVotes+1;
                                        await ResultFound.save();    
                                    }
                                    else{//increment with user's answer
                                        ResultFound.totalVotes= ResultFound.totalVotes+1;
                                        ResultFound.choices[choiceIdx].total= ResultFound.choices[choiceIdx].total +1;
                                        await ResultFound.save();
                                    }
                                }
                                else{
                                    console.log('updating checkbox Question',answerValue);
                                    const choiceObjs = getArrayOfChoiceObjects(answerValue);
                                    const totalPossibleChoices= getTotalPossibleCheckboxAnswers(scenarioTitle);
                                    ResultFound.totalVotes = ResultFound.totalVotes + totalPossibleChoices;

                                    for(let choice of choiceObjs){
                                       let choiceIdx= ResultFound.choices.findIndex(ele=>ele.choiceValue===choice.choiceValue);
                                       if(choiceIdx!==-1){
                                           ResultFound.choices[choiceIdx].total=ResultFound.choices[choiceIdx].total +1;
                                       }else{   //creating brand new checkbox choice
                                           ResultFound.choices.push(choice)
                                       }
                                    }
                                    await ResultFound.save();
                                }
                            }
                            else{           //create new result
                                //TODO:add support for checkbox type questions
                                const questionID = qId[key];
                                const answerValue = answers[ansIdx][questionID];
                                if(isRadioQuestion(answerValue)){
                                    const choiceObj = initChoiceObject(answerValue);
                                    const arrChoices = [choiceObj];
                                    const result = await new Result({
                                                                    questionID:questionID,   
                                                                    _file:_file, 
                                                                    choices:arrChoices,
                                                                    scenarioTitle:scenarioTitle,
                                                                    totalVotes:1,
                                                                    campaignTitle:campaignTitle   
                                                            });
                                    await result.save();
                                }
                                else{

                                   const choiceObjs= getArrayOfChoiceObjects(answerValue);
                                    const totalPossibleChoices = getTotalPossibleCheckboxAnswers(scenarioTitle);

                                    console.log('choiceObjs for checkboxes ',choiceObjs);
                                    const result = await new Result({
                                        questionID:questionID,   
                                        _file:_file, 
                                        choices:choiceObjs,
                                        scenarioTitle:scenarioTitle,
                                        totalVotes:totalPossibleChoices,
                                        campaignTitle:campaignTitle   
                                    });
                                    await result.save();
                                }
                            }
                        }
                    }
}

const initChoiceObject =(answerValue)=>{
    return _.assign({choiceValue:null,total:0},{choiceValue:answerValue,total:1});
}

const getArrayOfChoiceObjects = (answerValue)=>{
    return answerValue.map(ans=>{
        return initChoiceObject(ans);
    });
}

//This function checks answer type to see if answer is part of a radio button (binary) question
// or a checkbox question (non-binary) question
//input: Number 
//output: true if input is number, else false
const isRadioQuestion=(answerValue)=>{
    return typeof answerValue === "number"
}


//This function creates a brand new user file and sends it back as response
//input: req, res
const createNewPlayerFile = async (req,res)=>{
    const {campaignTitle,completedScenarios} = req.body;

        const file = await new File({
        campaignTitle:campaignTitle,
        _user:req.user.id,
        completedScenarios:completedScenarios
    });
    await file.save();
    res.send(file);
}


//This function fetches user files by their Id and sends the files fetched as a response
const fetchUserFilesById = async (req,res)=>{
        const files = await File.find({_user:req.user.id});
        res.send(files);
}

const getTotalPossibleCheckboxAnswers=(scenarioTitle)=>{
    switch(scenarioTitle){
        case "The Midnight Masks":
            return 6;
        case "Blood on the Altar":
            return 5;
        default:
            return 0;
    }
}