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
                if(completedScenarioIdx===-1){
                    FileFound.completedScenarios.push(scenario);
                    await FileFound.save();
                    await updateResultsWithUserAnswers(answers,_file,scenarioTitle);
                    res.send(FileFound);

                }
                else{       //overwrite old scenario within file
                    FileFound.completedScenarios[completedScenarioIdx]=scenario;
                    await FileFound.save();
                    await updateResultsWithUserAnswers(answers,_file,scenarioTitle);
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
        const {campaignTitle,completedScenarios} = req.body;
        try{
                const file = await new File({
                                campaignTitle:campaignTitle,
                                _user:req.user.id,
                                completedScenarios:completedScenarios
                            });
                await file.save();
                
                res.send(file);
        }
        catch(error){
            res.status(422).send(err);
        }
    });

    app.get('/api/user_files',async(req,res)=>{
        try{
            const files = await File.find({_user:req.user.id});
            res.send(files);
        }
        catch(err){
            res.status(422).send(err);
        } 
    });

    app.get('/api/results',async(req,res)=>{
        console.log(req.query.scenario);
        const scenarioTitle=req.query.scenario
        try{
            const results = await Result.find({scenarioTitle:scenarioTitle});
            res.send(results);
        }
        catch(err){
            res.status(422).send(err);
        } 
    });
}

//takes in user answers and _file id
//updates global results of user choices
//by either updating Result Documents or making new ones if Result documents do not exist yet.  
const updateResultsWithUserAnswers = async (answers,_file,scenarioTitle)=>{
    const questionIds = answers.map(ans=> ({questionID:Object.keys(ans)[0]}));

                    for(let qId of questionIds){
                        for(let key in qId){
                            const ResultFound = await Result.findOne({questionID:qId[key]});
                            let ansIdx = answers.findIndex(ans=>Object.keys(ans)[0]===qId[key]);
                            if(ansIdx===-1)
                                continue;
                            if(ResultFound){
                                const answerValue = answers[ansIdx][qId[key]];
                                if(typeof answerValue ==="number"){
                                    choiceIdx=ResultFound.choices.findIndex(choice=>choice.choiceValue===answerValue)
                                    if(choiceIdx===-1){ //no such choice ever submitted, we will create a new choice schema and push it into Result
                                        const choiceObj = _.assign({choiceValue:null,total:0},{choiceValue:answerValue,total:1});
                                        ResultFound.choices.push(choiceObj);
                                        await ResultFound.save();    
                                    }
                                    else{//increment with user's answer
                                        ResultFound.choices[choiceIdx].total= ResultFound.choices[choiceIdx].total +1;
                                        await ResultFound.save();
                                    }
                                }
                                else{
                                    console.log('not a number ',answerValue);
                                }
                            }
                            else{           //create new result
                                //TODO:add support for checkbox type questions
                                const answerValue = answers[ansIdx][qId[key]];
                                if(typeof answerValue==="number"){
                                    console.log('creating new result');
                                    const choiceObj = _.assign({choiceValue:null,total:0},{choiceValue:answerValue,total:1})
                                    const arrChoices = [choiceObj];
                                    const result = await new Result({
                                                                    questionID:qId[key],   
                                                                    _file:_file, 
                                                                    choices:arrChoices,
                                                                    scenarioTitle:scenarioTitle   
                                                            });
                                    await result.save();
                                }
                                else{
                                    console.log('not a number ',answerValue);
                                }
                            }
                        }
                    }
}