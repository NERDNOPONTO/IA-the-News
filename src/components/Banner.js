import React from 'react';
import './Banner.css';

function Banner({ post }) {
  if (!post) return null;

  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <span className="banner-category">{post.theme}</span>
          <h2>{post.title}</h2>
          <p>{post.content.substring(0, 150)}...</p>
          <button className="banner-button">Ler Mais</button>
        </div>
        <div className="banner-overlay"></div>
      </div>
    </div>
  );
}

export default Banner; 