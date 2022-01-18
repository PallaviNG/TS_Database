const { NotificationModel } = require("../model/NotificationModel");

const NotificationAPIController = {

  createNewNotification: async function (req, res) {
    var data = req.body;
    try {
      const newNotification = new NotificationModel({
        notificationMessage:data.notificationMessage
      });
      const result = await newNotification.save();
      res
        .status(200)
        .send({ status: true, result, message: "you got new notification!" });
    } catch (error) {
      res.status(500).send({ status: false, error: error });
    }
  },

  getNotificationById: async function (req, res) {
    var data = req.body;
    try {
      let result = await NotificationModel.find({
        _id: data._id,
      }).exec();
      res.status(200).send({ status: true, notifications: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },


  getNotificationList: async function (req, res) {
    try {
      let result = await NotificationModel.find({}, { __v: 0 }).exec();
      res.status(200).send({ status: true, notificationList: result});
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
  
  deleteNotificationByID: async function (req, res) {
    var data = req.body;
    try {
      let result = await NotificationModel.deleteOne({ _id: data._id });
      res.status(200).send({ status: true, result, data, message: "deleted one notification" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  deleteAllNotifications: async function (req, res) {
    try {
      let result = await NotificationModel.deleteMany({});
      res.status(200).send({ status: true, result, message: "All notifications deleted" });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  }
};

module.exports = NotificationAPIController;