import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(session.user.id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Old password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password update error:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating the password' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
