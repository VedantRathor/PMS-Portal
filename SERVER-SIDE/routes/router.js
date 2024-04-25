const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const UserController = require('../controllers/userctrl')
const ProjectController = require('../controllers/ProjectController')
const AssignController = require('../controllers/AssignController')
const TaskController = require('../controllers/TaskController')
const LogController = require('../controllers/LogController')

const authIslogin = require('../middlewares/authIslogin')
const multer = require('multer');
const path = require('path');

router.use(express.json())
router.use(bodyParser.urlencoded({extended:false}))
router.use(express.urlencoded({extended:false}))

//UserController
router.post('/Login',UserController.loginUserByEmailPass)
router.post('/register', UserController.adduser)

//ProjectController
router.post('/add-new-project',authIslogin,ProjectController.addNewProject)
router.post('/project-update/:project_id',ProjectController.updateProjectStatus)

router.get('/project',authIslogin,ProjectController.getProjectBymanager_id)
router.get('/project-sort', authIslogin ,ProjectController.getProjectByStatus)
router.get('/project-order' , authIslogin , ProjectController.getProjectByOrder)
router.get('/project/query',authIslogin,ProjectController.getProjectByproject_name)
router.get('/manager',ProjectController.getManagers)
router.get('/project-details-project/:project_id', ProjectController.projectDetailByproject_id)
router.get('/project-details-members/:project_id', ProjectController.memberByproject_id)
router.get('/project/members/not-invlolved/:project_id' , ProjectController.getMemberByproject_idNotInvolved)

//AssignController
router.post('/assignment',authIslogin,AssignController.assignMembers)


//TaskController
router.post('/task',authIslogin,TaskController.createTask)
router.post('/update-task-status',authIslogin,TaskController.updateTaskStatus)

router.get('/project-details-task/:project_id', authIslogin,TaskController.taskByproject_id)
router.get('/project-details-task/query/:project_id',authIslogin,TaskController.taskBySearchQuery)



//LogController
router.post('/add-log/:project_id/:task_id',authIslogin, LogController.addLogInproject_idAndtask_id)
router.post('/update-log-status',authIslogin, LogController.updateLogStatus)

router.get('/project-details-log/:project_id', LogController.logByproject_id)
router.get('/project-details-logByTask/:project_id/:task_id' ,authIslogin, LogController.logByproject_idAndtask_id)

























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


router.put('/EditDetails' ,upload.single('profile'), UserController.UpdateDetails);


module.exports = router;