import dbConnect from '../../../../lib/mongodb';
import Post from '../../../../models/Post';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  await dbConnect();

  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }

      const userId = session.user.id;
      const likeIndex = post.likes.indexOf(userId);

      if (likeIndex > -1) {
        // User has already liked, so unlike
        post.likes.splice(likeIndex, 1);
      } else {
        // User hasn't liked, so add like
        post.likes.push(userId);
      }

      await post.save();

      res.status(200).json({ success: true, likes: post.likes.length });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
