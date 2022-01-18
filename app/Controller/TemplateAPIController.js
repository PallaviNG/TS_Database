const { TemplateModel } = require("../model/TemplateModel");
const {InterviewerMockFeedbackModel} = require("../model/TemplateModel");

const TemplateAPIController = {
  home: function (req, res) {
    res.send({ status: true, message: "default template" });
  },

  createNewTemplate: async function (req, res) {
    var data = req.body;
    // console.log(data);
    try {
      const newTemplate = new TemplateModel({
        questionSets: data.questionSets,
        template_title: data.template_title,
        createdBy:data.createdBy
      });
      const result = await newTemplate.save();
      res
        .status(200)
        .send({ status: true, result, message: "created new template" });
    } catch (error) {
      res.status(500).send({ status: false, error: error });
    }
  },

  getTemplateList: async function (req, res) {
    try {
      let result = await TemplateModel.find({}, { __v: 0 }).exec();
      res.status(200).send({ status: true, templateList: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  getTemplateById: async function (req, res) {
    var data = req.body;
    console.log(data);
    try {
      let result = await TemplateModel.find({
        _id: data._id,
      }).exec();
      res.status(200).send({ status: true, templates: result });
    } catch(error) {
      res.status(500).send({ status: false, error });
    }
  },

  deleteTemplateByID: async function (req, res) {
    var data = req.body;
    try {
      let result = await TemplateModel.deleteOne({ _id: data._id });
      res.status(200).send({ status: true, result, data, message: "deleted one template" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },


  deleteAllTemplates: async function (req, res) {
    try {
      let result = await TemplateModel.deleteMany({});
      res.status(200).send({ status: true, result, message: "All Batches deleted" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },


  updateTemplateDetails: async function (req, res) {
    var data = req.body;
    try {
      if(data._id!==null) {
      let result = await TemplateModel.updateOne(
        { _id: data._id },
        {
          $set: {
            question: data.question,
            answer: data.answer,
            score: data.score,
            template_title: data.template_title
          },
        }
      );
      res
        .status(200)
        .send({ status: true, result, message: "updated template details" });
      }
      else {
        res.status(400).send({status:false,result,message:"ID cannot be blank"});
      }
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
};

module.exports = TemplateAPIController;