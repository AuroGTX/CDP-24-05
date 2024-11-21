import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    rover_serial_number: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [
            'Packing Completed',
            'Arrival at Warehouse',
            'QR Code Scanned',
            'AGV Initiated',
            'Pickup Point Reached',
            'Navigating to Target Shelf',
            'Box Dispatched',
        ],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Status = mongoose.model('Status', statusSchema);

export default Status;
