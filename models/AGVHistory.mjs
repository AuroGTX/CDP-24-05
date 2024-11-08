import mongoose from 'mongoose';

const AGVSchema = new mongoose.Schema({
    agvId: { 
        type: String, 
        required: true 
    },

    xCordinate: { 
        type: String, 
        required: true 
    },

    yCordinate: { 
        type: String, 
        required: true 
    },

    timeStamp: { 
        type: Date, 
        required: true 
    },

    
});

export default mongoose.model('AGV_history', AGVSchema);
