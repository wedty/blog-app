const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    username:{
        type:String,
       
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true,
        min:5
    },
    desc:{
        type:String,
        required:true,
        min:12
    },
    photo:{
        type:String,
        required:false,
        default:"",

    },
    featured:{
        type:Boolean,
        default:false,
    },
    categories:{
        type:Array,
        required:false,
    },

    views:{
        type:Number,
        default:0,
    },
    likes:{
        type:[String],
        default:[],
    },


},{timestamps:true});

module.exports= mongoose.model("Blog",BlogSchema);

