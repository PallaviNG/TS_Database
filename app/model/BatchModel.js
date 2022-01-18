let mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;
let Schema = mongoose.Schema;

let CourseSchema = new Schema({
  course_name: { type: String, trim: true },
  domain_name: { type: String, trim: true }
});

let TrainerSchema = new Schema({
  trainer_name: { type: String, trim: true },
  trainer_password: { type: String, default: "trainer" },
  admin_role: { type: String, default: "trainer" },
  phone_number: { type: Number, minlength: 10, maxlength: 12, dropDups: true, unique: true, required: true },
  email_id: { type: String, trim: true, lowercase: true },
  course_name: { type: String },
  batch_name: { type: String, trim: true }
});

let StudentSchema = new Schema({
  student_name: { type: String, trim: true },
  student_password: { type: String, default: "$2b$10$LKaJNV7nHM2MYbF67LDOtOUOjSGo2MIJCOd6v7bpUxvgUdju7ehfW" },
  admin_role: { type: String, default: "student" },
  phone_number: { type: Number },
  email_id: { type: String, trim: true, lowercase: true },
  fees_details: { type: String, default: "unpaid" },
  mock_submitted_count: { type: Number, default: 0 }
});

let BatchSchema = new Schema({
  batch_name: { type: String, trim: true },
  course_name: { type: String, trim: true },
  batch_trainer: { trainer_id: { type: ObjectID }, trainer_name: { type: String } },
  no_of_students: { type: Number, default: 0 },
  students: [StudentSchema],
});

const BatchModel = mongoose.model("batch", BatchSchema);
const TrainerModel = mongoose.model("trainer", TrainerSchema);
const StudentModel = mongoose.model("student", StudentSchema);
const CourseModel = mongoose.model("course", CourseSchema);

module.exports = {
  BatchModel,
  TrainerModel,
  StudentModel,
  CourseModel,
  ObjectID,
};