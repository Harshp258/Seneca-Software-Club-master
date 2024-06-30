// components/PostList.js
import PostItem from './PostItem';

export default function PostList({ posts, limit }) {
  const limitedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="post-list">
      {limitedPosts.map(post => (
        <div key={post._id} className="post-card">
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}
