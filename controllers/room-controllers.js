import Room from '@/models/room';
import APIFeatures from '../utils/api-features';
import ErrorHandler from '../utils/error-handler';
import catchAsyncErrors from '@/middlewares/catch-async-error';

//@ Get all rooms GET - /ap/rooms
const allRooms = catchAsyncErrors(async (req, res) => {
    const apiFeatures = new APIFeatures(Room.find(), req.query).search()

    const rooms = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        count: rooms.length,
        data: rooms
    });
})

//@ Create new room  POST - /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        data: room
    });
})

//@ Get room details  POST - /api/rooms/:id
const getSingleRoom =  catchAsyncErrors(async (req, res, next) => {
    const room = await Room.findById(req.query.id);

    if(!room){
        return next(new ErrorHandler('No room found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        data: room
    });
})

//@ Update room details  PUT - /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {
    const room = await Room.findById(req.query.id);

    if(!room){
        return next(new ErrorHandler('No room found with this ID', 404))
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        data: updatedRoom
    });
})

//@ Delete room details  DELETE - /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {
    const room = await Room.findById(req.query.id);

    if(!room){
        return next(new ErrorHandler('No room found with this ID', 404))
    }

    await room.remove();

    res.status(200).json({
        success: true,
        message: 'Room deleted'
    });
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}