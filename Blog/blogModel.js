const mongoose = require("mongoose");


const BlogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    unique: true,
    required: true
},
  description: {
    type: String,
  },
  author: {
      type: Schema.Types.ObjectId,
       ref: 'users'
  },
  state: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft'
},
read_count: {
  type: Number,
  default: 0
},
reading_time: {
  type: Number,
  default: 0
},
tags: {
  type: String,
},
body: {
  type: String,
  required: true,
},
timestamp: {
  type: Date,
  default: Date.now()
}





  
});


 const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports =  { BlogModel }; 