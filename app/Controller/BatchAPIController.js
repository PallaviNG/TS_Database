let { BatchModel, TrainerModel } = require("../model/BatchModel");

const BatchAPIController = {
  home: function (req, res) {
    res.send({ status: true, message: "default batch" });
  },

  createNewBatch: async function (req, res) {
    var data = req.body;
    console.log(data);
    try {
      const newBatch = new BatchModel({
        batch_name: data.batch_name,
        course_name: data.course_name,
        batch_trainer: data.batch_trainer,
        students: data.students
      });
      const result = await newBatch.save();
      res
        .status(200)
        .send({ status: true, result, message: "created new batch" });
    } catch (error) {
      res.status(500).send({ status: false, error: error });
    }
  },

  getBatchList: async function (req, res) {
    try {
      let result = await BatchModel.find({}, { __v: 0 }).exec();
      res.status(200).send({ status: true, batchList: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  getBatchById: async function (req, res) {
    var data = req.body;
    console.log("Data:"+data);
    try {
      let result = await BatchModel.find({
        _id: data._id,
      }).exec();
      res.status(200).send({ status: true, batches: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  getStudentListByBatchID: async function (req, res) {
    var data = req.body;
    console.log(data);
    try {
      let result = await BatchModel.find(
        { _id: data._id }, { students: 1 }).exec();
      res.status(200).send({ status: true, batches: result });
    } catch (error) {
      res.send(500).send({ status: false, error });
    }
  },

  getBatchByName: async function (req, res) {
    var data = req.body;
    try {
      let result = await BatchModel.find({
        batch_name: data.batch_name,
      }).exec();
      res.status(200).send({ status: true, batches: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  deleteBatchByID: async function (req, res) {
    var data = req.body;
    try {
      let result = await BatchModel.deleteOne({ _id: data._id });
      res.send({ status: true, result, message: "deleted one batch" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  deleteAllBatches: async function (req, res) {
    try {
      let result = await BatchModel.deleteMany({});
      res.send({ status: true, result, message: "All Batches deleted" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  updateBatchDetails: async function (req, res) {
    var data = req.body;
    try {
      let result = await BatchModel.updateOne(
        { _id: data._id },
        {
          $set: {
            batch_name: data.batch_name,
            course_name: data.course_name,
            trainer_name: data.trainer_name,
            no_of_students: data.no_of_students,
          },
        });
      res.status(200).send({ status: true, result, message: "updated student details" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  updateBatchStudentDetails: async function (req, res) {
    var data = req.body;
    try {
      let result = await BatchModel.updateOne(
        { _id: data._id },
        {
          $set: {
            batch_name: data.batch_name,
            students: data.students,
            no_of_students: data.no_of_students
          }
        }
      );
      res.status(200).send({ status: true, result, message: "Added New Student to Batch" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  }
};

module.exports = BatchAPIController;
