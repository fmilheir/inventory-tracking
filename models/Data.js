const mongoose = require('mongoose');
//layouts for the user
const DataSchema = new mongoose.Schema(
    {
        //unfortunatly is not adding this field i dkw 
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        object: { type: String, required: [true, 'what is it stored'], unique: true },
        type:{ type: Boolean, required: [true, 'what is it stored']},
        quantity: { type: Number, required: [true, 'you have to insert a quantity'] }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', DataSchema);