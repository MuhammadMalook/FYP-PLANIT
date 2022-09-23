const mongoose = require('mongoose')
const NotificationSchema = new mongoose.Schema({
    eventId : {
        type : String,
        required : true,
    },
    eventName: {
        type : String,
        required : true,
    },
    to : {
        type : String,
        required : false,
    }, 
    userId: {
        type:String,
        required : false,
    },
    from : {
        type : String, 
        required : true,
        default: ""
    },
    imageUrl:{
        type:String,
        default:"",
    },
    Message : {
        type : String, 
        required : true
    },
    type : {
        type : String, 
        required : true
    },
    noteId:{
        type:String,
        required: false
    }
})

module.exports = mongoose.model("Notifications", NotificationSchema)