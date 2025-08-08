const User = require('../models/userModel');
const { ethers } = require("ethers");

exports.verifySignature = async (req, res) => {
    const { address, signature, message } = req.body;
    try {
        const isVerified = ethers.verifyMessage(message,signature);

        if (!isVerified) {
            return res.status(401).json({ message: 'Verification failed' });
        }
        let user = await User.findOne({
            where: {
                address: address
            }
        });
        if (!user) {
            user = await User.create({ address, lastOnline: new Date() });
            await user.save();
        } else {
            user.lastOnline = new Date();
            await user.save();
        }

        res.json({ "verify": true});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
};

