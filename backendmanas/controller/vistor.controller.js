import Visitor from "../models/vistor.model.js";


export const getVisitorCount = async (req, res) => {
    try {
        let visitorData = await Visitor.findOne();
        if (!visitorData) {
            visitorData = await Visitor.create({ count: 0 });
        }

        if (!req.cookies.visitor_id) {
            res.cookie('visitor_id', 'visited', {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'None',
                secure: req.secure || req.headers['x-forwarded-proto'] === 'https' 
            });

            visitorData.count += 1;
            await visitorData.save();
        }

        res.json({ totalVisitors: visitorData.count });
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};