import Rover from '../models/Rover.mjs';
import Status from '../models/Status.mjs';

export const addOrUpdateRovers = async (req, res) => {
    try {
        const rovers = req.body;
        const results = [];

        for (const serial_number in rovers) {
            if (rovers.hasOwnProperty(serial_number)) {
                const { client, country, date, material, time, unique_id } = rovers[serial_number];

                let rover = await Rover.findOne({ client, country, material });

                if (rover) {
                    rover.date = date;
                    rover.time = time;
                    rover.unique_id = unique_id;
                    rover.serial_number = serial_number;

                    await rover.save();
                    results.push({ serial_number, status: 'updated', rover });
                } else {
                    rover = new Rover({
                        client,
                        country,
                        date,
                        material,
                        serial_number,
                        time,
                        unique_id
                    });

                    await rover.save();
                    results.push({ serial_number, status: 'created', rover });
                }
            }
        }

        res.status(200).json({ message: 'Rovers processed successfully', results });
    } catch (error) {
        res.status(500).json({ message: 'Error processing rover details', error: error.message });
    }
};

export const getAllRovers = async (req, res) => {
    try {
        const rovers = await Rover.find();
        res.status(200).json({ message: 'All rover details retrieved successfully', rovers });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rover details', error: error.message });
    }
};

export const updateRoverStatus = async (req, res) => {
    try {
        const { serial_number, status } = req.body;

        const validStatuses = [
            'Packing Completed',
            'Arrival at Warehouse',
            'QR Code Scanned',
            'AGV Initiated',
            'Pickup Point Reached',
            'Navigating to Target Shelf',
            'Box Dispatched',
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const rover = await Rover.findOne({ serial_number });
        if (!rover) {
            return res.status(404).json({ message: 'Rover not found' });
        }

        const existingStatus = await Status.findOne({ rover_serial_number: serial_number });

        if (existingStatus) {
            existingStatus.status = status;
            existingStatus.timestamp = Date.now();

            await existingStatus.save();

            res.status(200).json({
                message: 'Rover status updated successfully',
                status: existingStatus,
            });
        } else {
            const newStatus = new Status({
                rover_serial_number: serial_number,
                status,
            });

            await newStatus.save();

            res.status(200).json({
                message: 'Rover status updated successfully',
                status: newStatus,
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating rover status', error: error.message });
    }
};

export const getRoverStatusHistory = async (req, res) => {
    try {
        const { serial_number } = req.params;

        const statusHistory = await Status.find({ rover_serial_number: serial_number }).sort({ timestamp: -1 });

        if (!statusHistory.length) {
            return res.status(404).json({ message: 'No status history found for this rover' });
        }

        res.status(200).json({
            message: 'Rover status history retrieved successfully',
            statusHistory,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rover status history', error: error.message });
    }
};
