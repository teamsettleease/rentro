const {Schema, model} = require('mongoose');

const propertySchema = new Schema({
    address:{
        type: String,
        required: true
    },
    size:{
        type: String,
        enum: ["1BHK", "2BHK", "3BHK", "4BHK", "Villa"],
        required: true
    },
    rent:{
        type:Number,
        required: true
    },
    listedBy:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    available:{
        type:Boolean,
        default: true
    },
    photo:{
        type:[String],
        default: []
    },
    contact: {
        type: String,
        required: true
    }
})


const Property = model('property', propertySchema);

module.exports = Property;



// address
// size
// rent
// listedBY
// available
// image