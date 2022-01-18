let { StudentModel } = require("../model/BatchModel");
const { InterviewerMockFeedbackModel } = require("../model/TemplateModel");

let MockAPIController = {
    home: function (req, res) {
        try {
            res.status(200).send({ status: true, message: 'default-mock-message' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    addStudent: async function (req, res) {
        let data = req.body;
        try {
            let newStudent = new StudentModel({
                student_name: data.student_name,
                phone_number: data.phone_number,
                email_id: data.email_id,
                batch_name: data.batch_name,
                course_name: data.course_name,
                fees_details: data.fees_details,
                admit_status: data.admit_status
            });
            var result = await newStudent.save();
            res.status(200).send({ status: true, data, message: 'created new student' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },
    getStudentList: async function (req, res) {
        try {
            let result = await StudentModel.find(
                {}, { __v: 0 }
            ).exec();
            res.status(200).send({ status: true, studentList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },
    getStudentByName: async function (req, res) {
        var data = req.body;
        try {
            let result = await StudentModel.find(
                { student_name: data.student_name }
            ).exec();
            res.status(200).send({ status: true, students: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },
    getStudentByPhoneNumber: async function (req, res) {
        var data = req.body;
        try {
            let result = await StudentModel.find(
                { phone_number: { $eq: data.phone_number } }
            ).exec();
            res.status(200).send({ status: true, students: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    deleteStudentByID: async function (req, res) {
        var data = req.body;
        try {
            let result = await StudentModel.deleteOne({ _id: data._id });
            res.status(200).send({ status: true, result, message: 'deleted one student' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    deleteAllStudents: async function (req, res) {
        try {
            let result = await StudentModel.deleteMany({});
            res.status(200).send({ status: true, result, message: 'All Students deleted' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    updateStudentDetails: async function (req, res) {
        var data = req.body;
        try {
            let result = await StudentModel.updateOne(
                { _id: data._id },
                {
                    $set: {
                        student_name: data.student_name,
                        phone_number: data.phone_number,
                        email_id: data.email_id,
                        batch_name: data.batch_name,
                        course_name: data.course_name,
                        fees_details: data.fees_details,
                        admit_status: data.admit_status
                    }
                });
            res.status(200).send({ status: true, result, message: 'updated student details' });
        }
        catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    addNewFeedbackForm: async function (req, res) {
        var data = req.body;
        console.log(data);

        try {
            let newFeedbackFormData = new InterviewerMockFeedbackModel({
                interviewer_details: data.interviewer_details,
                batch_details: data.batch_details,
                student_details: data.student_details,
                feedBackForm: data.feedBackForm,
            });
            console.log(newFeedbackFormData);
            var result = await newFeedbackFormData.save();
            console.log("Result:" + result);
            res.status(200).send({ status: true, result, message: 'Created new Feedback form' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    updateFeedbackByStudent: async function (req, res) {
        var data = req.body;
        try {
            let mockFeedbackForm = InterviewerMockFeedbackModel.findOne(
                {
                    _id: data.feedback_form_id,
                    "student_details.student_id": data.student_id
                },
                {
                    $set: {
                        interviewer_details: data.interviewer_details,
                        batch_details: data.batch_details,
                        student_details: {
                            student_id: data.student_id,
                            student_name: data.student_name,
                            student_phone: data.student_phone,
                            student_email: data.student_email,
                            // submitted_count:data.submitted_count
                        },
                        feedbackForm: data.feedbackForm

                    }
                }
            )
        } catch (error) {

        }
    },

    setMockSubmitCountofStudent: async function (req, res) {
        var data = req.body;
        try {
            let studentDetails = await StudentModel.updateOne(
                { _id: data.student_id },
                {
                    $inc: {
                        mock_submitted_count: 1
                    }
                }, { upsert: true });
            res.status(200).send({ status: true, studentDetails });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    decrementMockSubmitCountofStudent: async function (req, res) {
        var data = req.body;
        try {
            let studentDetails = await StudentModel.updateOne(
                { _id: data.student_id },
                {
                    $inc: {
                        mock_submitted_count: -1
                    }
                }, { upsert: true });
            res.status(200).send({ status: true, studentDetails });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getSubmitCountofStudent: async function (req, res) {
        var data = req.body;
        console.log("GET DATA:" + data);
        try {
            let studentDetails = await StudentModel.findOne({
                // _id: data._id,
                // "student_details.student_id": data.student_id
                _id: data.student_id
            }).exec();
            // console.log(mockSubmittedCount);
            let _submitCount = studentDetails.mock_submitted_count;
            res.status(200).send({ status: true, submitCount: _submitCount });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getFeedbackFormByID: async function (req, res) {
        var data = req.body;
        console.log(data);
        try {
            let result = await InterviewerMockFeedbackModel.find({
                _id: data._id
            }).exec();
            res.status(200).send({ status: true, feedbackForms: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getFeedbackFormList: async function (req, res) {
        try {
            let result = await InterviewerMockFeedbackModel.find(
                {}, { __v: 0 }
            ).exec();
            res.status(200).send({ status: true, feedbackFormList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },


    getFeedbackFormListByStudentID: async function (req, res) {
        let data = req.body;
        console.log(data);
        try {
            let result = await InterviewerMockFeedbackModel.find(
                {
                    // student_details: { student_id: data.student_id }
                    "student_details.student_id": data.student_id
                },{feedBackForm:1}
            ).exec();
            res.status(200).send({ status: true, feedbackFormList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getFeedbackFormDetailsByStudentID:async function(req,res) {
        let data = req.body;
        console.log(data);
        try {
            let result = await InterviewerMockFeedbackModel.find(
                {
                    "student_details.student_id": data.student_id
                }
            ).exec();
            res.status(200).send({ status: true, feedbackFormList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }   
    },

    deleteFeedbackFormByID: async function (req, res) {
        let data = req.body;
        try {
            let result = await InterviewerMockFeedbackModel.deleteOne({ _id: data._id });
            res.status(200).send({ status: true, feedbackForms: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    }
}

module.exports = MockAPIController;