const { AdminModel } = require("../model/LoginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { InterviewerModel } = require("../model/TemplateModel");
const {StudentModel,TrainerModel} = require("../model/BatchModel");


var LoginAPIController = {
  checkLogin: async function (req, res) {
    let loginData = req.body;
    console.log(loginData);
    let adminUser;
    try {
      if (loginData.admin_role === "admin") {
        adminUser = await AdminModel.findOne({
          admin_name: loginData.admin_name,
        });
      }
      else if (loginData.admin_role === "interviewer") {
        adminUser = await InterviewerModel.findOne({
          interviewer_name: loginData.admin_name
        });
      }
      else if(loginData.admin_role==="student") {
        adminUser = await StudentModel.findOne({
          student_name:loginData.admin_name
        });
      }
      else if(loginData.admin_role==="trainer") {
        adminUser = await TrainerModel.findOne({
          trainer_name:loginData.trainer_name
        });
      }
      // console.log(adminUser);
      if (adminUser) {
        let result;
        if (adminUser.admin_role === "admin") {
          result = await bcrypt.compare(
            loginData.admin_password,
            adminUser.admin_password
          );
        }
        else if (adminUser.admin_role === "interviewer") {
          result = await bcrypt.compare(
            loginData.admin_password,
            adminUser.interviewer_password
          );
        }
        else if(adminUser.admin_role==="student") {
          result = await bcrypt.compare(
            loginData.admin_password,
            adminUser.student_password
          );
        }
        else if(adminUser.admin_role==="trainer") {
          result = await bcrypt.compare(
            loginData.admin_password,
            adminUser.trainer_password
          )
        }

        console.log(result);
        let token;
        if (result === true) {
          if (adminUser.admin_role === "interviewer") {
            token = jwt.sign(
              {
                admin_name: adminUser.interviewer_name,
                id: adminUser._id,
                admin_role: adminUser.admin_role
              },
              process.env.PRIVATE_KEY
              // { expiresIn: '1h' }
            );
          }
          else if (adminUser.admin_role === "admin") {
            token = jwt.sign(
              {
                admin_name: adminUser.admin_name,
                id: adminUser._id,
                admin_role: adminUser.admin_role
              },
              process.env.PRIVATE_KEY
              // { expiresIn: '1h' }
            );
          }
          else if(adminUser.admin_role==='student') {
            token = jwt.sign({
              admin_name:adminUser.student_name,
              id:adminUser._id,
              admin_role:adminUser.admin_role
            },
            process.env.PRIVATE_KEY
            );
          }
          else if(adminUser.admin_role==='trainer') {
            token = jwt.sign(
              {
                admin_name:adminUser.trainer_name,
                id:adminUser._id,
                admin_role:adminUser.admin_role
              },
              process.env.PRIVATE_KEY
            );
          }
          res.header("Access-Control-Expose-Headers", "x_auth_token");
          res.header("Access-Control-Max-Age", 60);
          res.header("x_auth_token", token);
          res.status(200).send({ status: true, result });
        } else {
          res.status(400).send({ status: false, error: "invalid password" });
        }//result
      }//adminUser
      else {
        res
          .status(403)
          .send({ status: false, error: "Admin does not exist!Please Sign up before login." });
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
  addNewAdminUser: async function (req, res) {
    let userData = req.body;
    console.log(userData);
    try {
      
      let userCount;
      if(userData.admin_role==="admin") {
        userCount = await AdminModel.findOne({
          admin_name: userData.admin_name,
        }).count();
      }
      else if(userData.admin_role==='interviewer') {
        userCount=await InterviewerModel.findOne({
          interviewer_name:userData.admin_name
        }).count();
      }
      else if(userData.admin_role==="trainer") {
        userCount = await TrainerModel.findOne({
          trainer_name:userData.admin_name
        }).count();
      }
      else if(userData.admin_role==="student") {
        userCount = await StudentModel.findOne({
          student_name:userData.admin_name
        }).count();
      }
      if (userCount > 0) {
        res.status(400).send({ status: false, error: "Admin already exists" });
      } else {
        let salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(userData.admin_password, salt);

        let adminUser;
        if (userData.admin_role === "admin") {
          adminUser = new AdminModel({
            admin_name: userData.admin_name,
            admin_password: newPassword,
            admin_email: userData.admin_email,
            admin_role: userData.admin_role,
            admin_contact: userData.admin_contact
          });
        }
        else if (userData.admin_role === "interviewer") {
          adminUser = new InterviewerModel({
            interviewer_name: userData.admin_name,
            interviewer_password: newPassword,
            email_id: userData.admin_email,
            admin_role: userData.admin_role,
            interviewer_phone:userData.admin_contact
          });
        }
        else if(userData.admin_role === "student") {
          adminUser = new StudentModel({
            student_name:userData.admin_name,
            student_password:newPassword,
            email_id:userData.admin_email,
            admin_role:userData.admin_role,
            phone_number:userData.admin_contact
          });
        }
        var result = await adminUser.save();
        console.log(result);
        let token = jwt.sign(
          {
            admin_name: result.admin_name,
            id: result._id,
            admin_role: result.admin_role
          },
          process.env.PRIVATE_KEY
        );
        console.log("Token:" + token);
        res.header('Access-Control-Expose-Headers', 'x_auth_token');
        res.header("x_auth_token", token);
        res.status(200).send({
          status: true,
          message: "admin user registered successfully",
        });
      }
    } catch (error) {
      res.status(500).send({ status: false, error: error });
    }
  },

  getAdminUserByID: async function (req, res) {
    var data = req.body;
    try {
      let result = await AdminModel.find({ _id: data._id }, { __v: 0 }).exec();
      res.status(200).send({ status: true, admins: result })
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },

  getAdminUsers: async function (req, res) {
    try {
      let result = await AdminModel.find({}, { __v: 0 }).exec();
      res.status(200).send({ status: true, adminList: result });
    } catch (error) {
      res.status(500).send({ status: false, error });
    }
  },
};

module.exports = LoginAPIController;