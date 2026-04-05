import mongoose from "mongoose";
import bcryptt from "bcrypt";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const createAdmin = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const existingAdmin = await User.findOne({ username: "admin" });
        if (existingAdmin) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const admin=new User({
            username: "admin",
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("Admin user created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin user:", error.message);
        process.exit(1);
    }
};

await

createAdmin();