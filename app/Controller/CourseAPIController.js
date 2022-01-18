let { CourseModel } = require("../model/BatchModel");

let CourseAPIController = {
    home: function (req, res) {
        try {
            res.status(200).send({ status: true, message: 'course api' });
        } catch (error) {
            res.status(500).send({ status: false, error });

        }
    },

    createNewCourse: async function (req, res) {
        var data = req.body;
        try {
            const newCourse = new CourseModel({
                course_name: data.course_name,
                domain_name: data.domain_name
            });
            var result = await newCourse.save();
            res.status(200).send({ status: true, result });
        } catch (error) {
            res.status(500).send({ status: false, error: error});
        }
    },
    getCourseList: async function (req, res) {
        try {
            let result = await CourseModel.find(
                {}, { __v: 0 }
            ).exec();
            res.status(200).send({ status: true, courseList: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },
    getCourseByName: async function (req, res) {
        var data = req.body;
        try {
            let result = await CourseModel.find(
                { course_name: data.course_name }
            ).exec();
            res.status(200).send({ status: true, courses: result });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },
   
    deleteCourseByID: async function (req, res) {
        var data = req.body;
        try {
            let result = await CourseModel.deleteOne({ _id: data._id });
            res.status(200).send({ status: true, result, message: 'deleted one course' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    deleteAllCourses:async function(req,res) {
        try {
            let result=await CourseModel.deleteMany({});
            res.status(200).send({status:true,result,message:'All Courses deleted'});
        } catch (error) {
            res.status(500).send({status:false,error});
        }
    },

    updateCourseDetails: async function (req, res) {
        var data = req.body;
        try {
            let result = await CourseModel.updateOne(
                { _id: data._id },
                {
                    $set: {
                        course_name: data.course_name,
                        domain_name: data.domain_name
                    }
                });
            res.status(200).send({status:true,result,message:'updated course details'});
        }
        catch(error){
            res.status(500).send({status:false,error});
        }
    }

}

module.exports = CourseAPIController;