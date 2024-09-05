const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import UUID

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the public/images directory exists
        const uploadDir = path.join(__dirname, '../../public/images');
        cb(null, uploadDir); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        // Use UUID and original file extension to ensure unique filename
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage,
    limits: { fileSize: 1000000 }, // Limit file size (e.g., 1MB)
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;
