const User = require('../models/userModel'); // Предполагается, что вы экспортируете User в вашем index.js моделей

// Получить всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Получить одного пользователя по ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            const updateData = req.body;

            if (req.file) {
                updateData.profilePhotoUrl = `/uploads/${req.file.filename}`;
            }

            await user.update(updateData);
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getLastOnline = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            const now = new Date();
            const lastOnline = new Date(user.lastOnline);
            const minutesAgo = Math.round(((now - lastOnline) / 1000) / 60);
            res.json({ userId: user.id, minutesAgo });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};




exports.getAllUsersLastOnline = async (req, res) => {
    try {
        const users = await User.findAll();
        const now = new Date();

        const usersLastOnline = users.map(user => {
            const lastOnline = new Date(user.lastOnline);
            const minutesAgo = Math.round(((now - lastOnline) / 1000) / 60);
            return {
                userId: user.id,
                minutesAgo: minutesAgo
            };
        });

        res.json(usersLastOnline);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Получить пользователя по адресу
exports.getUserByAddress = async (req, res) => {

    try {
        let user = await User.findOne({
            where: {
                address: req.params.address
            }
        });

        console.log(user)

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'User not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error', error});
    }
}