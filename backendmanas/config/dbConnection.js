import mongoose from "mongoose";
import dns from "node:dns";

// Fix Windows Node DNS SRV lookup failure for MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (dnsErr) {
  // Ignore in environments where setServers is restricted
}

mongoose.set("strictQuery", false);

const ConnectionToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL);

    if (connection) {
      console.log("Connected to Mongoo DB");
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default ConnectionToDB;
