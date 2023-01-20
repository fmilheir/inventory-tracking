const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        object: { type: String, required: [true, 'what is it stored'], unique: true },
        type:{ type: Boolean, required: [true, 'what is it stored']},
        quantity: { type: Number, required: [true, 'you have to insert a quantity'] }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', DataSchema);