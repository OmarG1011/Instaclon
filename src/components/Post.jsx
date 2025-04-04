const Post = ({ post }) => {
    return (
      <div className="card mb-4">
        <img src={post.image} className="card-img-top" alt="Post Image" />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
        </div>
      </div>
    );
  };
  
  export default Post;
  