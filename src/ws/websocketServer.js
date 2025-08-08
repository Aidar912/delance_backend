const socketIo = require('socket.io');
const Message = require('../models/messageModel');

function configureSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A new client connected');

        // Обработчик события подключения пользователя к комнате
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId); // Подключаем пользователя к указанной комнате
        });

        socket.on('message', async (message) => {
            console.log('Received message:', message);

            try {
                await Message.create({
                    text: message.text,
                    senderId: message.sender.id,
                    roomId: message.roomId,
                    time: new Date(),
                });

                // Отправляем сообщение только получателю в их общую комнату
                socket.to(message.roomId).emit('message', message);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });
}

module.exports = configureSocket;