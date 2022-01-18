const { InterviewerModel } = require("../model/TemplateModel");

const InterviewerAPIController = {
    home: function (req, res) {
        res.send({ status: true, message: "default interviewer" });
    },

    createNewInterviewer: async function (req, res) {
        var data = req.body;
        console.log(data);
        try {
            const newInterviewer = new InterviewerModel({
                interviewer_name: data.interviewer_name,
                email_id: data.email_id,
                phone_number: data.phone_number,
                batches:data.batches,
                admin_role:data.interviewer_role,
                templateAssignmentFormsList: data.templateAssignmentFormsList
            });
            const result = await newInterviewer.save();
            res
                .status(200)
                .send({ status: true, result, message: "added new interviewer" });
        } catch (error) {
            res.status(500).send({ status: false, error: error });
        }
    },



    getInterviewerList: async function (req, res) {
        try {
            let result = await InterviewerModel.find({}, { __v: 0 }).exec();
            res.status(200).send({ status: true, interviewerList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getInterviewerById: async function (req, res) {
        var data = req.body;
        console.log(data);
        try {
            let result = await InterviewerModel.find({
                _id: data._id,
            }).exec();
            res.status(200).send({ status: true, interviewers: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    getBatchListByInterviewerID: async function(req,res) {
        var data = req.body;
        console.log(data);
        try {
            let result = await InterviewerModel.find(
                {_id:data._id},{batches:1}).exec();
            res.status(200).send({status:true, interviewers:result});
        } catch (error) {
            res.send(500).send({status:false,error});
        }
    },

    deleteInterviewerByID: async function (req, res) {
        var data = req.body;
        try {
            let result = await InterviewerModel.deleteOne({ _id: data._id });
            res.status(200).send({ status: true, result, data, message: "deleted one interviewer" });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    deleteAllInterviewers: async function (req, res) {
        try {
            let result = await InterviewerModel.deleteMany({});
            res.status(200).send({ status: true, result, message: "All interviewers deleted" });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    updateInterviewerDetails: async function (req, res) {
        var data = req.body;

        try {
            if (data._id !== "No Interviewer found!") {
                let result = await InterviewerModel.updateOne(
                    { _id: data._id },
                    {
                        $set: {
                            interviewer_name: data.interviewer_name,
                            templateAssignmentFormsList: data.templateAssignmentFormsList
                        },
                    }
                );
                console.log(result);
                res
                    .status(200)
                    .send({ status: true, result, message: "updated interviewer details" });
            }
            else {
                res.status(400).send({ status: false, error: "Interviewer List is Empty!" });
            }
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    assignBatchToInterviewer: async function (req, res) {
        var data = req.body;

        try {
            if (data._id !== "No Interviewer found!") {
                let result = await InterviewerModel.updateOne(
                    { _id: data._id },
                    {
                        $set: {
                            interviewer_name: data.interviewer_name,
                            batches:data.batches
                        },
                    }
                );
                console.log(result);
                res
                    .status(200)
                    .send({ status: true, result, message: "updated interviewer details" });
            }
            else {
                res.status(400).send({ status: false, error: "Interviewer List is Empty!" });
            }
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    }
};

module.exports = InterviewerAPIController;