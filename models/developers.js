let mongoose=require('mongoose')
let developersSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName:{type:String,required:true},
        lastName:String,
       },
    level:String,
    
    address:{State:String,
        Suburb:String,
        Street:String,
        Unit:String
    }
    
})

let DeveloperModel=mongoose.model('developers',developersSchema);
module.exports=DeveloperModel;