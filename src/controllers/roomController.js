const Room = require('../models/RoomModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const { Op } = require('sequelize');

exports.createRoom = async (req, res) =>{
    try {
        const { userId1, userId2 } = req.body;

        // Проверяем, что оба пользователя существуют
        const user1 = await User.findByPk(userId1);
        const user2 = await User.findByPk(userId2);
        if (!user1 || !user2) {
            return res.status(400).json({ error: 'One or both users do not exist' });
        }

        // Создаем комнату
        const room = await Room.create({ userId1, userId2 });

        res.status(201).json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// exports.getAllRooms = async (req, res) => {
//     try {
//         const rooms = await Room.findAll();
//         res.status(200).send(rooms);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };
//
// exports.getRoomById = async (req, res) => {
//     try {
//         const room = await Room.findByPk(req.params.id);
//         if (room) {
//             res.status(200).send(room);
//         } else {
//             res.status(404).send({ message: 'Room not found' });
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };
//
// exports.updateRoom = async (req, res) => {
//     try {
//         const room = await Room.findByPk(req.params.id);
//         if (room) {
//             await room.update(req.body);
//             res.status(200).send(room);
//         } else {
//             res.status(404).send({ message: 'Room not found' });
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };
//
// exports.deleteRoom = async (req, res) => {
//     try {
//         const room = await Room.findByPk(req.params.id);
//         if (room) {
//             await room.destroy();
//             res.status(204).send({ message: 'Room deleted' });
//         } else {
//             res.status(404).send({ message: 'Room not found' });
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

exports.getRoomsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const rooms = await Room.findAll({
            where: {
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            },
            include: [
                { model: User, as: 'user1' },
                { model: User, as: 'user2' }
            ]
        });

        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllMessagesByRoomId = async (req, res) => {
    try {
        const roomId = req.params.roomId;

        // Находим все сообщения в указанной комнате
        const messages = await Message.findAll({
            where: { roomId },
            include: { model: User, as: 'sender' } // Включаем информацию об отправителе
        });

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createMessage = async (req, res) => {
    try {
        // Извлекаем данные из тела запроса
        const { text, senderId, roomId} = req.body;

        // Создаем сообщение в базе данных
        const message = await Message.create({
            text,
            senderId,
            roomId,
        });

        res.status(201).json(message); // Отправляем созданное сообщение в ответе
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};