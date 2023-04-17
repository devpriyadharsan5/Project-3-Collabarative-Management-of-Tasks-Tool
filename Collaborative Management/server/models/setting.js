const mongoose = require('mongoose');
const validator = require("validator");
const settingdb = require('../db/settingConn');
const settingSchema= new mongoose.Schema({
  userTeam:{
    type:String,
    required:true,
    trim:true,
   },

  team:{
    type:[String],
    required:true,

    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Invalid Email");
    //   }
    // },
  },

})




// const task = new mongoose.model("task",taskSchema);

module.exports = settingSchema;