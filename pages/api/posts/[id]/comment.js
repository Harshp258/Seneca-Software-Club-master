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
      const { content } = req.body;
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }

      post.comments.push({
        user: session.user.id,
        content,
      });

      await post.save();

      const updatedPost = await Post.findById(id).populate('comments.user', 'name');

      res.status(201).json({ success: true, comments: updatedPost.comments });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
