var router = require("express").Router();
const BatchAPIController = require("../Controller/BatchAPIController");
const CourseAPIController = require("../Controller/CourseAPIController");
const EmailDemo = require("../Controller/EmailDemo");
const FileUploader = require("../Controller/FileUploader");
const InterviewerAPIController = require("../Controller/InterviewerAPIController");
const LoginAPIController = require("../Controller/LoginAPIController");
const JOIValidator = require("../Controller/middleware/JOIValidator");
const middleware = require("../Controller/middleware/middleware");
const MockAPIController = require("../Controller/MockAPIController");
const NotificationAPIController = require("../Controller/NotificationAPIController");
const OTPIntegration = require("../Controller/OTPIntegration");
const StudentAPIController = require("../Controller/StudentAPIController");
const TemplateAPIController = require("../Controller/TemplateAPIController");
const TrainerAPIController = require("../Controller/TrainerAPIController");

/************************
 * BATCH API
 */
/*get apis*/
router.get("/batch", BatchAPIController.home);

router.get("/get-batch-list", BatchAPIController.getBatchList);

router.get("/get-batch-by-name", BatchAPIController.getBatchByName);

/*post apis*/
router.post("/get-batch-by-id", BatchAPIController.getBatchById);
router.post("/get-student-list-by-batch-id", BatchAPIController.getStudentListByBatchID);
router.post("/create-new-batch", BatchAPIController.createNewBatch);

/*DELETE API*/
router.delete("/delete-batch-by-id", BatchAPIController.deleteBatchByID);
router.delete("/delete-all-batches", BatchAPIController.deleteAllBatches);
/*PUT API*/
router.put("/update-batch-details", BatchAPIController.updateBatchDetails);
router.put("/update-batch-with-student-details", BatchAPIController.updateBatchStudentDetails);

/***********************
 * COURSE API
 */
/*GET API*/
router.get("/course", CourseAPIController.home);

router.get("/get-course-list", CourseAPIController.getCourseList);

router.get("/get-course-by-name", CourseAPIController.getCourseByName);

/*POST API*/
router.post("/create-new-course", JOIValidator.checkCourseValidation, CourseAPIController.createNewCourse);

/*DELETE API*/
router.delete("/delete-course-by-id", CourseAPIController.deleteCourseByID);

router.delete("/delete-all-courses", CourseAPIController.deleteAllCourses);
/*PUT API*/
router.put("/update-course-details", CourseAPIController.updateCourseDetails);

/************************
 * TRAINER API
 */
/*GET API*/
router.get("/trainer", TrainerAPIController.home);

router.get("/get-trainer-list", TrainerAPIController.getTrainerList);

router.get("/get-trainer-by-name", TrainerAPIController.getTrainerByName);

router.get(
  "/get-trainer-by-phone-number",
  TrainerAPIController.getTrainerByPhoneNumber
);

/*POST API*/
router.post("/create-new-trainer", JOIValidator.checkTrainerValidation, TrainerAPIController.createNewTrainer);
router.post("/batch-list-by-trainer", TrainerAPIController.batchListByTrainer);

/*DELETE API*/
router.delete("/delete-trainer-by-id", TrainerAPIController.deleteTrainerByID);
router.delete("/delete-all-trainers", TrainerAPIController.deleteAllTrainers);
/*PUT API*/
router.put("/update-trainer-details", TrainerAPIController.updateTrainerDetails);


/**************************
 * STUDENT API
 */
/*GET API*/
router.get("/student", StudentAPIController.home);

router.get("/get-student-list", StudentAPIController.getStudentList);

router.get("/get-student-by-name", StudentAPIController.getStudentByName);
router.post("/get-student-by-id", StudentAPIController.getStudentByID);

router.get(
  "/get-student-by-phone-number",
  StudentAPIController.getStudentByPhoneNumber
);

/*POST API*/
router.post("/create-new-student", StudentAPIController.createNewStudent);
router.post("/batch-list-by-student",StudentAPIController.batchListByStudent);
/*DELETE API*/
router.delete("/delete-student-by-id", StudentAPIController.deleteStudentByID);
router.delete("/delete-all-students", StudentAPIController.deleteAllStudents);
/*PUT API*/
router.put("/update-student-details", StudentAPIController.updateStudentDetails);





/************************
 * TEMPLATE API
 */
/*get apis*/
router.get("/template", TemplateAPIController.home);

router.get("/get-template-list", TemplateAPIController.getTemplateList);

router.post("/get-template-by-id", TemplateAPIController.getTemplateById);

/*post apis*/
router.post("/create-new-template", TemplateAPIController.createNewTemplate);

/*DELETE API*/
router.delete("/delete-template-by-id", TemplateAPIController.deleteTemplateByID);
router.delete("/delete-all-templates", TemplateAPIController.deleteAllTemplates);

/*PUT API*/
router.put("/update-template-details", TemplateAPIController.updateTemplateDetails);



/***************
 * Feedback Form
 */
router.get("/get-feedback-form-list", MockAPIController.getFeedbackFormList);

router.post("/get-feedback-form-list-by-student-id",MockAPIController.getFeedbackFormListByStudentID);

router.post("/get-feedback-form-details-by-student-id",MockAPIController.getFeedbackFormDetailsByStudentID);

router.post("/create-new-feedback-form", MockAPIController.addNewFeedbackForm);

router.post("/get-feedback-form-by-id", MockAPIController.getFeedbackFormByID);

router.put("/set-mock-submit-count-of-student",MockAPIController.setMockSubmitCountofStudent);

router.put("/decrement-mock-submit-count-of-student",MockAPIController.decrementMockSubmitCountofStudent);

router.post("/get-submit-count-of-student",MockAPIController.getSubmitCountofStudent);

router.get("/send-sms-integration",OTPIntegration.sendAndVerifyOTP);

router.delete("/delete-feedback-form-by-id",MockAPIController.deleteFeedbackFormByID);


/************************
 * INTERVIEWER API
 */
/*get apis*/
router.get("/interviewer", InterviewerAPIController.home);

router.get("/get-interviewer-list", InterviewerAPIController.getInterviewerList);

router.post("/get-interviewer-by-id", InterviewerAPIController.getInterviewerById);
router.post("/get-batch-list-by-interviewer-by-id", InterviewerAPIController.getBatchListByInterviewerID);

/*post apis*/
router.post("/create-new-interviewer", InterviewerAPIController.createNewInterviewer);

/*DELETE API*/
router.delete("/delete-interviewer-by-id", InterviewerAPIController.deleteInterviewerByID);
router.delete("/delete-all-interviewers", InterviewerAPIController.deleteAllInterviewers);

/*PUT API*/
router.put("/update-interviewer-details", InterviewerAPIController.updateInterviewerDetails);
router.put("/assign-batch-to-interviewer", InterviewerAPIController.assignBatchToInterviewer);



/************************
 * NOTIFICATION API
 */
/*get apis*/
router.get("/get-notification-by-id", NotificationAPIController.getNotificationById);
router.get("/get-notification-list", NotificationAPIController.getNotificationList);

/*post apis*/
router.post("/create-new-notification", NotificationAPIController.createNewNotification);

/*DELETE API*/
router.delete("/delete-notification-by-id", NotificationAPIController.deleteNotificationByID);
router.delete("/delete-all-notifications", NotificationAPIController.deleteAllNotifications);



/***********************
 * LOGIN API
 */
router.post("/add-new-admin-user", JOIValidator.checkRegisterValidation, LoginAPIController.addNewAdminUser);
// router.post("/check-admin-login", JOIValidator.checkLoginValidation, LoginAPIController.checkLogin);
router.post("/check-admin-login", JOIValidator.checkLoginValidation, LoginAPIController.checkLogin);
router.get("/get-admin-users-list", LoginAPIController.getAdminUsers);

router.post("/upload-profile-pic",FileUploader.uploadProfileImage);

/***************************
 * SEND EMAIL
 */
router.post("/send-email", EmailDemo.sendEmailToStudent);

module.exports = router;