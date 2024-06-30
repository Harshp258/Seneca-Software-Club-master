import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(session.user.id).select('-password');
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { name, email, course, studentId } = req.body;
        const user = await User.findByIdAndUpdate(
          session.user.id,
          { name, email, course, studentId },
          { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, message: 'Profile updated successfully', user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
