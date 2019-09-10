const express = require('express');

let mongoose=require("mongoose");
const app = express();
const Developers = require('./models/developers');
const Tasks = require('./models/tasks');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('views'));
app.use(express.static('css'));
app.use(express.static('img'));


// Connection URL

const url="mongodb://localhost:27017/fit2095db";
//reference to the database (i.e. collection)
let db;
let col1
//Connect to mongoDB server
mongoose.connect(url,function(err){
        if (err){
            console.log("Err",err);
            throw err;
        }else{
            console.log("Connect sucessuflly to server");
        }
    })



let viewPath = __dirname + "/views/";
app.get('/', function (req, res) {
    let fileName = viewPath + "index.html";
    res.sendFile(fileName);

});

app.get('/addDeveloper',function(req,res){
    let fileName=viewPath+"addDeveloper.html";
    res.sendFile(fileName);
})
app.post('/newDeveloper', function (req, res) {
    
    
    let developerDetails = req.body;
    console.log(req.body);
    

    Developers.create({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: developerDetails.firstName,
            lastName: developerDetails.lastName
        },
        level:developerDetails.level,
        address:{
            State:developerDetails.state,
            Suburb:developerDetails.suburb,
            Street:developerDetails.street,
            Unit:developerDetails.unit
        }
    },function(err){
        if(err)
           throw err;
           
        
    });
    

    res.redirect('listDevelopers');
    //res.send("you have added a task");
    //
});
app.get('/listDevelopers',function(req,res){
   Developers.find({}, function (err, docs) {
        res.render('listDevelopers.html', { developerDb: docs });
        
      });
})
app.get('/addNewTask',function(req,res){
    let fileName=viewPath+'addNewTask.html';
    res.sendFile(fileName);
});

app.post('/newTask', function (req, res) {
    let taskDetails = req.body;
    console.log(taskDetails);
    Tasks.create({_id: new mongoose.Types.ObjectId(),
        Taskname:taskDetails.Taskname,
        AssignTo:taskDetails.AssignTo,
        Duedate:taskDetails.Duedate,
        Taskstatus:taskDetails.Taskstatus,
        Taskdescription:taskDetails.Taskdescription}),function(err){
            if(err)
              throw err;
              
        };

    res.redirect('listTasks');
    //res.send("you have added a task");
    //
});
//Update a task: 
app.get('/updateatask', function (req, res) {
    res.sendFile(viewPath + 'updateatask.html');
});
app.post('/updateatask', function (req, res) {
    Tasks.updateOne({ _id: req.body._id }, { $set: { taskStatus: req.body.taskStatus} }, function (err, doc) {
        console.log(doc);
    });

 app.get('/completeTasks',function(req,res){
    Tasks.where({ 'Taskstatus': 'complete' }).limit(3).sort('Taskname').exec(function (err, docs) {
        
        res.render('listTasks.html', { taskDb: docs });
    });
 })   
    
})

app.get('/listTasks', function (req, res) {
    Tasks.find({}, function (err, docs) {
        res.render('listTasks.html', { taskDb: docs });
        
      });
});

//delete a task:
app.get('/deleteatask', function (req, res) {
    res.sendFile(viewPath+'deleteatask.html');
});
//post
app.post('/deleteatask', function (req, res) {
    let deleteDetails = req.body;
    
    Tasks.deleteOne({ '_id': deleteDetails._id }, function (err, doc) {
        console.log(doc);
    });
    res.redirect('/listTasks');// redirect the client to list users page
});


app.listen(8084);




