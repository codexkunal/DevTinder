const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : String,
        enum : {
            values : ["ignore", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        }
    }

},{timestamps:true})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequest