import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
    //authentication check krne ka baad userid bhi daale ga
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
role:{
    type: String,
    enum:["user","assistant"],
    required: true
},
content:{
    type: String,
    required: true
},
createdAt:{
    type: Date,
    default: Date.now
},
});
export const Prompt=mongoose.model("Prompt",promptSchema);