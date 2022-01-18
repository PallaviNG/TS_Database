let { TrainerModel, BatchModel, ObjectID } = require("../model/BatchModel");

let TrainerAPIController = {
  home: function (req, res) {
    try {
      res.status(200).send({ status: true, message: "default trainer" });
    } catch (error) {
      res.status(500).send({ status: false, error: error + "default trainer" });
    }
  },

  createNewTrainer: function (req, res) {
    var data = req.body;
    try {
      let newTrainer = new TrainerModel({
        trainer_name: data.trainer_name,
        phone_number: data.phone_number,
        email_id: data.email_id,
        course_name: data.course_name,
        batch_name: data.batch_name,
      });

      let result = newTrainer.save();
      res
        .status(200)
        .send({ status: true, result, message: "created new trainer" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
  getTrainerList: async function (req, res) {
    try {
      let result = await TrainerModel.find({}, { __v: 0 }).exec();
      res.status(200).send({ status: true, trainerList: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
  getTrainerByName: async function (req, res) {
    var data = req.body;
    try {
      let result = await TrainerModel.find({
        trainer_name: data.trainer_name,
      }).exec();
      res.status(200).send({ status: true, trainers: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
  getTrainerByPhoneNumber: async function (req, res) {
    var data = req.body;
    try {
      let result = await TrainerModel.find({
        phone_number: { $eq: data.phone_number },
      }).exec();
      res.status(200).send({ status: true, trainers: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  deleteTrainerByID: async function (req, res) {
    var data = req.body;
    try {
      let result = await TrainerModel.deleteOne({ _id: data._id });
      res.status(200).send({ status: true, result, message: "deleted one trainer" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  deleteAllTrainers: async function (req, res) {
    var data = req.body;
    try {
      let result = await TrainerModel.deleteMany({});
      res.send({ status: true, result, message: "Trainer list is empty" });
    } catch (error) {
      res.send({ status: false, error });
    }
  },
  updateTrainerDetails: async function (req, res) {
    var data = req.body;
    try {
      let result = await TrainerModel.updateOne(
        { _id: data._id },
        {
          $set: {
            trainer_name: data.trainer_name,
            phone_number: data.phone_number,
            email_id: data.email_id,
            course_name: data.course_name,
            batch_name: data.batch_name,
          },
        }
      );
      res
        .status(200)
        .send({ status: true, result, message: "updated student details" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
  batchListByTrainer: async function (req, res) {
    let id = req.body.user_id;
    try {
      let result = await TrainerModel.aggregate([
        {
          $match: { _id: ObjectID(id) },
        },
        {
          $lookup: {
            from: BatchModel.collection.collectionName,
            localField: "_id", //primary key
            foreignField: "trainer_id",
            as: "batchList",
          },
        },
      ]);
      res.send({ status: 1, result });
    } catch (error) {
      res.send({ status: 0, error });
    }
  },
};

module.exports = TrainerAPIController;
