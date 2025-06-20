const multer = require("multer");
const path = require("path");


// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb)=> {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

//file filter for image

const fileFilter = (req, file, cb) =>{
    if( file.mimetype.startsWith("image/")){
        cb(null, true)
    }
    else{
        cb(new Error("only image files are allowed"), false);
    }
};

const Upload = multer({storage, fileFilter});

module.exports = Upload;