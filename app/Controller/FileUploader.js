const multer = require("multer");

var storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"temp/uploads")
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname+"-"+Date.now())
    }
});


const FileUploader = {
    
    uploadProfileImage: function(req,res) {
        let profile = req.file;
        console.log(req.file);

        var upload = multer({storage:storage});
        // upload.single('myFile');
        
        /*SAVING INTO DB
        let profile = (req.file) ?req.file.filename:null
        */
    }
};

module.exports= FileUploader;