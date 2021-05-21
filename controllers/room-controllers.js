import Room from '@/models/room';

const allRooms = async (_, res) => {
    try {
        const rooms = await Room.find();
    
        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//@ Create new room  --> /api/rooms
const newRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

export {
    allRooms,
    newRoom
}