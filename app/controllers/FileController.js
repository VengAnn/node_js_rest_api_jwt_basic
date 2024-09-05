const path = require('path');
const fs = require('fs');

// Handle file upload
exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({ success: true, message: 'File uploaded successfully', file: req.file });
};

// Handle file retrieval
exports.getFile = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../public/images', filename);

    // Check if file exists before attempting to send it
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
        res.sendFile(filePath);
    });
};
