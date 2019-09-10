let express=require('require');
let app=express();

let mongoose=require("mongoose");

let Warehouse=require('models/Warehouse');
let Warehouse=require('models/Items');

let url="mongodb://localhost:27017/warehouseDB"
mongoose.connect(url,function(err){
    if(err){
        throw err;
    }
    console.log("Successfully connected");
    
});

//get warehouse

app.get('/getwarehouse',function(req,res){
    Warehouse.find().exec(function(err,data){
        if(err){
            console.log(err);
            
        }else
        console.log("No warehouse found");  
    })
});
app.listen(8085);
//Create Warehouse
app.get('/addwarehouse/:name/:capacity/address'),function(req,res){
    
    Warehouse.create({
        _id:new mongoose.Types.ObjectId(),
    })
        
};