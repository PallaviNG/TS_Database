const JOI = require("joi");

var JOIValidator = {

    checkLoginValidation: function (req, res, next) {
        let data = req.body;
        console.log(data);

        let Schema = JOI.object({
            admin_name: JOI.string().required(),
            admin_password: JOI.string().required(), //pattern(new RegExp('^[a-zA-Z0-9]$'))
            admin_role: JOI.string().valid('admin', 'trainer', 'student','interviewer').required()
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },

    checkRegisterValidation: function (req, res, next) {
        let data = req.body;
        console.log(data);
        
        let Schema = JOI.object({
            admin_name: JOI.string().required(),
            admin_password: JOI.string().required(), //pattern(new RegExp('^[a-zA-Z0-9]$'))
            admin_email: JOI.string().required(),
            admin_contact:JOI.number().required(),
            admin_role: JOI.string().valid('admin', 'trainer', 'student','interviewer').required()
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },



    checkTemplateValidation: function (req, res, next) {
        let data = req.body;
        let Schema = JOI.object({
            template_title: JOI.string().required(),
            questionSets:JOI.array().items(JOI.object({
                // Dynamic Component schema
                question: JOI.string().required(),
                // answer: JOI.string(),
                // score: JOI.number(),
                // name: JOI.string(),
                // value: JOI.string().allow(null, ''),
                componentType: JOI.string().required(),
                // otherOption: JOI.array().allow([])
            }))
        });
        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },

    checkDynamicComponentValidation: function (req, res, next) {
        let data = req.body;
        let Schema = JOI.object({
            question: JOI.string().required(),
            answer: JOI.string(),
            score: JOI.number(),
            name: JOI.string(),
            value: JOI.string(),
            componentType: JOI.string().required(),
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },

    checkBatchValidation: function (req, res, next) {
        let data = req.body;
        let Schema = JOI.object({
            batch_name: JOI.string().required(),
            course_name: JOI.string().required(),
            trainer_id: JOI.string().required(),
            no_of_students: JOI.number().required()
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },

    checkStudentValidation: function (req, res, next) {
        let data = req.body;
        let Schema = JOI.object({
            student_name: JOI.string().required(),
            phone_number: JOI.number().required(),
            email_id: JOI.string().required(),
            batch_name: JOI.string().required(),
            course_name: JOI.string().required(),
            fees_details: JOI.fees_details().required(),
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },


    checkTrainerValidation: function (req, res, next) {
        let data = req.body;
        let Schema = JOI.object({
            trainer_name: JOI.string().required(),
            phone_number: JOI.number().required(),
            email_id: JOI.string().required(),
            course_name: JOI.string().required(),
            batch_name: JOI.string().required()
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    },


    checkCourseValidation: function (req, res, next) {
        let data = req.body;
        let Schema = JOI.object({
            course_name: JOI.string().required(),
            domain_name: JOI.string().required(),
        });

        let validationResult = Schema.validate(data);
        console.log(validationResult);
        if (validationResult.error) {
            var result = {
                status: false,
                message: validationResult.error.message
            };
            res.status(400).send(result);
            return false;
        }
        else {
            next();
        }
    }
}

module.exports = JOIValidator;