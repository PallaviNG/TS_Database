const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    notificationMessage: { type: String, required: true }
});

let NotificationModel = mongoose.model("notification",NotificationSchema);

module.exports = {NotificationModel};