const Room = require('../models/room');
const rooms = require('../data/rooms');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const seedRooms = async () => {
    try {
        await Room.deleteMany();
        console.log('Deleted all rooms');

        await Room.insertMany(rooms);
        console.log('New rooms have been added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedRooms();

