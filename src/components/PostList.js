import React, { useState } from 'react';
import Post from './Post';
import './PostList.css';

const PostList = ({ posts }) => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handlePostExpand = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <Post
          key={post._id}
          post={post}
          isExpanded={expandedPostId === post._id}
          onExpand={() => handlePostExpand(post._id)}
        />
      ))}
    </div>
  );
};

export default PostList; 