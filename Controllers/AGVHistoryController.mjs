import AGVHistory from "../models/AGVHistory.mjs";

export const addAGV = async (req, res) => {
    try {
        const agv = req.body;
        // agv = new AGVHistory({
        //     agv.agvId,
        //     ,
        //     date,
        //     material,
        //     serial_number,
        //     time,
        //     unique_id
        // });
        agv.timeStamp=new Date();


        await agv.save();
        results.push({ status: 'created', agv });

        res.status(200).json({ message: 'AGV History processed successfully', results });
    } catch (error) {
        res.status(500).json({ message: 'Error processing AGV History details', error: error.message });
    }
};

export const getAllAGVs = async (req, res) => {
    try {
        const agv = await AGVHistory.find();
        res.status(200).json({ message: 'All AGV History details retrieved successfully', agv });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving AGV History details', error: error.message });
    }
};