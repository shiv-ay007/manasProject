// config/secondaryDbConnection.js
import mongoose from "mongoose";

const ConnectionToSecondaryDB = async () => {
    try {
        const connection = await mongoose.createConnection(
            process.env.SECONDARY_URL // No options needed for MongoDB 4.0+
        );

        if (connection) {
            console.log("Connected to Secondary MongoDB");
        }
        return connection;
    } catch (error) {
        console.log("Secondary Database Connection Error:", error);
        process.exit(1);
    }
};

export default ConnectionToSecondaryDB;
