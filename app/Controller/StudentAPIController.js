let { StudentModel,BatchModel,ObjectID } = require("../model/BatchModel");

let StudentAPIController = {
    home: function (req, res) {
        try {
            res.status(200).send({ status: true, message: 'default-student' });
        } catch (error) {
            res.status(500).send({ status: false, error });
        }
    },

    createNewStudent: async function (req, res) {
        let data = req.body;
        try {
            let newStudent = new StudentModel({
                student_name: data.student_name,
                phone_number: data.phone_number,
                email_id: data.email_id,
                fees_details: data.fees_details
            });
            var result = await newStudent.save();
            res.status(200).send({ status: true, result, message: 'created new student' });
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
    getStudentByID: async function (req, res) {
        var data = req.body;
        try {
            let result = await StudentModel.find(
                { _id: data._id });
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
    // db.coll.aggregate([
    //     { "$match": { "year": 2013 } },
    //     { "$group": {"_id": "$Name", "Link": {$push: "$Link"}, "count": { "$sum": 1 }}},
    //     { "$project": {"Name": "$_id", _id: 0, "Link": 1, "count": 1}},
    //     { $sort: {count: 1} }
    // ])

    batchListByStudent: async function (req, res) {
        let studentId = req.body.student_id;
        try {
            let result = await StudentModel.aggregate([
                {
                    $match: { _id: ObjectID(studentId) },
                    // $limit:5
                    // $project:{}
                },
               
                {
                    $lookup: {
                        from: BatchModel.collection.collectionName,
                        localField: "_id",//primary key
                        foreignField: "students._id",
                        as: 'batchList'
                    }
                }
            ]);
            res.status(200).send({ status: true, studentList: result });
        } catch (error) {
            res.status(500).send({ status: false, error});
        }
    }
};

module.exports = StudentAPIController;