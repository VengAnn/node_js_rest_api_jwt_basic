const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    User.findByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error checking email' });
        }

        if (result.length > 0) {
            // Email already exists
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        // Proceed to create a new user
        const hashedPassword = bcrypt.hashSync(password, 8);
        User.create({ name, email, password: hashedPassword }, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error registering user' });
            }
            res.status(201).json({ success: true, message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = result[0];
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1y' });
        res.status(200).json({
            success: true,
            user: user,
            message: 'Login successful',
            auth: true,
            token
        });
    });
};
//update user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error deleting user' });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User not found' });
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Hash the password if provided
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

    // Prepare data for update
    const updateData = { name, email };
    if (hashedPassword) {
        updateData.password = hashedPassword;
    }

    User.updateById(id, updateData, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error updating user' });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User not found' });
        res.status(200).json({ success: true, message: 'User updated successfully' });
    });
};