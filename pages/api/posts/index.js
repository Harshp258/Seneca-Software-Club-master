import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await dbConnect();

    if (req.method === 'POST') {
      const form = formidable();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          return res.status(400).json({ success: false, error: 'Error parsing form data' });
        }

        try {
          let mediaUrl = '';
          let mediaType = null;
          if (files.image) {
            const result = await cloudinary.uploader.upload(files.image.filepath, {
              resource_type: "auto"
            });
            mediaUrl = result.secure_url;
            mediaType = result.resource_type === 'video' ? 'video' : 'image';
          }

          let content = fields.content;
          if (Array.isArray(content)) {
            content = content[0];
          }
          content = content.trim();

          if (!content) {
            return res.status(400).json({ success: false, error: 'Content is required' });
          }

          const post = await Post.create({
            user: session.user.id,
            content: content,
            mediaUrl,
            mediaType,
          });

          return res.status(201).json({ success: true, post });
        } catch (error) {
          console.error('Post creation error:', error);
          return res.status(400).json({ success: false, error: error.message });
        }
      });
    } else if (req.method === 'GET') {
      try {
        const posts = await Post.find({})
          .sort({ createdAt: -1 })
          .populate('user', 'name')
          .populate('comments.user', 'name');
        return res.status(200).json({ success: true, posts });
      } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(400).json({ success: false, error: error.message });
      }
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
