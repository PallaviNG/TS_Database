var mongoose = require('mongoose');
const { ObjectID } = require('./BatchModel');

let Schema = mongoose.Schema;

let InputSchema = new Schema({
    type: String,
    name: String,
    label: String
});

let SelectSchema = new Schema({
    type: String,
    name: String,
    label: String,
    options: Array
});

let RadioSchema = new Schema({
    type: String,
    name: String,
    label: String,
    radio_value: Array
});

let RadioValueSchema = new Schema({
    label: String,
    value: String
});

let InputModel = mongoose.model("input_type", InputSchema);
let RadioModel = mongoose.model("radio_type", RadioSchema);
let RadioValueModel = mongoose.model("radio_value", RadioValueSchema);
let SelectModel = mongoose.model("select_type", SelectSchema);

module.exports = { InputModel, RadioModel, RadioValueModel, SelectModel };