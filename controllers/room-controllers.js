import Room from '@/models/room';

//@ Get all rooms GET - /ap/rooms
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

//@ Create new room  POST - /api/rooms
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

//@ Get room details  POST - /api/rooms/:id
const getSingleRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.query.id);

        if(!room){
            return res.status(404).json({
                success: false,
                error: 'No room found with this ID'
            });
        }

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
    newRoom,
    getSingleRoom
}