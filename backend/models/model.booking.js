const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
    category:{
        type:String,
        required:true,
        enum:['vahicle', 'forniture', 'kitchen stuff', 'others']
    },
    description:{
        type:String,
        required:true
    },
    size:{
        type:String,
        enum:['small', 'medium', 'large']
    },
    duration:{
        type:Number
    },
    cost:{
        type:Number
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref: "user"
    }

}, {timestamps: true})

const Booking = model("booking", bookingSchema);

module.exports = Booking;