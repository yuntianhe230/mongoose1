let mongoose=require('mongoose');
let tasksSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Taskname:String,

    AssignTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'developers'
    },
    Duedate:Date,
    Taskstatus:String,
    Taskdescription:String,
    
})

let TaskModel=mongoose.model('tasks',tasksSchema)
module.exports=TaskModel;