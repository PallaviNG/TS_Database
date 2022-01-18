const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const ObjectID = require("mongoose").Types.ObjectId;

let DynamicComponentSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
  score: { type: Number, default: 0 },
  name: { type: String },
  value: { type: String },
  componentType: { type: String, required: true },
  otherOption: { type: Array, default: [] },
});

let TemplateSchema = new Schema({
  questionSets: [DynamicComponentSchema],
  template_title: { type: String, default: "Untitled Template" },
  templateCreationDate: { type: Date, default: Date.now },
  createdBy: { type: String, default: "" },
});

let InterviewerSchema = new Schema({
  interviewer_name: { type: String, trim: true },
  email_id: { type: String, trim: true },
  admin_role: { type: String, default: "interviewer" },
  interviewer_password: {
    type: String,
    default: "$2b$10$0sqXjxTMGd3c.CXve8ymW.edFnPJIRARhABfrnJqsfLo0qOx9NpNm",
  },
  phone_number: { type: Number, default: 0 },
  batches: [{ batch_id: { type: ObjectID }, batch_name: { type: String } }],
  templateAssignmentDate: { type: Date, default: Date.now },
  templateAssignmentFormsList: [TemplateSchema],
});

let feedbackFormSchema = new Schema({
  feedbackFormDetails: [TemplateSchema],
  score_student: { type: Number, default: 0 },
  conductedDate: { type: Date, default: Date.now }
});

let InterviewerMockFeedbackSchema = new Schema({
  interviewer_details: {
    interviewer_id: { type: ObjectID },
    interviewer_name: { type: String },
  },
  batch_details: { batch_id: { type: ObjectID }, batch_name: { type: String } },
  student_details: {
    student_id: { type: ObjectID },
    student_name: { type: String },
    student_phone: { type: Number },
    student_email: { type: String },
    // submitted_count: { type: Number, default: 0 },
  },
  feedBackForm: [feedbackFormSchema],
});

let InterviewerMockFeedbackModel = mongoose.model(
  "feedback_form",
  InterviewerMockFeedbackSchema
);
let TemplateModel = mongoose.model("mock_template", TemplateSchema);
let InterviewerModel = mongoose.model("interviewer", InterviewerSchema);
module.exports = {
  TemplateModel,
  InterviewerModel,
  InterviewerMockFeedbackModel,
  ObjectID,
};
