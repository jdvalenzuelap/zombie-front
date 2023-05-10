import React from 'react';

const PostCard = ({ title, content, createdAt }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <p>Created on: {createdAt}</p>
      </div>
    </div>
  );
}

export default PostCard;