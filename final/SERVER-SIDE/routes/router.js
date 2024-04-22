const express = require('express') 
const router = express.Router() 
const bodyParser = require('body-parser')
const ctrl = require('../controllers/userctrl')
const authIslogin = require('../middlewares/authIslogin')

router.use(express.json())
router.use(bodyParser.urlencoded({extended:false}))
router.use(express.urlencoded({extended:false}))


router.post('/project',ctrl.addProject)
router.post('/assignment',authIslogin,ctrl.assignMembers)
router.get('/project-details', ctrl.getProjectDetailsByMid)
router.post('/task',authIslogin,ctrl.createTask)
router.post('/log',ctrl.addLog)
router.post('/update-log-status',authIslogin, ctrl.updateLogStatus)
router.post('/update-task-status',authIslogin,ctrl.updateTaskStatus)
router.post('/add-log/:pid/:tid',authIslogin, ctrl.addLogInPidAndTid)
router.post('/project-update/:pid',ctrl.updateProjectStatus)
router.post('/add-new-project',authIslogin,ctrl.addNewProject)

router.get('/manager',ctrl.getManagers)
router.get('/task',ctrl.getTaskByProject)
router.get('/project-details-project/:pid', ctrl.projectDetailByPid)
router.get('/project-details-task/:pid', authIslogin,ctrl.taskByPid)
router.get('/project-details-task/query/:pid',authIslogin,ctrl.taskBySearchQuery)
router.get('/project-details-members/:pid', ctrl.memberByPid)
router.get('/project-details-log/:pid', ctrl.logByPid)
router.get('/project-details-logByTask/:pid/:tid' ,authIslogin, ctrl.logByPidAndTid)
router.get('/project/members/not-invlolved/:pid' , ctrl.getMemberByPidNotInvolved)

router.get('/project',authIslogin,ctrl.getProjectByMid)
router.get('/project-sort', authIslogin ,ctrl.getProjectByStatus)
router.get('/project-order' , authIslogin , ctrl.getProjectByOrder)
router.get('/project/query',authIslogin,ctrl.getProjectByPname)

router.post('/register', ctrl.adduser)
router.post('/Login',ctrl.loginUserByEmailPass)

module.exports = router 