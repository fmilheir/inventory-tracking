//model fot the user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] }
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } 
    catch (e) {
        throw Error('could not hash password');
    }
  })
module.exports = mongoose.model('Users', UserSchema);
