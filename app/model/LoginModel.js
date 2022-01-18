const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AdminSchema = new Schema({
    admin_name: { type: String, unique: true, trim: true, required: true },
    admin_password: { type: String, trim: true, required: true },
    admin_email: { type: String, trim: true, required: true },
    admin_contact: { type: Number, required: true },
    admin_role: { type: String, required: true }
});

let AdminModel = mongoose.model('admin_login', AdminSchema);
module.exports = { AdminModel };