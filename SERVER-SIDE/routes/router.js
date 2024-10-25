require('dotenv').config();
const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { Client } = require("@octoai/client");
const OCTO_TOKEN = process.env.OCTA_TOKEN;

const client = new Client(OCTO_TOKEN);
const router = express.Router()

const bodyParser = require('body-parser')
const UserController = require('../controllers/userctrl')
const ProjectController = require('../controllers/ProjectController')
const AssignController = require('../controllers/AssignController')
const TaskController = require('../controllers/TaskController')
const LogController = require('../controllers/LogController')
const AttendanceController = require('../controllers/AttendanceController');
const CompanyController = require('../controllers/CompanyController');
const authIslogin = require('../middlewares/authIslogin')
const multer = require('multer');


router.use(express.json())
router.use(bodyParser.urlencoded({extended:false}))
router.use(express.urlencoded({extended:false}))

const uploadDir = path.join(__dirname, '../storage/uploads');

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = uploadDir; // Set the folder to the volume path for images

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

var upload = multer({ storage: storage });
//CompanyContorller
router.post('/api/company-controller/register-company',CompanyController.registerCompany);

// AttendanceController 
router.post('/api/attendance-portal/mark-attendance',AttendanceController.markAttendance);
router.get('/api/attendance-portal/get-attendance' , authIslogin ,  AttendanceController.getAttendance) ; 


//NOtification 
router.get('/notification/:view',authIslogin, UserController.getNotifications)

//UserController
router.post('/Login',UserController.loginUserByEmailPass)
router.post('/register',authIslogin, UserController.adduser)
router.get('/api/allusers',authIslogin,UserController.getAllUsers) ;
router.post('/update-user',authIslogin,UserController.updateUserInfo) ;
router.post('/update-user-profile',authIslogin,upload.single("profileImage"),UserController.update_user_profile) ;
router.post('/upload-video',authIslogin,upload.single("videoName"), UserController.uploadVideo );


//ProjectController
router.post('/add-new-project',authIslogin,ProjectController.addNewProject);
router.post('/project-update/:project_id',authIslogin,ProjectController.updateProjectStatus);

router.get('/project',authIslogin,ProjectController.getProjectBymanager_id)
router.get('/project-sort', authIslogin ,ProjectController.getProjectByStatus)
router.get('/project-order' , authIslogin , ProjectController.getProjectByOrder)
router.get('/project/query',authIslogin,ProjectController.getProjectByproject_name)
router.get('/manager',authIslogin,ProjectController.getManagers)
router.get('/project-details-project/:project_id',authIslogin,ProjectController.projectDetailByproject_id)
router.get('/project-details-members/:project_id', authIslogin,ProjectController.memberByproject_id)
router.get('/project/members/not-invlolved/:project_id' , authIslogin,ProjectController.getMemberByproject_idNotInvolved)

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
router.get('/project-details-log/:project_id', authIslogin,LogController.logByproject_id)
router.get('/project-details-logByTask/:project_id/:task_id' ,authIslogin, LogController.logByproject_idAndtask_id)
router.get('/project-details-log-allLogs/:project_id/:status/:sortby',authIslogin, LogController.allLogs);

// router.get('/project-member-investigation/:project_id', LogController.logCountByMembers);


router.post('/generate-pdf', (req, res) => {
    // Extract data from req.body
    const {data}  = req.body 
     const { project_id , project_name , project_details ,created_at,updated_at,created_by} = data  


    // Create a new PDF document
    const doc = new PDFDocument();
     doc.info.Title = 'Project Details';
      doc.info.Author = 'Vedant Rathore';
      doc.font('Helvetica-Bold').fontSize(16);

      doc.text('Project Details', { align: 'center' ,underline:'true'});
      doc.moveDown(); // Move cursor down

      doc.font('Helvetica').fontSize(12);

      doc.text(`Project Id: ${project_id}`)
      doc.moveDown()

      doc.text(`Project Name: ${project_name}`)
      doc.moveDown()
      
      doc.text(`Project Details: ${project_details}`)
      doc.moveDown()
      doc.text(`Created At: ${created_at}`)
      doc.moveDown()

      doc.text(`Updated At: ${updated_at}`)
      doc.moveDown()

      doc.text(`Created By: ${created_by}`)
      doc.moveDown()
      doc.moveDown()
      doc.moveDown()
      doc.moveDown()
      doc.moveDown()
      doc.fillColor('brown').text(`Follow: https://www.linkedin.com/in/vedant-rathore-8bb905211/`).stroke()
      doc.fillColor('brown').text(`Email: vedantrathore627@gmail.com`).stroke()
    //   doc.pipe(res);
    // Buffer to store the generated PDF
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        // Concatenate all buffers into one
        const pdfData = Buffer.concat(buffers);

        // Set headers for PDF download
        res.setHeader('Content-Length', pdfData.length);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated_pdf.pdf"');

        // Send the PDF data as the response
        res.send(pdfData);
    });

    // Add content to the PDF
  

    // Finalize the PDF
    doc.end();
});


























// File Uploading

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//     },
// });

// const maxSize = 5 * 1000 * 1000; //5mb

// var upload = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//     fileFilter: function (req, file, cb) {
//         // Set the filetypes, it is optional
//         var filetypes = /jpeg|jpg|png/;
//         var mimetype = filetypes.test(file.mimetype);

//         var extname = filetypes.test(
//             path.extname(file.originalname).toLowerCase()
//         );

//         if (mimetype && extname) {
//             return cb(null, true);
//         }

//         cb(
//             "Error: File upload only supports the " +
//             "following filetypes - " +
//             filetypes
//         );
//     },

// });


// router.put('/EditDetails' ,upload.single('profile'), UserController.UpdateDetails);



router.post('/upload-pdf' , upload.single("file"),async(req,res) =>{
   try {
     // Construct the file path
     const filePath = path.join(__dirname,'..', '/src' ,'files', req.file.filename);
    
     // Read the PDF file into a buffer
     const fileBuffer = fs.readFileSync(filePath);

     // Extract text from the PDF
     const data = await pdfParse(fileBuffer);
        
     // when we get the data, we will call our api.
     const completion = await client.chat.completions.create( {
        "messages": [
          {
            "role": "system",
            "content": "You are a tool that summarizes text. This tool is a web appliation that extracts text from a PDF document and produces a formatted list of the main points in the given text. Do not communicate with the user directly."
          },
          {
            "role": "assistant",
            "content": `text:\n${data.text}`
          },
        ],
        "model": "mixtral-8x7b-instruct-fp16",
        "presence_penalty": 0,
        "temperature": 0.3,
        "top_p": 0.9
      });   
      res.status(200).json({ message: completion.choices[0].message });
    
   } catch (error) {
     console.log('error in upload file' ,error);
   }
});




module.exports = router;