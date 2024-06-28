import { useState } from 'react';

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!content.trim() && !mediaFile) || isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('content', content);
    if (mediaFile) {
      formData.append('media', mediaFile);
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onPostCreated(data.post);
        setContent('');
        setMediaFile(null);
        if (e.target.media) {
          e.target.media.value = '';
        }
      } else {
        console.error('Failed to create post:', data.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="file"
        name="media"
        onChange={(e) => setMediaFile(e.target.files[0])}
        accept="image/*,video/*"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}
