import React from 'react';
import './Post.css';
import TelegramNotification from './TelegramNotification';
import AdSpace from './AdSpace';

const Post = ({ post, isExpanded, onExpand }) => {
  const maxLength = 200;
  const content = isExpanded ? post.content : post.content.slice(0, maxLength) + '...';

  return (
    <article className="post">
      <div className="post-header">
        <h2>{post.title}</h2>
        <div className="post-date">
          {new Date(post.createdAt).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      <div className="post-content">
        {content.split('\n').map((paragraph, index) => {
          if (index === 2 && isExpanded) {
            return (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                <AdSpace position="middle" />
              </React.Fragment>
            );
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>
      <div className="post-actions">
        <button className="read-more-button" onClick={onExpand}>
          <span>{isExpanded ? 'Ler menos' : 'Ler mais'}</span>
        </button>
        <div className="share-buttons">
          <TelegramNotification post={post} />
        </div>
      </div>
    </article>
  );
};

export default Post;