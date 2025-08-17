import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import clientPromise from '.';
import { User } from '@/types';  // Assuming you have a User type

let client: MongoClient | undefined;
let db: Db | undefined;
let users: Collection<User> | undefined;

async function init(): Promise<void> {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db('school_management');  // Your DB name
    users = db.collection('students');  // Use the correct collection for users (students, teachers, admins)
  } catch (error) {
    throw new Error('Failed to establish connection to database');
  }
}

// Fetch user by email and ID to fetch settings or data
export async function getUserByLogin(
  email: string,
  id: string
): Promise<{ user?: User; error?: string }> {
  try {
    if (!users) await init();

    const user = await users.findOne({
      "personalInfo.email": { $regex: new RegExp(`^${email}$`, "i") },
      $or: [
        { "academicInfo.studentId": id },
        { "professionalInfo.teacherId": id },
        { "professionalInfo.adminId": id },
      ],
    });

    if (!user) {
      return { error: 'User not found' };
    }

    return { user: { ...user, _id: user._id.toString() } };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: 'Failed to fetch user' };
  }
}

// Update user data (including settings) directly in the students collection
export async function updateUserSettings(userId: string, updatedData: Partial<User>): Promise<{ updatedUser?: User; error?: string }> {
  try {
    if (!users) await init();

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },  // Use the user's ID to identify the document
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return { error: 'No user found to update' };
    }

    // Fetch the updated user data
    const updatedUser = await users.findOne({ _id: new ObjectId(userId) });

    return { updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: 'Failed to update user settings' };
  }
}
