const mongoose=require('../../common/database')();

const slideSchema=new mongoose.Schema({
    thumbnail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    
    is_stock:{
        type:Boolean,
        default:true
    },
    name:{
        type:String,
        text:true,
        required:true
    },
   
},{
    timestamps:true,
})

module.exports=mongoose.model("Slides",slideSchema,"slides")