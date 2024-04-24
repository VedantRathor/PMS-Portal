const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const controller = require('../controllers/userctrl')
const authIslogin = require('../middlewares/authIslogin')
const multer = require('multer');
const path = require('path');

router.use(express.json())
router.use(bodyParser.urlencoded({extended:false}))
router.use(express.urlencoded({extended:false}))

// not in use
router.post('/log',controller.addLog)
router.post('/project',controller.addProject)
router.get('/task',controller.getTaskByProject)
/* all-checked */

router.post('/Login',controller.loginUserByEmailPass)
router.post('/register', controller.adduser)
router.post('/add-new-project',authIslogin,controller.addNewProject)
router.post('/project-update/:project_id',controller.updateProjectStatus)
router.post('/assignment',authIslogin,controller.assignMembers)
router.post('/task',authIslogin,controller.createTask)
router.post('/update-task-status',authIslogin,controller.updateTaskStatus)
router.post('/add-log/:project_id/:task_id',authIslogin, controller.addLogInproject_idAndtask_id)
router.post('/update-log-status',authIslogin, controller.updateLogStatus)

router.get('/project',authIslogin,controller.getProjectBymanager_id)
router.get('/project-sort', authIslogin ,controller.getProjectByStatus)
router.get('/project-order' , authIslogin , controller.getProjectByOrder)
router.get('/project/query',authIslogin,controller.getProjectByproject_name)
router.get('/project-details-log/:project_id', controller.logByproject_id)
router.get('/project-details-project/:project_id', controller.projectDetailByproject_id)
router.get('/project-details-members/:project_id', controller.memberByproject_id)
router.get('/project-details', controller.getProjectDetailsBymanager_id)

router.get('/manager',controller.getManagers)
router.get('/project-details-task/:project_id', authIslogin,controller.taskByproject_id)
router.get('/project-details-task/query/:project_id',authIslogin,controller.taskBySearchQuery)
router.get('/project-details-logByTask/:project_id/:task_id' ,authIslogin, controller.logByproject_idAndtask_id)
router.get('/project/members/not-invlolved/:project_id' , controller.getMemberByproject_idNotInvolved)











// File Uploading

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});

const maxSize = 5 * 1000 * 1000; //5mb

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(
            "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
    },

});


router.put('/EditDetails' ,upload.single('profile'), controller.UpdateDetails);


module.exports = router;