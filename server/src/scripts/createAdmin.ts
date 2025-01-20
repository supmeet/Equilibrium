import bcrypt from "bcrypt";
import User from '../models/User';

/**
 * Function to create an admin user
 */
export const createAdmin = async () => {
  try {
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping admin creation.');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin@123', 10); // Default password for admin
    const admin = new User({
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
        isVerified: true,
        firstName: "Admin",
        lastName: "User",
        nickname: "SuperAdmin", // Optional field
      });

    await admin.save();
    console.log('Admin user created successfully:', admin.email);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating admin user:", error.message);
    } else {
      console.error("An unexpected error occurred while creating admin user.");
    }
  }
};
