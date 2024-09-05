const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const FileController = require('../app/controllers/FileController');
const { verifyToken } = require('../app/middleware/authMiddleware');

const upload = require('../app/middleware/multer');


// Public routes
// http://localhost:3000/api/register
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes
router.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route.');
});

// add and delete user routes
//Delete:  http://localhost:3000/api/users/7
router.delete('/users/:id', verifyToken, UserController.deleteUser);
router.put('/users/:id', verifyToken, UserController.updateUser);



// Image upload route
//http://localhost:3000/api/upload
router.post('/upload', verifyToken, upload.single('image'), FileController.uploadFile);

// Image retrieval route
http://localhost:3000/api/images/filename.jpg Or png
router.get('/images/:filename', FileController.getFile);
module.exports = router;
